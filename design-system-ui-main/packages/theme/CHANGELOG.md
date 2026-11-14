# Changelog

## [1.2.7] — 2026-07-06

### Fixed

- `Table.headerColor` 暗/亮双主题统一为 `text-secondary`（`#8a8f99` / `#787b84`），之前暗色错误映射为 `text-primary`

## [1.2.6] — 2026-06-16

### Changed — 清理

- 删除过时 \`colors.json\` 等 5 个 JSON 源文件 + \`scripts/\` 旧构建脚本，\`colors.ts\` 为唯一数据源
- \`--ds-text-secondary\` 亮色 \`#656a74\` → \`#787b84\`，\`--ds-text-inverse\` 亮色 \`#1d1f23\` → \`#ffffff\`

### Fixed — 亮色滚动条

- 亮色主题滚动条 thumb \`--ds-border\`→\`--ds-text-tertiary\`，可见性大幅提升

### Added — 弹窗组件升级

- 确认类弹窗：确认/警告/成功/失败四种状态图标弹窗，使用设计规范色值
- 内容弹窗：自定义三段式蒙版（标题区 + 内容区 + 操作区），支持中(640px)/大(900px)尺寸切换
- 弹窗 footer 和 body 背景色统一使用 \`bg-card\`

### Changed — 亮色主题色彩体系统一

- 页面底色、侧边栏背景、顶部导航背景统一为 \`#f0f1f5\`
- \`--ds-bg-sidebar\`、\`--ds-bg-header\`、\`--sidebar-background\` 亮色值同步修改
- ColorsSection Token 描述和 ColorCard 显示值同步更新

### Fixed — 色彩体系修正

- \`--ds-text-primary\` 权威值确认为 \`#f2f3f5\`（暗色），修正此前错误的 \`#d0d2d8\`
- \`--ds-text-secondary\` 统一为 \`#8a8f99\`，修正 index.css 中的 \`#9fa6b3\`
- \`--sidebar-accent-foreground\` 改为引用 \`var(--ds-text-primary)\`，不再硬编码 \`#d0d2d8\`

### Changed — 卡片背景层级拆分

- \`--ds-bg-card\`：内容面板背景（\`#222427\`），不再用于卡片组件
- \`--ds-bg-elevated\`：卡片组件 / 浮层背景（\`#2C2E31\`）
- AI / 数据 / 图谱所有卡片组件统一使用 \`bg-elevated\`

### Changed — 实体卡片优化

- 副文本直接引用 \`var(--ds-text-secondary)\`，不再依赖 Ant Design \`Text type="secondary"\`
- 领域字号 11px → 12px
- 卡片背景使用 \`--ds-bg-elevated\`

## [1.2.5] — 2025-07-18

### Added

- 设计规范站点新增公告系统（AnnouncementBanner）+ Logo 回顶部交互

## [1.2.4] — 2026-06-02

### Changed

- Token 体系更新：`--color-*` → `--ds-*` 前缀
- Sidebar token 更新适配
- 新增 20+ 中文 nav 图标支持
- 根包清理（删除旧 `src/`、`scripts/`、`dist/`）

---

## [1.2.3] — 2026-06-02

### 新增

- **禁用态 Token**：`disabledText`、`disabledBg`、`disabledBorder`，暗色和亮色各一套
- `colors.json` 源文件同步

### 修复

- Input hover 描边不明显：`borderMuted` → `primary`，暗亮双主题同步

### 其他

- 文档站 CSS 变量统一 `--ds-*` 命名
- 多处硬编码颜色替换为设计 Token
- 版本保持 **1.2.3**

---

## [1.2.2] — 2026-06-02

### Added

- Upload token 支持（`colorBgContainer` / `colorBorder` / `colorText` 等 8 个暗/亮映射）
- CodeBlock 语法高亮 token（`.cb-keyword` → primary, `.cb-string` → success, `.cb-comment` → tertiary）

### Fixed

- Pagination `colorPrimary`: `c.primary` → `c.textInverse`（修复选中态蓝底蓝字）
- Segmented `itemSelectedColor`: 新增 `c.textInverse`（修复选中态黑色闪烁）

---

## [1.2.0] — 2026-06-02

### Added — 设计规范文档站点

- **单页长滚动架构**：移除 react-router，7 个 section 合并为单页全量渲染
- **视口渐入揭示动画**：`scroll-driven` section reveal（fade-up + blur-in）
- **DESIGN.md**：Stitch 格式设计规范文档 + `.impeccable/design.json` 渲染面板
- **icon-logo-light.svg**：亮色主题 logo（深色 fill #1D1F23）

### Fixed — Menu 主题适配

- 侧边栏 icon 亮色主题下自动反转为深色（`.nav-icon-img` CSS filter）
- Logo 根据 `data-theme` 自动切换暗/亮版本
- 亮色主题 `--color-text-inverse` 修正为 `#1d1f23`
- SVG nav icon 颜色统一为 `#8A8F99`

