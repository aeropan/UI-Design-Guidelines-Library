import { useState, useCallback, useEffect, useRef } from 'react'
import {
  Layout,
  Menu,
  Button,
  Breadcrumb,
  Typography,
  Select,
  theme as antdTheme,
  App as AntdApp,
} from 'antd'
import {
  Palette,
  Type,
  LayoutGrid,
  Box,
  MousePointerClick,
  BookOpen,
  Layers,
  Sun,
  Moon,
  Copy,
  Check,
} from 'lucide-react'
import { useTheme } from './theme'
import ColorsSection from './sections/ColorsSection'
import TypographySection from './sections/TypographySection'
import SpacingSection from './sections/SpacingSection'
import ComponentsSection from './sections/ComponentsSection'
import InteractionsSection from './sections/InteractionsSection'
import PrinciplesSection from './sections/PrinciplesSection'
import ShadowPlayground from './sections/ShadowPlayground'
import IconLibrarySection from './sections/IconLibrarySection'
import AnnouncementBanner from './sections/AnnouncementBanner'

const { Sider, Header, Content } = Layout
const { Text } = Typography

const mainNavItems = [
  { key: 'colors', label: '色彩系统', subtitle: 'Color System', icon: Palette },
  { key: 'typography', label: '排版系统', subtitle: 'Typography', icon: Type },
  { key: 'spacing', label: '间距与布局', subtitle: 'Spacing & Layout', icon: LayoutGrid },
  { key: 'components', label: '组件规范', subtitle: 'Components', icon: Box },
  { key: 'shadow', label: '投影与层级', subtitle: 'Shadow & Elevation', icon: Layers },
  { key: 'interactions', label: '交互演示', subtitle: 'Interactions', icon: MousePointerClick },
  { key: 'icon-library', label: 'Icon 组件库', subtitle: 'Icon Library', icon: Box },
  { key: 'principles', label: '设计原则', subtitle: 'UX Principles', icon: BookOpen },
]

const compSubItems = [
  { key: 'comp-button', label: '按钮 Button' },
  { key: 'comp-input', label: '输入控件 Input' },
  { key: 'comp-tag', label: '状态标签 Tag' },
  { key: 'comp-card', label: '卡片 Card' },
  { key: 'comp-table', label: '表格 Table' },
  { key: 'comp-modal', label: '弹窗 Modal' },
  { key: 'comp-step', label: '步骤条 Steps' },
  { key: 'comp-calendar', label: '日历 Calendar' },
  { key: 'comp-loading', label: '加载/空状态 Loading' },
  { key: 'comp-tooltip', label: '气泡/提示 Tooltip' },
  { key: 'comp-menu', label: '导航菜单 Menu' },
  { key: 'comp-pagination', label: '分页器 Pagination' },
  { key: 'comp-upload', label: '上传 Upload' },
  { key: 'comp-tabs', label: '分类标签 Tabs' },
  { key: 'comp-codeblock', label: '代码块 CodeBlock' },
]

/** 所有需要被 observer 监听的 section id */
const allSectionIds = [
  'colors', 'typography', 'spacing', 'components',
  ...compSubItems.map(c => c.key),
  'shadow', 'interactions', 'principles', 'icon-library',
]

/** 根据子组件 id 判断它属于哪个父 section */
function parentSection(id: string): string {
  if (id.startsWith('comp-')) return 'components'
  return id
}

