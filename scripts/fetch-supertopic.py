#!/usr/bin/env python3
"""抓取微博超话最新帖子 — HTML页面解析 + cloudscraper + 多方案回退"""
import json, sys, time, random, re, html as html_mod

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

# ─── 方案A：解析 HTML 页面中的 embedded JSON ───

def parse_html_embedded(html_text):
    """从 m.weibo.cn 页面提取内嵌的 feed 数据"""
    posts = []

    # 尝试1: window.__INITIAL_STATE__ 或 window.$render_data
    for pattern in [
        r'window\.\$render_data\s*=\s*(\[[^\]]*\{.*?\}\s*\])\s*\[0\]',
        r'window\.\$render_data\s*=\s*(\[.*?\])\s*\[0\]\s*;',
        r'"statuses"\s*:\s*(\[.*?\])',
        r'var\s+renderData\s*=\s*(\[.*?\])',
        r'window\.__INITIAL_STATE__\s*=\s*(\{.*?\});',
    ]:
        m = re.search(pattern, html_text, re.DOTALL)
        if m:
            try:
                data = json.loads(m.group(1))
                if isinstance(data, list) and len(data) > 0:
                    data = data[0]
                if isinstance(data, dict):
                    cards = data.get("statuses") or data.get("cards") or []
                    for card in (cards if isinstance(cards, list) else []):
                        mblog = card.get("mblog") or card
                        text = re.sub(r"<[^>]*>", "", mblog.get("text", ""))
                        text = re.sub(r"\s+", " ", text).strip()
                        user = mblog.get("user", {})
                        posts.append({
                            "title": text[:80],
                            "url": f"https://m.weibo.cn/detail/{mblog['id']}" if mblog.get("id") else "",
                            "date": (mblog.get("created_at") or "")[:10],
                            "author": user.get("screen_name", ""),
                        })
                        if len(posts) >= MAX_POSTS:
                            break
                    if posts:
                        print(f"  从 HTML embedded 提取到 {len(posts)} 条", file=sys.stderr)
                        return posts
            except (json.JSONDecodeError, KeyError, TypeError):
                continue

    # 尝试2: 从 <script> 标签中提取包含 mblog 的 JSON
    for script_match in re.finditer(r'<script[^>]*>([^<]+)</script>', html_text):
        script = script_match.group(1)
        if 'mblog' in script or 'statuses' in script:
            for m in re.finditer(r'\{[^}]*"mblog"[^}]*\}', script):
                try:
                    obj = json.loads(m.group(0))
                    mblog = obj.get("mblog", obj)
                    text = re.sub(r"<[^>]*>", "", mblog.get("text", ""))[:80]
                    user = mblog.get("user", {})
                    posts.append({
                        "title": text[:80],
                        "url": f"https://m.weibo.cn/detail/{mblog['id']}" if mblog.get("id") else "",
                        "date": (mblog.get("created_at") or "")[:10],
                        "author": user.get("screen_name", ""),
                    })
                    if len(posts) >= MAX_POSTS:
                        break
                except (json.JSONDecodeError, KeyError):
                    continue
        if posts:
            break

    return posts[:MAX_POSTS]


# ─── 方案B：API 请求 ───

def try_api(scraper, headers):
    """尝试 m.weibo.cn API 端点"""
    endpoints = [
        f"https://m.weibo.cn/api/container/getIndex?containerid={SUPERTOPIC_ID}&page=1",
        f"https://m.weibo.cn/api/container/getIndex?containerid={SUPERTOPIC_ID}_-_feed&page=1",
    ]

    for url in endpoints:
        for attempt in range(3):
            try:
                resp = scraper.get(url, headers=headers, timeout=30)
                if resp.status_code == 200:
                    data = resp.json()
                    if data.get("ok") == 1:
                        return extract_api_posts(data)
            except Exception:
                pass
            if attempt < 2:
                time.sleep(2**attempt + random.uniform(0, 1))
    return []


def extract_api_posts(data):
    """从 API 响应提取帖子"""
    posts = []
    cards = data.get("data", {}).get("cards", [])
    for card in cards:
        mblog = None
        if card.get("card_type") == 9:
            mblog = card.get("mblog", {})
        if not mblog:
            for g in card.get("card_group", []):
                if g.get("card_type") == 9:
                    mblog = g.get("mblog", {})
                    break
        if not mblog:
            continue
        text = re.sub(r"<[^>]*>", "", mblog.get("text", ""))
        text = re.sub(r"\s+", " ", text).strip()
        user = mblog.get("user", {})
        posts.append({
            "title": text[:80],
            "url": f"https://m.weibo.cn/detail/{mblog['id']}" if mblog.get("id") else "",
            "date": (mblog.get("created_at") or "")[:10],
            "author": user.get("screen_name", ""),
        })
        if len(posts) >= MAX_POSTS:
            break
    return posts


# ─── 主流程 ───

def main():
    scraper = cloudscraper.create_scraper()

    headers = {
        "User-Agent": MOBILE_UA,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Referer": "https://m.weibo.cn/",
    }

    # 方案A：爬 HTML 页面，解析 embedded JSON
    print("方案A: 请求超话 HTML 页面...", file=sys.stderr)
    page_url = f"https://m.weibo.cn/p/{SUPERTOPIC_ID}"
    try:
        resp = scraper.get(page_url, headers=headers, timeout=45)
        if resp.status_code == 200:
            posts = parse_html_embedded(resp.text)
            if posts:
                return save_posts(posts)
            print("  未从 HTML 提取到数据，尝试 API...", file=sys.stderr)
        else:
            print(f"  HTML 页面返回 HTTP {resp.status_code}", file=sys.stderr)
    except Exception as e:
        print(f"  方案A异常: {e}", file=sys.stderr)

    # 方案B：API 请求
    print("方案B: 请求 API...", file=sys.stderr)
    headers["Accept"] = "application/json, text/plain, */*"
    headers["X-Requested-With"] = "XMLHttpRequest"
    posts = try_api(scraper, headers)

    if not posts:
        # 方案C：尝试 weibo.cn（老版移动站）
        print("方案C: 尝试 weibo.cn 老版移动站...", file=sys.stderr)
        try:
            resp = scraper.get(
                f"https://weibo.cn/search/super?keyword=忆江南cp",
                headers=headers,
                timeout=30,
            )
            if resp.status_code == 200:
                # 解析 weibo.cn 的简单 HTML
                for m in re.finditer(
                    r'<span class="ctt">(.*?)</span>.*?<span class="ct">.*?(\d+月\d+日).*?</span>',
                    resp.text, re.DOTALL
                ):
                    text = re.sub(r"<[^>]*>", "", m.group(1)).strip()[:80]
                    date_str = m.group(2) if m.lastindex >= 2 else ""
                    posts.append({
                        "title": text[:80],
                        "url": "",
                        "date": date_str,
                        "author": "",
                    })
                    if len(posts) >= MAX_POSTS:
                        break
                if posts:
                    print(f"  从 weibo.cn 提取到 {len(posts)} 条", file=sys.stderr)
        except Exception as e:
            print(f"  方案C异常: {e}", file=sys.stderr)

    return save_posts(posts)


def save_posts(posts):
    """保存结果"""
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

    if not posts:
        print("所有方案均失败，返回空", file=sys.stderr)
        result["ok"] = 0

    with open(OUTPUT, "w") as f:
        json.dump(result, f, ensure_ascii=False)

    print(f"Done → {OUTPUT} ({len(posts)} 条)", file=sys.stderr)
    return posts


if __name__ == "__main__":
    main()
