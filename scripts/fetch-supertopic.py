#!/usr/bin/env python3
"""抓取微博超话最新帖子 — m.weibo.cn API，带 session/cookie/重试"""
import json, sys, time, random, re
import requests

SUPERTOPIC_ID = "1008087f9f4377e6f95c313d4c2019adb1c82f"
MAX_POSTS = 5
OUTPUT = "/tmp/supertopic.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) "
                  "AppleWebKit/605.1.15 (KHTML, like Gecko) "
                  "Version/16.0 Mobile/15E148 Safari/604.1",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "X-Requested-With": "XMLHttpRequest",
    "Referer": f"https://m.weibo.cn/p/{SUPERTOPIC_ID}",
}


def fetch_with_retry(url, session, max_retries=3):
    """带指数退避的重试请求"""
    for attempt in range(max_retries):
        try:
            resp = session.get(url, headers=HEADERS, timeout=30)
            if resp.status_code == 200:
                return resp.json()
            print(f"  HTTP {resp.status_code}, retry {attempt+1}/{max_retries}", file=sys.stderr)
        except Exception as e:
            print(f"  Error: {e}, retry {attempt+1}/{max_retries}", file=sys.stderr)
        if attempt < max_retries - 1:
            time.sleep(2 ** attempt + random.uniform(0, 1))
    return None


def extract_posts(data):
    """从 m.weibo.cn API 响应中提取帖子"""
    posts = []
    if not data or data.get("ok") != 1:
        return posts

    cards = data.get("data", {}).get("cards", [])
    for card in cards:
        if card.get("card_type") == 9:
            mblog = card.get("mblog", {})
            if not mblog:
                # 有些卡片嵌套在 card_group 里
                for g in card.get("card_group", []):
                    if g.get("card_type") == 9:
                        mblog = g.get("mblog", {})
                        break
            if not mblog:
                continue

            text = mblog.get("text", "")
            text = re.sub(r"<[^>]*>", "", text)
            text = re.sub(r"\s+", " ", text).strip()

            user = mblog.get("user", {})
            post = {
                "title": text[:80],
                "url": f"https://m.weibo.cn/detail/{mblog['id']}" if mblog.get("id") else "",
                "date": (mblog.get("created_at") or "")[:10],
                "author": user.get("screen_name", ""),
            }
            posts.append(post)

        if len(posts) >= MAX_POSTS:
            break

    return posts


def main():
    session = requests.Session()

    # 第一步：先访问超话主页，获取 cookie
    print("Step 1: 访问超话主页获取 cookie...", file=sys.stderr)
    try:
        session.get(
            f"https://m.weibo.cn/p/{SUPERTOPIC_ID}",
            headers={**HEADERS, "Accept": "text/html,application/xhtml+xml,*/*"},
            timeout=30,
        )
        time.sleep(random.uniform(0.5, 1.5))
    except Exception as e:
        print(f"  Cookie 预热失败（继续）: {e}", file=sys.stderr)

    # 第二步：请求 API
    api_url = f"https://m.weibo.cn/api/container/getIndex?containerid={SUPERTOPIC_ID}&page=1"
    print(f"Step 2: 请求超话 API...", file=sys.stderr)

    data = fetch_with_retry(api_url, session)

    if not data:
        # 尝试备用的 containerid 格式
        alt_url = f"https://m.weibo.cn/api/container/getIndex?containerid={SUPERTOPIC_ID}_-_feed&page=1"
        print(f"Step 2b: 尝试备用 containerid...", file=sys.stderr)
        data = fetch_with_retry(alt_url, session)

    if not data:
        print("抓取失败，输出空结果", file=sys.stderr)
        with open(OUTPUT, "w") as f:
            json.dump({"ok": 0}, f)
        sys.exit(0)

    posts = extract_posts(data)
    print(f"Step 3: 提取到 {len(posts)} 条帖子", file=sys.stderr)

    # 输出为 build-feeds.js 可解析的格式
    result = {"ok": 1, "data": {"cards": []}}
    for p in posts:
        result["data"]["cards"].append({
            "card_type": 9,
            "mblog": {
                "text": p["title"],
                "id": p["url"].split("/")[-1] if p["url"] else "",
                "created_at": p["date"],
                "user": {"screen_name": p["author"]},
            },
        })

    # 同时输出一个简化格式供调试
    for i, p in enumerate(posts):
        print(f"  [{i+1}] {p['date']} @{p['author']}: {p['title'][:40]}...", file=sys.stderr)

    with open(OUTPUT, "w") as f:
        json.dump(result, f, ensure_ascii=False)

    print(f"Done — 写入 {OUTPUT}", file=sys.stderr)


if __name__ == "__main__":
    main()
