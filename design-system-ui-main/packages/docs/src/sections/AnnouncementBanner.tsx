import { useState, useEffect } from 'react'
import { Typography, Button, Tag, theme as antdTheme } from 'antd'
import { Bell, Calendar, GitCommit } from 'lucide-react'

const { Text } = Typography

interface ReleaseInfo {
  version: string
  date: string
  title: string
  items: string[]
}

async function fetchLatestRelease(): Promise<ReleaseInfo> {
  try {
    const res = await fetch('/CHANGELOG.md')
    const text = await res.text()

    // Find first version block: ## [x.y.z] — YYYY-MM-DD
    const headerMatch = text.match(/##\s+\[([^\]]+)\]\s*[—–-]\s*(\d{4}-\d{2}-\d{2})/)
    if (!headerMatch) throw new Error('Version header not found')
    const version = headerMatch[1]
    const date = headerMatch[2]

    // Find the first subsection title
    const headerEnd = text.indexOf(headerMatch[0]) + headerMatch[0].length
    const rest = text.slice(headerEnd)
    const subMatch = rest.match(/###\s+(.+)/)
    const title = subMatch ? subMatch[1].trim() : '更新内容'

    // Extract items until next version block
    const nextVersion = rest.search(/\n##\s+\[/)
    const block = nextVersion > 0 ? rest.slice(0, nextVersion) : rest
    const items: string[] = []
    for (const line of block.split('\n')) {
      const t = line.trim()
      if ((t.startsWith('- ') || t.startsWith('* ')) && t.length > 4) {
        // Strip markdown bold/italic
        let clean = t.slice(2).replace(/\*\*/g, '').replace(/__/g, '').trim()
        if (clean && clean.length > 2) items.push(clean)
      }
    }

    return { version, date, title, items }
  } catch (e) {
    console.warn('AnnouncementBanner: parse failed, using fallback', e)
    return {
      version: '?',
      date: '',
      title: '查看 CHANGELOG.md 了解详情',
      items: [],
    }
  }
}

export default function AnnouncementBanner() {
  const { token } = antdTheme.useToken()
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [release, setRelease] = useState<ReleaseInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestRelease().then((r) => {
      setRelease(r)
      setLoading(false)
      setVisible(true)
    })
  }, [])

  if (loading || !visible || !release) return null

  return (
    <div
      onClick={() => !expanded && setExpanded(true)}
      style={{
        position: 'relative',
        background: token.colorBgContainer,
        border: `1px solid ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
        padding: expanded ? '20px 24px' : '12px 20px',
        display: 'flex',
        alignItems: expanded ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: 16,
        transition: 'all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1)',
        cursor: expanded ? 'default' : 'pointer',
        boxShadow: token.boxShadowTertiary,
        animation: 'bannerSlideIn 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: expanded ? 'flex-start' : 'center', gap: 12, flex: 1, minWidth: 0 }}>
        <div
          style={{
            width: expanded ? 40 : 32,
            height: expanded ? 40 : 32,
            borderRadius: expanded ? 12 : 8,
            background: token.colorPrimaryBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.3s',
          }}
        >
          <Bell size={expanded ? 18 : 14} color={token.colorPrimary} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Tag color={token.colorPrimary} style={{ margin: 0, fontSize: 12, fontWeight: 600 }}>
              v{release.version}
            </Tag>
            {release.date && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: token.colorTextTertiary, fontSize: 12 }}>
                <Calendar size={12} />
                {release.date}
              </span>
            )}
            {!expanded && (
              <>
                <span style={{ color: token.colorBorder, fontSize: 14 }}>·</span>
                <Text style={{ color: token.colorText, fontSize: 13, fontWeight: 500 }}>
                  {release.title}
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>点击展开</Text>
              </>
            )}
          </div>

          {expanded && (
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Text strong style={{ fontSize: 14, color: token.colorText }}>{release.title}</Text>
              {release.items.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 320, overflowY: 'auto' }}>
                  {release.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <GitCommit size={14} style={{ marginTop: 2, flexShrink: 0, color: token.colorTextTertiary }} />
                      <Text style={{ fontSize: 12, color: token.colorTextSecondary, lineHeight: '20px' }}>{item}</Text>
                    </div>
                  ))}
                </div>
              ) : (
                <Text type="secondary" style={{ fontSize: 12 }}>详情请查看 CHANGELOG.md</Text>
              )}
              <Text style={{ fontSize: 12, color: token.colorTextTertiary }}>
                完整日志：
                <a href="/CHANGELOG.md" target="_blank" rel="noopener" style={{ color: token.colorPrimary }}>
                  CHANGELOG.md
                </a>
              </Text>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        {expanded && (
          <Button type="text" size="small" onClick={(e) => { e.stopPropagation(); setExpanded(false) }} style={{ color: token.colorTextTertiary, fontSize: 12 }}>
            收起
          </Button>
        )}
      </div>

      <style>{`
        @keyframes bannerSlideIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
