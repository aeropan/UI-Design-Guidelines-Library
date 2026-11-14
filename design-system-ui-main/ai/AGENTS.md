# 标准设计系统 (design-system-ui-main) — Codex 规范细则

> 本文件是「标准设计系统」设计规范的机器可读细则，供 Codex / 类 Agent 在 UI / 前端实现任务中遵循。
> 单一事实源：`packages/theme/src/tokens/*` 与 `DESIGN.md`。本细则为提炼版，如与源冲突以源为准。
> 配套元数据见 `spec.json`；人类可读完整规范见 `DESIGN.md`。

## 强制约束（最高优先级）
- 所有颜色必须使用 `--ds-*` CSS 变量，禁止在组件内硬编码 hex / rgb / hsl。
- 间距一律使用 4px 基线栅格（4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48）。
- 明暗双主题必须同时有效：每个颜色 token 在 light 与 dark 下都有值。
- 静态卡片禁止 `box-shadow`；阴影仅用于 hover / 模态 / 下拉 / 选中状态。
- 不引入新颜色值；新增需同步写入 token 源与 AntD 适配层。
- 字号下限 12px（caption）。

## 颜色 token
- 主色：primary `#5264E0` | hover `#6B80F0`(暗)/`#3F50C0`(亮) | active `#3F50C0`(暗)/`#2D40B0`(亮)
- 语义：success `#43CB89` | warning `#FFA564` | danger `#FF6464` | neutral `#8a8f99`
- 暗色背景：base `#17191C` | card `#222427` | elevated `#2C2E31` | input `#1d1f23`
- 暗色文本：primary `#f2f3f5` | secondary `#8a8f99` | inverse `#ffffff`
- 暗色边框：border `#323640` | hover `#3a3f4d` | active `#5264e0`
- 亮色背景：base `#f0f1f5` | card `#ffffff` | elevated `#f5f6fa` | input `#f5f6fa`
- 亮色文本：primary `#1d1f23`(正文) / `#3d414a`(标题，以源为准) | secondary `#787b84` | inverse `#ffffff`
- 亮色边框：border `#e4e5e9` | hover `#d0d2d8` | active `#5264e0`
- 详细数值以 `packages/theme/src/tokens/colors.ts` 为准。

## 排版
- font stack: `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif`（不加载 web font）
- Data: 600 / 28px | Heading: 600 / 16px | Body: 400 / 14px / line-height 1.5715 | Caption: 400 / 12px | Button: 500 / 14px

## 圆角
- sm 4px | md 6px | lg 8px | xl 12px | full 9999px
- 按钮 / 输入 6px，卡片 8px，模态 12px。

## 间距
- xs 4 / sm 8 / md 12 / lg 16 / xl 20 / 2xl 24 / 3xl 32 / 4xl 40 / 5xl 48

## 阴影（z-index 词汇，仅状态使用）
- z0 `none` | z1 `0 1px 2px` | z2 `0 2px 12px` | z4 `0 4px 20px` | z8 `0 8px 40px` | z16 `0 16px 56px`
- 暗主题透明度高于亮主题（详见 `DESIGN.md` §4）。

## 关键组件规范
- **Button**：36px 高，6px 圆角；primary 用 `#5264E0` + 白字(500)；danger `#FF6464` 仅不可逆操作；高度变体 28(sm)/36/40(lg)。
- **Card**：8px 圆角，16px padding，1px 边框；状态变体用顶部 3px 色条（neutral/primary/success/warning）。
- **Input**：36px 高，6px 圆角；focus 时边框转 primary + 2px glow；含 search / password / textarea 变体。
- **Table**：header 用 bg-elevated；行 hover 背景微变；选中行 primary-subtle 背景 + 左边框指示。
- **Sidebar**：展开 200px / 折叠 56px；项高 44px(lv1)/36px(lv2)；激活项 primary-subtle 背景 + 700 字重。
- **Tag**：4px 圆角，12px 字，映射 AntD processing/success/warning/error/default。

## Ant Design 接入
- 通过 `@/app/theme` 包消费：`import '@/app/theme/tokens.css'` 与 `getAntdTheme('light'|'dark')`。
- 不要把 AntD token 值硬编码进组件，统一走 ThemeConfig 适配层。

## 禁止（Do-not）
- 渐变文字、玻璃拟态、霓虹色。
- 灰色文字置于彩色背景上（改用背景自身色相的深色）。
- 静态卡片永久 box-shadow。
- 低于 12px 字号。
- 引入未进入双主题的色值。
- 用相同卡片网格而无视觉层级。
