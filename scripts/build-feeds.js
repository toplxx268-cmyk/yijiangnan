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

function parseSuperTopicFeed(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    if (!data.ok || !data.data || !data.data.cards) return [];

    const items = [];
    for (const card of data.data.cards) {
      if (card.card_type === 9 && card.mblog) {
        const m = card.mblog;
        items.push({
          title: (m.text || '').replace(/<[^>]*>/g, '').slice(0, 80),
          url: m.id ? `https://m.weibo.cn/detail/${m.id}` : (m.scheme || ''),
          date: (m.created_at || '').slice(0, 10),
          author: (m.user && m.user.screen_name) ? m.user.screen_name : ''
        });
      }
      if (items.length >= 5) break; // 只要最新5条
    }
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

// 超话最新帖子
const supertopicFeeds = parseSuperTopicFeed('/tmp/supertopic.json');

const output = `// 自动生成，请勿手动编辑
// 每6小时由 GitHub Actions 更新
window.LATEST_FEEDS = ${JSON.stringify(all, null, 2)};

window.LATEST_SUPERTOPIC_FEEDS = ${JSON.stringify(supertopicFeeds, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'js', 'feeds.js'), output);
console.log(`Generated feeds.js with ${all.length} personal items + ${supertopicFeeds.length} supertopic items`);
