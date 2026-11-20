# @warm-apricot-cream/theme · 1.0.0

暖杏奶油风设计规范的框架无关token与组件CSS，不依赖React、AntD或Gradio。当前只提供浅色主题。

源码仓库执行npm run build、npm test、npm run theme:pack。业务项目先安装实际的warm-apricot-cream-theme-1.0.0.tgz，不假定已发布npm。

```js
import '@warm-apricot-cream/theme/tokens.css';
import '@warm-apricot-cream/theme/components.css';
import { tokens, colors, typography, layout } from '@warm-apricot-cream/theme';
```

页面根使用wac-root类与data-design-system="warm-apricot-cream-ui"。本包提供样式与数值，交互事件和真实业务数据由目标项目实现。没有getAntdTheme、Provider或预制聊天组件导出。
