import { useState } from 'react'
import { Tag, Typography, Space, Card } from 'antd'
import CodeBlock from './CodeBlock'

const { Text } = Typography

export default function TagPlayground() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [visible, setVisible] = useState<Record<string, boolean>>({
    '进行中': true,
    '已完成': true,
    '草稿': true,
    '建议复审': true,
    '不建议使用': true,
  })

  const statuses = [
    { cn: '进行中', en: 'Processing', color: 'var(--ds-primary)' },
    { cn: '已完成', en: 'Completed', color: 'var(--ds-success)' },
    { cn: '草稿', en: 'Draft', color: 'default' },
    { cn: '建议复审', en: 'Review', color: 'var(--ds-warning)' },
    { cn: '不建议使用', en: 'Rejected', color: 'var(--ds-danger)' },
  ]

  const handleClose = (cn: string) => {
    setVisible((prev) => ({ ...prev, [cn]: false }))
  }

  const selected = statuses.find((s) => s.cn === selectedTag)

  const darkCode = selected
    ? `// 标签 (Tag) · 暗色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   color="processing" →  var(--ds-primary)    → #5264E0  品牌色/进行中
//   color="success"    →  var(--ds-success)    → #43CB89  成功/已完成
//   color="warning"    →  var(--ds-warning)    → #FFA564  警告/待确认
//   color="error"      →  var(--ds-danger)     → #FF6464  危险/不建议
//   color="default"    →  默认                      → —        灰色/草稿
//   背景色由 Ant Design 自动从语义色派生 (opacity 0.12~0.15)
//   defaultBg: 'var(--ds-neutral-bg)'           → rgba(200,205,215,0.1)
//   defaultColor: 'var(--ds-neutral)'            → #8a8f99
//   字号: fontSizeSM: 12px, lineHeightSM: 1.5       → 参见 src/theme/antd-theme.ts
<Tag${
  selected.color === 'default'
    ? ''
    : selected.color === 'var(--ds-primary)'
    ? ' color="processing"'
    : selected.color === 'var(--ds-success)'
    ? ' color="success"'
    : selected.color === 'var(--ds-warning)'
    ? ' color="warning"'
    : ' color="error"'
}>
  ${selected.cn} ${selected.en}
</Tag>`
    : '// 点击上方标签查看对应代码'

  const lightCode = selected
    ? `// 标签 (Tag) · 亮色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   color="processing" →  var(--ds-primary)    → #5264E0  品牌色/进行中
//   color="success"    →  var(--ds-success)    → #43CB89  成功/已完成
//   color="warning"    →  var(--ds-warning)    → #FFA564  警告/待确认
//   color="error"      →  var(--ds-danger)     → #FF6464  危险/不建议
//   color="default"    →  默认                      → —        灰色/草稿
//   背景色由 Ant Design 自动从语义色派生 (opacity 0.08~0.12)
//   defaultBg: 'var(--ds-neutral-bg)'           → rgba(0,0,0,0.04)
//   defaultColor: 'var(--ds-neutral)'            → #8c8c8c
<Tag${
  selected.color === 'default'
    ? ''
    : selected.color === 'var(--ds-primary)'
    ? ' color="processing"'
    : selected.color === 'var(--ds-success)'
    ? ' color="success"'
    : selected.color === 'var(--ds-warning)'
    ? ' color="warning"'
    : ' color="error"'
}>
  ${selected.cn} ${selected.en}
</Tag>`
    : '// 点击上方标签查看对应代码'

  const getTagColor = (color: string) => {
    switch (color) {
      case 'var(--ds-primary)': return 'processing'
      case 'var(--ds-success)': return 'success'
      case 'var(--ds-warning)': return 'warning'
      case 'var(--ds-danger)': return 'error'
      default: return 'default'
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Text type="secondary" style={{ fontSize: 12 }}>
        交互范例 · 点击标签查看配色代码，可关闭标签
      </Text>

      <Space size={[8, 8]} wrap>
        {statuses.map((s) => {
          if (!visible[s.cn]) return null
          const isActive = selectedTag === s.cn
          const tagColor = getTagColor(s.color)
          return (
            <Tag
              key={s.cn}
              color={tagColor}
              closable
              onClose={() => handleClose(s.cn)}
              onClick={() => setSelectedTag(isActive ? null : s.cn)}
              style={{
                cursor: 'pointer',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.15s',
                fontSize: 12,
              }}
            >
              {s.cn} <span style={{ opacity: 0.6 }}>{s.en}</span>
            </Tag>
          )
        })}
      </Space>

      {selected && (
        <Card size="small" title={`配色详情 · ${selected.cn}`} style={{ maxWidth: 500 }}>
          <Space direction="vertical" size="small">
            <Text>主色: <Text code style={{ color: selected.color }}>{selected.color}</Text></Text>
            <Text>Ant Design Tag Color: <Text code>{getTagColor(selected.color)}</Text></Text>
          </Space>
        </Card>
      )}

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
