# 暖杏奶油风设计规范 — Codex / WorkBuddy 共用指引 · 1.0.0

## 定位与加载

本规范目录ID：warm-apricot-cream-ui。用于实现可运行前端；不要求Gradio/React/AntD或某个医疗后端。用户已明确指定或项目已选择时直接沿用；否则由仓库路由器先选择规范，不能混用上一套靛蓝风。

读取：本文件 → README.md → DESIGN.md → packages/theme/src/tokens.json → COMPONENTS.md → 所需packages/docs示例。数值只以tokens.json为准；行为以DESIGN为准。提炼决定见references/extraction-decisions.md。

用户明确要求优先；保留现有项目技术栈。规范冲突先说明具体差异，不能悄悄把业务需求改成别的流程。

## 必须遵守

- 主题：只有light，不虚构暗色支持。
- 命名：--wac-*变量与.wac-*组件类；不引入上一套--ds-*、靛蓝主色、AntD默认尺寸或静态无阴影禁令。
- 颜色：品牌accent #B37560只做强调；白字主按钮用primary #9E5F4E，hover #6B5045。正文与辅助分别#3E3836/#6F6763。语义文字用*-text，不只用颜色传意。
- 字体：系统字体，mono可回退；没有字体文件时不声称加载了JetBrains Mono。不要默认增加远程字体。
- 文字：display28/36/700，h1 24/32/700，h2 20/28/600，h3 16/24/600，body15/24/400，compact14/22/400，small13/20/400，caption12/18/500。最小12；标题700是明确变体。
- 空间：布局4px基线；控件内部10/14及标签3/10等是明示例外，不扩大为任意栅格。
- 表面：暖灰阴影；普通卡片xs，文献条目flat无阴影。输入编辑器可用composer阴影。
- 尺寸：导航240/72，详情380/250；1100以下缩略导航，920以下详情覆盖。按钮38/32；触摸目标44。
- 不锁死页面画布；三栏是可选组合，不是所有页面必须同时出现三个面板。

## 实现与接入

真实包名 @warm-apricot-cream/theme，尚未在npm发布。按README构建并打包，安装实际tgz；引入tokens.css与components.css。或者直接复制生成的两份CSS。

主题包只导出tokens/colors/typography/layout和CSS，没有getAntdTheme、ReactProvider或聊天组件导出。不要凭空导入AppChat、WacProvider等。示例事件在packages/docs/app.js；迁移到目标框架时接入真实状态。

把通用样式沉淀到wac-root作用域；不复制Gradio全局reset、iframe补丁、!important堆叠、绝对路径、个人品牌图、对话种子、账号、日志、密钥或原医疗知识数据。

## 交互要求

- 输入：label独立存在；错误aria-invalid+文案；按钮不可用要说明状态；中文IME Enter不能误发送。
- 对话：空态/输入/发送中/停止/完成/错误/澄清有明确区别；未知不能假装已完成。用户输入作为文本渲染。
- 证据与风险：来源、适用范围、未知、风险分区；不编造引用、置信度或诊断结论；医学内容由业务侧提供。
- 弹窗：普通440、紧凑400、反馈560、展开最大1100；视口受限、内容内部滚动、焦点进入并被限制、Esc关闭、关闭后回触发点。危险操作用明确确认。
- Tooltip支持hover与focus，Esc可关闭；重要信息不得只藏在tooltip。
- 详情面板支持关闭；拖动分隔器也能用键盘。图谱分类、关系极性、依据充分度不混成一个“状态色”。
- 150/220/300ms动效；prefers-reduced-motion关闭不必要动画；不要求复制旧项目视频/APNG。

## 验收

本规范根：npm test、npm run build。目标项目按它自己的类型检查/构建命令验收；不以本库测试代替业务测试。

检查默认/hover/focus/disabled/error，长文案，发送/停止，搜索空态，弹窗键盘与滚动，1100/920断点，reduced-motion。若未运行浏览器或业务后端，应明确说明，不能声称全部接通。
