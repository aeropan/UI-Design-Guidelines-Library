# Changelog

## [1.2.9] — 2026-07-06

### Fixed

- `Table.headerColor` 暗/亮双主题统一为 `text-secondary`（暗色 `#8a8f99` / 亮色 `#787b84`）

### Added

- 新增 nav icon：`icon-模型复现.svg`，fill `#8A8F99`

## [1.2.8] — 2026-06-29

### Added

- 模型内容卡片新增公开/私有标签（folder SVG 图标 + pill 样式）
- 模型内容/市场功能卡片底部 user-3-line SVG 替代头像占位符
- 市场功能卡片底部新增下载次数字段（download-line SVG）
- 市场功能卡片标签溢出 +N 更多，hover Tooltip 展示全部标签
- 分段控制器新增禁用状态（tertiary + opacity 40% + not-allowed）
- 下划线标签 + 分段控制器完整内容范例（tab + filter-bar + Table 联动）

### Changed

- 内容弹窗表单型改为上下排版（label-top），中/大尺寸双列网格保留
- 上传组件布局优化：maxWidth 480 + minHeight 160 防塌陷
- 内容弹窗字号：详情型标题 12px → 标签内容 14px
- 小尺寸弹窗表单/详情自动单列
- 市场功能/数据集卡片功能标签色改为 `var(--ds-text-secondary)`
- 面包屑标题 13→14px

### Fixed

- TabsPlayground code block 注释值同步修正
- Card hover 投影 `var(--ds-shadow-z8)` + 0.25s 过渡

## [1.2.7] — 2026-06-17

### Changed — 投影系统全面弱化

- 暗色阴影全局降低 ~70%：z1 0.30→0.06, z2 0.35→0.10, z4 0.40→0.14, z8 0.50→0.22, z16 0.55→0.28
- 亮色阴影全局降低 ~50%：z1 0.06→0.02, z2 0.08→0.04, z4 0.10→0.06, z8 0.12→0.08, z16 0.15→0.10
- Card hover 投影统一 `var(--ds-shadow-z8)`，与 ShadowPlayground 展示完全一致
- Card hover 新增 0.25s ease 丝滑过渡
- `index.css` CSS 变量同步 shadow token，`ShadowPlayground` 展示值同步
- `getAntdTheme.ts` Card 组件显式配置 boxShadow + boxShadowSecondary

### Fixed — 按钮投影去除

- Ant Design Button `defaultShadow` / `primaryShadow` / `dangerShadow` 设为 `none`

### Fixed — 内容弹窗模板优化

- 详情型分段标题 11→12px，标签+内容统一 14px
- 小尺寸(480px)表单型自动单列、详情型自动单列
- 配置型去掉 `maxWidth:240` + `space-between`，中/大尺寸不再右侧大片空白

### Added — Modal 弹窗内容模板

- **Header 副标题**：Content Modal 标题区支持 `title + subtitle` 结构（14px/600 + 12px/400 `--ds-text-secondary`），副标题左对齐 icon 右侧
- **三种 Body 内容模板**：表单型（双列网格 + 通栏）、详情型（紧凑双列网格 + 分组标题线）、配置型（开关/选择器/输入框组合），通过工具栏实时切换
- **章节分区**：弹窗章节拆分为「通知弹窗 Notification Modal」（confirm/warning/success/error）和「内容弹窗 Content Templates」两张独立卡片，标题 + 说明文字 + `--ds-primary`/`--ds-success` 色条

### Changed — Modal 工具栏

- 模板/尺寸切换器改用规范分类标签实现（`--ds-bg-input` 容器 + `--ds-primary` 激活蓝底），替换 AntD `<Segmented>`
- Mock 预览 Footer 按钮改用规范原生样式（36px 高 + `--ds-border-muted` 描边 / `--ds-primary` 主按钮），解决暗色下 AntD Button 边框视觉过粗
- Footer 保留 Body/Footer 分割线（`--ds-divider`），按钮无额外边框，层次干净

### Fixed

- 详情型模板补齐双按钮（关闭 + 编辑），与表单型/配置型保持一致
- 详情型网格间距收紧（组间距 16→12px，行距 12→6px，列距 24→16px）
- 弹窗内边距统一为 20px（`--ds-card-padding`）

## [1.2.6] — 2026-06-16

### Added — 分类标签组件 (Tabs)

