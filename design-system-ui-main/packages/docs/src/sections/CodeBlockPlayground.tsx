import { useState } from 'react'
import { Switch, Space, Typography, Segmented } from 'antd'
import CodeBlock from './CodeBlock'

const { Text } = Typography

const darkCode = `// 代码块 (CodeBlock) · 暗色主题
// 颜色通过 CSS 变量注入，映射到设计系统 token：
//   背景: var(--ds-bg-sidebar)  → #17191C
//   边框: var(--ds-border)      → #323640
//   文字: var(--ds-text-primary) → #d0d2d8
//   注释: var(--ds-text-tertiary) → #6d717a（斜体）
//   关键字: var(--ds-primary)   → #5264E0
//   字符串: var(--ds-success)   → #43CB89
//   属性名: var(--ds-warning)   → #FFA564
import { CodeBlock } from '@/components'

// 基础用法 — 暗色 + 亮色两套代码
<CodeBlock
  darkCode={\`// 暗色主题代码\`}
  lightCode={\`// 亮色主题代码\`}
  lang="tsx"
/>

// 关闭语法高亮
<CodeBlock
  darkCode={code}
  lightCode={code}
  highlight={false}
/>

// 限制高度
<CodeBlock
  darkCode={longCode}
  lightCode={longCode}
  maxHeight={160}
/>`

const lightCode = `// 代码块 (CodeBlock) · 亮色主题
// 颜色通过 CSS 变量注入，映射到设计系统 token：
//   背景: var(--ds-bg-sidebar)  → #ffffff
//   边框: var(--ds-border)      → #e4e5e9
//   文字: var(--ds-text-primary) → #1d1f23
//   注释: var(--ds-text-tertiary) → #b8bcc4（斜体）
//   关键字: var(--ds-primary)   → #5264E0
//   字符串: var(--ds-success)   → #43CB89
//   属性名: var(--ds-warning)   → #FFA564
import { CodeBlock } from '@/components'

// 基础用法 — 暗色 + 亮色两套代码
<CodeBlock
  darkCode={\`// 暗色主题代码\`}
  lightCode={\`// 亮色主题代码\`}
  lang="tsx"
/>

// 关闭语法高亮
<CodeBlock
  darkCode={code}
  lightCode={code}
  highlight={false}
/>

// 限制高度
<CodeBlock
  darkCode={longCode}
  lightCode={longCode}
  maxHeight={160}
/>`

const sampleCode = `import { useState } from 'react'
import { Button, Space } from 'antd'

export default function Demo() {
  const [count, setCount] = useState(0)
  const MAX = 100
  const isFull = count >= MAX

  // 处理点击事件
  const handleClick = () => {
    if (isFull) return
    setCount(count + 1)
  }

  return (
    <Space>
      <span>计数: {count} / {MAX}</span>
      <Button
        type="primary"
        disabled={isFull}
        onClick={handleClick}
      >
        点击 +1
      </Button>
    </Space>
  )
}`

export default function CodeBlockPlayground() {
  const [highlight, setHighlight] = useState(true)
  const [maxHeight, setMaxHeight] = useState<number>(280)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text type="secondary" style={{ fontSize: 12 }}>交互范例 · Interactive Example</Text>
        <Space>
          <Text type="secondary" style={{ fontSize: 12 }}>语法高亮</Text>
          <Switch checked={highlight} onChange={setHighlight} size="small" />
        </Space>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Text type="secondary" style={{ fontSize: 12, width: 60 }}>最大高度</Text>
        <Segmented
          size="small"
          value={maxHeight.toString()}
          onChange={(val) => setMaxHeight(Number(val))}
          options={[
            { label: '160px', value: '160' },
            { label: '280px', value: '280' },
            { label: '无限制', value: '9999' },
          ]}
        />
      </div>

      <CodeBlock
        darkCode={sampleCode}
        lightCode={sampleCode}
        lang="tsx"
        highlight={highlight}
        maxHeight={maxHeight}
      />

      <CodeBlock darkCode={darkCode} lightCode={lightCode} lang="tsx" />
    </div>
  )
}