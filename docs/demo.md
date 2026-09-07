# 现场演示指南（Demo Guide）

> 用于《开源软件与新技术》实验答辩现场演示。基于 Ghost 二次开发的个人博客系统 `oss-blog`，主题为自定义 `oss-blog-theme`，自主功能为「稍后阅读（收藏）」。

## 0. 环境要求

| 依赖 | 版本 |
| --- | --- |
| Node.js | 22 LTS |
| Ghost CLI | 1.32.3 |
| Ghost | 6.59.0（本地开发模式，SQLite） |

> 演示前请确保 Ghost 未在后台残留占用端口 2368 的进程。

## 1. 启动与停止

在项目根目录 `d:\oss-blog` 打开 PowerShell：

```powershell
# 一键启动
.\scripts\start.ps1

# 若报「禁止运行脚本」，改用：
#   cd d:\oss-blog\runtime
#   ghost start

# 一键停止
.\scripts\stop.ps1
```

## 2. 访问地址

| 端 | 地址 | 说明 |
| --- | --- | --- |
| 前台 | http://localhost:2368/ | 读者视角，展示主题与自主功能 |
| 管理端 | http://localhost:2368/ghost/ | 管理员视角，展示内容管理与主题设置 |

## 3. 演示流程（建议 5–8 分钟）

### 3.1 主题配色（视觉改动）

打开前台首页，展示马卡龙色调：

- 浅粉 / 米色卡片式设计，清新柔和；
- 说明这是基于官方 `Source` 主题 Fork 出的 `oss-blog-theme`（`theme/oss-blog-theme/`）。

### 3.2 文章 / 标签 / 搜索

1. 首页展示文章卡片列表（含多篇中文演示文章）。
2. 点击顶部标签，按标签筛选文章。
3. 使用搜索框，搜索中文关键词（如「上班」「学习」），展示站内全文搜索。

### 3.3 自主功能：稍后阅读（收藏）★ 重点

1. 在文章卡片或详情页，点击右上角**书签按钮**收藏。
2. 点击顶部导航栏的「**稍后阅读**」入口，展示收藏列表（含计数 badge）。
3. 演示移除单条、清空列表、空状态提示。
4. **设计理由**：纯前端 `localStorage`（键 `oss-blog-reading-list`）实现，无需后端密钥、无隐私上传，符合"不侵入 Ghost 底层"的二次开发边界。

关键文件：`theme/oss-blog-theme/assets/js/bookmarks.js`、`partials/bookmarks-drawer.hbs`、`partials/icons/bookmark.hbs`。

### 3.4 管理端（可选，突出"权限边界"）

登录 http://localhost:2368/ghost/ ，展示：

- 文章发布 / 编辑（说明：**文章只能在后台发布，前台用户只能查看/评论/收藏**）；
- Settings → Design 页中已激活的主题 `oss-blog-theme`；
- Settings → Labs 中的「导出所有内容」（对应已脱敏交付的导出文件）。

## 4. Git 工作流证据（答辩加分项）

命令行查看：

```powershell
cd d:\oss-blog
git log --oneline --graph
```

或打开 GitHub 仓库：https://github.com/rei-poca/ghost-blog

重点展示：

- 分支 `feature/blog-enhancement` → **Pull Request #3** → 合并到 `main`；
- **Issue #1**（建立基线）、**Issue #2**（稍后阅读功能）；
- 标签 `v1.0-lab`；
- 最新提交 `1eb9b1c`（含脱敏内容导出）。

开发过程与提交的对应关系详见 [git-evidence.md](git-evidence.md)。

## 5. 交付物速查

| 交付项 | 位置 |
| --- | --- |
| 实验报告 | `docs/report.md` |
| 展示 PPT | `docs/oss-blog-presentation.pptx` |
| Git 证据对照表 | `docs/git-evidence.md` |
| 差异清单 | `docs/diff-list.md` |
| 第三方资源归因 | `NOTICE.md` |
| 内容导出（脱敏） | `backups/hello.ghost.2026-09-07-07-35-59.json` |
| 主题压缩包 | `theme/oss-blog-theme/dist/oss-blog-theme.zip` |
| 一键启停脚本 | `scripts/start.ps1`、`scripts/stop.ps1` |