- **分段控制器 (Segmented Control)**：容器包裹式标签，激活态 `--ds-primary` 填充 + 白字，未激活态透明底 + `--ds-text-secondary`，容器 `--ds-bg-input` 底色 + `--ds-border` 描边
- **下划线标签 (Underline Tabs)**：激活态底部 2px `--ds-primary` 下划线 + 加粗文字，未激活态无下划线 + 次要文字
- 两项均支持 hover 交互：未激活项 hover 时背景 `--ds-bg-hover` + 文字提亮至 `--ds-text-primary`
- 全量 CSS 变量驱动，暗色/亮色主题自动切换，零硬编码颜色
- 注册至组件规范页面及侧边栏导航

### Fixed — 色彩体系修正

- \`--ds-text-primary\` 权威值确认为 \`#f2f3f5\`（暗色），修正此前错误的 \`#d0d2d8\`
- \`--ds-text-secondary\` 统一为 \`#8a8f99\`，修正 index.css 中的 \`#9fa6b3\`
- \`--sidebar-accent-foreground\` 改为引用 \`var(--ds-text-primary)\`，不再硬编码 \`#d0d2d8\`

### Changed — 卡片背景层级拆分

- \`--ds-bg-card\`：内容面板背景（\`#222427\`），不再用于卡片组件
- \`--ds-bg-elevated\`：卡片组件 / 浮层背景（\`#2C2E31\`）
- AI / 数据 / 图谱所有卡片组件统一使用 \`bg-elevated\`
- ColorsSection Token 描述同步更新

### Changed — 实体卡片优化

- 副文本直接引用 \`var(--ds-text-secondary)\`，不再依赖 Ant Design \`Text type="secondary"\`
- 领域字号 11px → 12px
- 卡片背景使用 \`--ds-bg-elevated\`

### Changed — 清理与修正

- 删除旧 \`packages/\` 目录（23,161 行重复代码，\`design-system-ui/packages/\` 为唯一权威）
- CHANGELOG 4 份合并为 2 份，\`design-system-ui/CHANGELOG.md\` 已删除
- 版本号统一 1.2.6（3 个 package.json + 2 个 CHANGELOG）
- \`colors.json\` 等 5 个过时 JSON + \`scripts/\` 旧构建脚本删除，\`colors.ts\` 为唯一数据源
- \`--ds-text-secondary\` 亮色 \`#656a74\` → \`#787b84\`（对齐 colors.ts），\`--ds-text-inverse\` 亮色 \`#1d1f23\` → \`#ffffff\`
- DESIGN.md 旧前缀 \`--color-*\` → \`--ds-*\`，过时色值修正（\`#d0d2d8\`→\`#f2f3f5\` 等）
- 删除重复滚动条 CSS + 空 \`lib/\` 目录

### Changed — 架构：docs 站点接入 theme 包

- docs 站点从本地 700 行 \`antd-theme.ts\` 切换为消费 theme 包 \`getAntdTheme()\`
- \`main.tsx\` import 改为 \`@/app/theme/antd\`，Vite alias 映射
- \`colors.ts\` → \`generate.ts\` → \`index.css\` / \`getAntdTheme.ts\`，单源派生全部 CSS 变量和 AntD token
- 同步修正 \`colors.ts\` light bgSidebar/bgHeader \`#ffffff\`→\`#f0f1f5\`，antd-theme.ts 顶部速查注释过期值更新

### Fixed — 可访问性与交互完善

- **SidebarMenu**：菜单项/折叠按钮加 \`tabIndex\` + \`role="button"\` + \`onKeyDown\`，键盘可完整操作导航
- **SidebarMenu**：亮色激活文字 \`--ds-text-inverse\`→\`--ds-text-primary\`，暗/亮激活 icon 自动高亮反白
- **SidebarMenu**：二级选中时一级 icon 保持高亮（补漏 \`hasActiveChild\` 判断）
- **TabsPlayground**：分段控制器+下划线标签加 \`role="tablist"\`/\`role="tab"\`/\`aria-selected\`
- **ModalPlayground** header/footer 间距对齐 token 尺度（14→12, 10→12）
- **MenuPlayground** 模拟 Tab 栏补充 hover 文字变色
- **亮色滚动条** thumb \`--ds-border\`→\`--ds-text-tertiary\`，可见性大幅提升

## [1.2.5] — 2026-06-10

### Added — 弹窗组件升级

- 确认类弹窗：确认/警告/成功/失败四种状态图标弹窗，使用设计规范色值
- 内容弹窗：自定义三段式蒙版（标题区 + 内容区 + 操作区），支持中(640px)/大(900px)尺寸切换
- 弹窗 footer 和 body 背景色统一使用 \`bg-card\`

### Changed — 亮色主题色彩体系统一

- 页面底色、侧边栏背景、顶部导航背景统一为 \`#f0f1f5\`
- \`--ds-bg-sidebar\`、\`--ds-bg-header\`、\`--sidebar-background\` 亮色值同步修改
- ColorsSection Token 描述和 ColorCard 显示值同步更新

### Added — 公告系统 + 交互增强

- `AnnouncementBanner` 组件：自动解析 CHANGELOG.md，版本号/日期/更新条目实时显示
- Logo 点击回顶部：侧边栏 Logo + "设计规范" 文字点击平滑滚动至首页
- CHANGELOG.md 挂载至 `/public` 目录，支持运行时 fetch

### Changed

- 公告折叠/展开动画，Ant Design token 全主题适配（暗色/亮色）

## [1.2.4] — 2026-06-02

### Changed — Token 体系重构

- CSS 变量 `--color-*` → `--ds-*` 前缀迁移
- `--sidebar-foreground` 改为引用 `var(--ds-text-secondary)`
- `theme.tsx` 删除 `getThemeStyles()` 函数（内联 token 映射已由 index.css 统一管理）
- 根 `package.json` 重命名：`@/app/theme` → `standard-design-system`

### Added — 侧边栏图标 + 图标库

- 新增 20+ 中文文件名 nav SVG 图标（图标库页面及侧边栏引用）
- `icon-library.html` / `IconLibrarySection.tsx` — 图标库展示

### Changed — 组件重构

- **CardPlayground**：状态色条卡片 + 统计卡片大幅改造（829 行变更），统一 CardMeta 底部元数据行（头像 + 创建者·时间 + ⋮ 操作按钮），修正暗色 `--ds-text-secondary` 对比度 3.5→4.5:1
- **ColorsSection / TypographySection / InteractionsSection / SpacingSection** 等大规模重构
- **SidebarMenu / DataPlatformLayout** 适配新 token 体系
- 所有 Playground 同步更新颜色变量引用

### Cleanup

- 删除根目录旧 theme 包文件（`src/`、`scripts/`、`dist/` 已迁移至 `packages/theme/`）
- 删除 `theme-package-ux-handoff.md`（已完成交接）

### Published — @/app/theme

- `@/app/theme@1.2.4`（token 同步更新）

---

## [1.2.3] — 2026-06-02

### 新增

- **禁用态设计 Token**：新增 `--ds-disabled-text`、`--ds-disabled-bg`、`--ds-disabled-border`，暗色和亮色各一套，覆盖文字、背景、描边三种禁用场景
- **聚焦环 Token**：`--ds-focus-ring`，键盘 Tab 导航时自动显示品牌色聚焦环，支持减弱动画偏好
- **圆角和补充间距**：`--ds-radius-sm/md/lg/xl`、`--ds-space-0-5`（2px）、`--ds-space-7`（28px）
- **输入控件页新增禁用态对比区块**：Normal 和 Disabled 并排展示，包含 AntD 组件和自定义元素两种用法

### 优化

- **CSS 变量统一命名**：全站 `--color-*` / `--shadow-*` / `--layout-*` 统一为 `--ds-*`，和主题包命名保持一致
- **色彩系统页更新**：禁用文字和占位符文字分开展示，各输入状态示例改用设计 Token
- **亮色主题文字修正**：顶部导航和侧边栏的激活文字在亮色下不再发白，Logo 和图标颜色恢复正常
- **禁用按钮更合理**：主按钮禁用时保留蓝色底只褪文字，普通按钮禁用时整体变灰
- **删除重复代码**：移除 `theme.tsx` 里一百多行硬编码颜色

### 修复

- **AntD 组件禁用态终于生效**：Input、Select、Button 等组件禁用后文字和背景颜色正确显示，切换时不再闪烁
- **多处硬编码颜色替换为 Token**：滑块、脉冲动画、步骤条等组件改用设计规范变量
- `@/app/theme` 版本保持 **1.2.3**

---

## [1.2.2] — 2026-06-02

### Added — 3 个新组件

- **分页器 Pagination**：基础/快速跳转/简洁模式 + 暗亮双主题 playground
- **上传 Upload**：点击/拖拽/文件列表状态（完成+上传中+失败）
- **代码块 CodeBlock**：轻量 TSX 语法高亮（关键字/字符串/JSX 标签）+ 高亮开关 + 高度控制
- **Header 搜索快速跳转**：Select showSearch 支持中英文模糊搜索 21 个锚点

### Fixed — Impeccable Audit 修复

- Pagination 选中态文字不可见（`colorPrimary: #5264E0` → `#ffffff`）
- Segmented 选中态 `itemSelectedColor: '#ffffff'` + 文字瞬切防闪烁
- 3 处 `backdropFilter: blur(30px)` 玻璃效果移除（性能 + AI slop）
- `--color-text-tertiary` 对比度修正（亮 1.9:1 → 4.5:1 WCAG AA）
- `filter: blur()` 从 scroll reveal 动画移除（CPU 重绘）
- 删除 `App.css` / `Home.tsx` 死代码

