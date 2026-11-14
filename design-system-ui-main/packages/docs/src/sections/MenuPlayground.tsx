import { useState } from 'react'
import { Switch, Space, Typography } from 'antd'
import DataPlatformLayout from '../components/ui/DataPlatformLayout'
import { type NavCategory } from '../components/ui/SidebarMenu'
import CodeBlock from './CodeBlock'

/** 导航 SVG 图标路径（来自 MasterGo UX 设计稿 417:008165） */
const ICONS = {
  home: '/icons/nav/icon-home.svg',
  search: '/icons/nav/icon-search.svg',
  integration: '/icons/nav/icon-integration.svg',
  governance: '/icons/nav/icon-governance.svg',
  develop: '/icons/nav/icon-develop.svg',
  ops: '/icons/nav/icon-ops.svg',
  assets: '/icons/nav/icon-assets.svg',
  service: '/icons/nav/icon-service.svg',
  collapse: '/icons/nav/icon-collapse.svg',
} as const

const { Text } = Typography

/** 导航菜单数据 —— 1:1 复刻 MasterGo UX 设计稿 417:008165 */
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
      {
        key: 'integration',
        label: '数据集成',
        icon: ICONS.integration,
        children: [
          { key: 'datasource', label: '数据源管理', icon: null },
          { key: 'sync', label: '数据同步', icon: null },
          { key: 'convert', label: '格式转换', icon: null },
          { key: 'download', label: '数据下载', icon: null },
          { key: 'upload', label: '文件上传', icon: null },
        ],
      },
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

const darkCode = `// 数据平台布局 (DataPlatformLayout) · 暗色主题
// 设计来源: MasterGo UX 设计稿 417:008165

import DataPlatformLayout from '@/components/ui/DataPlatformLayout'
import { type NavCategory } from '@/components/ui/SidebarMenu'

/** 导航 SVG 图标路径（来自 MasterGo 设计稿导出） */
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
      {
        key: 'integration', label: '数据集成', icon: ICONS.integration,
        children: [
          { key: 'datasource', label: '数据源管理', icon: null },
          { key: 'sync', label: '数据同步', icon: null },
          { key: 'convert', label: '格式转换', icon: null },
          { key: 'download', label: '数据下载', icon: null },
          { key: 'upload', label: '文件上传', icon: null },
        ],
      },
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

function App() {
  const [activeKey, setActiveKey] = useState('home')
  const [collapsed, setCollapsed] = useState(false)

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
      {/* 页面内容 */}
      <h1>欢迎使用数据中台</h1>
    </DataPlatformLayout>
  )
}`

const lightCode = `// 数据平台布局 (DataPlatformLayout) · 亮色主题
// 设计来源: MasterGo UX 设计稿 417:008165
// 侧边栏 token 值见下方 Token 说明表格

import DataPlatformLayout from '@/components/ui/DataPlatformLayout'
import { type NavCategory } from '@/components/ui/SidebarMenu'

/** 导航 SVG 图标路径（来自 MasterGo 设计稿导出） */
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
  { label: '概览', items: [
    { key: 'home', label: '首页', icon: ICONS.home },
    { key: 'search', label: '数据检索', icon: ICONS.search },
  ]},
  {
    label: '数据工厂', items: [
      { key: 'integration', label: '数据集成', icon: ICONS.integration,
        children: [
          { key: 'datasource', label: '数据源管理', icon: null },
          { key: 'sync', label: '数据同步', icon: null },
        ],
      },
      { key: 'governance', label: '数据治理', icon: ICONS.governance },
      { key: 'develop', label: '数据开发', icon: ICONS.develop },
      { key: 'ops', label: '数据运维', icon: ICONS.ops },
    ],
  },
  { label: '服务中心', items: [
    { key: 'assets', label: '数据资产', icon: ICONS.assets },
    { key: 'service', label: '数据服务', icon: ICONS.service },
  ]},
]

function App() {
  const [activeKey, setActiveKey] = useState('home')
  const [collapsed, setCollapsed] = useState(false)

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
      <h1>欢迎使用数据中台</h1>
    </DataPlatformLayout>
  )
}`

