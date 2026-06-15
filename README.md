# 忆江南cp 💕 — 爱的足迹👣

[@一枝南南](https://weibo.com/u/7817829627) & [@江星熠](https://weibo.com/u/7664743621) 的故事存档

## 如何添加新内容

编辑 `js/data.js`，在 `moments` 数组里添加新条目：

```javascript
{
  id: "唯一英文id",
  date: "2025-07-01",
  title: "标题",
  description: "描述（可选）",
  category: "单人直播",     // 采访 / Q&A / 双人直播 / 单人直播 / 节目 / Vlog / 二创 / 命中注定 / 情侣款 / 汇总
  images: [],                // 图片路径，如 ["img/gallery/xxx.jpg"]
  links: [
    { url: "https://...", label: "链接名称" },
  ],
  icon: "💕"
},
```

图片放入 `img/gallery/` 目录即可。

## 本地预览

直接用浏览器打开 `index.html`。

## 部署

推送到 GitHub 后在仓库 Settings → Pages 中启用即可。
