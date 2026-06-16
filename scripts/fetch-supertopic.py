#!/usr/bin/env python3
"""抓取微博超话最新帖子 — cloudscraper 绕过反爬 + 多端点回退"""
import json, sys, time, random, re

try:
    import cloudscraper
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "cloudscraper", "-q"])
    import cloudscraper

SUPERTOPIC_ID = "1008087f9f4377e6f95c313d4c2019adb1c82f"
MAX_POSTS = 5
OUTPUT = "/tmp/supertopic.json"

MOBILE_UA = (
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) "
    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1"
)


def make_scraper():
    """创建 cloudscraper 实例，模拟真实浏览器 TLS 指纹"""
    try:
        return cloudscraper.create_scraper(
            browser={"browser": "chrome", "platform": "ios", "mobile": True}
        )
    except TypeError:
        return cloudscraper.create_scraper()


def extract_posts(data):
    """从 m.weibo.cn API / 新版 API 响应中提取帖子"""
    posts = []
    if not data:
        return posts

    # 格式1: m.weibo.cn 标准响应 {"ok":1, "data":{"cards":[...]}}
    if data.get("ok") == 1:
        cards = data.get("data", {}).get("cards", [])
        for card in cards:
            mblog = None
            if card.get("card_type") == 9:
                mblog = card.get("mblog", {})
            # 嵌套在 card_group 中
            if not mblog:
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

            posts.append({
                "title": text[:80],
                "url": f"https://m.weibo.cn/detail/{mblog['id']}" if mblog.get("id") else "",
                "date": (mblog.get("created_at") or "")[:10],
                "author": user.get("screen_name", ""),
            })

    # 格式2: 新版 weibo.com 响应
    elif data.get("data") and isinstance(data["data"], list):
        for card in data["data"]:
            text = re.sub(r"<[^>]*>", "", card.get("text", ""))[:80]
            user = card.get("user", {})
            posts.append({
                "title": text[:80],
                "url": f"https://m.weibo.cn/detail/{card['id']}" if card.get("id") else "",
                "date": (card.get("created_at") or "")[:10],
                "author": user.get("screen_name", ""),
            })

    return posts[:MAX_POSTS]


def try_fetch(url, scraper, headers, label=""):
    """请求并返回 JSON"""
    for attempt in range(3):
        try:
            resp = scraper.get(url, headers=headers, timeout=30)
            if resp.status_code == 200:
                return resp.json()
            print(f"  [{label}] HTTP {resp.status_code}, retry {attempt+1}/3", file=sys.stderr)
        except Exception as e:
            print(f"  [{label}] {e}, retry {attempt+1}/3", file=sys.stderr)
        if attempt < 2:
            time.sleep(2 ** attempt + random.uniform(0, 1))
    return None


def main():
    scraper = make_scraper()

    headers = {
        "User-Agent": MOBILE_UA,
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "X-Requested-With": "XMLHttpRequest",
        "Referer": f"https://m.weibo.cn/p/{SUPERTOPIC_ID}",
    }

    # Step 1: 预热 cookie（访问超话主页）
    print("Step 1: 预热 cookie...", file=sys.stderr)
    try:
        scraper.get(
            f"https://m.weibo.cn/p/{SUPERTOPIC_ID}",
            headers={**headers, "Accept": "text/html,*/*"},
            timeout=30,
        )
        time.sleep(random.uniform(0.8, 1.5))
    except Exception as e:
        print(f"  预热跳过: {e}", file=sys.stderr)

    # Step 2: 依次尝试多个 API 端点
    endpoints = [
        (
            "m.weibo.cn API",
            f"https://m.weibo.cn/api/container/getIndex?containerid={SUPERTOPIC_ID}&page=1",
        ),
        (
            "m.weibo.cn 备用",
            f"https://m.weibo.cn/api/container/getIndex?containerid={SUPERTOPIC_ID}_-_feed&page=1",
        ),
        (
            "weibo.com 新版API",
            f"https://weibo.com/ajax/statuses/searchProfile?containerid={SUPERTOPIC_ID}&page=1",
        ),
    ]

    data = None
    for label, url in endpoints:
        print(f"Step 2: 尝试 {label}...", file=sys.stderr)
        data = try_fetch(url, scraper, headers, label)
        if data:
            print(f"  ✓ {label} 成功", file=sys.stderr)
            break

    if not data:
        print("所有端点均失败，输出空结果", file=sys.stderr)
        with open(OUTPUT, "w") as f:
            json.dump({"ok": 0}, f)
        sys.exit(0)

    posts = extract_posts(data)
    print(f"Step 3: 提取到 {len(posts)} 条帖子", file=sys.stderr)

    # 输出为 build-feeds.js 兼容格式
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

    for i, p in enumerate(posts):
        print(f"  [{i+1}] {p['date']} @{p['author']}: {p['title'][:40]}...", file=sys.stderr)

    with open(OUTPUT, "w") as f:
        json.dump(result, f, ensure_ascii=False)

    print(f"Done → {OUTPUT}", file=sys.stderr)


if __name__ == "__main__":
    main()
