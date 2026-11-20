---
name: warm-apricot-cream-ui
description: 暖杏奶油风设计规范。用于按温暖浅色风格实现对话助手、知识问答、资料库与可解释工作台前端；不绑定医疗后端或特定框架。
---

# 暖杏奶油风设计规范 · 1.0.0

先定位完整warm-apricot-cream-ui目录。安装本Skill时必须保留规范目录或由用户提供实际路径；不能假定单个Skill文件包含组件与依赖。

1. 用户或项目已选定时直接沿用；未选定时通过仓库索引选择，不混用其他设计规范。
2. 读取规范根ai/AGENTS.md（原目录结构下相对本文件为../AGENTS.md）、README.md、DESIGN.md、packages/theme/src/tokens.json及COMPONENTS.md。
3. 按需读取packages/docs/index.html、app.js和组件CSS；按目标项目技术栈实现，不把示例当成已发布React组件。
4. 按共用指引验收状态、响应式、键盘和构建；未验证部分明确说明。

用户要求优先。主题仅浅色，使用--wac-*；普通卡片可有轻暖灰阴影，资料条目保持平面。数值以token源为准，不从历史文档猜测。真实包名@warm-apricot-cream/theme，安装按README，不虚构远程registry或Provider。
