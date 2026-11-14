---
name: design-system-ui-main
description: 标准设计系统 UI 规范（企业级暗/亮双主题，Ant Design 6 + React 19）。当用户进行 UI / 前端实现、且本规范适用（数据平台 / 后台管理 / AI 平台类项目）时加载。
---

# 标准设计系统 (design-system-ui-main)

企业级暗/亮双主题设计规范，基于 Ant Design 6 + React 19 的完整 token 体系与组件库。暗色优先，单主色靛蓝 `#5264E0`，4px 基线栅格，z0–z16 阴影体系。适用：数据平台 / 后台管理 / AI 平台 / 图谱平台 / 数据中台。

> 本 Skill 细则与 `../AGENTS.md` 同源（单一事实源 `packages/theme/src/tokens/*` 与 `DESIGN.md`）。

## 强制约束（最高优先级）
- 所有颜色必须使用 `--ds-*` CSS 变量，禁止在组件内硬编码 hex / rgb。
- 间距一律使用 4px 基线栅格（4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48）。
- 明暗双主题必须同时有效：每个颜色 token 在 light 与 dark 下都有值。
- 静态卡片禁止 box-shadow；阴影仅用于 hover / 模态 / 下拉等状态。
- 字号下限 12px。

## 颜色 token
- 主色：primary `#5264E0` | hover `#6B80F0`(暗)/`#3F50C0`(亮) | active `#3F50C0`(暗)/`#2D40B0`(亮)
- 语义：success `#43CB89` | warning `#FFA564` | danger `#FF6464` | neutral `#8a8f99`
- 暗色：base `#17191C` | card `#222427` | elevated `#2C2E31` | text-primary `#f2f3f5` | border `#323640`
- 亮色：base `#f0f1f5` | card `#ffffff` | elevated `#f5f6fa` | text-primary `#1d1f23` | border `#e4e5e9`
- 详细数值以 `packages/theme/src/tokens/colors.ts` 为准。

## 排版 / 圆角 / 间距 / 阴影
- 字体栈：系统字体（不加载 web font）；Data 600/28px · Heading 600/16px · Body 400/14px · Caption 400/12px
- 圆角：sm4 / md6 / lg8 / xl12 / full；按钮输入 6px，卡片 8px，模态 12px
- 间距：xs4 sm8 md12 lg16 xl20 2xl24 3xl32 4xl40 5xl48
- 阴影：z0 none · z1 `0 1px 2px` · z2 `0 2px 12px` · z4 `0 4px 20px` · z8 `0 8px 40px` · z16 `0 16px 56px`（仅状态使用）

## 关键组件
- Button 36px 高、6px 圆角、primary `#5264E0`+白字；danger 仅不可逆操作。
- Card 8px 圆角、16px padding、状态顶部 3px 色条。
- Input 36px、focus 边框转 primary + 2px glow。
- Sidebar 展开 200px / 折叠 56px，激活项 primary-subtle + 700 字重。

## Ant Design 接入
消费 `@/app/theme`：`import '@/app/theme/tokens.css'` 与 `getAntdTheme('light'|'dark')`；不硬编码 AntD token。

## ⚠️ 开始前确认（必须遵守）
当任务涉及 UI / 前端实现时，若用户**未明确指定**使用哪套设计规范，**必须先列出当前环境可用的设计规范（参见各规范子目录的 `spec.json` 与仓库根 README 索引），请求用户选择，禁止自行假设默认规范**。确认后再应用本规范的 token 与约束。

## 禁止
渐变文字 / 玻璃拟态 / 霓虹色；灰色文字置彩色背景；静态卡片永久阴影；低于 12px 字号；引入未进入双主题的色值。
