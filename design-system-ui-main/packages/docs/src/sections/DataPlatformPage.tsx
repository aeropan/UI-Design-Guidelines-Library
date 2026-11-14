import { useState } from 'react'
import { Table, Button, Input, Tag, Space, Breadcrumb, Typography, Pagination } from 'antd'
import {
  PlusOutlined,
  ReloadOutlined,
  RightOutlined,
} from '@ant-design/icons'
import DataPlatformLayout from '../components/ui/DataPlatformLayout'
import { type NavCategory } from '../components/ui/SidebarMenu'

const { Text } = Typography
const { Search } = Input

const ICONS = {
  home: '/icons/nav/icon-home.svg',
  search: '/icons/nav/icon-search.svg',
  integration: '/icons/nav/icon-integration.svg',
  governance: '/icons/nav/icon-governance.svg',
  develop: '/icons/nav/icon-develop.svg',
  ops: '/icons/nav/icon-ops.svg',
  assets: '/icons/nav/icon-assets.svg',
  service: '/icons/nav/icon-service.svg',
}

const navCategories: NavCategory[] = [
  {
    label: '概览',
    items: [
      { key: 'home', label: '首页', icon: ICONS.home },
      { key: 'search', label: '数据检索', icon: ICONS.search },
    ],
  },
  {
    label: '数据工厂',
    items: [
      { key: 'integration', label: '数据集成', icon: ICONS.integration },
      { key: 'governance', label: '数据治理', icon: ICONS.governance },
      { key: 'develop', label: '数据开发', icon: ICONS.develop },
      { key: 'ops', label: '数据运维', icon: ICONS.ops },
    ],
  },
  {
    label: '服务中心',
    items: [
      { key: 'assets', label: '数据资产', icon: ICONS.assets },
      { key: 'service', label: '数据服务', icon: ICONS.service },
    ],
  },
]

const mockData = [
  { task: 'file_convert_batch_01', status: 'success', progress: 100, nodeId: 'node-12', source: '/data/raw/sensor/2025', target: '/data/processed/parquet/', creator: '张三', time: '2025-08-20 14:30', key: '1' },
  { task: 'etl_pipeline_daily_02', status: 'running', progress: 67, nodeId: 'node-08', source: '/data/raw/logs/app/', target: '/data/warehouse/facts/', creator: '李四', time: '2025-08-20 13:15', key: '2' },
  { task: 'schema_migration_v3', status: 'failed', progress: 42, nodeId: 'node-05', source: '/legacy/mysql/prod_db', target: '/data/platform/postgres/', creator: '王五', time: '2025-08-20 11:00', key: '3' },
  { task: 'data_cleanse_weekly', status: 'queued', progress: 0, nodeId: 'node-21', source: '/data/raw/api/external', target: '/data/trusted/json/', creator: '赵六', time: '2025-08-20 16:45', key: '4' },
  { task: 'stream_ingest_kafka', status: 'success', progress: 100, nodeId: 'node-03', source: 'kafka://events/platform', target: '/data/lake/raw/events/', creator: '张三', time: '2025-08-20 09:20', key: '5' },
  { task: 'ml_feature_join', status: 'running', progress: 88, nodeId: 'node-15', source: '/data/warehouse/dims/', target: '/data/ml/features/v2/', creator: '李四', time: '2025-08-20 15:10', key: '6' },
  { task: 'backup_archive_q3', status: 'success', progress: 100, nodeId: 'node-07', source: '/data/production/all', target: '/archive/2025/q3/', creator: '王五', time: '2025-08-19 22:00', key: '7' },
  { task: 'partition_rebalance', status: 'queued', progress: 0, nodeId: 'node-18', source: '/data/lake/partitioned/', target: '/data/lake/rebalanced/', creator: '赵六', time: '2025-08-20 17:30', key: '8' },
]

const statusMap: Record<string, { color: string; label: string }> = {
  success: { color: 'var(--ds-success)', label: '成功' },
  running: { color: 'var(--ds-primary)', label: '运行中' },
  failed:  { color: 'var(--ds-danger)',  label: '失败' },
  queued:  { color: 'var(--ds-neutral)', label: '排队中' },
}

