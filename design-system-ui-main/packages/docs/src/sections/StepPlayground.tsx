import { useState } from 'react'
import { Steps, Button, Card, Typography, Space } from 'antd'
import {
  CloudUploadOutlined,
  ApiOutlined,
  MergeCellsOutlined,
  AuditOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import CodeBlock from './CodeBlock'

const { Text } = Typography

const stepItems = [
  { title: '上传文献', subTitle: 'Upload', description: '上传PDF或Word格式文献', icon: <CloudUploadOutlined /> },
  { title: '信息抽取', subTitle: 'Extract', description: '自动提取关键概念与关系', icon: <ApiOutlined /> },
  { title: '知识融合', subTitle: 'Merge', description: '将新知识与现有图谱融合', icon: <MergeCellsOutlined /> },
  { title: '人工审核', subTitle: 'Review', description: '专家审核并确认结果', icon: <AuditOutlined /> },
  { title: '发布图谱', subTitle: 'Publish', description: '正式发布到知识库', icon: <RocketOutlined /> },
]

export default function StepPlayground() {
  const [current, setCurrent] = useState(2)

  const darkCode = `// 步骤条 (Steps) · 暗色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorPrimary / colorTextDescription: 'var(--ds-text-secondary)' → #8a8f99  描述文字
import { useState } from 'react'
import { Steps, Button, Space } from 'antd'

const [current, setCurrent] = useState(0)

const items = [
  { title: '上传文献', description: '上传PDF或Word格式文献' },
  { title: '信息抽取', description: '自动提取关键概念与关系' },
  { title: '知识融合', description: '将新知识与现有图谱融合' },
  { title: '人工审核', description: '专家审核并确认结果' },
  { title: '发布图谱', description: '正式发布到知识库' },
]

{/* 点击切换步骤 */}
<Steps
  current={current}
  onChange={setCurrent}
  items={items}
  size="small"
/>

{/* 步骤详情 + 导航按钮 */}
<div style={{ marginTop: 16 }}>
  <p>当前步骤：{items[current].title} — {items[current].description}</p>
  <Space>
    {current > 0 && (
      <Button onClick={() => setCurrent(current - 1)}>上一步</Button>
    )}
    {current < items.length - 1 && (
      <Button type="primary" onClick={() => setCurrent(current + 1)}>下一步</Button>
    )}
    {current === items.length - 1 && (
      <Button type="primary" style={{ background: 'var(--ds-success)' }}>完成</Button>
    )}
  </Space>
</div>`

  const lightCode = `// 步骤条 (Steps) · 亮色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorPrimary / colorTextDescription: 'var(--ds-text-secondary)' → #5c5f66  描述文字
import { useState } from 'react'
import { Steps, Button, Space } from 'antd'

const [current, setCurrent] = useState(0)

const items = [
  { title: '上传文献', description: '上传PDF或Word格式文献' },
  { title: '信息抽取', description: '自动提取关键概念与关系' },
  { title: '知识融合', description: '将新知识与现有图谱融合' },
  { title: '人工审核', description: '专家审核并确认结果' },
  { title: '发布图谱', description: '正式发布到知识库' },
]

{/* 点击切换步骤 */}
<Steps
  current={current}
  onChange={setCurrent}
  items={items}
  size="small"
/>

{/* 步骤详情 + 导航按钮 */}
<div style={{ marginTop: 16 }}>
  <p>当前步骤：{items[current].title} — {items[current].description}</p>
  <Space>
    {current > 0 && (
      <Button onClick={() => setCurrent(current - 1)}>上一步</Button>
    )}
    {current < items.length - 1 && (
      <Button type="primary" onClick={() => setCurrent(current + 1)}>下一步</Button>
    )}
    {current === items.length - 1 && (
      <Button type="primary" style={{ background: 'var(--ds-success)' }}>完成</Button>
    )}
  </Space>
</div>`

  const stepsItems = stepItems.map((item, index) => ({
    title: (
      <div>
        <div style={{ fontWeight: index <= current ? 500 : 400 }}>{item.title}</div>
        <div style={{ fontSize: 11, opacity: 0.5 }}>{item.subTitle}</div>
      </div>
    ),
    description: item.description,
    icon: index < current ? undefined : item.icon,
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Text type="secondary" style={{ fontSize: 12 }}>
        交互范例 · 点击步骤切换 Click step to navigate
      </Text>

      <Card>
        <Steps
          current={current}
          onChange={setCurrent}
          items={stepsItems}
          size="small"
          style={{ marginBottom: 16 }}
        />

        {/* 当前步骤详情 */}
        <Card size="small" style={{ marginTop: 16 }}>
          <Space>
            <Text strong>{stepItems[current].title}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {stepItems[current].subTitle}
            </Text>
            <Text type="secondary" style={{ fontSize: 11, background: 'var(--ds-primary-subtle)', color: 'var(--ds-primary)', padding: '0 8px', borderRadius: 4 }}>
              步骤 {current + 1} / {stepItems.length}
            </Text>
          </Space>
          <p style={{ marginTop: 8 }}>{stepItems[current].description}</p>
          <Space style={{ marginTop: 12 }}>
            {current > 0 && (
              <Button onClick={() => setCurrent(current - 1)}>
                上一步 Prev
              </Button>
            )}
            {current < stepItems.length - 1 && (
              <Button type="primary" onClick={() => setCurrent(current + 1)}>
                下一步 Next
              </Button>
            )}
            {current === stepItems.length - 1 && (
              <Button type="primary" style={{ background: 'var(--ds-success)', borderColor: 'var(--ds-success)' }}>
                完成 Done
              </Button>
            )}
          </Space>
        </Card>
      </Card>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
