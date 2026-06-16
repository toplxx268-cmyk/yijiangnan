/**
 * Vercel Serverless — 微博超话 API 代理
 * 利用 Vercel 亚洲边缘节点（香港/新加坡）避开 IP 封锁
 */
export default async function handler(req, res) {
  const CONTAINER_ID = "1008087f9f4377e6f95c313d4c2019adb1c82f";
  const API_URL = `https://m.weibo.cn/api/container/getIndex?containerid=${CONTAINER_ID}&page=1`;

  const HEADERS = {
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) " +
      "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "X-Requested-With": "XMLHttpRequest",
    "Referer": `https://m.weibo.cn/p/${CONTAINER_ID}`,
  };

  try {
    // Step 1: 预热 cookie（访问超话主页）
    await fetch(`https://m.weibo.cn/p/${CONTAINER_ID}`, {
      headers: { ...HEADERS, Accept: "text/html,*/*" },
      redirect: "follow",
    }).catch(() => {});

    // Step 2: 请求 API
    const resp = await fetch(API_URL, { headers: HEADERS });

    if (!resp.ok) {
      // 备用 containerid
      const altResp = await fetch(
        `https://m.weibo.cn/api/container/getIndex?containerid=${CONTAINER_ID}_-_feed&page=1`,
        { headers: HEADERS }
      );
      if (!altResp.ok) {
        return res.status(502).json({ ok: 0, error: `Upstream ${resp.status}` });
      }
      const altData = await altResp.json();
      return res.status(200).json(altData);
    }

    const data = await resp.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ ok: 0, error: e.message });
  }
}