export default function MenuPlayground() {
  const [activeKey, setActiveKey] = useState('home')
  const [collapsed, setCollapsed] = useState(false)

  // 获取当前激活项的名称
  const activeLabel = (() => {
    for (const cat of navCategories) {
      for (const item of cat.items) {
        if (item.key === activeKey) return `${cat.label} › ${item.label}`
        if (item.children) {
          const child = item.children.find((c) => c.key === activeKey)
          if (child) return `${cat.label} › ${item.label} › ${child.label}`
        }
      }
    }
    return activeKey
  })()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 控制栏 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          交互范例 · 完整数据平台布局（1:1 复刻 MasterGo 设计稿）
        </Text>
        <Space size="middle">
          <Space>
            <Text type="secondary" style={{ fontSize: 12 }}>折叠侧边栏</Text>
            <Switch checked={collapsed} onChange={setCollapsed} size="small" />
          </Space>
        </Space>
      </div>

      {/* 当前激活项指示 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>当前激活：</Text>
        <span
          style={{
            padding: '2px 10px',
            borderRadius: 4,
            background: 'var(--ds-primary-subtle)',
            color: 'var(--ds-primary)',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {activeLabel}
        </span>
      </div>

      {/* 完整布局预览 */}
      <div
        style={{
          height: 560,
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid var(--ds-border)',
        }}
      >
        <DataPlatformLayout
          sidebar={{
            categories: navCategories,
            activeKey,
            onSelect: setActiveKey,
            collapsed,
            onToggleCollapse: () => setCollapsed(!collapsed),
          }}
        >
          {/* 内容区占位 */}
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* 模拟 Tab 栏 — 复刻设计稿 */}
            <div
              style={{
                display: 'flex',
                gap: 0,
                padding: '0 24px 0 0',
                background: 'var(--ds-bg-card)',
                border: '0.5px solid var(--ds-border)',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              {[
                { key: 'download', label: '数据下载', icon: '/icons/icon-book.svg' },
                { key: 'tasks', label: '下载任务管理', icon: '/icons/icon-book.svg' },
              ].map((tab, idx) => (
                <div
                  key={tab.key}
                  style={{
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '4px 12px',
                    borderBottom: idx === 0 ? '2px solid var(--ds-primary)' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (idx !== 0) (e.currentTarget as HTMLElement).style.color = 'var(--ds-text-primary)'
                  }}
                  onMouseLeave={(e) => {
                    if (idx !== 0) (e.currentTarget as HTMLElement).style.color = 'var(--ds-text-secondary)'
                  }}
                >
                  <img src={tab.icon} alt="" style={{ width: 16, height: 16, opacity: 0.7 }} />
                  <span
                    style={{
                      color: idx === 0 ? 'var(--ds-text-primary)' : 'var(--sidebar-foreground)',
                      fontSize: 14,
                      fontFamily: 'Source Han Sans, sans-serif',
                      lineHeight: '20px',
                    }}
                  >
                    {tab.label}
                  </span>
                </div>
              ))}
            </div>

            {/* 占位内容卡片 */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--ds-bg-card)',
                border: '0.5px solid var(--ds-border)',
                borderRadius: 8,
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: 'var(--ds-primary-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={ICONS.home} alt="" style={{ width: 32, height: 32 }} />
              </div>
              <span style={{ color: 'var(--ds-text-primary)', fontSize: 18, fontWeight: 600 }}>
                {navCategories.flatMap((c) => c.items).find((i) => i.key === activeKey)?.label ?? '数据中台'}
              </span>
              <span style={{ color: 'var(--sidebar-foreground)', fontSize: 14 }}>
                点击左侧菜单切换页面 · 二级菜单可展开/折叠
              </span>
            </div>
          </div>
        </DataPlatformLayout>
      </div>

      {/* 设计 Token 说明 */}
      <div>
        <h3 style={{ color: 'var(--ds-text-primary)', fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
          侧边导航栏 Token（MasterGo 节点 447:15054「右侧导航栏」）
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 10,
          }}
        >
          {[
            { label: '容器宽度', value: '200px' },
            { label: '容器背景', value: '#17191C' },
            { label: '一级菜单高度', value: '44px' },
            { label: '二级菜单高度', value: '36px' },
            { label: '二级左侧连线', value: '1px var(--sidebar-border)' },
            { label: '一级图标尺寸', value: '24×24px' },
            { label: '分类标题字号', value: '13px / #5C5F66' },
            { label: '菜单文字字号', value: '14px / #5C5F66' },
            { label: '激活背景', value: 'rgba(255,255,255,0.08)' },
            { label: '激活文字', value: '#FFF / weight 700' },
            { label: '圆角', value: '4px' },
            { label: '菜单间距 gap', value: '8px' },
            { label: '水平内边距', value: '12px' },
            { label: '二级缩进', value: '24px 占位' },
            { label: '展开箭头', value: 'ChevronDown 14px' },
          ].map((token) => (
            <div
              key={token.label}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                background: 'var(--ds-bg-card)',
                border: '1px solid var(--ds-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ color: 'var(--ds-text-secondary)', fontSize: 12 }}>{token.label}</span>
              <span style={{ color: 'var(--ds-text-primary)', fontSize: 12, fontWeight: 600, fontFamily: 'monospace' }}>
                {token.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
