# 个人开发过程与 Git 证据对照表

> 仓库：https://github.com/rei-poca/ghost-blog
> 分支：`feature/blog-enhancement` → Pull Request #3 → `main`
> 标签：`v1.0-lab`（指向合并提交 `d7c594d`）

## 1. 提交记录（按时间顺序，7 个非合并 Commit）

| # | Commit SHA | 日期 | 提交说明 | 对应实验任务 |
| --- | --- | --- | --- | --- |
| 1 | `165334d` | 2026-09-07 | `chore: init lab repo structure` | 任务 1：初始化仓库与目录结构 |
| 2 | `b90db1c` | 2026-09-07 | `feat(theme): add oss-blog-theme with reading-list feature` | 任务 5/6：主题 + 自主功能（收藏） |
| 3 | `1e4d950` | 2026-09-07 | `docs: add README, NOTICE, architecture, tests and issue/pr records` | 任务 3/8：文档与 PR/Issue 记录 |
| 4 | `85f515c` | 2026-09-07 | `fix(theme): resolve reading-list toggle variable shadowing` | 任务 6：修复收藏功能 bug |
| 5 | `fead0ae` | 2026-09-07 | `feat(theme): apply macaron color scheme` | 任务 5：视觉改动（马卡龙色调） |
| 6 | `8eae66f` | 2026-09-07 | `test: complete acceptance test records` | 任务 7：测试记录 |
| 7 | `ee7c9ec` | 2026-09-07 | `test: complete acceptance records and add run screenshots` | 任务 2/7：截图 + 测试补全 |

## 2. 协作流程证据

| 证据 | 编号/链接 | 说明 |
| --- | --- | --- |
| Issue #1 | `#1` | 确定实验基线与需求 |
| Issue #2 | `#2` | 自主功能：稍后阅读（收藏）列表 |
| Pull Request | `#3` | `feature/blog-enhancement` → `main`，已合并 |
| Merge Commit | `d7c594d` | `Merge pull request #3` |
| Tag | `v1.0-lab` | 版本标签 |

## 3. 如何复现查看

```bash
git log --oneline --graph --decorate --all -n 30
git show --stat d7c594d          # 查看合并提交
git tag -n                        # 查看标签
```

## 4. 证据说明

- 每个 commit 均可通过 `git show <SHA>` 查看完整 diff，证明改动边界在 `theme/` 与文档目录内。
- 上游 `runtime/`（数据库、密钥、日志）自始至终未提交（见 `.gitignore`）。
