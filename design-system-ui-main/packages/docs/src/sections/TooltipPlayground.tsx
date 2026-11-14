import { Tooltip, Button, Table, Typography, Space, Popover } from 'antd'
import {
  DeleteOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { useTheme } from '../theme'
import CodeBlock from './CodeBlock'

const { Text } = Typography

export default function TooltipPlayground() {
  const { mode } = useTheme()

  const darkCode = `// 气泡/提示 (Tooltip) · 暗色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorBgSpotlight: 'var(--ds-bg-elevated)' → #2C2E31  气泡背景
//   样式 Token 详见上方 Style Spec 表格（背景色、边框、文字、圆角、阴影等 9 项）
import { Tooltip, Popover } from 'antd'
import { DeleteOutlined, LinkOutlined } from '@ant-design/icons'

{/* 四个弹出方向 */}
<Tooltip title="上方提示" placement="top">
  <Button>上方 Top</Button>
</Tooltip>
<Tooltip title="下方提示" placement="bottom">
  <Button>下方 Bottom</Button>
</Tooltip>
<Tooltip title="左侧提示" placement="left">
  <Button>左侧 Left</Button>
</Tooltip>
<Tooltip title="右侧提示" placement="right">
  <Button>右侧 Right</Button>
</Tooltip>

{/* 按钮关联 */}
<Tooltip title="点击提交后将进入审核流程">
  <Button type="primary">提交</Button>
</Tooltip>

<Tooltip title="删除此节点">
  <Button danger icon={<DeleteOutlined />} />
</Tooltip>

{/* Popover · 点击触发的富文本气泡 */}
<Popover title="节点详情" content="这是知识图谱节点的详细信息" trigger="click">
  <Button type="link" icon={<LinkOutlined />}>知识图谱节点</Button>
</Popover>`

  const lightCode = `// 气泡/提示 (Tooltip) · 亮色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorBgSpotlight: 'var(--ds-bg-elevated)' → #2e323a  气泡背景（暗色固定）
//   样式 Token 详见上方 Style Spec 表格（背景色、边框、文字、圆角、阴影等 9 项）
import { Tooltip, Popover } from 'antd'
import { DeleteOutlined, LinkOutlined } from '@ant-design/icons'

{/* 四个弹出方向 */}
<Tooltip title="上方提示" placement="top">
  <Button>上方 Top</Button>
</Tooltip>
<Tooltip title="下方提示" placement="bottom">
  <Button>下方 Bottom</Button>
</Tooltip>
<Tooltip title="左侧提示" placement="left">
  <Button>左侧 Left</Button>
</Tooltip>
<Tooltip title="右侧提示" placement="right">
  <Button>右侧 Right</Button>
</Tooltip>

{/* 按钮关联 */}
<Tooltip title="点击提交后将进入审核流程">
  <Button type="primary">提交</Button>
</Tooltip>

<Tooltip title="删除此节点">
  <Button danger icon={<DeleteOutlined />} />
</Tooltip>

{/* Popover · 点击触发的富文本气泡 */}
<Popover title="节点详情" content="这是知识图谱节点的详细信息" trigger="click">
  <Button type="link" icon={<LinkOutlined />}>知识图谱节点</Button>
</Popover>`

  const specData = [
    { key: 'bg', label: '背景色 Background', dark: 'var(--ds-bg-elevated)', light: 'var(--ds-bg-card)' },
    { key: 'border', label: '边框色 Border', dark: 'var(--ds-border)', light: '#333640' },
    { key: 'text', label: '文字色 Text', dark: 'var(--ds-text-inverse)', light: 'var(--ds-text-inverse)' },
    { key: 'size', label: '字号 Font Size', dark: '12px', light: '12px' },
    { key: 'padding', label: '内边距 Padding', dark: '8px 12px', light: '8px 12px' },
    { key: 'radius', label: '圆角 Radius', dark: '8px', light: '8px' },
    { key: 'arrow', label: '箭头尺寸 Arrow', dark: '5px', light: '5px' },
    { key: 'shadow', label: '阴影 Shadow', dark: '0 4px 12px rgba(0,0,0,0.15)', light: '0 4px 12px rgba(0,0,0,0.15)' },
    { key: 'offset', label: '间距 Offset', dark: '8px', light: '8px' },
  ]

  const specColumns = [
    { title: '属性', dataIndex: 'label', key: 'label', width: '50%' },
    {
      title: '值',
      key: 'value',
      render: (_: any, record: typeof specData[0]) => (
        <Text code style={{ fontSize: 12 }}>
          {mode === 'dark' ? record.dark : record.light}
        </Text>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <Text type="secondary" style={{ fontSize: 12 }}>
          样式规范 · Tooltip Specification
        </Text>
      </div>

      {/* 弹出方向展示 */}
      <div>
        <Text strong style={{ display: 'block', marginBottom: 12 }}>
          弹出方向 Placement
        </Text>
        <Space size="large" wrap>
          <Tooltip title="上方提示" placement="top">
            <Button>上方 Top</Button>
          </Tooltip>
          <Tooltip title="下方提示" placement="bottom">
            <Button>下方 Bottom</Button>
          </Tooltip>
          <Tooltip title="左侧提示" placement="left">
            <Button>左侧 Left</Button>
          </Tooltip>
          <Tooltip title="右侧提示" placement="right">
            <Button>右侧 Right</Button>
          </Tooltip>
        </Space>
      </div>

      {/* 样式参数 */}
      <div>
        <Text strong style={{ display: 'block', marginBottom: 12 }}>
          样式参数 Style Spec
        </Text>
        <Table
          columns={specColumns}
          dataSource={specData}
          pagination={false}
          size="small"
        />
      </div>

      {/* 按钮关联演示 */}
      <div>
        <Text strong style={{ display: 'block', marginBottom: 12 }}>
          按钮关联演示 Button Context
        </Text>
        <Space size="large" wrap>
          <Tooltip title="点击提交后将进入审核流程" placement="top">
            <Button type="primary">提交</Button>
          </Tooltip>

          <Tooltip title="删除此节点" placement="top">
            <Button danger icon={<DeleteOutlined />} />
          </Tooltip>

          <Popover
            title="节点详情"
            content="这是知识图谱节点的详细信息，包含概念、关系和版本信息"
            trigger="click"
          >
            <Button type="link" icon={<LinkOutlined />}>
              知识图谱节点
            </Button>
          </Popover>
        </Space>
      </div>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