function AppContent() {
  const { message } = AntdApp.useApp()
  const [copied, setCopied] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState('colors')
  const [activeCompSub, setActiveCompSub] = useState('comp-button')
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const { mode, toggle } = useTheme()
  const isDark = mode === 'dark'
  const { token } = antdTheme.useToken()
  const scrollingFromNav = useRef(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const isCompActive = activeSection === 'components'
  const currentNav = mainNavItems.find((i) => i.key === activeSection)
  const currentComp = compSubItems.find((c) => c.key === activeCompSub)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }).catch(() => {
      // Fallback for HTTP/non-secure contexts
    })
  }

  // ── Global IntersectionObserver ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingFromNav.current) return

        let topMostId: string | null = null
        let topMostDistance = Infinity

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const distance = Math.abs(entry.boundingClientRect.top)
            if (distance < topMostDistance) {
              topMostDistance = distance
              topMostId = entry.target.id
            }
          }
        }

        if (topMostId) {
          const parent = parentSection(topMostId)
          setActiveSection(parent)
          if (topMostId.startsWith('comp-')) {
            setActiveCompSub(topMostId)
          }

          // 同步 hash
          const hash = '#' + topMostId
          if (window.location.hash !== hash) {
            history.replaceState(null, '', hash)
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -80% 0px',
        threshold: [0, 0.25],
      }
    )

    // 延迟观察，等 DOM 就绪
    const timer = setTimeout(() => {
      allSectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 300)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  // ── Content 容器内精确滚动（避免 scrollIntoView 滚动 window 导致 Header 消失）──
  const scrollContentTo = (targetId: string) => {
    const el = document.getElementById(targetId)
    const container = contentRef.current
    if (!el || !container) return
    const containerTop = container.getBoundingClientRect().top
    const elTop = el.getBoundingClientRect().top
    container.scrollTo({
      top: container.scrollTop + elTop - containerTop - 24,
      behavior: 'smooth',
    })
  }

  // ── 页面加载时处理 hash ──
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      scrollingFromNav.current = true
      setTimeout(() => {
        scrollContentTo(hash)
        setTimeout(() => { scrollingFromNav.current = false }, 700)
      }, 400)
    }
  }, [])

  // ── Sidebar 点击 → 滚动 ──
  const scrollToSection = useCallback((key: string) => {
    scrollingFromNav.current = true
    scrollContentTo(key)
    // 同步状态
    if (key.startsWith('comp-')) {
      setActiveSection('components')
      setActiveCompSub(key)
    } else {
      setActiveSection(key)
    }
    // 同步 hash
    history.pushState(null, '', '#' + key)
    setTimeout(() => { scrollingFromNav.current = false }, 700)
  }, [])

  // ── Sidebar menu items ──
  const menuItems = mainNavItems.map((item) => {
    const Icon = item.icon
    const menuItem: any = {
      key: item.key,
      icon: <Icon size={16} />,
      label: item.label,
    }
    if (item.key === 'components') {
      menuItem.children = compSubItems.map((child) => ({
        key: child.key,
        label: child.label,
      }))
    }
    return menuItem
  })

  const handleMenuClick = (e: { key: string }) => {
    scrollToSection(e.key)
  }

  // 当滚动到组件规范区域时自动展开子菜单
  useEffect(() => {
    if (isCompActive && !openKeys.includes('components')) {
      setOpenKeys((prev) => [...prev, 'components'])
    }
  }, [isCompActive])

  const handleOpenChange = (keys: string[]) => {
    // Accordion: only keep the latest opened submenu
    const latest = keys.find(k => !openKeys.includes(k))
    setOpenKeys(latest ? [latest] : [])
  }

  const selectedKeys = isCompActive ? [activeCompSub] : [activeSection]

  // ── 快速跳转搜索选项 ──
  const searchOptions = [
    ...mainNavItems.map((item) => ({
      value: item.key,
      label: `${item.label} · ${item.subtitle}`,
    })),
    ...compSubItems.map((item) => ({
      value: item.key,
      label: `组件规范 › ${item.label}`,
    })),
  ]

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={220}
        collapsedWidth={56}
        style={{
          borderRight: `1px solid ${token.colorBorder}`,
          background: token.colorBgLayout,
          overflow: 'auto',
        }}
        trigger={null}
      >
        {/* Logo */}
        <div
          onClick={() => {
            const container = contentRef.current
            if (container) container.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 56,
            padding: '0 16px',
            borderBottom: `1px solid ${token.colorBorder}`,
            overflow: 'hidden',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <img
            src={isDark ? '/logo-white.png' : '/logo-blue.png'}
            alt="Logo"
            style={{ height: 26, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
          />
          {!collapsed && (
            <span style={{ color: token.colorText, fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap' }}>
              设计规范
            </span>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onClick={handleMenuClick}
          items={menuItems}
          style={{
            background: 'transparent',
            borderInlineEnd: 'none',
            padding: '8px',
          }}
        />

        {/* Collapse toggle at bottom */}
        <div
          style={{
            borderTop: `1px solid ${token.colorBorder}`,
            padding: '8px',
          }}
        >
          <Button
            type="text"
            block
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{ color: token.colorTextTertiary, fontSize: 12 }}
          >
            {!collapsed && '收起'}
          </Button>
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            height: 56,
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: token.colorBgLayout,
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
        >
          <Breadcrumb
            items={[
              { title: <Text style={{ color: token.colorTextTertiary, fontSize: 13 }}>设计规范</Text> },
              ...(currentNav ? [{ title: <Text style={{ color: token.colorText, fontSize: 13, fontWeight: 500 }}>{currentNav.label}</Text> }] : []),
              ...(isCompActive && currentComp ? [{ title: <Text style={{ color: token.colorPrimary, fontSize: 13 }}>{currentComp.label}</Text> }] : []),
            ]}
          />

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Select
              showSearch
              size="small"
              placeholder="搜索跳转…"
              style={{ width: 200 }}
              options={searchOptions}
              onSelect={(value) => scrollContentTo(value)}
              filterOption={(inputValue, option) =>
                option!.label.toLowerCase().includes(inputValue.toLowerCase())
              }
              suffixIcon={null}
            />
            <Button
              icon={mode === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              onClick={toggle}
              size="small"
            >
              {mode === 'dark' ? '亮色' : '暗色'}
            </Button>
            <Button
              icon={copied ? <Check style={{ fontSize: 14, color: token.colorSuccess }} /> : <Copy style={{ fontSize: 14 }} />}
              onClick={handleCopy}
              size="small"
            >
              {copied ? '已复制' : '链接'}
            </Button>
          </div>
        </Header>

        <Content
          ref={contentRef}
          style={{
            overflow: 'auto',
            padding: '24px 32px 64px',
            background: token.colorBgLayout,
          }}
        >
          <div style={{ maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: 64 }}>
            <AnnouncementBanner />
            {/* ═══ 色彩系统 ═══ */}
            <section id="colors" className="scroll-section" style={{ scrollMarginTop: 24 }}>
              <ColorsSection
                onCopy={(t: string) => {
                  navigator.clipboard.writeText(t)
                  message.success(`已复制 ${t}`, 1.5)
                }}
                copied={copied ? window.location.href : null}
              />
            </section>

            {/* ═══ 排版系统 ═══ */}
            <section id="typography" className="scroll-section" style={{ scrollMarginTop: 24 }}>
              <TypographySection />
            </section>

            {/* ═══ 间距与布局 ═══ */}
            <section id="spacing" className="scroll-section" style={{ scrollMarginTop: 24 }}>
              <SpacingSection />
            </section>

            {/* ═══ 组件规范 ═══ */}
            <section id="components" className="scroll-section" style={{ scrollMarginTop: 24 }}>
              <ComponentsSection />
            </section>

            {/* ═══ 投影与层级 ═══ */}
            <section id="shadow" className="scroll-section" style={{ scrollMarginTop: 24 }}>
              <ShadowPlayground />
            </section>

            {/* ═══ 交互演示 ═══ */}
            <section id="interactions" className="scroll-section" style={{ scrollMarginTop: 24 }}>
              <InteractionsSection />
            </section>

            {/* ═══ Icon 组件库 ═══ */}
            <section id="icon-library" className="scroll-section" style={{ scrollMarginTop: 24 }}>
              <IconLibrarySection />
            </section>

            {/* ═══ 设计原则 ═══ */}
            <section id="principles" className="scroll-section" style={{ scrollMarginTop: 24 }}>
              <PrinciplesSection />
            </section>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

function App() {
  return <AppContent />
}

export default App
