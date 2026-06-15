// 读取 RSSHub JSON 输出，生成 feeds.js
const fs = require('fs');
const path = require('path');

function parseFeed(filePath, author) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    const items = (data.items || []).slice(0, 5).map(item => ({
      title: (item.title || '').replace(/<[^>]*>/g, '').slice(0, 60),
      url: item.link || item.url || '',
      date: (item.pubDate || item.created || item.date || '').slice(0, 10),
      author: author
    }));
    return items;
  } catch (e) {
    return [];
  }
}

const nannan = parseFeed('/tmp/nannan.json', '一枝南南');
const xiaojiang = parseFeed('/tmp/xiaojiang.json', '江星熠');

// 合并按时间排序，最多 8 条
const all = [...nannan, ...xiaojiang]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 8);

const output = `// 自动生成，请勿手动编辑
// 每6小时由 GitHub Actions 更新
window.LATEST_FEEDS = ${JSON.stringify(all, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'js', 'feeds.js'), output);
console.log(`Generated feeds.js with ${all.length} items`);
