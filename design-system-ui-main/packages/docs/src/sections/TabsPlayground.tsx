import { useState } from 'react'
import { Typography, Table, Tag, Button } from 'antd'
import CodeBlock from './CodeBlock'

const { Text } = Typography

export default function TabsPlayground() {
  const [activeSeg, setActiveSeg] = useState('全部')
  const [activeLine, setActiveLine] = useState('转换任务列表')
  const [demoFilter, setDemoFilter] = useState('全部')

  const segTabs = ['全部', '新能源', '地质', '气象']
  const segDisabled = new Set(['地质'])
  const lineTabs = ['转换任务列表', '新建转换任务']

  // 下划线标签 — 内容区表格数据
  interface TaskRecord {
    key: string; task: string; status: string; progress: number; nodeId: string; source: string; target: string; creator: string; time: string;
  }
  const taskData: TaskRecord[] = [
    { key: '1', task: 'file_convert_batch_01', status: '失败', progress: 20, nodeId: 'fc_4d17395f56fb4499', source: '/bigdata/datalake/spat...', target: '/bigdata/download/xia...', creator: 'xiaowei.shao', time: '2026-06-01 13:11' },
    { key: '2', task: 'etl_pipeline_daily_02', status: '成功', progress: 100, nodeId: 'fc_e293a8f49d384d8', source: '/bigdata/datalake/spat...', target: '/bigdata/download/jing...', creator: 'jing.li', time: '2026-06-02 09:45' },
    { key: '3', task: 'data_sync_hourly_03', status: '进行中', progress: 65, nodeId: 'fc_7a2b1c3d4e5f6789', source: '/bigdata/stream/kafka...', target: '/bigdata/warehouse/ods...', creator: 'wei.jin', time: '2026-06-02 10:30' },
    { key: '4', task: 'backup_full_04', status: '成功', progress: 100, nodeId: 'fc_a1b2c3d4e5f67890', source: '/bigdata/backup/nas...', target: '/bigdata/archive/cold...', creator: 'admin', time: '2026-06-01 22:00' },
  ]

  // 分段控制器范例 — 按分类筛选数据（必须在 taskData 之后）
  const demoData: Record<string, TaskRecord[]> = {
    '全部': taskData,
    '新能源': taskData.filter(t => t.status === '成功'),
    '地质': taskData.filter(t => t.status === '进行中'),
    '气象': taskData.slice(0, 1),
  }

  const darkCode = `// 分段控制器 (Segmented) · 暗色主题
//   容器背景: var(--ds-bg-input)          → #1d1f23
//   容器边框: var(--ds-border)            → #323640
//   激活填充: var(--ds-primary)           → #5264E0
//   激活文字: var(--ds-text-inverse)       → #ffffff
//   Hover背景: var(--ds-bg-hover)         → #2a2c30
//   Hover文字: var(--ds-text-primary)      → #f2f3f5
//   默认文字: var(--ds-text-secondary)     → #8a8f99

// ═══ 分段控制器 ═══
<div style={{
  display: 'inline-flex', gap: 8, padding: 4,
  background: 'var(--ds-bg-input)',
  borderRadius: 6,
  border: '1px solid var(--ds-border)',
}}>
  {tabs.map(tab => (
    <button style={{
      height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingLeft: 10, paddingRight: 10,
      fontSize: 12, lineHeight: '18px',
      fontWeight: active === tab ? 500 : 400,
      color: active === tab
        ? 'var(--ds-text-inverse)'
        : 'var(--ds-text-secondary)',
      background: active === tab
        ? 'var(--ds-primary)'
        : 'transparent',
      borderRadius: 4, border: 'none', cursor: 'pointer',
      transition: 'all 0.2s',
    }}
    onMouseEnter={e => {
      if (active !== tab) {
        e.currentTarget.style.background = 'var(--ds-bg-hover)'
        e.currentTarget.style.color = 'var(--ds-text-primary)'
      }
    }}
    onMouseLeave={e => {
      if (active !== tab) {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'var(--ds-text-secondary)'
      }
    }}>
      {tab}
    </button>
  ))}
</div>

// ═══ 下划线标签 ═══
<div style={{ display: 'flex', gap: 32, borderBottom: '1px solid var(--ds-border)' }}>
  {tabs.map(tab => (
    <button style={{
      paddingBottom: 12, fontSize: 14, lineHeight: '22px',
      fontWeight: active === tab ? 600 : 400,
      color: active === tab
        ? 'var(--ds-text-primary)'
        : 'var(--ds-text-secondary)',
      borderBottom: active === tab
        ? '2px solid var(--ds-primary)'
        : '2px solid transparent',
      background: 'transparent', cursor: 'pointer',
      transition: 'all 0.2s',
      marginBottom: -1,
    }}
    onMouseEnter={e => {
      if (active !== tab) e.currentTarget.style.color = 'var(--ds-text-primary)'
    }}
    onMouseLeave={e => {
      if (active !== tab) e.currentTarget.style.color = 'var(--ds-text-secondary)'
    }}>
      {tab}
    </button>
  ))}
</div>`

  const lightCode = `// 分段控制器 (Segmented) · 亮色主题
//   容器背景: var(--ds-bg-input)          → #f5f6fa
//   容器边框: var(--ds-border)            → #e4e5e9
//   激活填充: var(--ds-primary)           → #5264E0  (不变)
//   激活文字: var(--ds-text-inverse)       → #ffffff  (不变)
//   Hover背景: var(--ds-bg-hover)         → #f5f6fa
//   Hover文字: var(--ds-text-primary)      → #3d414a
//   默认文字: var(--ds-text-secondary)     → #787b84

// ═══ 分段控制器 ═══
<div style={{
  display: 'inline-flex', gap: 8, padding: 4,
  background: 'var(--ds-bg-input)',
  borderRadius: 6,
  border: '1px solid var(--ds-border)',
}}>
  {tabs.map(tab => (
    <button style={{
      height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingLeft: 10, paddingRight: 10,
      fontSize: 12, lineHeight: '18px',
      fontWeight: active === tab ? 500 : 400,
      color: active === tab
        ? 'var(--ds-text-inverse)'
        : 'var(--ds-text-secondary)',
      background: active === tab
        ? 'var(--ds-primary)'
        : 'transparent',
      borderRadius: 4, border: 'none', cursor: 'pointer',
      transition: 'all 0.2s',
    }}
    onMouseEnter={e => {
      if (active !== tab) {
        e.currentTarget.style.background = 'var(--ds-bg-hover)'
        e.currentTarget.style.color = 'var(--ds-text-primary)'
      }
    }}
    onMouseLeave={e => {
      if (active !== tab) {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'var(--ds-text-secondary)'
      }
    }}>
      {tab}
    </button>
  ))}
</div>

// ═══ 下划线标签 ═══
<div style={{ display: 'flex', gap: 32, borderBottom: '1px solid var(--ds-border)' }}>
  {tabs.map(tab => (
    <button style={{
      paddingBottom: 12, fontSize: 14, lineHeight: '22px',
      fontWeight: active === tab ? 600 : 400,
      color: active === tab
        ? 'var(--ds-text-primary)'
        : 'var(--ds-text-secondary)',
      borderBottom: active === tab
        ? '2px solid var(--ds-primary)'
        : '2px solid transparent',
      background: 'transparent', cursor: 'pointer',
      transition: 'all 0.2s',
      marginBottom: -1,
    }}
    onMouseEnter={e => {
      if (active !== tab) e.currentTarget.style.color = 'var(--ds-text-primary)'
    }}
    onMouseLeave={e => {
      if (active !== tab) e.currentTarget.style.color = 'var(--ds-text-secondary)'
    }}>
      {tab}
    </button>
  ))}
</div>`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Text type="secondary" style={{ fontSize: 12 }}>
        两种分类标签样式 · 用于大容器下多个平级页面的分类切换需求
      </Text>

      {/* ═══ 样式一：分段控制器 ═══ */}
      <div style={{ padding: 20, borderRadius: 8, background: 'var(--ds-bg-base)', border: '1px solid var(--ds-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-primary)' }} />
          <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>分段控制器</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>Segmented Control</Text>
        </div>
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
          容器包裹 → 仅激活项填充 · Hover 灰色底衬 + 文字提亮
        </Text>

        <div
          role="tablist"
          aria-label="分类标签"
          style={{
            display: 'inline-flex',
            gap: 8,
            padding: 4,
            background: 'var(--ds-bg-input)',
            borderRadius: 6,
            border: '1px solid var(--ds-border)',
          }}
        >
          {segTabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeSeg === tab}
              aria-disabled={segDisabled.has(tab)}
              onClick={() => !segDisabled.has(tab) && setActiveSeg(tab)}
              style={{
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 12,
                lineHeight: '18px',
                fontWeight: activeSeg === tab ? 500 : 400,
                background: activeSeg === tab ? 'var(--ds-primary)' : 'transparent',
                color: activeSeg === tab ? 'var(--ds-text-inverse)' : segDisabled.has(tab) ? 'var(--ds-text-tertiary)' : 'var(--ds-text-secondary)',
                opacity: segDisabled.has(tab) ? 0.4 : 1,
                borderRadius: 4,
                border: 'none',
                cursor: segDisabled.has(tab) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!segDisabled.has(tab) && activeSeg !== tab) {
                  (e.currentTarget as HTMLElement).style.background = 'var(--ds-bg-hover)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--ds-text-primary)'
                }
              }}
              onMouseLeave={(e) => {
                if (!segDisabled.has(tab) && activeSeg !== tab) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--ds-text-secondary)'
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── 分段控制器 — 应用范例：content card 内筛选 ── */}
        <div style={{ marginTop: 20 }}>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>
            典型应用：content card 内做筛选切换 · 左右布局（segmented + 操作按钮）
          </Text>
          <div style={{ padding: 20, background: 'var(--ds-bg-card)', borderRadius: 8, border: '1px solid var(--ds-border)' }}>
            {/* Filter Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Segmented */}
                <div style={{
                  display: 'inline-flex', gap: 8, padding: 4,
                  background: 'var(--ds-bg-input)', borderRadius: 6,
                  border: '1px solid var(--ds-border)',
                }}>
                  {['全部', '新能源', '地质', '气象'].map((t) => (
                    <div key={t} onClick={() => setDemoFilter(t)} style={{
                      height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      paddingLeft: 10, paddingRight: 10, fontSize: 12, lineHeight: '18px',
                      fontWeight: demoFilter === t ? 500 : 400,
                      background: demoFilter === t ? 'var(--ds-primary)' : 'transparent',
                      color: demoFilter === t ? 'var(--ds-text-inverse)' : 'var(--ds-text-secondary)',
                      borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s ease',
                    }}>{t}</div>
                  ))}
                </div>
                <Button type="primary" size="small">新建</Button>
                <Button size="small" style={{ background: 'transparent', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)' }}>批量操作</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ height: 32, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', background: 'var(--ds-bg-input)', borderRadius: 6, border: '1px solid var(--ds-border)' }}>
                  🔍
                  <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 13 }}>搜索</span>
                </div>
                <Button size="small" style={{ background: 'transparent', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)' }}>
                  ⬇ 导出
                </Button>
              </div>
            </div>
            {/* Table */}
            <Table<TaskRecord>
              columns={[
                { title: '名称', dataIndex: 'task', width: 220, render: (v: string) => <span style={{ color: 'var(--ds-primary)', fontSize: 13 }}>{v}</span> },
                { title: '状态', dataIndex: 'status', width: 100, render: (s: string) => {
                  const color = s === '成功' ? 'success' : s === '失败' ? 'error' : 'processing';
                  return <Tag color={color}>{s}</Tag>;
                }},
                { title: '进度', dataIndex: 'progress', width: 160, render: (p: number) => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 6, background: 'var(--ds-bg-input)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${p}%`, height: 6, background: p === 100 ? 'var(--ds-success)' : p < 50 ? 'var(--ds-danger)' : 'var(--ds-primary)', borderRadius: 3 }} />
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>{p}%</Text>
                  </div>
                )},
                { title: '负责人', dataIndex: 'creator', width: 100, render: (v: string) => <Text type="secondary" style={{ fontSize: 13 }}>{v}</Text> },
                { title: '更新时间', dataIndex: 'time', width: 150, render: (v: string) => <Text style={{ fontSize: 12, color: 'var(--ds-text-tertiary)' }}>{v}</Text> },
              ]}
              dataSource={demoData[demoFilter]}
              pagination={false}
              size="small"
              locale={{ emptyText: <Text type="secondary" style={{ fontSize: 13 }}>该分类暂无数据</Text> }}
            />
          </div>
        </div>
      </div>

      {/* ═══ 样式二：下划线标签 ═══ */}
      <div style={{ padding: 20, borderRadius: 8, background: 'var(--ds-bg-base)', border: '1px solid var(--ds-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-primary)' }} />
          <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>下划线标签</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>Underline Tabs</Text>
        </div>
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
          content-tabbar + content-card 两段式布局 · card 内边距 20px · 间距 16px
        </Text>

        {/* ── content-tabbar 区域 — 独立卡片 ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--ds-border)',
          background: 'var(--ds-bg-card)',
          border: '1px solid var(--ds-border)',
          borderRadius: 8,
          overflow: 'hidden',
        }}>
          {lineTabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeLine === tab}
              onClick={() => setActiveLine(tab)}
              style={{
                height: 44,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 16,
                paddingRight: 16,
                fontSize: 14,
                fontWeight: activeLine === tab ? 500 : 400,
                lineHeight: '22px',
                color: activeLine === tab ? 'var(--ds-text-primary)' : 'var(--ds-text-secondary)',
                borderBottom: activeLine === tab ? '2px solid var(--ds-primary)' : '2px solid transparent',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (activeLine !== tab) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--ds-text-primary)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeLine !== tab) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--ds-text-secondary)'
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── content-card 区域 — 独立卡片 ── */}
        <div style={{ padding: 20, background: 'var(--ds-bg-card)', borderRadius: 8, border: '1px solid var(--ds-border)' }}>
          {activeLine === '转换任务列表' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Filter Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button type="primary" icon={<span>+</span>} size="small">新建转换</Button>
                  <Button size="small" style={{ background: 'transparent', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)' }}>刷新</Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Text type="secondary" style={{ fontSize: 13 }}>转换状态</Text>
                  <div style={{ height: 32, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', background: 'var(--ds-bg-input)', borderRadius: 6, border: '1px solid var(--ds-border)' }}>
                    <span style={{ color: 'var(--ds-text-primary)', fontSize: 13 }}>全部</span>
                    <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 10 }}>▼</span>
                  </div>
                  <Tag color="blue" style={{ margin: 0 }}>4</Tag>
                </div>
              </div>
              {/* Table */}
              <Table<TaskRecord>
                columns={[
                  { title: '任务', dataIndex: 'task', width: 200 },
                  { title: '状态', dataIndex: 'status', width: 100, render: (s: string) => {
                    const color = s === '成功' ? 'success' : s === '失败' ? 'error' : 'processing';
                    return <Tag color={color}>{s}</Tag>;
                  }},
                  { title: '进度', dataIndex: 'progress', width: 160, render: (p: number) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: 'var(--ds-bg-input)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${p}%`, height: 6, background: p === 100 ? 'var(--ds-success)' : p < 50 ? 'var(--ds-danger)' : 'var(--ds-primary)', borderRadius: 3 }} />
                      </div>
                      <Text type="secondary" style={{ fontSize: 12, width: 32 }}>{p}%</Text>
                    </div>
                  )},
                  { title: '节点ID', dataIndex: 'nodeId', width: 180, render: (v: string) => <Text type="secondary" style={{ fontSize: 12 }}>{v}</Text> },
                  { title: '数据来源', dataIndex: 'source', width: 220, render: (v: string) => <Text type="secondary" style={{ fontSize: 13 }}>{v}</Text> },
                  { title: '数据去向', dataIndex: 'target', width: 220, render: (v: string) => <Text type="secondary" style={{ fontSize: 13 }}>{v}</Text> },
                  { title: '创建人', dataIndex: 'creator', width: 100, render: (v: string) => <Text type="secondary" style={{ fontSize: 13 }}>{v}</Text> },
                  { title: '创建时间', dataIndex: 'time', width: 150, render: (v: string) => <Text style={{ fontSize: 12, color: 'var(--ds-text-tertiary)' }}>{v}</Text> },
                  { title: '操作', key: 'action', width: 100, render: () => <a style={{ color: 'var(--ds-primary)', fontSize: 13 }}>查看详情</a> },
                ]}
                dataSource={taskData}
                pagination={{ size: 'small', showSizeChanger: false, total: 48, style: { marginTop: 12 } }}
                size="small"
                scroll={{ x: 1400 }}
              />
            </div>
          )}
          {activeLine === '新建转换任务' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>任务名称</Text>
                  <div style={{ height: 36, display: 'flex', alignItems: 'center', padding: '0 12px', background: 'var(--ds-bg-input)', borderRadius: 6, border: '1px solid var(--ds-border)' }}>
                    <span style={{ color: 'var(--ds-text-primary)', fontSize: 14 }}>数据同步任务_2026Q2</span>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>转换类型</Text>
                  <div style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', background: 'var(--ds-bg-input)', borderRadius: 6, border: '1px solid var(--ds-border)' }}>
                    <span style={{ color: 'var(--ds-text-primary)', fontSize: 14 }}>全量同步</span>
                    <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 10 }}>▼</span>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>数据源</Text>
                  <div style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', background: 'var(--ds-bg-input)', borderRadius: 6, border: '1px solid var(--ds-border)' }}>
                    <span style={{ color: 'var(--ds-text-primary)', fontSize: 14 }}>MySQL_prod_cluster</span>
                    <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 10 }}>▼</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>任务描述</Text>
                <div style={{ padding: '8px 12px', minHeight: 64, background: 'var(--ds-bg-input)', borderRadius: 6, border: '1px solid var(--ds-border)' }}>
                  <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 14 }}>将生产集群数据同步至分析库，用于 Q2 季度数据报表生成</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Button size="small" style={{ background: 'transparent', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)' }}>重置</Button>
                <Button type="primary" size="small">提交任务</Button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
