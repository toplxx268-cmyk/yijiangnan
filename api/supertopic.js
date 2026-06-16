/**
 * Vercel Serverless — 微博超话 API 代理
 * 利用 Vercel 亚洲边缘节点（香港/新加坡）代理请求
 */
export default async function handler(req, res) {
  const CONTAINER_ID = "1008087f9f4377e6f95c313d4c2019adb1c82f";

  const UA =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) " +
    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1";

  const BASE_HEADERS = {
    "User-Agent": UA,
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": `https://m.weibo.cn/p/${CONTAINER_ID}`,
  };

  // 方案1: HTML页面 → 解析 embedded JSON
  try {
    const pageResp = await fetch(`https://m.weibo.cn/p/${CONTAINER_ID}`, {
      headers: { ...BASE_HEADERS, Accept: "text/html,*/*" },
    });
    if (pageResp.ok) {
      const html = await pageResp.text();
      const posts = extractFromHTML(html, CONTAINER_ID);
      if (posts.length > 0) {
        return res.status(200).json({ ok: 1, data: { cards: posts } });
      }
    }
  } catch (_) {}

  // 方案2: API
  const apiUrls = [
    `https://m.weibo.cn/api/container/getIndex?containerid=${CONTAINER_ID}&page=1`,
    `https://m.weibo.cn/api/container/getIndex?containerid=${CONTAINER_ID}_-_feed&page=1`,
  ];

  for (const url of apiUrls) {
    try {
      const resp = await fetch(url, {
        headers: {
          ...BASE_HEADERS,
          Accept: "application/json, text/plain, */*",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.ok === 1) {
          return res.status(200).json(data);
        }
      }
    } catch (_) {}
  }

  return res.status(200).json({ ok: 0 });
}

function extractFromHTML(html, containerId) {
  const posts = [];
  // 从 <script> 中提取包含 mblog 的 JSON
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const script = match[1];
    if (!script.includes("mblog") && !script.includes("statuses")) continue;
    // 尝试找到 JSON 对象
    const jsonMatches = script.match(/\{[^}]*"mblog"[^}]*\}/g) || [];
    for (const jsonStr of jsonMatches) {
      try {
        const obj = JSON.parse(jsonStr);
        const mblog = obj.mblog || obj;
        const text = (mblog.text || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
        const user = mblog.user || {};
        posts.push({
          card_type: 9,
          mblog: {
            text: text.slice(0, 80),
            id: mblog.id || "",
            created_at: (mblog.created_at || "").slice(0, 10),
            user: { screen_name: user.screen_name || "" },
          },
        });
        if (posts.length >= 5) break;
      } catch (_) {}
    }
    if (posts.length >= 5) break;
  }
  return posts;
}