### Fixed — 交互体验

- `scrollIntoView` → `contentRef.scrollTo()` 修复点击组件后 Header 消失
- TokenDownload 面板默认折叠（5 个 section 含 ColorsSection）
- PrinciplesSection tab 切换动画重播（`key={activeTab}`）
- Clipboard `.catch()` 防止 HTTP 下静默失败

### Changed — Theme 包

- antd-theme.ts 新增 Upload 暗/亮双主题 token
- Pagination `colorPrimary` 从 `c.primary` → `c.textInverse`
- `@/app/theme` 1.2.1 → **1.2.2**

---

## [1.2.0] — 2026-06-02

### Added — 设计规范文档站点

- **单页长滚动架构**：移除 react-router，7 个 section 合并为单页全量渲染，sidebar 实时高亮跟随
- **视口渐入揭示动画**：`scroll-driven` section reveal（fade-up + blur-in），`@supports` 回退
- **DESIGN.md**：Stitch 格式设计规范文档 + `.impeccable/design.json` 渲染面板
- **icon-logo-light.svg**：亮色主题 logo（深色 fill #1D1F23）

### Fixed — Menu 主题适配

- `icon-search.svg` / `icon-collapse.svg` 颜色统一为 `#8A8F99`（与其他 nav icon 一致）
- 侧边栏 icon 亮色主题下自动反转为深色（`.nav-icon-img` CSS filter）
- Logo 根据 `data-theme` 自动切换暗/亮版本
- 亮色主题选中态文字颜色修正（`--color-text-inverse: #1d1f23`）
- Header 分隔线改用 CSS 变量 `var(--color-text-inverse)`