const progressColor = (pct: number) => {
  if (pct === 100) return 'var(--ds-success)'
  if (pct >= 50) return 'var(--ds-primary)'
  if (pct > 0) return 'var(--ds-warning)'
  return 'var(--ds-text-tertiary)'
}

export default function DataPlatformPage() {
  const [activeKey, setActiveKey] = useState('integration')
  const [collapsed, setCollapsed] = useState(false)

  const columns = [
    {
      title: '任务',
      dataIndex: 'task',
      key: 'task',
      width: 200,
      render: (text: string) => (
        <Text style={{ color: 'var(--ds-text-primary)', fontSize: 14, fontWeight: 500 }}>{text}</Text>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const s = statusMap[status]
        return (
          <Tag style={{ color: s.color, background: `${s.color}15`, border: 'none', borderRadius: 4, fontSize: 12 }}>
            {s.label}
          </Tag>
        )
      },
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      width: 180,
      render: (pct: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--ds-bg-elevated)', overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', borderRadius: 3, background: progressColor(pct), transition: 'width 0.3s ease' }} />
          </div>
          <Text style={{ color: 'var(--ds-text-secondary)', fontSize: 12, width: 36, textAlign: 'right' }}>{pct}%</Text>
        </div>
      ),
    },
    {
      title: '节点ID',
      dataIndex: 'nodeId',
      key: 'nodeId',
      width: 100,
      render: (id: string) => <Text code style={{ fontSize: 12 }}>{id}</Text>,
    },
    {
      title: '数据来源',
      dataIndex: 'source',
      key: 'source',
      width: 220,
      ellipsis: true,
      render: (text: string) => <Text style={{ color: 'var(--ds-text-secondary)', fontSize: 13 }}>{text}</Text>,
    },
    {
      title: '数据去向',
      dataIndex: 'target',
      key: 'target',
      width: 220,
      ellipsis: true,
      render: (text: string) => <Text style={{ color: 'var(--ds-text-secondary)', fontSize: 13 }}>{text}</Text>,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 80,
      render: (text: string) => <Text style={{ color: 'var(--ds-text-secondary)', fontSize: 13 }}>{text}</Text>,
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
      width: 150,
      render: (text: string) => <Text style={{ color: 'var(--ds-text-tertiary)', fontSize: 12 }}>{text}</Text>,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: () => (
        <Space size="middle">
          <a style={{ color: 'var(--ds-text-link)', fontSize: 13 }}>查看详情 <RightOutlined style={{ fontSize: 10 }} /></a>
        </Space>
      ),
    },
  ]

  return (
    <DataPlatformLayout
      platformName="数据中台"
      userName="金玮 8801"
      sidebar={{
        categories: navCategories,
        activeKey,
        onSelect: setActiveKey,
        collapsed,
        onToggleCollapse: () => setCollapsed(!collapsed),
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 20 }}>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { title: <Text style={{ color: 'var(--ds-text-tertiary)', fontSize: 14 }}>数据集成</Text> },
            { title: <Text style={{ color: 'var(--ds-text-tertiary)', fontSize: 14 }}>格式转换</Text> },
            { title: <Text style={{ color: 'var(--ds-text-primary)', fontSize: 14, fontWeight: 500 }}>任务列表</Text> },
          ]}
        />

        {/* Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Space size={12}>
            <Button type="primary" icon={<PlusOutlined />}>新建转换</Button>
            <Button icon={<ReloadOutlined />}>刷新</Button>
          </Space>
          <Search
            placeholder="输入任务名称搜索"
            allowClear
            style={{ width: 280 }}
          />
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={mockData}
          pagination={false}
          scroll={{ x: 1400 }}
          size="middle"
        />

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: 'var(--ds-text-secondary)', fontSize: 14 }}>
            共 {mockData.length} 条
          </Text>
          <Pagination defaultCurrent={1} total={mockData.length * 5} showSizeChanger={false} pageSize={8} />
        </div>
      </div>
    </DataPlatformLayout>
  )
}