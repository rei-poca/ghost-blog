## 项目总体架构（Ghost 路线）

- 运行时：`runtime/`（由 Ghost CLI 安装生成，本仓库忽略该目录内容）
- 可追踪改动：`theme/`（自定义主题源码）、`tests/`（测试记录/脚本）、`docs/`（文档）

## 请求路径（高层）

- 访客/会员浏览前台主题（Handlebars 模板 + 静态资源）
- 主题通过 Ghost 内置 helper 或 Content API 获取文章/标签/会员信息
- Ghost 服务端持久化到 SQLite（本地默认）

