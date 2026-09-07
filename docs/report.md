# 实验报告：开源个人博客系统二次开发

> 课程：《开源软件与新技术》· 实验 01
> 基线：Ghost 6.59.0（`TryGhost/Ghost`）+ 官方 `Source` 主题
> 交付：自定义主题 `oss-blog-theme` + 自主功能「稍后阅读（收藏）」

## 一、需求

以成熟开源博客 Ghost 为基线，在**不改写底层能力**的前提下完成可见的二次开发，满足以下目标：

1. 建立可运行的本地基线（前台 + 管理端），支持文章、标签、会员、评论、搜索主流程。
2. 通过自定义主题完成**视觉 + 功能**的源码级改动，且能通过主题校验。
3. 完成至少 1 项**非换色类自主功能**（本项目选「增加文章收藏或稍后阅读列表」，为实验指导书明确列出的选项）。
4. 用 Git 的 Issue / 分支 / PR / Review / Commit / Tag 完整记录开发过程，形成可复现交付。

## 二、架构

- 后端：Ghost 6.59.0（Node.js 22 LTS，SQLite），负责认证、内容、标签、会员、评论、搜索。
- 前端：自定义主题 `oss-blog-theme`（Handlebars + CSS + 原生 JS，无框架），从官方 `Source` 主题 Fork 而来。
- 自主功能：收藏数据仅存浏览器 `localStorage`（键 `oss-blog-reading-list`），不触碰后端与数据库。

```
访客/会员 ──> 自定义主题 oss-blog-theme ──> Ghost 主题助手 ──> Content API ──> SQLite
管理员   ──> Ghost Admin ──> 内容与会员服务 ──> SQLite
稍后阅读 ──> localStorage（纯前端）
```

**修改边界**：仅在 `theme/`、`tests/`、`docs/`、根目录脚本与文档；`runtime/`（含数据库、密钥、日志）通过 `.gitignore` 排除，不提交。

## 三、实现

| 模块 | 实现方式 |
| --- | --- |
| 主题 Fork | `Source` → `oss-blog-theme`（`name`/`version`/`description` 已改，保留上游 LICENSE 与 NOTICE 归因） |
| 导航 | 新增「稍后阅读」入口 + 收藏计数 badge |
| 收藏入口 | 文章卡片右上角、文章详情页标题下各加一个收藏按钮 |
| 抽屉面板 | `bookmarks-drawer.hbs`：列表、空状态、单条移除、清空、Esc/遮罩关闭 |
| 核心逻辑 | `bookmarks.js`：localStorage 读写、计数刷新、事件委托 |
| 视觉 | 马卡龙色调（玫瑰粉 `#F2A0B5` + 奶油白 `#FBF7F2`） |
| 中文 | 补充 `zh.json` 中文翻译 |

关键文件：`assets/js/bookmarks.js`、`partials/bookmarks-drawer.hbs`、`partials/icons/bookmark.hbs`、`assets/css/screen.css`。

## 四、测试

- 功能/权限/界面/恢复四类共 **18 条**用例全部通过，见 [tests/acceptance.md](tests/acceptance.md)。
- 主题校验：`pnpm test`（gscan）输出 `Your theme is compatible with Ghost 6.x`。
- 重启恢复：`ghost stop → ghost start` 后文章、评论、主题均在。

## 五、问题与反思

1. **变量遮蔽 bug**：收藏点击处理器中局部变量 `toggle` 遮蔽了同名函数 `toggle`，导致 `TypeError: toggle is not a function`。修复方式：重命名为 `toggleBtn`。**反思**：局部变量命名应避开函数名，依赖浏览器 console 定位运行时错误比静态检查更快。
2. **进程管理**：Ghost 用 `node current/index.js` 直接启动会脱离 ghost-cli，导致 `ghost stop` 失效。**反思**：统一用 `ghost start` 启动，保证 CLI 生命周期可管理。
3. **修改边界**：始终把改动限制在主题目录，未触碰 Ghost 核心，升级时可整体替换主题，降低了维护成本。
