// ============================================================
// CP Archive — 忆江南 (@一枝南南 & @江星熠)
// 添加新条目：在对应的数组里添加即可
// 分类用于顶部筛选按钮
// ============================================================

window.CP_DATA = {
  meta: {
    coupleName: "忆江南cp 💕",
    subtitle: "@一枝南南&江星熠 爱的足迹👣",
    startDate: "2024-04-09",
    headerImage: "img/gallery/IMG_2838.JPG",
    birthdays: {
      nannan: "06-20",   // 一枝南南
      xiaojiang: "11-23" // 江星熠
    }
  },

  // ==================== 足迹地图 ====================
  // 经纬度去 https://www.openstreetmap.org 搜索获取
  footprints: [
    { name: "上海时装周", lat: 31.2304, lng: 121.4737, date: "2024-10", emoji: "👗" },
    { name: "北京环球影城", lat: 39.7884, lng: 116.6768, date: "2024-11", emoji: "🎢" },
    { name: "三亚直播", lat: 18.2528, lng: 109.5120, date: "2025-02", emoji: "🌴" },
    { name: "泰国旅行", lat: 13.7563, lng: 100.5018, date: "2025-03", emoji: "✈️" },
    { name: "成都 vlog", lat: 30.5728, lng: 104.0668, date: "2024-09", emoji: "🐼" },
    { name: "杭州大屏", lat: 30.2741, lng: 120.1551, date: "2024-06", emoji: "🎂" },
    { name: "台北大屏", lat: 25.0330, lng: 121.5654, date: "2024-06", emoji: "🎂" },
    { name: "长沙", lat: 28.2282, lng: 112.9388, date: "2024-10", emoji: "🔥" }
  },

  // ==================== 左侧画廊图片 ====================
  // 新增图片：放文件到 img/gallery/，在这里加 { src: "路径", caption: "描述" }
  galleryImages: [
    { thumb: "img/gallery/thumbs/IMG_2838.JPG", full: "img/gallery/IMG_2838.JPG", caption: "忆江南" },
    { thumb: "img/gallery/thumbs/6812451803a3745951cc2f90b0a59b07.jpeg", full: "img/gallery/6812451803a3745951cc2f90b0a59b07.jpeg", caption: "甜蜜合影" },
    { thumb: "img/gallery/thumbs/IMG_2840.JPG", full: "img/gallery/IMG_2840.JPG", caption: "" },
    { thumb: "img/gallery/thumbs/IMG_2841.JPG", full: "img/gallery/IMG_2841.JPG", caption: "" },
    { thumb: "img/gallery/thumbs/IMG_2842.JPG", full: "img/gallery/IMG_2842.JPG", caption: "" },
    { thumb: "img/gallery/thumbs/IMG_2843.JPG", full: "img/gallery/IMG_2843.JPG", caption: "" },
    { thumb: "img/gallery/thumbs/IMG_2844.JPG", full: "img/gallery/IMG_2844.JPG", caption: "" },
  ],

  // ==================== 时间线条目 ====================
  moments: [

    // —— 采访 ——
    {
      id: "interview-fashion",
      date: "2024-07-01",
      title: "风尚志采访",
      description: "风尚志杂志采访与拍摄",
      category: "采访",
      images: [],
      links: [
        { url: "http://t.cn/A6EyIdqe", label: "采访 1" },
        { url: "http://t.cn/A6nO1n78", label: "采访 2" },
        { url: "http://t.cn/A6nWDzVK", label: "采访 3" },
        { url: "http://t.cn/A683U7Ag", label: "视频" },
        { url: "http://t.cn/A683LWu1", label: "照片" }
      ],
      icon: "📰"
    },
    {
      id: "interview-spotlight",
      date: "2024-07-01",
      title: "聚光采访",
      description: "聚光杂志采访文字版 + 视频版 + 照片",
      category: "采访",
      images: [],
      links: [
        { url: "http://t.cn/A6Ey9z3A", label: "采访文字版" },
        { url: "http://t.cn/A6Ey9z37", label: "采访视频版" },
        { url: "http://t.cn/A6RZnBqx", label: "视频 1" },
        { url: "http://t.cn/A6R5kq50", label: "视频 2" },
        { url: "http://t.cn/A6RLXWSO", label: "照片 1" },
        { url: "http://t.cn/A6RLWFIw", label: "照片 2" },
        { url: "http://t.cn/A6Eihy76", label: "照片 3" }
      ],
      icon: "📸"
    },
    {
      id: "interview-xulaoshi",
      date: "2024-07-01",
      title: "深夜徐老师采访",
      category: "采访",
      images: [],
      links: [{ url: "http://t.cn/A6RcUnDs", label: "采访链接" }],
      icon: "🌙"
    },
    {
      id: "interview-chaoyouliao",
      date: "2024-07-01",
      title: "超有料采访",
      category: "采访",
      images: [],
      links: [{ url: "http://t.cn/A6Ey9z3L", label: "采访链接" }],
      icon: "🎤"
    },
    {
      id: "interview-jiang",
      date: "2024-07-01",
      title: "小江单人采访合集",
      description: "小江的三则单人采访",
      category: "采访",
      images: [],
      links: [
        { url: "http://t.cn/A6Ey9zus", label: "采访一" },
        { url: "http://t.cn/A6Ey9zuF", label: "采访二" },
        { url: "http://t.cn/A63vG0I6", label: "采访三" }
      ],
      icon: "🎙️"
    },

    // —— Q&A ——
    {
      id: "qa-collection",
      date: "2024-07-15",
      title: "情侣Q&A合集",
      description: "网易云问答 + 江南提问 + 南仔征集 + Q&A vlog",
      category: "Q&A",
      images: [],
      links: [
        { url: "http://t.cn/A6EDJjWj", label: "网易云🪂" },
        { url: "http://t.cn/A6Ey9z3h", label: "江南✨提问贴" },
        { url: "http://t.cn/A6E4PxbX", label: "南仔征集Q&A" },
        { url: "http://t.cn/A6EYzqEj", label: "Q&A vlog" }
      ],
      icon: "💌"
    },

    // —— 双人直播 ——
    {
      id: "live-251123-turkey",
      date: "2025-11-23",
      title: "小江土耳其ins直播（南仔出现）",
      description: "小江在土耳其的ins直播，南仔惊喜出现 🇹🇷",
      category: "双人直播",
      images: [],
      links: [{ url: "https://weibo.com/7664743621/5236139038605887", label: "微博录屏" }],
      icon: "🇹🇷"
    },
    {
      id: "live-250520-schwarzkopf",
      date: "2025-05-20",
      title: "520 施华蔻双人直播",
      description: "520特别直播活动 💕",
      category: "双人直播",
      images: [],
      links: [{ url: "https://weibo.com/7817829627/5168497073587460", label: "直播录屏" }],
      featured: true,
      icon: "💝"
    },
    {
      id: "live-250520-xianliao",
      date: "2025-05-20",
      title: "520 江南闲聊啵啵",
      description: "520当天的甜蜜闲聊直播",
      category: "双人直播",
      images: [],
      links: [{ url: "https://weibo.com/7817829627/5168536742002876", label: "直播录屏" }],
      icon: "💗"
    },
    {
      id: "live-250522-heipi",
      date: "2025-05-22",
      title: "黑皮闪现南南直播间",
      description: "小江突然出现在南南的直播间！",
      category: "双人直播",
      images: [],
      links: [{ url: "https://weibo.com/7817829627/5169198955236054", label: "直播录屏" }],
      icon: "⚡"
    },
    {
      id: "live-250414-hanbao",
      date: "2025-04-14",
      title: "🍔 双人直播",
      category: "双人直播",
      images: [],
      links: [{ url: "http://t.cn/A6ghbDHv", label: "直播录屏" }],
      icon: "🍔"
    },
    {
      id: "live-250209-xianliao",
      date: "2025-02-09",
      title: "闲聊啵啵",
      category: "双人直播",
      images: [],
      links: [{ url: "http://t.cn/A63sSqMt", label: "直播录屏" }],
      icon: "💬"
    },
    {
      id: "live-241211-rc",
      date: "2024-12-11",
      title: "RC 双人直播",
      category: "双人直播",
      images: [],
      links: [{ url: "http://t.cn/A6mnhRz3", label: "直播录屏" }],
      icon: "🎬"
    },
    {
      id: "live-241128-lianmai",
      date: "2024-11-28",
      title: "南南连麦江子",
      category: "双人直播",
      images: [],
      links: [
        { url: "http://t.cn/A6mtUEB8", label: "Part 1" },
        { url: "http://t.cn/A6mtygPB", label: "Part 2" },
        { url: "http://t.cn/A6mtygP1", label: "Part 3" }
      ],
      icon: "📞"
    },
    {
      id: "live-241025-200days",
      date: "2024-10-25",
      title: "200天 🍠 直播cut",
      description: "在一起200天的特别直播 💖",
      category: "双人直播",
      images: [],
      links: [{ url: "http://t.cn/A6nUBY5s", label: "直播cut" }],
      featured: true,
      icon: "💖"
    },
    {
      id: "live-240929-bszx",
      date: "2024-09-29",
      title: "毕生之研专场",
      category: "双人直播",
      images: [],
      links: [{ url: "http://t.cn/A6EMUxlF", label: "直播录屏" }],
      icon: "🧪"
    },
    {
      id: "live-240903-xianliao",
      date: "2024-09-03",
      title: "闲聊啵啵",
      category: "双人直播",
      images: [],
      links: [{ url: "http://t.cn/A6RpO36u", label: "直播录屏" }],
      icon: "💬"
    },
    {
      id: "live-240805-xianliao",
      date: "2024-08-05",
      title: "闲聊啵啵",
      category: "双人直播",
      images: [],
      links: [{ url: "http://t.cn/A68jXyxM", label: "直播录屏" }],
      icon: "💬"
    },
    {
      id: "live-240804-blankme",
      date: "2024-08-04",
      title: "Blankme 双人直播",
      category: "双人直播",
      images: [],
      links: [{ url: "http://t.cn/A68jfXzt", label: "直播录屏" }],
      icon: "💄"
    },
    {
      id: "live-240802-panasonic",
      date: "2024-08-02",
      title: "松下双人直播",
      category: "双人直播",
      images: [],
      links: [{ url: "http://t.cn/A680NBEe", label: "直播录屏" }],
      icon: "📹"
    },
    {
      id: "live-240728-nan",
      date: "2024-07-28",
      title: "南仔啵啵间",
      description: "双人直播部分",
      category: "双人直播",
      images: [],
      links: [
        { url: "http://t.cn/A6Ey9z3v", label: "部分cut" },
        { url: "https://www.douyin.com/", label: "🫘电子榨菜（完整版）" }
      ],
      icon: "🎙️"
    },
    {
      id: "live-240719-bszx",
      date: "2024-07-19",
      title: "毕生之研双人直播 + 扫楼",
      description: "首次双人商务直播，还有扫楼🍬合集！",
      category: "双人直播",
      images: [],
      links: [
        { url: "http://t.cn/A68wRBf1", label: "直播 Part 1" },
        { url: "http://t.cn/A68wRJVF", label: "直播 Part 2" },
        { url: "http://t.cn/A6Ey9z3Z", label: "扫楼🍬合集" }
      ],
      featured: true,
      icon: "🎉"
    },

    // —— 单人直播 ——
    {
      id: "solo-live-260119-nan",
      date: "2026-01-19",
      title: "南南🍠闲聊直播",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7863807387/5256606989942897", label: "直播录屏" }],
      icon: "💬"
    },
    {
      id: "solo-live-251224-nan",
      date: "2025-12-24",
      title: "南南🍠闲聊直播",
      description: "圣诞前夕 🎄",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7863807387/5247559241041660", label: "直播录屏" }],
      icon: "🎄"
    },
    {
      id: "solo-live-251210-nan",
      date: "2025-12-10",
      title: "南南🍠闲聊直播录屏",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7863807387/5242477579862541", label: "直播录屏" }],
      icon: "💬"
    },
    {
      id: "solo-live-251129-nan",
      date: "2025-11-29",
      title: "南南🍠直播",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7863807387/5238470001040591", label: "直播录屏" }],
      icon: "📱"
    },
    {
      id: "solo-live-251111-nan",
      date: "2025-11-11",
      title: "南南🍠闲聊直播",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7863807387/5231940161506220", label: "直播录屏" }],
      icon: "💬"
    },
    {
      id: "solo-live-251104-nan",
      date: "2025-11-04",
      title: "南南🍠直播",
      category: "单人直播",
      links: [{ url: "https://weibo.com/3741551490/5229407977343310", label: "直播录屏" }],
      icon: "📱"
    },
    {
      id: "solo-live-251028-nan-sanya",
      date: "2025-10-28",
      title: "南南🍠三亚直播 + 红毯直播",
      category: "单人直播",
      links: [
        { url: "https://weibo.com/3741551490/5226794890299737", label: "三亚直播" },
        { url: "https://weibo.com/7863807387/5226766933427491", label: "红毯直播" }
      ],
      icon: "🏖️"
    },
    {
      id: "solo-live-251026-figaro",
      date: "2025-10-26",
      title: "费加罗直播",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7863807387/5226080998788871", label: "直播录屏" }],
      icon: "👗"
    },
    {
      id: "solo-live-250922-nan",
      date: "2025-09-22",
      title: "南南🍠直播",
      category: "单人直播",
      links: [{ url: "https://weibo.com/3741551490/5214000113782764", label: "直播录屏" }],
      icon: "📱"
    },
    {
      id: "solo-live-250908-nan-lynk",
      date: "2025-09-08",
      title: "南南做客领克直播间",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7863807387/5208684138597221", label: "直播录屏" }],
      icon: "🚗"
    },
    {
      id: "solo-live-250831-jiang-fitness",
      date: "2025-08-31",
      title: "小江健身突击直播",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7817829627/5205819303398850", label: "直播录屏" }],
      icon: "💪"
    },
    {
      id: "solo-live-250723-nan",
      date: "2025-07-23",
      title: "南南「收纳大师」聊天啵啵",
      description: "后64分钟精华",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7817829627/5191720142373213", label: "直播录屏" }],
      icon: "🏠"
    },
    {
      id: "solo-live-250619-nan-birthday",
      date: "2025-06-19",
      title: "南南生日直播 🎂",
      description: "南南的生日特别直播！",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7817829627/5179343590134342", label: "直播录屏" }],
      featured: true,
      icon: "🎂"
    },
    {
      id: "solo-live-250613-jiang",
      date: "2025-06-13",
      title: "江星熠首次🫘直播",
      description: "小江的首次抖音直播！",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7863807387/5177256552956231", label: "录屏链接" }],
      featured: true,
      icon: "🎬"
    },
    {
      id: "solo-live-250611-nan-makeup",
      date: "2025-06-11",
      title: "南南直播化妆录屏",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7863807387/5176352958844438", label: "录屏链接" }],
      icon: "💄"
    },
    {
      id: "solo-live-250602-nan",
      date: "2025-06-02",
      title: "南仔直播",
      category: "单人直播",
      links: [{ url: "https://weibo.com/7817829627/5173235076827698", label: "直播录屏" }],
      icon: "🎙️"
    },
    {
      id: "solo-live-250128-nan",
      date: "2025-01-28",
      title: "南南除夕啵啵",
      category: "单人直播",
      links: [{ url: "http://t.cn/A61wCroV", label: "直播录屏" }],
      icon: "🧧"
    },
    {
      id: "solo-live-241226-nan",
      date: "2024-12-26",
      title: "南仔直播 + 帮小江化妆",
      description: "帮小江化妆 & 双人比心 ❤️",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6uSd4No", label: "直播录屏" },
        { url: "http://t.cn/A6uSd4NK", label: "帮小江化妆" },
        { url: "http://t.cn/A6uSd4N0", label: "双人比心" }
      ],
      icon: "💄"
    },
    {
      id: "solo-live-241221-nan",
      date: "2024-12-21",
      title: "南南🎺啵啵",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6uAT3QM", label: "直播录屏" }],
      icon: "🎺"
    },
    {
      id: "solo-live-241208-nan",
      date: "2024-12-08",
      title: "南南预热啵啵",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6mjuOts", label: "直播录屏" }],
      icon: "🎙️"
    },
    {
      id: "solo-live-241128-nan-vivo",
      date: "2024-11-28",
      title: "南南vivo啵啵",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6mtbj4Q", label: "直播录屏" }],
      icon: "📱"
    },
    {
      id: "solo-live-241115-nan",
      date: "2024-11-15",
      title: "南南闲聊啵啵",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6nkOdOH", label: "完整版" },
        { url: "http://t.cn/A6nkOdOT", label: "cue小江版" }
      ],
      icon: "💬"
    },
    {
      id: "solo-live-241111-nan",
      date: "2024-11-11",
      title: "南南闲聊啵啵",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6n8tvpn", label: "完整版" },
        { url: "http://t.cn/A6n8tc8U", label: "弹幕版" },
        { url: "http://t.cn/A6nRHXHf", label: "cue小江版" }
      ],
      icon: "💬"
    },
    {
      id: "solo-live-241110-nan",
      date: "2024-11-10",
      title: "南南直播间",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6nT6WyM", label: "直播录屏" }],
      icon: "🎙️"
    },
    {
      id: "solo-live-241109-nan",
      date: "2024-11-09",
      title: "南南预热直播（小江声音出现）",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6njQBgG", label: "完整版" },
        { url: "http://t.cn/A6nj8AoZ", label: "小江声音part" }
      ],
      icon: "🎙️"
    },
    {
      id: "solo-live-241025-nan-xhs",
      date: "2024-10-25",
      title: "南南🍠首播",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6nVWirk", label: "Part 1" },
        { url: "http://t.cn/A6nVWidv", label: "Part 2" },
        { url: "http://t.cn/A6nVWidP", label: "Part 3" }
      ],
      icon: "📱"
    },
    {
      id: "solo-live-241024-nan",
      date: "2024-10-24",
      title: "南南预热直播",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6nbxEAO", label: "直播录屏" }],
      icon: "🎙️"
    },
    {
      id: "solo-live-241023-nan",
      date: "2024-10-23",
      title: "南南预热直播",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6nbxEA0", label: "Part 1" },
        { url: "http://t.cn/A6nbxsI1", label: "Part 2" }
      ],
      icon: "🎙️"
    },
    {
      id: "solo-live-241021-nan",
      date: "2024-10-21",
      title: "南南直播间",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6n7neIq", label: "Part 1" },
        { url: "http://t.cn/A6n7neI4", label: "Part 2" },
        { url: "http://t.cn/A6n7neIb", label: "Part 3" },
        { url: "http://t.cn/A6n7neIy", label: "Part 4" },
        { url: "http://t.cn/A6n7neIL", label: "Part 5" },
        { url: "http://t.cn/A6n7neIG", label: "Part 6" }
      ],
      icon: "🎙️"
    },
    {
      id: "solo-live-241020-nan",
      date: "2024-10-20",
      title: "南南预热直播",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6nPCCPf", label: "Part 1" },
        { url: "http://t.cn/A6nPCCPI", label: "Part 2" }
      ],
      icon: "🎙️"
    },
    {
      id: "solo-live-241019-nan",
      date: "2024-10-19",
      title: "南南预热直播",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6EsC6TJ", label: "Part 1" },
        { url: "http://t.cn/A6EsC6Ta", label: "Part 2" }
      ],
      icon: "🎙️"
    },
    {
      id: "solo-live-241018-nan",
      date: "2024-10-18",
      title: "南南闲聊啵啵",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6EDJjWY", label: "Part 1" },
        { url: "http://t.cn/A6EDJjWQ", label: "Part 2" }
      ],
      icon: "💬"
    },
    {
      id: "solo-live-241010-nan-nivea",
      date: "2024-10-10",
      title: "南南妮维雅直播",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6EQa9t0", label: "直播录屏" }],
      icon: "🧴"
    },
    {
      id: "solo-live-240926-nan",
      date: "2024-09-26",
      title: "南南直播间",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6E5TZPN", label: "Part 1" },
        { url: "http://t.cn/A6E5TZP9", label: "Part 2" },
        { url: "http://t.cn/A6E5TZPp", label: "Part 3" },
        { url: "http://t.cn/A6E5kdg9", label: "Part 4" },
        { url: "http://t.cn/A6E5kdgK", label: "Part 5" },
        { url: "http://t.cn/A6E5kdgo", label: "Part 6" }
      ],
      icon: "🎙️"
    },
    {
      id: "solo-live-240925-nan",
      date: "2024-09-25",
      title: "南南预热直播",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6EGXrPb", label: "Part 1" },
        { url: "http://t.cn/A6EGXrP4", label: "Part 2" }
      ],
      icon: "🎙️"
    },
    {
      id: "solo-live-240921-jiang-ig",
      date: "2024-09-21",
      title: "小江IG闲聊啵啵",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6Ey9z3U", label: "Part 1" },
        { url: "http://t.cn/A6EGSFmm", label: "Part 2" }
      ],
      icon: "🎙️"
    },
    {
      id: "solo-live-240920-nan-chantecaille",
      date: "2024-09-20",
      title: "南南香缇卡直播",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A6EUYNHR", label: "Part 1" },
        { url: "http://t.cn/A6EUYNH8", label: "Part 2" }
      ],
      icon: "✨"
    },
    {
      id: "solo-live-240914-nan",
      date: "2024-09-14",
      title: "南南底妆教程直播",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6RgnuDQ", label: "直播录屏" }],
      icon: "💄"
    },
    {
      id: "solo-live-240904-nan-el",
      date: "2024-09-04",
      title: "南南雅诗兰黛直播",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6ROC3aa", label: "直播录屏" }],
      icon: "✨"
    },
    {
      id: "solo-live-240830-nan",
      date: "2024-08-30",
      title: "南南闲聊啵啵",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6RaJXvo", label: "直播录屏" }],
      icon: "💬"
    },
    {
      id: "solo-live-240829-nan-ck",
      date: "2024-08-29",
      title: "南南C&K直播",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6RiFFWM", label: "直播录屏" }],
      icon: "👗"
    },
    {
      id: "solo-live-240814-nan",
      date: "2024-08-14",
      title: "南仔闲聊啵啵",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6Ey9z32", label: "直播录屏" }],
      icon: "💬"
    },
    {
      id: "solo-live-240806-jiang-dr",
      date: "2024-08-06",
      title: "小江瑷尔博士直播",
      category: "单人直播",
      links: [
        { url: "http://t.cn/A68QA8Tb", label: "Part 1" },
        { url: "http://t.cn/A68QZD8L", label: "Part 2" }
      ],
      icon: "🧪"
    },
    {
      id: "solo-live-240725-nan",
      date: "2024-07-25",
      title: "南仔闲聊啵啵",
      category: "单人直播",
      links: [{ url: "http://t.cn/A6Ey9z34", label: "直播录屏" }],
      icon: "💬"
    },

    // —— 节目 ——
    {
      id: "watchalong-240609-xql",
      date: "2024-06-09",
      title: "小情侣陪看",
      category: "节目",
      images: [],
      links: [
        { url: "http://t.cn/A6Ey9z3g", label: "Part 1" },
        { url: "http://t.cn/A6Ey9z3D", label: "Part 2" },
        { url: "http://t.cn/A6Ey9z3r", label: "Part 3" },
        { url: "http://t.cn/A6Ey9z3k", label: "Part 4" }
      ],
      icon: "💑"
    },
    {
      id: "watchalong-240531-nan",
      date: "2024-05-31",
      title: "南仔陪看",
      category: "节目",
      images: [],
      links: [
        { url: "http://t.cn/A6QakW3U", label: "Part 1" },
        { url: "http://t.cn/A6QakW3G", label: "Part 2" },
        { url: "http://t.cn/A6QakW3b", label: "Part 3" }
      ],
      icon: "🎧"
    },
    {
      id: "watchalong-240530-jiang",
      date: "2024-05-30",
      title: "小江陪看",
      category: "节目",
      images: [],
      links: [
        { url: "http://t.cn/A6Ey9z3P", label: "Part 1" },
        { url: "http://t.cn/A6Ey9z3y", label: "Part 2" },
        { url: "http://t.cn/A6Ey9z3d", label: "Part 3" },
        { url: "http://t.cn/A6QakW34", label: "Part 4" }
      ],
      icon: "🎧"
    },
    {
      id: "reaction-xql",
      date: "2024-07-01",
      title: "XQL Reaction 合集",
      description: "单人版 + 双人版节目Reaction",
      category: "节目",
      images: [],
      links: [
        { url: "http://t.cn/A6nEAm0S", label: "单人版" },
        { url: "http://t.cn/A6n8cvEb", label: "双人版 1" },
        { url: "http://t.cn/A6mtGIEh", label: "双人版 2" }
      ],
      icon: "👀"
    },
    {
      id: "show-cuts",
      date: "2024-06-30",
      title: "节目 CUT 合集（第1-10期）",
      description: "第一期到第十期的节目cut汇总，含加更花絮、嘉宾reaction等",
      category: "节目",
      images: [],
      links: [
        { url: "http://t.cn/A6E6CQFS", label: "第一期" },
        { url: "http://t.cn/A6E6CQF9", label: "第二期" },
        { url: "http://t.cn/A6ECcp1N", label: "第三期" },
        { url: "http://t.cn/A6E03YCA", label: "第四期 1" },
        { url: "http://t.cn/A6EQa9tW", label: "第四期 2" },
        { url: "http://t.cn/A6En2o0Q", label: "第五期" },
        { url: "http://t.cn/A6EBp2pw", label: "第六期" },
        { url: "http://t.cn/A6EsC6TX", label: "第七期 1" },
        { url: "http://t.cn/A6nvauAI", label: "第七期 2" },
        { url: "http://t.cn/A6nMtoVV", label: "第八期" },
        { url: "http://t.cn/A6nxTePJ", label: "第八期加更花絮" },
        { url: "http://t.cn/A6nSatoX", label: "第九期" },
        { url: "http://t.cn/A6nNa74I", label: "第十期" },
        { url: "http://t.cn/A6nlKy67", label: "超长花絮" },
        { url: "http://t.cn/A6nSaoSy", label: "嘉宾 reaction" }
      ],
      icon: "📺"
    },
    {
      id: "show-review",
      date: "2024-07-01",
      title: "节目复盘",
      description: "详细复盘分析（一、二上、二下）",
      category: "节目",
      images: [],
      links: [
        { url: "http://t.cn/A6nCnbkG", label: "复盘一" },
        { url: "http://t.cn/A6nCnbk4", label: "复盘二（上）" },
        { url: "http://t.cn/A6nlK55C", label: "复盘二（下）" }
      ],
      icon: "📝"
    },

    // —— Vlog ——
    {
      id: "vlog-redcarpet",
      date: "2025-03-31",
      title: "🍠 红毯",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6ghbDHP", label: "视频链接" }],
      icon: "🌟"
    },
    {
      id: "vlog-bszy-moli",
      date: "2025-02-15",
      title: "毕生之研 & 茉莉奶白",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A61U3V6B", label: "链接" }],
      icon: "🧋"
    },
    {
      id: "vlog-bszy-store",
      date: "2024-12-28",
      title: "毕生之研一日店长",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6ucQNjj", label: "链接" }],
      icon: "🏪"
    },
    {
      id: "vlog-ski",
      date: "2024-12-15",
      title: "崇礼滑雪 🎿",
      description: "一起滑雪的冬日浪漫",
      category: "Vlog",
      images: [],
      links: [
        { url: "http://t.cn/A6uSdSNj", label: "视频 1" },
        { url: "http://t.cn/A6uSd4NC", label: "视频 2" }
      ],
      icon: "⛷️"
    },
    {
      id: "vlog-birthday",
      date: "2024-11-23",
      title: "生日 plog",
      description: "小江的生日记录",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6mtbtjn", label: "plog 链接" }],
      icon: "🎂"
    },
    {
      id: "vlog-makeup",
      date: "2024-11-01",
      title: "小江解说化妆",
      description: "小江帮你化妆 💄",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6mtbtj1", label: "视频链接" }],
      icon: "💄"
    },
    {
      id: "vlog-yujiawei-concert",
      date: "2024-10-19",
      title: "余佳运演唱会 vlog",
      description: "一起去看演唱会！超多偶遇图～",
      category: "Vlog",
      images: [],
      links: [
        { url: "http://t.cn/A6nVWirD", label: "vlog" },
        { url: "http://t.cn/A6EsC6TS", label: "偶遇 1" },
        { url: "http://t.cn/A6EsC6TO", label: "偶遇 2" },
        { url: "http://t.cn/A6EsC6Tx", label: "偶遇 3" },
        { url: "http://t.cn/A6EsC6TM", label: "偶遇 4" },
        { url: "http://t.cn/A6EsC6TW", label: "偶遇 5" },
        { url: "http://t.cn/A6EsC6TT", label: "偶遇 6" }
      ],
      icon: "🎵"
    },
    {
      id: "vlog-shanghai-fashion-week",
      date: "2024-10-13",
      title: "上海时装周",
      description: "一日店长 + La Fine 看秀 + Moromoro 走秀",
      category: "Vlog",
      images: [],
      links: [
        { url: "http://t.cn/A6n79UGT", label: "时装周 vlog" },
        { url: "http://t.cn/A6En2o0R", label: "一日店长 1" },
        { url: "http://t.cn/A6En2o0m", label: "看秀 1" },
        { url: "http://t.cn/A6En2o0n", label: "看秀 2" },
        { url: "http://t.cn/A6E3bntR", label: "走秀 1" },
        { url: "http://t.cn/A6E3bntE", label: "走秀 2" }
      ],
      icon: "👔"
    },
    {
      id: "vlog-beijing-universal",
      date: "2024-10-01",
      title: "北京环球影城 vlog",
      description: "🍬 环球影城约会！",
      category: "Vlog",
      images: [],
      links: [
        { url: "http://t.cn/A6nnQGIt", label: "vlog" },
        { url: "http://t.cn/A6ECcp10", label: "偶遇 1" },
        { url: "http://t.cn/A6ECcp1W", label: "偶遇 2" }
      ],
      icon: "🌍"
    },
    {
      id: "vlog-aranya",
      date: "2024-09-25",
      title: "阿那亚 vlog",
      description: "🍬 阿那亚浪漫之旅",
      category: "Vlog",
      images: [],
      links: [
        { url: "http://t.cn/A6nPEFzM", label: "vlog" },
        { url: "http://t.cn/A6EKv5oG", label: "偶遇 1" },
        { url: "http://t.cn/A6EKv5ot", label: "偶遇 2" }
      ],
      icon: "🌊"
    },
    {
      id: "vlog-thailand",
      date: "2024-09-20",
      title: "🇹🇭 泰兰德 vlog",
      description: "🍬 泰国甜蜜旅行！超多偶遇图～",
      category: "Vlog",
      images: [],
      links: [
        { url: "http://t.cn/A6ESbBF3", label: "vlog 1" },
        { url: "http://t.cn/A6nP31CK", label: "vlog 2" },
        { url: "http://t.cn/A6ECVjug", label: "偶遇 1" },
        { url: "http://t.cn/A6R2TmY1", label: "偶遇 2" },
        { url: "http://t.cn/A6ECVjuk", label: "偶遇 3" }
      ],
      icon: "🏖️"
    },
    {
      id: "vlog-qixi-disney",
      date: "2024-08-10",
      title: "七夕迪士尼合拍",
      description: "🍬 七夕在迪士尼的甜蜜约会！",
      category: "Vlog",
      images: [],
      links: [
        { url: "http://t.cn/A6nP31CN", label: "合拍 1" },
        { url: "http://t.cn/A6nP1LTi", label: "合拍 2" },
        { url: "http://t.cn/A6EUQSqL", label: "偶遇 1" },
        { url: "http://t.cn/A6nf501F", label: "偶遇 2" }
      ],
      featured: true,
      icon: "🏰"
    },
    {
      id: "vlog-couple-life",
      date: "2024-08-01",
      title: "🐧 情侣生活 vlog",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6nkWc14", label: "vlog 链接" }],
      icon: "🏠"
    },
    {
      id: "vlog-singing",
      date: "2024-08-01",
      title: "录歌 vlog",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6ECMxLo", label: "vlog 链接" }],
      icon: "🎵"
    },
    {
      id: "vlog-tasaki",
      date: "2024-09-01",
      title: "Tasaki vlog",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6nP31C9", label: "vlog 链接" }],
      icon: "💎"
    },
    {
      id: "vlog-chengdu",
      date: "2024-08-15",
      title: "成都 vlog",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6ECMxL9", label: "vlog 链接" }],
      icon: "🐼"
    },
    {
      id: "vlog-100days",
      date: "2024-09-01",
      title: "100天 vlog",
      description: "纪念在一起100天 💯",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6ECMxLS", label: "vlog 链接" }],
      featured: true,
      icon: "💯"
    },
    {
      id: "vlog-longdistance",
      date: "2024-09-01",
      title: "限时异地恋 vlog",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6ECMkxd", label: "vlog 链接" }],
      icon: "📱"
    },
    {
      id: "vlog-cycling",
      date: "2024-09-01",
      title: "骑行 vlog",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6nPEFzx", label: "vlog 链接" }],
      icon: "🚲"
    },
    {
      id: "vlog-bath",
      date: "2024-09-01",
      title: "搓澡 vlog",
      description: "搞笑日常 🛁",
      category: "Vlog",
      images: [],
      links: [{ url: "http://t.cn/A6R2TmY1", label: "vlog 链接" }],
      icon: "🛁"
    },

    // —— 二创 ——
    {
      id: "fanart-photos",
      date: "2024-07-15",
      title: "江子 & 南南合照合集",
      category: "二创",
      images: [],
      links: [
        { url: "http://t.cn/A6n7mqQU", label: "照片 1" },
        { url: "http://t.cn/A6n7mqQy", label: "照片 2" }
      ],
      icon: "📷"
    },
    {
      id: "fanart-wallpaper",
      date: "2024-07-15",
      title: "壁纸 @超会嗑",
      description: "粉丝制作的精美壁纸",
      category: "二创",
      images: [],
      links: [{ url: "http://t.cn/A6QasqFU", label: "壁纸链接" }],
      icon: "🖼️"
    },
    {
      id: "fanart-emoji",
      date: "2024-07-15",
      title: "表情包合集",
      category: "二创",
      images: [],
      links: [{ url: "http://t.cn/A6EeAS1g", label: "表情包链接" }],
      icon: "😆"
    },
    {
      id: "fanart-qingtou",
      date: "2024-07-15",
      title: "情侣头像合集",
      category: "二创",
      images: [],
      links: [
        { url: "http://t.cn/A6nf501e", label: "情头 1" },
        { url: "http://t.cn/A6E44HTd", label: "情头 2" },
        { url: "http://t.cn/A6E44HTe", label: "情头 3" }
      ],
      icon: "💑"
    },
    {
      id: "fanart-gifts-map",
      date: "2024-08-01",
      title: "江南✨粉丝创作合集",
      description: "七夕礼物、足迹地图、周边、画作、六个月纪念、挂件、花花和信……粉丝的爱 💕",
      category: "二创",
      images: [],
      links: [
        { url: "http://t.cn/A6E44HTD", label: "七夕🎁" },
        { url: "http://t.cn/A6E44HTk", label: "足迹👣地图" },
        { url: "http://t.cn/A6EXDz8X", label: "xql周边" },
        { url: "http://t.cn/A6EXkNS3", label: "xql画" },
        { url: "http://t.cn/A6EYrbae", label: "六个月纪念" },
        { url: "http://t.cn/A6E3bnt8", label: "花花和信" }
      ],
      icon: "🎨"
    },
    {
      id: "fanart-birthday-25",
      date: "2024-11-23",
      title: "小江25岁生日应援",
      description: "🎂 杭州大屏 + 台北大屏 + 生日贺视频",
      category: "二创",
      images: [],
      links: [
        { url: "http://t.cn/A6nkWc1b", label: "杭州大屏" },
        { url: "http://t.cn/A6nkWc1G", label: "台北大屏" },
        { url: "http://t.cn/A6mtbtj3", label: "1123生贺视频" }
      ],
      featured: true,
      icon: "🎂"
    },
    {
      id: "fanart-city-guides",
      date: "2024-08-15",
      title: "向忆江南安利我的城市系列",
      description: "粉丝们向江南安利各自的城市：中山、潮汕、湛江、广西、台北、洛阳……遍布全国各地的爱 💕",
      category: "二创",
      images: [],
      links: [
        { url: "http://t.cn/A6EXeu1B", label: "📍广东中山" },
        { url: "http://t.cn/A6EXeu1e", label: "📍广东潮汕" },
        { url: "http://t.cn/A6EaY4jS", label: "📍广东湛江" },
        { url: "http://t.cn/A6Epvb9U", label: "📍广西" },
        { url: "http://t.cn/A6EXeu1d", label: "📍台湾台北" },
        { url: "http://t.cn/A6EXeu1u", label: "📍河南洛阳" },
        { url: "http://t.cn/A6EXeu1r", label: "📍浙江温州" },
        { url: "http://t.cn/A6EXeu1g", label: "📍江苏扬州" },
        { url: "http://t.cn/A6ECcp1O", label: "📍湖南长沙" },
        { url: "http://t.cn/A6El6ZY1", label: "📍北京" }
      ],
      icon: "🗺️"
    },

    // —— 命中注定 ——
    {
      id: "destiny-collection",
      date: "2024-06-01",
      title: "♐️♊️ 命中注定合集",
      description: "节目开局座位1314、跨年夜直线距离百米、平行世界相遇、七年命定相遇……一切都是命中注定 ✨",
      category: "命中注定",
      images: [],
      links: [
        { url: "http://t.cn/A6E44HTg", label: "座位1314" },
        { url: "http://t.cn/A6E44HHP", label: "24跨年夜百米距离" },
        { url: "http://t.cn/A6E44HTr", label: "平行世界相遇" },
        { url: "http://t.cn/A6EQa9tO", label: "七年命定相遇" },
        { url: "http://t.cn/A6E3Gtdo", label: "新天地命运起点" },
        { url: "http://t.cn/A6n8dJeL", label: "23年度视频总结" }
      ],
      featured: true,
      icon: "💫"
    },

    // —— 情侣款 ——
    {
      id: "couple-items",
      date: "2024-07-01",
      title: "情侣款合集",
      category: "情侣款",
      images: [],
      links: [
        { url: "http://t.cn/A6EynuES", label: "情侣款 1" },
        { url: "http://t.cn/A6nf501g", label: "情侣款 2" }
      ],
      icon: "👫"
    },

    // —— 汇总 ——
    {
      id: "summary-71",
      date: "2024-07-01",
      title: "7.1前🍬汇总贴",
      description: "前期所有糖点的汇总整理",
      category: "汇总",
      images: [],
      links: [{ url: "http://t.cn/A6QvNea3", label: "汇总链接" }],
      icon: "🍬"
    }
  ],

  // ==================== 粉丝留言板 ====================
  guestbook: [
    {
      name: "小忆江南",
      date: "2025-06-15",
      message: "每天都要来看看江南的🍬！太甜了～ 💕",
      avatar: "🌸"
    },
    {
      name: "甜度满分",
      date: "2025-06-14",
      message: "感谢整理！好多直播补档可以慢慢看了 😭💗",
      avatar: "🍬"
    },
    {
      name: "永远的神",
      date: "2025-06-13",
      message: "小江土耳其直播里南仔出现那一刻我哭了……这就是真爱吧！",
      avatar: "✨"
    },
    {
      name: "守护忆江南",
      date: "2025-06-12",
      message: "祝忆江南越来越好！期待更多双人直播 💝",
      avatar: "💖"
    },
    {
      name: "吃糖大户",
      date: "2025-06-10",
      message: "命中注定那个合集我反复看了十遍！！！太绝了 🥹",
      avatar: "😭"
    },
    {
      name: "甜甜甜",
      date: "2025-06-08",
      message: "520那两场直播真的甜到爆炸 🎆 忆江南yyds！",
      avatar: "🎆"
    }
  ]
};
