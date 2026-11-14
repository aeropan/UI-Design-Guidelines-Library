import { useTheme } from '../theme'

const icons = [
  { name: '首页', kw: ['首页','主页','home'] },
  { name: '搜索', kw: ['搜索','检索','查找'] },
  { name: '数据集成', kw: ['集成','整合','接入'] },
  { name: '数据治理', kw: ['治理','管理','管控'] },
  { name: '数据开发', kw: ['开发','研发','代码'] },
  { name: '数据运维', kw: ['运维','运营','维护'] },
  { name: '数据资产', kw: ['资产','仓库','存储'] },
  { name: '数据服务', kw: ['服务','帮助','支持'] },
  { name: '服务中心', kw: ['服务','中心','客服'] },
  { name: '折叠', kw: ['折叠','收起','关闭'] },
  { name: '资产广场', kw: ['广场','市场','商店'] },
  { name: '评测中心', kw: ['评测','评估','测试'] },
  { name: '开发与实验', kw: ['实验','实验室','探索'] },
  { name: '资产中心', kw: ['资产','中心','资源'] },
  { name: '模型工厂', kw: ['模型','AI','算法'] },
  { name: '模型复现', kw: ['复现','MRA','重现','Model','Reproduce'] },
  { name: '应用工厂', kw: ['应用','app'] },
  { name: '本体中心', kw: ['本体','知识','图谱'] },
  { name: '任务', kw: ['任务','job'] },
  { name: '用户', kw: ['用户','profile'] },
  { name: '文献', kw: ['文献','论文','文档'] },
  { name: '钱包', kw: ['钱包','payment'] },
  { name: '融合', kw: ['融合','merge'] },
  { name: '行业', kw: ['行业','industry'] },
  { name: '流程中心', kw: ['流程','编排','工作流','pipeline','workflow'] },
]

export default function IconLibrarySection() {
  const { mode } = useTheme()
  const isDark = mode === 'dark'
  const t = {
    cardBg: 'var(--ds-bg-card)',
    cardBorder: 'var(--ds-border)',
    textPrimary: 'var(--ds-text-primary)',
    textSecondary: 'var(--ds-text-secondary)',
    textTertiary: 'var(--ds-text-tertiary)',
    iconBg: 'var(--ds-bg-base)',
    selectedBg: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    accent: 'var(--ds-primary)',
    tagBg: isDark ? 'rgba(82,100,224,0.12)' : 'rgba(82,100,224,0.08)',
    tagText: 'var(--ds-primary)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderRadius: 8, background: t.cardBg, border: '1px solid ' + t.cardBorder }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 3, height: 18, background: t.accent, borderRadius: 2 }} />
          <h2 style={{ color: t.textPrimary, fontSize: 18, fontWeight: 600, margin: 0 }}>Icon 组件库</h2>
          <span style={{ color: t.textSecondary, fontSize: 14 }}>Sidebar Navigation Icon Library</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: t.textPrimary, fontSize: 22, fontWeight: 600 }}>{icons.length}</span>
          <span style={{ color: t.textSecondary, fontSize: 13 }}>总数 · 24×24 · 暗/亮双色 · 选中高亮</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, padding: 20, borderRadius: 8, background: t.cardBg, border: '1px solid ' + t.cardBorder }}>
          <h4 style={{ color: t.textPrimary, fontSize: 14, fontWeight: 600, margin: '0 0 12px' }}>暗色 Dark</h4>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: '#8A8F99', border: '1px solid ' + t.cardBorder }} />
              <div><div style={{ color: t.textSecondary, fontSize: 11 }}>默认</div><div style={{ color: t.textPrimary, fontSize: 12, fontWeight: 600 }}>#8A8F99</div><div style={{ color: t.textTertiary, fontSize: 10 }}>--ds-text-secondary</div></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: '#FFFFFF', border: '1px solid ' + t.cardBorder }} />
              <div><div style={{ color: t.textSecondary, fontSize: 11 }}>选中</div><div style={{ color: t.textPrimary, fontSize: 12, fontWeight: 600 }}>#FFFFFF</div><div style={{ color: t.textTertiary, fontSize: 10 }}>--ds-text-inverse</div></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: t.textSecondary, fontSize: 11 }}>实现</span>
              <span style={{ color: t.textPrimary, fontSize: 12, fontWeight: 600 }}>currentColor</span>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, padding: 20, borderRadius: 8, background: t.cardBg, border: '1px solid ' + t.cardBorder }}>
          <h4 style={{ color: t.textPrimary, fontSize: 14, fontWeight: 600, margin: '0 0 12px' }}>亮色 Light</h4>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: '#5C5F66', border: '1px solid #e4e5e9' }} />
              <div><div style={{ color: t.textSecondary, fontSize: 11 }}>默认</div><div style={{ color: t.textPrimary, fontSize: 12, fontWeight: 600 }}>#5C5F66</div><div style={{ color: t.textTertiary, fontSize: 10 }}>--ds-text-secondary</div></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: '#1D1F23', border: '1px solid #e4e5e9' }} />
              <div><div style={{ color: t.textSecondary, fontSize: 11 }}>选中</div><div style={{ color: t.textPrimary, fontSize: 12, fontWeight: 600 }}>#1D1F23</div><div style={{ color: t.textTertiary, fontSize: 10 }}>--ds-text-primary</div></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: t.textSecondary, fontSize: 11 }}>实现</span>
              <span style={{ color: t.textPrimary, fontSize: 12, fontWeight: 600 }}>currentColor</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {icons.map(icon => (
          <div key={icon.name} style={{ flex: '1 1 172px', maxWidth: 220, minWidth: 172, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: 20, borderRadius: 8, background: t.cardBg, border: '1px solid ' + t.cardBorder }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: t.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textSecondary }}>
                  <img src={'/icons/nav/icon-' + icon.name + '.svg'} style={{ width: 24, height: 24 }} alt="" />
                </div>
                <span style={{ color: t.textTertiary, fontSize: 10 }}>默认</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: t.selectedBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textPrimary }}>
                  <img src={'/icons/nav/icon-' + icon.name + '.svg'} style={{ width: 24, height: 24, filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)' }} alt="" />
                </div>
                <span style={{ color: t.textTertiary, fontSize: 10 }}>选中</span>
              </div>
            </div>
            <span style={{ color: t.textPrimary, fontSize: 14, fontWeight: 600 }}>{icon.name}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
              {icon.kw.slice(0, 3).map(k => (
                <span key={k} style={{ fontSize: 10, lineHeight: '14px', padding: '1px 6px', borderRadius: 4, background: t.tagBg, color: t.tagText }}>{k}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: 20, borderRadius: 8, background: t.cardBg, border: '1px solid ' + t.cardBorder }}>
        <h4 style={{ color: t.textPrimary, fontSize: 16, fontWeight: 600, margin: '0 0 16px' }}>语义匹配表</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {icons.map(icon => (
            <div key={icon.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 12px', borderRadius: 4 }}>
              <span style={{ color: t.textPrimary, fontSize: 13, fontWeight: 600, width: 90 }}>{icon.name}</span>
              <span style={{ color: t.textSecondary, fontSize: 12 }}>→</span>
              <span style={{ color: t.textSecondary, fontSize: 12 }}>{icon.kw.join(' · ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
