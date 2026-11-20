# 组件与组合目录

样式在 `packages/theme/dist/components.css`；完整DOM与事件实现见 `packages/docs/index.html`、`app.js`。以下不是React导出组件名。除token/theme包外，均需按目标技术栈接事件与状态。

| 组件 / 模式 | 真实入口 | 状态与要点 | 当前交付 |
|---|---|---|---|
| Button | .wac-button / --secondary / --ghost / --danger | hover、pressed、focus、disabled；38/32px | CSS + 运行示例 |
| IconButton | .wac-icon-button | aria-label；触摸44；工具提示非必需信息 | CSS + 折叠按钮 |
| Input/Textarea | .wac-field / .wac-input | label、placeholder、focus、error、disabled | CSS + 运行示例 |
| Tag/Notice | .wac-tag / .wac-notice | success/warning/danger/info；文字与图形辅助 | CSS + 状态示例 |
| Card | .wac-card / --flat | 轻暖灰阴影与平面两类，不能混成一种全局规则 | CSS + 示例 |
| Sidebar | .wac-shell / --collapsed / .wac-nav | 展开240、折叠72；aria-current与名称保留 | CSS + 导航交互 |
| Composer | .wac-composer | 空/有字/发送中/可停止；Enter/Shift+Enter/中文IME | CSS + 本地交互 |
| Message | .wac-message / --user / .wac-bubble | 用户/助手对齐，正文15/24；长词可断行 | CSS + 本地交互 |
| TracePanel | .wac-detail / .wac-trace | 打开/关闭/步骤选择；边界与证据分区 | CSS + 本地交互 |
| ResizablePanel | .wac-resizer | pointer拖动；方向键、Home/End；250–560px | CSS + 键盘/拖动 |
| LibraryItem | .wac-document / .wac-cover | 图文条目、两列/单列、搜索、分类、空态 | CSS + 本地数据 |
| GraphPattern | .graph-node / .graph-edge | 分类与状态分离、选择后详情 | docs局部示意；非图引擎 |
| Dialog | .wac-dialog / .wac-dialog-body | 居中、body滚动、native focus trap、Esc、恢复焦点 | CSS + 添加资料示例 |
| Toast/Tooltip | .wac-toast / .wac-tooltip | live状态/延迟400ms/focus支持/Esc | CSS + 本地交互 |
| Clarification | 按对话模式扩展 | 选项+自由输入、未知边界、清晰返回路径 | 行为规范，未宣称独立实现 |
| Fullscreen/Settings/Feedback | 按dialog/panel扩展 | 1100展开画布、560反馈、popover设置；保留键盘与状态规则 | 组合规则，需按业务实现 |

## 可移植的对话结构

```html
<div class="wac-message wac-message--user"><div class="wac-bubble">用户问题</div></div>
<div class="wac-message"><span class="wac-avatar" aria-hidden="true">助</span>
  <div class="wac-bubble">实际回答及可追溯的依据</div>
</div>
<form class="wac-composer">
  <label for="question">输入问题</label>
  <textarea id="question"></textarea>
  <button class="wac-button" type="submit">发送</button>
</form>
```

## 迁移时不要遗漏

1. 一起引入tokens.css和components.css；页面根加wac-root。
2. docs.css只为规范展示排版，不是主题包出口；graph局部示意需一并迁移对应样式，或替换为业务图引擎。
3. token/theme没有应用路由、AI回答、模型API、图数据、文献上传或持久化能力。
4. React/Vue用各自状态与事件机制；不要把docs的document事件初始化重复注册到每次render。
5. Gradio框架注入、iframe通信与全局reset属于适配问题，不是视觉规范。