### Changed — 组件代码范例补齐

- **InputPlayground**：新增 10 个 Input 变体范例 + size/disabled 交互控件
- **CardPlayground**：补齐 4 色状态卡 + 3 统计卡范例
- **ModalPlayground**：补齐 confirm/warning/success/error 4 种弹窗范例
- **StepPlayground**：补齐 prev/next/complete 按钮导航范例
- **CalendarPlayground**：补齐事件详情面板 + 事件列表范例
- **LoadingPlayground**：补齐两种 Empty 变体 + 加载完成切换范例
- **TooltipPlayground**：补齐方向 + 按钮关联范例 + Style Spec 注释
- **MenuPlayground**：修复 `lightCode = darkCode` bug

### Changed — 布局精简

- **SpacingSection**：移除 `InteractiveLayoutDemo` mock（140 行），替换为交叉引用卡片
- **ComponentsSection**：移除内部 IntersectionObserver（~100 行），统一由 App 层管理
- 构建产物从 1,535 kB → 1,491 kB（移除 react-router 节省 ~37 kB）

### Fixed — 导航修复

- 侧边栏"组件规范"子菜单可点击展开/跳转（`openKeys` 改为受控 state）
- 修复滚动时 IntersectionObserver 竞态导致跳转到错误 section
- 修复 `scrollIntoView` 完成后 URL 被 observer 覆写

### Published — @/app/theme

- `@/app/theme@1.2.0` — 设计规范文档站点里程碑（单页滚动 + 8 组件范例 + DESIGN.md）

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
