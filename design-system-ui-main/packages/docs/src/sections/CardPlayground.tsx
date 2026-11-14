import { useState } from 'react'
import { Card, Tag, Typography, Segmented, Dropdown, Tooltip } from 'antd'
import {
  FileTextOutlined,
  ClockCircleOutlined,
  UserOutlined,
  RiseOutlined,
  EditOutlined,
  CopyOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  MoreOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import CodeBlock from './CodeBlock'
import type { SegmentedValue } from 'antd/es/segmented'

const { Text } = Typography

/* ═══════════════════════ 平台筛选 ═══════════════════════ */
const platforms = [
  { value: 'all', label: '全部' },
  { value: 'ai', label: 'AI 平台' },
  { value: 'graph', label: '图谱平台' },
  { value: 'data', label: '数据平台' },
] as const

/* ═══════════════════════ 卡片 ①: AI 平台 · 模型内容卡片 ═══════════════════════ */
const modelCards = [
  {
    status: '已完成', color: 'var(--ds-success)', bg: 'var(--ds-success-bg)',
    borderColor: '#43CB89',
    title: '通义千问3-VL-8B-Instruct',
    desc: '支持图像、视频等多模态输入的视觉语言大模型，适用于图文理解、视觉问答、文档解析等场景',
    id: 'qwen3-vl-8b', creator: '张三', date: '2025-08-20', visibility: '公开',
  },
  {
    status: '审核中', color: 'var(--ds-warning)', bg: 'var(--ds-warning-bg)',
    borderColor: '#FFA564',
    title: 'DeepSeek-V3-0324',
    desc: 'DeepSeek 最新版本大语言模型，支持 128K 上下文窗口，在代码生成、数学推理等任务上表现优异',
    id: 'deepseek-v3-0324', creator: '李四', date: '2025-08-19', visibility: '私有',
  },
  {
    status: '草稿', color: 'var(--ds-neutral)', bg: 'var(--ds-neutral-bg)',
    borderColor: 'var(--ds-border)',
    title: 'GLM-4-9B-Chat',
    desc: '智谱 AI 推出的开源大语言对话模型，支持 128K 上下文，适用于多轮对话和复杂指令场景',
    id: 'glm-4-9b-chat', creator: '王五', date: '2025-08-18', visibility: '公开',
  },
  {
    status: '已下线', color: 'var(--ds-danger)', bg: 'var(--ds-danger-bg)',
    borderColor: '#FF6464',
    title: 'Llama-3.1-70B-Instruct',
    desc: 'Meta 开源大语言模型指令微调版本，支持多语言对话、代码生成等任务',
    id: 'llama-3.1-70b', creator: '赵六', date: '2025-08-17',
    muted: true, visibility: '私有',
  },
]

/* ═══════════════════════ 卡片 ②: AI 平台 · 统计数字卡片 ═══════════════════════ */
const statCards = [
  { label: '模型总数', value: '128', icon: <FileTextOutlined />, iconColor: 'var(--ds-primary)', iconBg: 'var(--ds-primary-subtle)' },
  { label: '已部署', value: '96', icon: <CheckCircleOutlined />, iconColor: 'var(--ds-success)', iconBg: 'var(--ds-success-bg)' },
  { label: '运行中任务', value: '23', icon: <ClockCircleOutlined />, iconColor: 'var(--ds-warning)', iconBg: 'var(--ds-warning-bg)' },
  { label: '异常告警', value: '3', icon: <ExclamationCircleOutlined />, iconColor: 'var(--ds-danger)', iconBg: 'var(--ds-danger-bg)', valueColor: 'var(--ds-danger)' },
]

/* ═══════════════════════ 卡片 ③: AI 平台 · 市场功能卡片 ═══════════════════════ */
const marketCards = [
  {
    title: '通义千问3-VL-8B-Instruct',
    isNew: true,
    id: 'qwen3-vl-8b',
    desc: '此仓库包含我们的 Tl2V-5B 模型，该模型使用先进的 Wan2.2-VAE 构建，实现了 16×16×4 的压缩比。该模型支持...',
    tags: [
      { label: 'TTS', icon: <InfoCircleOutlined /> },
      { label: '文档', icon: <FileTextOutlined /> },
      { label: '图表', icon: <RiseOutlined /> },
      { label: '表格', icon: <FileTextOutlined /> },
      { label: '搜索', icon: <SearchOutlined /> },
      { label: '问答', icon: <UserOutlined /> },
    ],
    creator: '张三', date: '2025-10-12', downloads: '12.8K',
  },
  {
    title: 'DeepSeek-V3-0324',
    isNew: false,
    id: 'deepseek-v3-0324',
    desc: 'DeepSeek 最新大语言模型，支持多轮对话、代码生成、数学推理、文本创作等任务，上下文窗口 128K...',
    tags: [
      { label: '对话', icon: <UserOutlined /> },
      { label: '代码', icon: <EditOutlined /> },
      { label: '推理', icon: <InfoCircleOutlined /> },
      { label: '创作', icon: <FileTextOutlined /> },
      { label: '翻译', icon: <CopyOutlined /> },
    ],
    creator: '李四', date: '2025-09-28', downloads: '8.3K',
  },
]

/* ═══════════════════════ 卡片 ④: 图谱平台 · 实体卡片 ═══════════════════════ */
const entityCards: Array<{
  title: string; domain: string; status: string; statusColor: string; statusBg: string;
  concepts: number; relations: number; versions: number;
  creator: string; updated: string; visibility?: string;
}> = [
  {
    title: '通义千问3-VL-8B-Instruct', domain: '通用领域',
    status: '已上线', statusColor: 'var(--ds-success)', statusBg: 'var(--ds-success-bg)',
    concepts: 63, relations: 63, versions: 63,
    creator: '创建者ID', updated: '14 小时前',
  },
  {
    title: 'DeepSeek-V3', domain: 'AI模型',
    status: '审核中', statusColor: 'var(--ds-warning)', statusBg: 'var(--ds-warning-bg)',
    concepts: 41, relations: 28, versions: 12,
    creator: '创建者ID', updated: '3 天前',
  },
  {
    title: 'GLM-4-9B', domain: '通用领域',
    status: '草稿', statusColor: 'var(--ds-neutral)', statusBg: 'var(--ds-neutral-bg)',
    concepts: 19, relations: 8, versions: 3,
    creator: '创建者ID', updated: '1 周前',
  },
]

/* ═══════════════════════ 卡片 ⑤: 数据平台 · 数据集卡片 ═══════════════════════ */
const datasetCards = [
  {
    title: 'Sentinel-3 OLCI EFR：海洋和陆地颜色仪器',
    desc: 'Landsat 9 是美国陆地卫星计划的第九颗卫星，于 2021年9月27日从加利福尼亚州范登堡空军基地发射成...',
    temporal: '2021 至今',
    tags: ['USGS', 'Landsat', 'OLI/TIRS', '中国', '16天', 'Reflectance'],
    gradient: 'linear-gradient(135deg, #1a3a5c, #1e4d6e, #0d2137)',
  },
  {
    title: '全球人口密度栅格数据（2025）',
    desc: '基于 WorldPop 项目的最新人口分布估算数据，空间分辨率 100m，覆盖全球陆地范围，采用随机森林模型...',
    temporal: '2025',
    tags: ['WorldPop', '100m', '全球', 'GeoTIFF'],
    gradient: 'linear-gradient(135deg, #2d1a3c, #3d2454, #1a0d28)',
  },
]

/* ═══════════════════════ Code Block 代码示例 ═══════════════════════ */
const modelCardCode = `// ① AI 平台 · 模型内容卡片
// 用内阴影 boxShadow: inset 实现顶部 3px 色条，天然跟随 borderRadius
// success=#43CB89 warning=#FFA564 danger=#FF6464 neutral=#323640

<Card size="small" hoverable
  style={{
    border: '1px solid var(--ds-border)',
    background: 'var(--ds-bg-elevated)',
    borderRadius: 'var(--ds-radius-lg)',
  }}
  styles={{ body: { boxShadow: 'inset 0 3px 0 0 #43CB89' } }}
>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Text strong style={{ fontSize: 16 }}>模型名称</Text>
    <Tag style={{ color: '#43CB89', background: 'rgba(52,199,126,0.15)', border: 'none' }}>
      已完成
    </Tag>
  </div>
  <p style={{ color: 'var(--ds-text-secondary)', fontSize: 14 }}>
    模型描述内容，最多两行截断...
  </p>
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--ds-divider)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{
        width: 16, height: 16, borderRadius: '50%',
        background: 'var(--ds-primary-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 8, color: 'var(--ds-primary)',
      }}>U</span>
      <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 12 }}>创建者 · 日期</span>
    </div>
    <span style={{ cursor: 'pointer', color: 'var(--ds-text-tertiary)' }}><MoreOutlined /></span>
  </div>
</Card>`

const statCardCode = `// ② AI 平台 · 统计数字卡片
// 左图标 + 右标题 + 大数字(28px/600)

<Card size="small"
  style={{
    background: 'var(--ds-bg-elevated)',
    border: '1px solid var(--ds-border)',
    borderRadius: 'var(--ds-radius-lg)',
  }}
>
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{
      width: 44, height: 44, borderRadius: '50%',
      background: 'var(--ds-primary-subtle)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon style={{ color: 'var(--ds-primary)', fontSize: 20 }} />
    </div>
    <div>
      <Text type="secondary" style={{ fontSize: 14, color: 'var(--ds-text-secondary)' }}>模型总数</Text>
      <div style={{ fontSize: 28, fontWeight: 600 }}>128</div>
    </div>
  </div>
</Card>`

const marketCardCode = `// ③ AI 平台 · 市场功能卡片
// 标题 + NEW 标签 + 模型ID + 描述 + 功能标签组 + 创建者

<Card size="small" hoverable
  style={{
    background: 'var(--ds-bg-elevated)',
    border: '1px solid var(--ds-border)',
    borderRadius: 'var(--ds-radius-lg)',
  }}
>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Text strong style={{ fontSize: 16 }}>模型名称</Text>
    <Tag style={{ margin: 0, color: 'var(--ds-success)', background: 'var(--ds-success-bg)', border: 'none' }}>NEW</Tag>
  </div>
  <div style={{ color: 'var(--ds-text-tertiary)', fontSize: 12, marginTop: 4 }}>
    模型ID <CopyOutlined />
  </div>
  <p style={{ color: 'var(--ds-text-secondary)', fontSize: 14, marginTop: 8 }}>
    描述内容，超出截断显示省略号...
  </p>
  <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
    <Tag style={{ color: 'var(--ds-text-primary)', background: 'var(--ds-bg-elevated)', border: '1px solid var(--ds-border)', borderRadius: 4 }}>能力标签</Tag>
  </div>
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--ds-divider)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <Avatar size={16} style={{ fontSize: 10 }}>U</Avatar>
      <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>创建者 · 日期</Text>
    </div>
    <Dropdown menu={{ items: [
      { key: 'edit', label: '编辑', icon: <EditOutlined /> },
      { key: 'delete', label: '删除', icon: <DeleteOutlined />, danger: true },
    ]}}>
      <span style={{ cursor: 'pointer' }}><MoreOutlined /></span>
    </Dropdown>
  </div>
</Card>`

const entityCardCode = `// ④ 图谱平台 · 实体卡片
// 标题 + 领域标签 + 状态 + 三列统计 + 创建者信息
// 色条用 inset boxShadow，天然跟随 borderRadius

<Card size="small" hoverable
  style={{
    border: '1px solid var(--ds-border)',
    background: 'var(--ds-bg-elevated)',
    borderRadius: 'var(--ds-radius-lg)',
  }}
  styles={{ body: { boxShadow: 'inset 0 3px 0 0 #43CB89' } }}
>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div>
      <Text strong style={{ fontSize: 14 }}>实体名称</Text>
      <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>通用领域</Text>
    </div>
    <Tag style={{ color: '#43CB89', background: 'rgba(52,199,126,0.15)', border: 'none' }}>
      已上线
    </Tag>
  </div>
  <div style={{ display: 'flex', gap: 32, marginTop: 12 }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 24, fontWeight: 600 }}>63</div>
      <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>概念</Text>
    </div>
    {/* 关系 / 版本 同理 */}
  </div>
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 12, borderTop: '1px solid var(--ds-divider)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <Avatar size={16} style={{ fontSize: 10 }}>U</Avatar>
      <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>创建者ID · 14 小时前</Text>
    </div>
    <Dropdown menu={{ items: [
      { key: 'edit', label: '编辑', icon: <EditOutlined /> },
      { key: 'delete', label: '删除', icon: <DeleteOutlined />, danger: true },
    ]}}>
      <span style={{ cursor: 'pointer' }}><MoreOutlined /></span>
    </Dropdown>
  </div>
</Card>`

const datasetCardCode = `// ⑤ 数据平台 · 数据集卡片
// 顶部封面图 + 标题 + 描述(2行截断) + 时相 + 标签组

<Card
  style={{
    background: 'var(--ds-bg-elevated)',
    border: '1px solid var(--ds-border)',
    borderRadius: 'var(--ds-radius-lg)',
    overflow: 'hidden',
  }}
  cover={
    <div style={{ height: 140, background: 'gradient...' }}>
      {/* 封面图 / 占位符 */}
    </div>
  }
  bodyStyle={{ padding: 16 }}
>
  <Text strong style={{ fontSize: 16 }}>数据集标题</Text>
  <p style={{ color: 'var(--ds-text-secondary)', fontSize: 14 }}>描述内容...</p>
  <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>时相：2021 至今</Text>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
    <Tag>标签</Tag>
  </div>
</Card>`


export default function CardPlayground() {
  const [platform, setPlatform] = useState<SegmentedValue>('all')

  /* ── 可见性判断 ── */
  const show = (p: string) => platform === 'all' || platform === p

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* ═══════════ 平台筛选 ═══════════ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Text type="secondary" style={{ fontSize: 13, color: 'var(--ds-text-secondary)' }}>平台筛选：</Text>
        <Segmented
          value={platform}
          onChange={setPlatform}
          options={platforms.map(p => ({ value: String(p.value), label: p.label }))}
          style={{
            background: 'var(--ds-bg-card)',
            border: '1px solid var(--ds-border)',
            borderRadius: 'var(--ds-radius-lg)',
            padding: 4,
          }}
        />
      </div>

      {/* ═══════════════════════ AI 平台卡片 ═══════════════════════ */}
      {show('ai') && (
        <>
          {/* —— 卡片 ①: 模型内容卡片 —— */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-primary)' }} />
              <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>AI 平台 · 模型内容卡片</Text>
              <Tag style={{ fontSize: 11, color: 'var(--ds-neutral)', background: 'var(--ds-neutral-bg)', border: 'none' }}>含状态色条</Tag>
            </div>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
              顶部 3px 色条区分状态（success / warning / neutral / danger），标题 + 描述(2行) + 元数据 + 状态标签
            </Text>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {modelCards.map((card) => (
                <Card
                  key={card.status}
                  size="small"
                  hoverable
                  style={{
                    border: '1px solid var(--ds-border)',
                    background: 'var(--ds-bg-elevated)',
                    borderRadius: 'var(--ds-radius-lg)',
                  }}
                  styles={{ body: { boxShadow: `inset 0 3px 0 0 ${card.borderColor}`, padding: 16 } }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <Text strong style={{ fontSize: 16, color: card.muted ? 'var(--ds-text-secondary)' : 'var(--ds-text-primary)' }}>
                      {card.title}
                    </Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                      {card.visibility && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          padding: '2px 10px', borderRadius: 4,
                          fontSize: 12, fontWeight: 500, lineHeight: '20px',
                          color: '#8a8f99',
                          background: 'rgba(200,205,215,0.08)',
                          whiteSpace: 'nowrap',
                        }}>
                          {card.visibility === '公开' ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3,21C2.44772005,21,2,20.552299,2,20L2,4C2,3.44772005,2.44772005,3,3,3L10.4141998,3L12.4142,5L20,5C20.552299,5,21,5.4477201,21,6L21,9L19,9L19,7L11.5858002,7L9.5857897,5L4,5L4,16.997999L5.5,11L22.5,11L20.1894,20.2425C20.0781,20.6877,19.678101,21,19.2192,21L3,21ZM19.9384,13L7.0615501,13L5.5615501,19L18.4384,19L19.9384,13Z" fill="#8a8f99"/></svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10.4141998,3L12.4142,5L21,5C21.552299,5,22,5.4477201,22,6L22,20C22,20.552299,21.552299,21,21,21L3,21C2.44772005,21,2,20.552299,2,20L2,4C2,3.44772005,2.44772005,3,3,3L10.4141998,3ZM9.5857897,5L4,5L4,19L20,19L20,7L11.5858002,7L9.5857897,5ZM12,9C13.1046,9,14,9.8954296,14,11C14,11.7398005,13.5983,12.3858004,13.0011,12.7318001L13,17L11,17L10.9998999,12.7323999C10.4021997,12.3865995,10,11.7403002,10,11C10,9.8954296,10.8954,9,12,9Z" fill="#8a8f99"/></svg>
                          )}
                          {card.visibility === '公开' ? '公开' : '私有'}
                        </span>
                      )}
                      <span style={{
                        display: 'inline-flex', alignItems: 'center',
                        padding: '2px 12px', borderRadius: 4,
                        fontSize: 12, fontWeight: 500, lineHeight: '20px',
                        color: card.color, background: card.bg,
                        whiteSpace: 'nowrap',
                      }}>
                        {card.status}
                      </span>
                    </div>
                  </div>
                  <p style={{
                    color: 'var(--ds-text-secondary)', fontSize: 14, lineHeight: '22px', margin: 0,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {card.desc}
                  </p>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--ds-divider)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20,22L18,22L18,20C18,18.3431,16.6569,17,15,17L9,17C7.3431501,17,6,18.3431,6,20L6,22L4,22L4,20C4,17.2386,6.2385801999999995,15,9,15L15,15C17.761400000000002,15,20,17.2386,20,20L20,22ZM12,13C8.6862898,13,6,10.3136997,6,7C6,3.68629,8.6862898,1,12,1C15.3137,1,18,3.68629,18,7C18,10.3136997,15.3137,13,12,13ZM12,11C14.2091,11,16,9.2091398,16,7C16,4.7908602,14.2091,3,12,3C9.790860200000001,3,8,4.7908602,8,7C8,9.2091398,9.790860200000001,11,12,11Z" fill="var(--ds-text-secondary)"/></svg>
                      <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>{card.creator} · {card.date}</Text>
                    </div>
                    <Dropdown menu={{ items: [{ key: 'edit', label: '编辑', icon: <EditOutlined /> }, { key: 'delete', label: '删除', icon: <DeleteOutlined />, danger: true }] }}>
                      <span style={{ cursor: 'pointer', color: 'var(--ds-text-tertiary)', fontSize: 16, lineHeight: 1 }}><MoreOutlined /></span>
                    </Dropdown>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* —— 卡片 ②: 统计数字卡片 —— */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-success)' }} />
              <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>AI 平台 · 统计数字卡片</Text>
              <Tag style={{ fontSize: 11, color: 'var(--ds-neutral)', background: 'var(--ds-neutral-bg)', border: 'none' }}>Stat Card</Tag>
            </div>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
              左侧圆形图标 + 右侧标题 + 大数字(28px/600)，图标支持 4 种语义色
            </Text>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {statCards.map((card) => (
                <Card
                  key={card.label}
                  size="small"
                  style={{
                    background: 'var(--ds-bg-elevated)',
                    border: '1px solid var(--ds-border)',
                    borderRadius: 'var(--ds-radius-lg)',
                    boxShadow: 'none',
                  }}
                  bodyStyle={{ padding: 16 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: card.iconBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ color: card.iconColor, fontSize: 20 }}>{card.icon}</span>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <Text type="secondary" style={{ fontSize: 13, display: 'block' }}>{card.label}</Text>
                      <span style={{
                        fontSize: 28, fontWeight: 600, lineHeight: '36px',
                        color: card.valueColor || 'var(--ds-text-primary)',
                      }}>
                        {card.value}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* —— 卡片 ③: 市场功能卡片 —— */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-warning)' }} />
              <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>AI 平台 · 市场功能卡片</Text>
              <Tag style={{ fontSize: 11, color: 'var(--ds-neutral)', background: 'var(--ds-neutral-bg)', border: 'none' }}>Market Card</Tag>
            </div>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
              标题 + NEW 标签 + 模型ID + 描述(截断) + 功能标签组 + 创建者信息
            </Text>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {marketCards.map((card) => (
                <Card
                  key={card.title}
                  size="small"
                  hoverable
                  style={{
                    background: 'var(--ds-bg-elevated)',
                    border: '1px solid var(--ds-border)',
                    borderRadius: 'var(--ds-radius-lg)',
                  }}
                  bodyStyle={{ padding: 16 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Text strong style={{ fontSize: 16, color: 'var(--ds-text-primary)' }}>{card.title}</Text>
                    {card.isNew && (
                      <Tag style={{ margin: 0, fontSize: 11, color: 'var(--ds-success)', background: 'var(--ds-success-bg)', border: 'none' }}>NEW</Tag>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>模型ID: {card.id}</Text>
                    <CopyOutlined style={{ fontSize: 12, color: 'var(--ds-text-tertiary)', cursor: 'pointer' }} />
                  </div>
                  <p style={{
                    color: 'var(--ds-text-secondary)', fontSize: 14, lineHeight: '22px', margin: 0,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {card.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                    {card.tags.slice(0, 3).map((tag) => (
                      <Tag
                        key={tag.label}
                        style={{
                          color: 'var(--ds-text-secondary)',
                          background: 'var(--ds-bg-elevated)',
                          border: '1px solid var(--ds-border)',
                          borderRadius: 4,
                          fontSize: 12,
                          display: 'flex', alignItems: 'center', gap: 4,
                        }}
                      >
                        <span style={{ fontSize: 12 }}>{tag.icon}</span>
                        {tag.label}
                      </Tag>
                    ))}
                    {card.tags.length > 3 && (
                      <Tooltip title={card.tags.slice(3).map(t => t.label).join('、')}>
                        <Tag style={{
                          color: 'var(--ds-text-secondary)',
                          background: 'var(--ds-bg-elevated)',
                          border: '1px solid var(--ds-border)',
                          borderRadius: 4, fontSize: 12, cursor: 'pointer',
                          letterSpacing: '0.5px',
                        }}>+{card.tags.length - 3}</Tag>
                      </Tooltip>
                    )}
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--ds-divider)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20,22L18,22L18,20C18,18.3431,16.6569,17,15,17L9,17C7.3431501,17,6,18.3431,6,20L6,22L4,22L4,20C4,17.2386,6.2385801999999995,15,9,15L15,15C17.761400000000002,15,20,17.2386,20,20L20,22ZM12,13C8.6862898,13,6,10.3136997,6,7C6,3.68629,8.6862898,1,12,1C15.3137,1,18,3.68629,18,7C18,10.3136997,15.3137,13,12,13ZM12,11C14.2091,11,16,9.2091398,16,7C16,4.7908602,14.2091,3,12,3C9.790860200000001,3,8,4.7908602,8,7C8,9.2091398,9.790860200000001,11,12,11Z" fill="var(--ds-text-secondary)"/></svg>
                      <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>{card.creator} · {card.date}</Text>
                      {card.downloads && (<><Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}> · </Text><svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M3,19L21,19L21,21L3,21L3,19ZM13,13.1716L19.0711,7.1005001L20.4853,8.51472L12,17L3.51471996,8.51472L4.9289298,7.1005001L11,13.1716L11,2L13,2L13,13.1716Z" fill="var(--ds-text-secondary)"/></svg><Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>{card.downloads}</Text></>)}
                    </div>
                    <Dropdown menu={{ items: [{ key: 'edit', label: '编辑', icon: <EditOutlined /> }, { key: 'delete', label: '删除', icon: <DeleteOutlined />, danger: true }] }}>
                      <span style={{ cursor: 'pointer', color: 'var(--ds-text-tertiary)', fontSize: 16, lineHeight: 1 }}><MoreOutlined /></span>
                    </Dropdown>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════ 图谱平台卡片 ═══════════════════════ */}
      {show('graph') && (
        <>
          {/* —— 卡片 ④: 实体卡片 —— */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-primary)' }} />
              <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>图谱平台 · 实体卡片</Text>
              <Tag style={{ fontSize: 11, color: 'var(--ds-neutral)', background: 'var(--ds-neutral-bg)', border: 'none' }}>Entity Card</Tag>
            </div>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
              标题 + 领域标签 + 状态标签(R) + 三列统计(概念/关系/版本) + 创建者 + 更新时间
            </Text>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              {entityCards.map((card) => (
                <Card
                  key={card.title}
                  size="small"
                  hoverable
                  style={{
                    border: '1px solid var(--ds-border)',
                    background: 'var(--ds-bg-elevated)',
                    borderRadius: 'var(--ds-radius-lg)',
                  }}
                  styles={{ body: { boxShadow: `inset 0 3px 0 0 ${card.statusColor}`, padding: 16 } }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>{card.title}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>{card.domain}</Text>
                    </div>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '2px 12px', borderRadius: 4,
                      fontSize: 12, fontWeight: 500, lineHeight: '20px',
                      color: card.statusColor, background: card.statusBg,
                      whiteSpace: 'nowrap',
                    }}>
                      {card.status}
                    </span>
                    {card.visibility && (
                      <span style={{
                        fontSize: 12, fontWeight: 400, lineHeight: '20px',
                        color: card.visibility === '公开' ? 'var(--ds-success)' : 'var(--ds-text-tertiary)',
                        whiteSpace: 'nowrap',
                      }}>
                        {card.visibility === '公开' ? '🌐 公开' : '🔒 私有'}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 32, justifyContent: 'flex-start', marginBottom: 12 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--ds-text-primary)', lineHeight: '32px' }}>{card.concepts}</div>
                      <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>概念</Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--ds-text-primary)', lineHeight: '32px' }}>{card.relations}</div>
                      <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>关系</Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--ds-text-primary)', lineHeight: '32px' }}>{card.versions}</div>
                      <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>版本</Text>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingTop: 12, borderTop: '1px solid var(--ds-divider)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{
                        width: 16, height: 16, borderRadius: '50%',
                        background: 'var(--ds-primary-subtle)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 8, color: 'var(--ds-primary)',
                      }}>U</span>
                      <Text type="secondary" style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>{card.creator} · {card.updated}</Text>
                    </div>
                    <Dropdown menu={{ items: [{ key: 'edit', label: '编辑', icon: <EditOutlined /> }, { key: 'delete', label: '删除', icon: <DeleteOutlined />, danger: true }] }}>
                      <span style={{ cursor: 'pointer', color: 'var(--ds-text-tertiary)', fontSize: 16, lineHeight: 1 }}><MoreOutlined /></span>
                    </Dropdown>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════ 数据平台卡片 ═══════════════════════ */}
      {show('data') && (
        <>
          {/* —— 卡片 ⑤: 数据集卡片 —— */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-success)' }} />
              <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>数据平台 · 数据集卡片</Text>
              <Tag style={{ fontSize: 11, color: 'var(--ds-neutral)', background: 'var(--ds-neutral-bg)', border: 'none' }}>Dataset Card</Tag>
            </div>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
              顶部封面图 + 标题 + 描述(2行截断) + 时相信息 + 底部标签组(Chips)
            </Text>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {datasetCards.map((card) => (
                <Card
                  key={card.title}
                  hoverable
                  style={{
                    background: 'var(--ds-bg-elevated)',
                    border: '1px solid var(--ds-border)',
                    borderRadius: 'var(--ds-radius-lg)',
                    overflow: 'hidden',
                  }}
                  cover={
                    <div style={{
                      height: 140,
                      background: card.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute', inset: 0, opacity: 0.15,
                        background: `radial-gradient(ellipse at 30% 50%, rgba(74,144,217,0.8) 0%, transparent 60%),
                                     radial-gradient(ellipse at 70% 30%, rgba(67,203,137,0.6) 0%, transparent 40%)`,
                      }} />
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4 }}>
                        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1" />
                        <circle cx="12" cy="12" r="1" fill="white" />
                      </svg>
                    </div>
                  }
                  bodyStyle={{ padding: 16 }}
                >
                  <Text strong style={{ fontSize: 16, color: 'var(--ds-text-primary)' }}>{card.title}</Text>
                  <p style={{
                    color: 'var(--ds-text-secondary)', fontSize: 14, lineHeight: '22px', marginTop: 8, marginBottom: 8,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {card.desc}
                  </p>
                  <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>
                    时相：{card.temporal}
                  </Text>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {card.tags.map((tag) => (
                      <Tag
                        key={tag}
                        style={{
                          color: 'var(--ds-text-secondary)',
                          background: 'var(--ds-bg-elevated)',
                          border: '1px solid var(--ds-border)',
                          borderRadius: 4,
                          fontSize: 12,
                        }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════ 代码示例 ═══════════════════════ */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-text-tertiary)' }} />
          <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>代码示例</Text>
        </div>
        <CodeBlock
          darkCode={[modelCardCode, statCardCode, marketCardCode, entityCardCode, datasetCardCode].join('\n\n')}
          lightCode={[modelCardCode, statCardCode, marketCardCode, entityCardCode, datasetCardCode].join('\n\n')}
        />
      </div>
    </div>
  )
}
