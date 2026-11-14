import { useState } from 'react'
import { Table, Tag, Button, Space, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import CodeBlock from './CodeBlock'

const { Text } = Typography

interface DataType {
  key: number
  name: string
  field: string
  status: string
  papers: number
  time: string
}

export default function TablePlayground() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const data: DataType[] = [
    { key: 1, name: '基于U-Net深度学习网络的风速预报订正...', field: '气象', status: '进行中', papers: 0, time: '2025-08-20' },
    { key: 2, name: '一种融合大语言模型与知识图谱的电力数据...', field: '金融', status: '待确认', papers: 1, time: '2025-08-20' },
    { key: 3, name: '复杂地形风场多尺度耦合的地形边界效应研究...', field: '医疗', status: '草稿', papers: 3, time: '2025-08-20' },
    { key: 4, name: '基于注意力机制的遥感图像语义分割方法...', field: '计算机', status: '已完成', papers: 7, time: '2025-08-19' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case '进行中': return 'processing'
      case '待确认': return 'warning'
      case '草稿': return 'default'
      case '已完成': return 'success'
      default: return 'default'
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '任务名称 Task',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
      ellipsis: true,
    },
    {
      title: '领域 Field',
      dataIndex: 'field',
      key: 'field',
      width: '10%',
    },
    {
      title: '状态 Status',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: '文献数 Papers',
      dataIndex: 'papers',
      key: 'papers',
      width: '10%',
    },
    {
      title: '更新时间 Time',
      dataIndex: 'time',
      key: 'time',
      width: '15%',
    },
    {
      title: '操作 Action',
      key: 'action',
      width: '15%',
      render: (_) => (
        <Space size="middle">
          <Button type="link" size="small" style={{ padding: 0 }}>
            查看 View
          </Button>
          <Button type="link" size="small" danger style={{ padding: 0 }}>
            删除 Delete
          </Button>
        </Space>
      ),
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  }

  const darkCode = `// 表格 (Table) · 暗色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   headerBg: 'var(--ds-bg-elevated)'          → #2C2E31  表头背景
//   headerColor: 'var(--ds-text-primary)'       → #d0d2d8  表头文字
//   borderColor: 'var(--ds-border)'             → #323640  描边/分割线
//   rowHoverBg: 'var(--ds-bg-elevated)'         → #2C2E31  行悬停
//   rowSelectedBg: 'var(--ds-primary-subtle)'   → rgba(82,100,224,0.06)  选中行
//   cellPaddingBlock: 12px                        → 单元格上下内边距
//   cellPaddingInline: 16px                       → 单元格左右内边距
//   表格文字颜色由全局 --ds-text-primary 控制     → #d0d2d8  单元格文字
//   链接色: var(--ds-text-link) / var(--ds-danger)  操作列链接/删除
import { Table, Tag } from 'antd'

const columns = [
  { title: '任务名称', dataIndex: 'name', key: 'name' },
  { title: '领域', dataIndex: 'field', key: 'field' },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === '进行中' ? 'processing' : 'default'}>
        {status}
      </Tag>
    ),
  },
  { title: '文献数', dataIndex: 'papers', key: 'papers' },
  { title: '更新时间', dataIndex: 'time', key: 'time' },
  { title: '操作', key: 'action', render: () => (
    <Space>
      <a>查看</a>
      <a style={{ color: 'var(--ds-danger)' }}>删除</a>
    </Space>
  )},
]

<Table
  rowSelection={rowSelection}
  columns={columns}
  dataSource={data}
  size="middle"
  pagination={false}
/>`

  const lightCode = `// 表格 (Table) · 亮色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   headerBg: 'var(--ds-bg-elevated)'           → #f5f6fa  表头背景
//   headerColor: 'var(--ds-text-secondary)'     → #5c5f66  表头文字
//   borderColor: 'var(--ds-border)'              → #e4e5e9  描边/分割线
//   rowHoverBg: '#f8f9fc'                           → —        行悬停 (亮色专用色)
//   rowSelectedBg: 'var(--ds-primary-subtle)'    → rgba(82,100,224,0.04)  选中行
//   cellPaddingBlock: 12px                          → 单元格上下内边距
//   cellPaddingInline: 16px                         → 单元格左右内边距
//   表格文字颜色由全局 --ds-text-primary 控制      → #1d1f23  单元格文字
//   链接色: var(--ds-text-link) / var(--ds-danger)  操作列链接/删除
import { Table, Tag } from 'antd'

const columns = [
  { title: '任务名称', dataIndex: 'name', key: 'name' },
  { title: '领域', dataIndex: 'field', key: 'field' },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === '进行中' ? 'processing' : 'default'}>
        {status}
      </Tag>
    ),
  },
  { title: '文献数', dataIndex: 'papers', key: 'papers' },
  { title: '更新时间', dataIndex: 'time', key: 'time' },
  { title: '操作', key: 'action', render: () => (
    <Space>
      <a>查看</a>
      <a style={{ color: 'var(--ds-danger)' }}>删除</a>
    </Space>
  )},
]

<Table
  rowSelection={rowSelection}
  columns={columns}
  dataSource={data}
  size="middle"
  pagination={false}
/>`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          交互范例 · 可勾选行 Interactive Table
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          已选 {selectedRowKeys.length} 项
        </Text>
      </div>

      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={false}
        scroll={{ x: 800 }}
      />

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