### Changed — 文档站点

- 8 个组件 Playground 代码范例补齐（Input/Card/Modal/Step/Calendar/Loading/Tooltip/Menu）
- SpacingSection 移除 mock 布局演示，替换为交叉引用
- 构建产物优化（移除 react-router 节省 ~37 kB）

---

## [1.1.0] — 2026-06-01

### Changed — Token 数据源从 JSON 迁移到 TypeScript

- `src/tokens/source/*.json` → `src/tokens/*.ts`
- 便于 IDE 自动补全、类型检查、内联注释
- 旧 JSON 源保留在 `src/tokens/source/` 中作为历史参考

### Added — 新增 14 个 CSS 变量

| 变量 | 说明 |
|---|---|
| `--ds-content-bg` | 内容区背景 |
| `--ds-bg-hover` | 通用悬停背景 |
| `--ds-header-border` | Header 底边框 |
| `--ds-header-button-bg` | Header 按钮背景 |
| `--ds-sidebar-item-hover` | 侧边栏项悬停 |
| `--ds-sidebar-item-active` | 侧边栏项激活 |
| `--ds-border-muted` | 弱化边框（按钮/输入框默认边框） |
| `--ds-primary-subtle-hover` | 品牌色浅色背景悬停态 |
| `--ds-text-error` | 错误文字色 |
| `--ds-text-success` | 成功文字色 |

### Added — 新增 6 个间距/布局变量

| 变量 | 说明 |
|---|---|
| `--ds-space-5` | 20px |
| `--ds-space-10` | 40px |
| `--ds-space-12` | 48px |
| `--ds-space-16` | 64px |
| `--ds-radius-xl` | 12px（弹窗） |
| `--ds-radius-full` | 9999px（圆形） |
| `--ds-header-height` | 56px |
| `--ds-sidebar-width` | 200px |
| `--ds-sidebar-collapsed-width` | 56px |

### Changed — AntD Adapter 扩展

- 新增 12 个组件映射：`Segmented`、`Dropdown`、`Popover`、`Empty`、`Typography`、
  `Spin`、`Tooltip`、`Steps`、`Switch`、`Slider`、`Alert`、`Progress`
- `Button.defaultBorderColor` 改用 `border-muted`（之前硬编码 `#3a3f4d`）
- `Input.hoverBorderColor` 改用 `border-muted`
- 所有 `colorPrimaryBg`/`colorPrimaryBorder` 等派生 token 显式映射
- `Table.headerColor` 修正为 `text-primary`（暗色）/ `text-secondary`（亮色）
- `Checkbox.colorBgContainer` 修正为 `bg-input`

### Fixed — Token 值修正

- `primary-subtle` RGB 从 `(78,110,247)` 修正为 `(82,100,224)`（与 `primary: #5264E0` 一致）
- `primary-border` 同上
- `info-bg` 同上

---

## [1.0.0] — 2026-05-28

### Initial release

- Core tokens: 颜色（51 个）、间距（9 级）、排版（8 级字号+字重）、阴影（6 级）
- `--ds-*` CSS Variables 暗/亮双主题
- AntD adapter: `getAntdTheme()`、`lightTheme`、`darkTheme`、`AppThemeProvider`
- 构建：tsup + generate script
