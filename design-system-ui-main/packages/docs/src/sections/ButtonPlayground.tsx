import { useState } from 'react'
import { Button, Segmented, Switch, Space, Typography } from 'antd'
import { PlusOutlined, ReloadOutlined, DeleteOutlined, RightOutlined } from '@ant-design/icons'
import CodeBlock from './CodeBlock'

const { Text } = Typography

export default function ButtonPlayground() {
  const [disabled, setDisabled] = useState(false)
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('middle')

  const darkCode = `// 按钮 (Button) · 暗色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorPrimary / defaultBg / defaultBorderColor 等 → 见 src/theme/antd-theme.ts
import { Button } from 'antd'

<Button type="primary" size="middle" icon={<PlusOutlined />}>
  新建任务
</Button>

<Button size="middle" icon={<ReloadOutlined />}>
  刷新列表
</Button>

<Button type="text" size="middle">
  查看详情
</Button>

<Button type="primary" danger size="middle" icon={<DeleteOutlined />}>
  删除任务
</Button>`

  const lightCode = `// 按钮 (Button) · 亮色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorPrimary / defaultBg / defaultBorderColor 等 → 见 src/theme/antd-theme.ts
import { Button } from 'antd'

<Button type="primary" size="middle" icon={<PlusOutlined />}>
  新建任务
</Button>

<Button size="middle" icon={<ReloadOutlined />}>
  刷新列表
</Button>

<Button type="text" size="middle">
  查看详情
</Button>

<Button type="primary" danger size="middle" icon={<DeleteOutlined />}>
  删除任务
</Button>`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text type="secondary" style={{ fontSize: 12 }}>交互范例 · Interactive Example</Text>
        <Space>
          <Text type="secondary" style={{ fontSize: 12 }}>禁用</Text>
          <Switch checked={disabled} onChange={setDisabled} size="small" />
        </Space>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Text type="secondary" style={{ fontSize: 12, width: 60 }}>尺寸</Text>
        <Segmented
          size="small"
          value={size}
          onChange={(val) => setSize(val as 'small' | 'middle' | 'large')}
          options={[
            { label: '小 sm', value: 'small' },
            { label: '中 md', value: 'middle' },
            { label: '大 lg', value: 'large' },
          ]}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Text type="secondary" style={{ fontSize: 12, width: 60, textAlign: 'right' }}>主按钮</Text>
          <Button type="primary" size={size} icon={<PlusOutlined />} disabled={disabled}>
            新建任务
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Text type="secondary" style={{ fontSize: 12, width: 60, textAlign: 'right' }}>次按钮</Text>
          <Button size={size} icon={<ReloadOutlined />} disabled={disabled}>
            刷新列表
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Text type="secondary" style={{ fontSize: 12, width: 60, textAlign: 'right' }}>文字按钮</Text>
          <Button type="text" size={size} disabled={disabled}>
            查看详情 <RightOutlined style={{ fontSize: 12 }} />
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Text type="secondary" style={{ fontSize: 12, width: 60, textAlign: 'right' }}>危险按钮</Text>
          <Button type="primary" danger size={size} icon={<DeleteOutlined />} disabled={disabled}>
            删除任务
          </Button>
        </div>
      </div>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
