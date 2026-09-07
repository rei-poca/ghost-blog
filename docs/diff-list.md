# 上游基线与本人版本差异清单

> 上游基线：`TryGhost/Source` 主题（MIT） + Ghost 6.59.0 核心（未修改）
> 本人版本：`oss-blog-theme`（Fork 自 Source，版本 `1.0.0-lab`）

## 1. 主题差异总览

| 模块 | 上游基线（Source） | 本次改动（oss-blog-theme） |
| --- | --- | --- |
| 主题标识 | `name: Source` | `name: oss-blog-theme`，`version: 1.0.0-lab` |
| 导航栏 | 搜索入口 + 下拉菜单 | 新增「稍后阅读」入口 + 收藏计数 badge |
| 文章卡片 | 标题/摘要/标签 | 右上角新增收藏按钮 |
| 文章详情页 | 标题/正文/评论区 | 标题下新增收藏按钮 |
| 收藏面板 | 无 | 新增右侧抽屉（列表/空状态/移除/清空/Esc 关闭） |
| 配色 | 黑白灰（默认强调色） | 马卡龙色调（玫瑰粉 `#F2A0B5` + 奶油白 `#FBF7F2`） |
| 中文翻译 | 官方 `zh.json` | 补充「稍后阅读/收藏」相关文案 |

## 2. 新增文件清单

| 文件 | 作用 |
| --- | --- |
| `assets/js/bookmarks.js` | 收藏核心逻辑（localStorage 读写、计数、事件委托） |
| `partials/bookmarks-drawer.hbs` | 稍后阅读抽屉模板 |
| `partials/icons/bookmark.hbs` | 书签图标（Heroicons，MIT） |
| `assets/built/` | 构建产物（`screen.css`、`source.js`，由 `pnpm build` 生成） |
| `dist/oss-blog-theme.zip` | 可安装主题压缩包 |

## 3. 修改文件清单

| 文件 | 改动 |
| --- | --- |
| `partials/components/navigation.hbs` | 加入书签入口与 badge |
| `partials/post-card.hbs` | 加入卡片收藏按钮 |
| `post.hbs` | 加入详情页收藏按钮 |
| `default.hbs` | 引入 `bookmarks-drawer` |
| `assets/css/screen.css` | 马卡龙配色 + 收藏/抽屉样式 |
| `locales/zh.json` | 补充中文文案 |

## 4. 未修改范围（来自上游，保持不变）

- Ghost 核心：认证、编辑器、内容、标签、会员、评论、搜索（未触碰）。
- 主题内置第三方库：PhotoSwipe（灯箱）、imagesloaded、字体（Inter / EB Garamond / JetBrains Mono），均保留原样并已在 NOTICE 归因。
