# NOTICE —— 第三方代码、数据与资源归因

本项目（`oss-blog`）基于以下开源项目与资源二次开发。依照各上游许可证要求，在此列明来源、作者、链接与许可证。

## 1. 上游项目

| 名称 | 来源 | 许可证 | 用途 |
| --- | --- | --- | --- |
| Ghost | https://github.com/TryGhost/Ghost | MIT | 博客运行基线（后端内容、认证、标签、会员、评论、搜索） |
| Source 主题 | https://github.com/TryGhost/Source | MIT | 自定义主题 `oss-blog-theme` 的代码基线 |

## 2. 主题内置第三方资源

| 资源 | 来源 | 许可证 |
| --- | --- | --- |
| Inter 字体 | https://rsms.me/inter/ | SIL Open Font License 1.1 |
| EB Garamond 字体 | https://github.com/octaviopardo/EBGaramond12 | SIL Open Font License 1.1 |
| JetBrains Mono 字体 | https://github.com/JetBrains/JetBrainsMono | SIL Open Font License 1.1 |
| PhotoSwipe（灯箱） | https://photoswipe.com/ | MIT |
| imagesloaded | https://github.com/desandro/imagesloaded | MIT |
| 书签图标（bookmark） | Heroicons https://github.com/tailwindlabs/heroicons | MIT |

## 3. 图片资源与数据/模型

### 图片资源

| 资源 | 来源 | 许可证 | 用途 |
| --- | --- | --- | --- |
| default-skin.png / default-skin.svg | PhotoSwipe 默认皮肤 | MIT | 文章图片灯箱默认样式 |
| preloader.gif | Source 主题内置 | MIT（随 Source） | 主题加载动画 |

演示文章内容均为本地录入的测试数据，多采用无封面图，未引入外部图片。

### 数据与模型

- 演示数据（文章、标签、会员账号、评论）均为本地测试数据，非第三方数据集。
- 本项目**未使用**任何 AI / 机器学习模型，无需相关归因。

## 4. 二次开发声明

- 本项目保留 Ghost 与 Source 主题的原始 `LICENSE`（MIT）。
- `theme/oss-blog-theme` 是对 `TryGhost/Source` 的 Fork 与修改，`package.json` 中的 `name`、`version`、`description` 已更新以区别于上游，未将上游成果冒充原创。
- 新增的「稍后阅读（收藏）」功能（`bookmarks.js`、`bookmarks-drawer.hbs`、`bookmark.hbs` 及相关模板/CSS 改动）为本实验自主开发内容。
