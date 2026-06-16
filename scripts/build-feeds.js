// 读取 RSSHub JSON 输出，生成 feeds.js
const fs = require('fs');
const path = require('path');

function parseFeed(filePath, author, platform) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    const items = (data.items || []).slice(0, 4).map(item => ({
      title: (item.title || '').replace(/<[^>]*>/g, '').slice(0, 60),
      url: item.link || item.url || '',
      date: (item.pubDate || item.created || item.date || '').slice(0, 10),
      author: author,
      platform: platform
    }));
    return items;
  } catch (e) {
    return [];
  }
}

const feeds = [
  ...parseFeed('/tmp/nannan-weibo.json', '南南', '微博'),
  ...parseFeed('/tmp/xiaojiang-weibo.json', '小江', '微博'),
  ...parseFeed('/tmp/nannan-douyin.json', '南南', '抖音'),
  ...parseFeed('/tmp/xiaojiang-douyin.json', '小江', '抖音'),
  ...parseFeed('/tmp/nannan-xhs.json', '南南', '小红书'),
  ...parseFeed('/tmp/xiaojiang-xhs.json', '小江', '小红书'),
];

// 合并按时间排序，最多 10 条
const all = feeds
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 10);

const output = `// —— 自动生成部分（由 GitHub Actions 每6小时更新，请勿手动编辑） ——
window.LATEST_FEEDS = ${JSON.stringify(all, null, 2)};
`;

fs.writeFileSync(feedsPath, output);
console.log(`Generated feeds.js with ${all.length} personal items`);
