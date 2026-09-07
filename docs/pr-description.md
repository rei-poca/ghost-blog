# Pull Request 描述 + 自我 Code Review 记录

> 说明：本文件内容用于在 GitHub 上发起 Pull Request（`feature/blog-enhancement` → `main`），并在合并前完成自我 Code Review。

## PR 标题

`feat(theme): add oss-blog-theme with reading-list feature`

## 关联 Issue

- #1 确定实验基线与需求
- #2 自主功能：稍后阅读（收藏）列表

## 改动概览

- 基于官方 `Source` 主题 Fork 出自定义主题 `oss-blog-theme`。
- 导航新增「稍后阅读」入口与计数 badge。
- 文章卡片、详情页新增收藏按钮。
- 新增 `bookmarks.js`（localStorage 收藏逻辑）、`bookmarks-drawer.hbs`（抽屉）、`bookmark.hbs`（图标）及相关 CSS / 中文翻译。
- 补充 README、NOTICE、架构文档与测试用例。

## 测试证据

- `pnpm build` 成功。
- `pnpm exec gscan .` 输出 `Your theme is compatible with Ghost 6.x`。
- 测试用例见 `tests/acceptance.md`。

## 自我 Code Review 检查清单

- [x] 主题通过 gscan 校验，无阻断错误。
- [x] 改动边界在 `theme/` 内，未修改 Ghost 核心。
- [x] 收藏功能具备空状态、移除、清空与 Esc 关闭。
- [x] 无密码、Token、密钥提交（`runtime/` 已忽略）。
- [x] 上游与第三方资源已在 `NOTICE.md` 归因。
- [x] README 含安装、运行、数据导出恢复步骤。

## Review 结论

自审通过，可合并到 `main` 并打标签 `v1.0-lab`。
