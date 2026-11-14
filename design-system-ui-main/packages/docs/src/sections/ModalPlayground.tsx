import { useState } from 'react'
import { Modal, Button, Space, Typography, Tag } from 'antd'
import {
  ExclamationCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FormOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import CodeBlock from './CodeBlock'

const { Text } = Typography

type ContentTemplate = 'form' | 'detail' | 'config'

/* ── 表单型 · 编辑接口服务 ── */
// fullWidth=true 通栏，false（默认）半栏左右并排
const formFields: { label: string; value: string; fullWidth?: boolean }[] = [
  { label: '接口 ID', value: 'admin-workflow-123456' },
  { label: '名称', value: 'admin-register' },
  { label: '版本', value: 'v1' },
  { label: '协议', value: 'HTTP' },
  { label: '请求路径', value: '/api/v1/dev/register/workflows/{flowId}', fullWidth: true },
  { label: '部署方式', value: '集群（集群部署）' },
  { label: '描述', value: 'Imported from MockServer: https://api73.dev:8080/', fullWidth: true },
  { label: '标签', value: '0' },
]

/* ── 详情型 · 节点详情 ── */
const detailGroups = [
  {
    group: '基础信息',
    fields: [
      { label: '实体名称', value: '知识抽取服务' },
      { label: '实体类型', value: '服务节点' },
      { label: '状态', value: '已部署', tag: 'success' as const },
      { label: '创建时间', value: '2026-06-01 14:32' },
    ],
  },
  {
    group: '关联信息',
    fields: [
      { label: '所属图谱', value: '知识抽取与融合' },
      { label: '数据源', value: 'MySQL / api-db-v2' },
      { label: '版本号', value: 'v2.3.1' },
    ],
  },
]

/* ── 配置型 · 高级过滤 ── */
const configItems = [
  { label: '过滤器开关', control: 'switch', value: true },
  { label: '过滤规则', control: 'select', value: '包含' },
  { label: '最大返回数', control: 'input', value: '100' },
  { label: '缓存策略', control: 'select', value: '启用缓存' },
  { label: '超时时间', control: 'input', value: '30' },
]

export default function ModalPlayground() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [openContent, setOpenContent] = useState(false)
  const [contentSize, setContentSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [contentTemplate, setContentTemplate] = useState<ContentTemplate>('form')
  
  const modals = [
    { key: 'confirm', title: '确认提交', titleEn: 'Confirm Submit', type: 'confirm' as const, icon: <ExclamationCircleOutlined style={{ color: 'var(--ds-primary)' }} />, color: 'var(--ds-primary)', desc: '需要用户确认的操作', body: '提交后将进入审核流程，审核期间不可修改。是否继续？', bodyEn: 'Once submitted, it will enter the review process.' },
    { key: 'warning', title: '警告', titleEn: 'Warning', type: 'warning' as const, icon: <WarningOutlined style={{ color: 'var(--ds-warning)' }} />, color: 'var(--ds-warning)', desc: '提醒用户潜在风险', body: '删除此知识图谱将同时删除所有关联数据，此操作不可撤销。', bodyEn: 'This action cannot be undone.' },
    { key: 'info', title: '操作成功', titleEn: 'Success', type: 'success' as const, icon: <CheckCircleOutlined style={{ color: 'var(--ds-success)' }} />, color: 'var(--ds-success)', desc: '展示重要信息', body: '知识图谱已成功创建，系统将在2分钟内完成索引构建。', bodyEn: 'Indexing will be completed within 2 minutes.' },
    { key: 'error', title: '操作失败', titleEn: 'Error', type: 'error' as const, icon: <CloseCircleOutlined style={{ color: 'var(--ds-danger)' }} />, color: 'var(--ds-danger)', desc: '操作失败的提示', body: '网络连接超时，请检查网络设置后重试。', bodyEn: 'Network connection timed out.' },
  ]

  const current = modals.find((m) => m.key === openKey)

  // 将 formFields 排成行：半栏字段两两并排，通栏字段独占一行
  const formRows: { left: typeof formFields[0]; right?: typeof formFields[0] }[] = []
  for (let i = 0; i < formFields.length; i++) {
    const f = formFields[i]
    if (f.fullWidth) {
      formRows.push({ left: f })
    } else {
      const next = formFields[i + 1]
      if (next && !next.fullWidth) {
        formRows.push({ left: f, right: next })
        i++
      } else {
        formRows.push({ left: f })
      }
    }
  }

  const darkCode = `// 弹窗 (Modal) · 暗色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   contentBg / headerBg: 'var(--ds-bg-card)'   → #222427  弹窗背景
//   titleColor: 'var(--ds-text-primary)'          → #d0d2d8  标题
import { Modal } from 'antd'
import {
  ExclamationCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
} from '@ant-design/icons'

/* === 确认/警告/成功/错误 弹窗（与之前一致）=== */

{/* 确认弹窗 · 需要用户确认的操作 */}
Modal.confirm({
  title: '确认提交',
  content: '提交后将进入审核流程，审核期间不可修改。',
  okText: '确认',
  cancelText: '取消',
  icon: <ExclamationCircleOutlined />,
})

{/* 警告弹窗 · 提醒潜在风险 */}
Modal.warning({
  title: '警告',
  content: '删除此知识图谱将同时删除所有关联数据，此操作不可撤销。',
  okText: '确认',
  okButtonProps: { danger: true },
})

{/* 成功弹窗 · 操作完成提示 */}
Modal.success({
  title: '操作成功',
  content: '知识图谱已成功创建，系统将在2分钟内完成索引构建。',
  okText: '确认',
})

{/* 错误弹窗 · 操作失败提示 */}
Modal.error({
  title: '操作失败',
  content: '网络连接超时，请检查网络设置后重试。',
  okText: '重试',
  okButtonProps: { danger: true },
})

{/* === 内容弹窗模板（三段式 Header + Body + Footer）=== */}

/* ── 1. 表单型 · Header 带副标题 ── */
<Modal
  title={
    <div>
      <Space>
        <EditOutlined style={{ color: '#5264E0' }} />
        <span>编辑接口服务</span>
      </Space>
      <div style={{ fontSize: 12, color: '#8a8f99', fontWeight: 400, marginTop: 2 }}>
        Edit API Service
      </div>
    </div>
  }
  open={open}
  onOk={handleSave}
  onCancel={handleCancel}
  okText="保存 Save"
  cancelText="取消 Cancel"
  width={480}
>
  {/* 字段列表（标签+值） */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <FieldRow label="接口 ID" value="admin-workflow-123456" />
    <FieldRow label="名称" value="admin-register" />
    <FieldRow label="请求路径" value="/api/v1/dev/register/workflows/{flowId}" />
  </div>
</Modal>

{/* ── 2. 详情型 · 分组展示 ── */}
<Modal
  title={
    <div>
      <Space>
        <EyeOutlined style={{ color: '#43CB89' }} />
        <span>节点详情</span>
      </Space>
      <div style={{ fontSize: 12, color: '#8a8f99', fontWeight: 400, marginTop: 2 }}>
        Node Detail · 实体属性概览
      </div>
    </div>
  }
  open={open}
  footer={<Button onClick={handleClose}>关闭 Close</Button>}
  width={480}
>
  <Section title="基础信息">
    <DetailRow label="实体名称" value="知识抽取服务" />
    <DetailRow label="状态" value={<Tag color="success">已部署</Tag>} />
  </Section>
  <Section title="关联信息">
    <DetailRow label="所属图谱" value="知识抽取与融合" />
    <DetailRow label="版本号" value="v2.3.1" />
  </Section>
</Modal>

{/* ── 3. 配置型 · 控件组合 ── */}
<Modal
  title={
    <div>
      <Space>
        <SettingOutlined style={{ color: '#FFA564' }} />
        <span>高级过滤配置</span>
      </Space>
      <div style={{ fontSize: 12, color: '#8a8f99', fontWeight: 400, marginTop: 2 }}>
        Advanced Filter Configuration
      </div>
    </div>
  }
  open={open}
  onOk={handleApply}
  onCancel={handleReset}
  okText="应用配置 Apply"
  cancelText="重置 Reset"
  width={640}
>
  <ConfigRow label="过滤器开关" control={<Switch defaultChecked />} />
  <ConfigRow label="过滤规则" control={<Select options={...} />} />
  <ConfigRow label="最大返回数" control={<InputNumber min={1} max={1000} />} />
  <ConfigRow label="缓存策略" control={<Select options={...} />} />
  <ConfigRow label="超时时间" control={<InputNumber suffix="秒" />} />
</Modal>`

  const lightCode = `// 弹窗 (Modal) · 亮色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   contentBg / headerBg: 'var(--ds-bg-card)'   → #ffffff  弹窗背景
//   titleColor: 'var(--ds-text-primary)'          → #1d1f23  标题
import { Modal } from 'antd'
import {
  ExclamationCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
} from '@ant-design/icons'

/* === 确认/警告/成功/错误 弹窗（与之前一致）=== */

{/* 确认弹窗 · 需要用户确认的操作 */}
Modal.confirm({
  title: '确认提交',
  content: '提交后将进入审核流程，审核期间不可修改。',
  okText: '确认',
  cancelText: '取消',
  icon: <ExclamationCircleOutlined />,
})

{/* 警告弹窗 · 提醒潜在风险 */}
Modal.warning({
  title: '警告',
  content: '删除此知识图谱将同时删除所有关联数据，此操作不可撤销。',
  okText: '确认',
  okButtonProps: { danger: true },
})

{/* 成功弹窗 · 操作完成提示 */}
Modal.success({
  title: '操作成功',
  content: '知识图谱已成功创建，系统将在2分钟内完成索引构建。',
  okText: '确认',
})

{/* 错误弹窗 · 操作失败提示 */}
Modal.error({
  title: '操作失败',
  content: '网络连接超时，请检查网络设置后重试。',
  okText: '重试',
  okButtonProps: { danger: true },
})

{/* === 内容弹窗模板（三段式 Header + Body + Footer）=== */}

/* ── 1. 表单型 · Header 带副标题 ── */
<Modal
  title={
    <div>
      <Space>
        <EditOutlined style={{ color: '#5264E0' }} />
        <span>编辑接口服务</span>
      </Space>
      <div style={{ fontSize: 12, color: '#787b84', fontWeight: 400, marginTop: 2 }}>
        Edit API Service
      </div>
    </div>
  }
  open={open}
  onOk={handleSave}
  onCancel={handleCancel}
  okText="保存 Save"
  cancelText="取消 Cancel"
  width={480}
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <FieldRow label="接口 ID" value="admin-workflow-123456" />
    <FieldRow label="名称" value="admin-register" />
    <FieldRow label="请求路径" value="/api/v1/dev/register/workflows/{flowId}" />
  </div>
</Modal>

{/* ── 2. 详情型 · 分组展示 ── */}
<Modal
  title={
    <div>
      <Space>
        <EyeOutlined style={{ color: '#43CB89' }} />
        <span>节点详情</span>
      </Space>
      <div style={{ fontSize: 12, color: '#787b84', fontWeight: 400, marginTop: 2 }}>
        Node Detail · 实体属性概览
      </div>
    </div>
  }
  open={open}
  footer={<Button onClick={handleClose}>关闭 Close</Button>}
  width={480}
>
  <Section title="基础信息">
    <DetailRow label="实体名称" value="知识抽取服务" />
    <DetailRow label="状态" value={<Tag color="success">已部署</Tag>} />
  </Section>
  <Section title="关联信息">
    <DetailRow label="所属图谱" value="知识抽取与融合" />
    <DetailRow label="版本号" value="v2.3.1" />
  </Section>
</Modal>

{/* ── 3. 配置型 · 控件组合 ── */}
<Modal
  title={
    <div>
      <Space>
        <SettingOutlined style={{ color: '#FFA564' }} />
        <span>高级过滤配置</span>
      </Space>
      <div style={{ fontSize: 12, color: '#787b84', fontWeight: 400, marginTop: 2 }}>
        Advanced Filter Configuration
      </div>
    </div>
  }
  open={open}
  onOk={handleApply}
  onCancel={handleReset}
  okText="应用配置 Apply"
  cancelText="重置 Reset"
  width={640}
>
  <ConfigRow label="过滤器开关" control={<Switch defaultChecked />} />
  <ConfigRow label="过滤规则" control={<Select options={...} />} />
  <ConfigRow label="最大返回数" control={<InputNumber min={1} max={1000} />} />
  <ConfigRow label="缓存策略" control={<Select options={...} />} />
  <ConfigRow label="超时时间" control={<InputNumber suffix="秒" />} />
</Modal>`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ═══ 通知弹窗 · 基础反馈 ═══ */}
      <div style={{ padding: 16, borderRadius: 8, background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-primary)' }} />
          <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>通知弹窗 Notification Modal</Text>
        </div>
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
          最基础的操作反馈弹窗 · 四种语义色区分场景 · 支持 confirm/warning/success/error
        </Text>

        <Space wrap>
          {modals.map((m) => (
            <Button
              key={m.key}
              onClick={() => setOpenKey(m.key)}
              icon={m.icon}
              style={{
                background: `${m.color}15`,
                color: m.color,
                borderColor: `${m.color}30`,
              }}
            >
              {m.title}
              <Text style={{ fontSize: 12, opacity: 0.5, marginLeft: 4 }}>{m.titleEn}</Text>
            </Button>
          ))}
        </Space>

        {current && (
          <Modal
            title={
              <Space>
                {current.icon}
                {current.title}
                <Text type="secondary" style={{ fontSize: 12, fontWeight: 400 }}>
                  {current.titleEn}
                </Text>
              </Space>
            }
            open={!!openKey}
            onOk={() => setOpenKey(null)}
            onCancel={() => setOpenKey(null)}
            okText={current.type === 'error' ? '重试 Retry' : '确认 Confirm'}
            cancelText="取消 Cancel"
            okButtonProps={{
              danger: current.type === 'error' || current.type === 'warning',
            }}
            width={420}
          >
            <p>{current.body}</p>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {current.bodyEn}
            </Text>
          </Modal>
        )}
      </div>

      {/* ═══ 内容弹窗 · 三段式模板 ═══ */}
      <div style={{ padding: 16, borderRadius: 8, background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-success)' }} />
          <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>内容弹窗 Content Templates</Text>
        </div>
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
          三段式结构 · Header（标题 + 可选副标题）· Body（内容模板）· Footer（操作按钮）
        </Text>

        {/* ── 工具栏：选模板 → 选尺寸 → 打开弹窗 ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>模板</Text>
              {/* 分类标签 — 规范：bg-input 容器 + 28px 高 + 蓝底激活 */}
              <div role="tablist" style={{ display: 'inline-flex', gap: 8, padding: 4, background: 'var(--ds-bg-input)', borderRadius: 6, border: '1px solid var(--ds-border)' }}>
                {[
                  { key: 'form', label: <span><EditOutlined /> 表单型</span> },
                  { key: 'detail', label: <span><EyeOutlined /> 详情型</span> },
                  { key: 'config', label: <span><SettingOutlined /> 配置型</span> },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setContentTemplate(t.key as ContentTemplate)}
                    style={{
                      height: 28, padding: '0 10px', fontSize: 12, fontWeight: contentTemplate === t.key ? 500 : 400,
                      background: contentTemplate === t.key ? 'var(--ds-primary)' : 'transparent',
                      color: contentTemplate === t.key ? 'var(--ds-text-inverse)' : 'var(--ds-text-secondary)',
                      borderRadius: 4, border: 'none', cursor: 'pointer',
                    }}
                  >{t.label}</button>
                ))}
              </div>
            </div>
            <div style={{ width: 1, height: 20, background: 'var(--ds-divider)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>尺寸</Text>
              <div role="tablist" style={{ display: 'inline-flex', gap: 8, padding: 4, background: 'var(--ds-bg-input)', borderRadius: 6, border: '1px solid var(--ds-border)' }}>
                {[
                  { key: 'small', label: '小 480' },
                  { key: 'medium', label: '中 640' },
                  { key: 'large', label: '大 900' },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setContentSize(s.key as 'small' | 'medium' | 'large')}
                    style={{
                      height: 28, padding: '0 10px', fontSize: 12, fontWeight: contentSize === s.key ? 500 : 400,
                      background: contentSize === s.key ? 'var(--ds-primary)' : 'transparent',
                      color: contentSize === s.key ? 'var(--ds-text-inverse)' : 'var(--ds-text-secondary)',
                      borderRadius: 4, border: 'none', cursor: 'pointer',
                    }}
                  >{s.label}</button>
                ))}
              </div>
            </div>
          </div>
          <Button type="primary" icon={<FormOutlined />} onClick={() => setOpenContent(true)}>
            打开内容弹窗
          </Button>
        </div>

        {/* ── Mock 弹窗预览（仅示意，真实效果点上方按钮） ── */}
        <div style={{ width: contentSize === 'small' ? 480 : contentSize === 'medium' ? 640 : 900, background: 'var(--ds-bg-card)', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--ds-border)' }}>
          {/* Header: title + optional subtitle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 24px', background: 'var(--ds-bg-elevated)', borderBottom: '1px solid var(--ds-divider)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {contentTemplate === 'form' && <EditOutlined style={{ color: 'var(--ds-primary)', fontSize: 16 }} />}
                {contentTemplate === 'detail' && <EyeOutlined style={{ color: 'var(--ds-success)', fontSize: 16 }} />}
                {contentTemplate === 'config' && <SettingOutlined style={{ color: 'var(--ds-warning)', fontSize: 16 }} />}
                <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>
                  {contentTemplate === 'form' && '编辑接口服务'}
                  {contentTemplate === 'detail' && '节点详情'}
                  {contentTemplate === 'config' && '高级过滤配置'}
                </Text>
              </div>
              {/* 副标题 subtitle */}
              <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)', display: 'block', marginTop: 4, marginLeft: 24 }}>
                {contentTemplate === 'form' && 'Edit API Service'}
                {contentTemplate === 'detail' && 'Node Detail · 实体属性概览'}
                {contentTemplate === 'config' && 'Advanced Filter Configuration'}
              </Text>
            </div>
            <span style={{ fontSize: 18, color: 'var(--ds-text-tertiary)', cursor: 'default' }}>×</span>
          </div>

          {/* Body: 3 种内容模板 · 内边距 20px */}
          <div style={{ padding: 20, background: 'var(--ds-bg-card)', minHeight: contentTemplate === 'form' ? 340 : contentTemplate === 'detail' ? 300 : 280 }}>

            {/* ── 表单型 Form · 两列网格 + 通栏 ── */}
            {contentTemplate === 'form' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {formRows.map((row, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: 16, flexDirection: contentSize === 'small' ? 'column' : 'row' }}>
                    <div style={{ flex: (row.right && contentSize !== 'small') ? 1 : '1 1 100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)' }}>{row.left.label}</Text>
                      <div style={{ padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, lineHeight: '22px', minHeight: 22 }}>
                        {row.left.value}
                      </div>
                    </div>
                    {row.right && (
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)' }}>{row.right.label}</Text>
                        <div style={{ padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, lineHeight: '22px', minHeight: 22 }}>
                          {row.right.value}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── 详情型 Detail · 紧凑双列网格 ── */}
            {contentTemplate === 'detail' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {detailGroups.map((g, gi) => (
                  <div key={gi}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <Text style={{ fontSize: 12, color: 'var(--ds-text-tertiary)', fontWeight: 600 }}>{g.group}</Text>
                      <div style={{ flex: 1, height: 1, background: 'var(--ds-divider)' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: contentSize === 'small' ? '1fr' : '1fr 1fr', gap: '6px 16px' }}>
                      {g.fields.map((f, fi) => (
                        <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 26 }}>
                          <Text style={{ fontSize: 14, color: 'var(--ds-text-secondary)', width: 60, flexShrink: 0 }}>{f.label}</Text>
                          {f.tag ? (
                            <Tag color="success" style={{ margin: 0, fontSize: 12 }}>{f.value}</Tag>
                          ) : (
                            <Text style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>{f.value}</Text>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── 配置型 Config ── */}
            {contentTemplate === 'config' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {configItems.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', width: 100, flexShrink: 0 }}>{c.label}</Text>
                    {c.control === 'switch' && (
                      <div style={{ width: 40, height: 22, borderRadius: 11, background: 'var(--ds-primary)', position: 'relative', cursor: 'default' }}>
                        <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', right: 2, top: 2 }} />
                      </div>
                    )}
                    {c.control === 'select' && (
                      <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {String(c.value)}
                        <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 10 }}>▼</span>
                      </div>
                    )}
                    {c.control === 'input' && (
                      <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13 }}>
                        {String(c.value)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Footer · Body/Footer 分割线 + 按钮 */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '12px 20px', background: 'var(--ds-bg-card)', borderTop: '1px solid var(--ds-divider)' }}>
            {contentTemplate === 'form' && <>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'transparent', color: 'var(--ds-text-primary)', borderRadius: 6, border: '1px solid var(--ds-border-muted)', cursor: 'default' }}>取消 Cancel</button>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)', borderRadius: 6, border: 'none', cursor: 'default' }}>保存 Save</button>
            </>}
            {contentTemplate === 'detail' && <>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'transparent', color: 'var(--ds-text-primary)', borderRadius: 6, border: '1px solid var(--ds-border-muted)', cursor: 'default' }}>关闭 Close</button>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)', borderRadius: 6, border: 'none', cursor: 'default' }}>编辑 Edit</button>
            </>}
            {contentTemplate === 'config' && <>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'transparent', color: 'var(--ds-text-primary)', borderRadius: 6, border: '1px solid var(--ds-border-muted)', cursor: 'default' }}>重置 Reset</button>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)', borderRadius: 6, border: 'none', cursor: 'default' }}>应用配置 Apply</button>
            </>}
          </div>
        </div>
      </div>

      {openContent && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.45)' }} onClick={() => setOpenContent(false)}>
          <div style={{ width: contentSize === 'small' ? 480 : contentSize === 'medium' ? 640 : 900, borderRadius: 8, overflow: 'hidden', boxShadow: 'var(--ds-shadow-z4)' }} onClick={e => e.stopPropagation()}>
            {/* Header: title + subtitle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 20px', background: 'var(--ds-bg-elevated)', borderBottom: '1px solid var(--ds-divider)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {contentTemplate === 'form' && <EditOutlined style={{ color: 'var(--ds-primary)', fontSize: 16 }} />}
                  {contentTemplate === 'detail' && <EyeOutlined style={{ color: 'var(--ds-success)', fontSize: 16 }} />}
                  {contentTemplate === 'config' && <SettingOutlined style={{ color: 'var(--ds-warning)', fontSize: 16 }} />}
                  <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>
                    {contentTemplate === 'form' && '编辑接口服务'}
                    {contentTemplate === 'detail' && '节点详情'}
                    {contentTemplate === 'config' && '高级过滤配置'}
                  </Text>
                </div>
                <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)', display: 'block', marginTop: 4, marginLeft: 24 }}>
                  {contentTemplate === 'form' && 'Edit API Service'}
                  {contentTemplate === 'detail' && 'Node Detail · 实体属性概览'}
                  {contentTemplate === 'config' && 'Advanced Filter Configuration'}
                </Text>
              </div>
              <span onClick={() => setOpenContent(false)} style={{ fontSize: 18, color: 'var(--ds-text-tertiary)', cursor: 'pointer', lineHeight: 1 }}>&times;</span>
            </div>
            {/* Body · 内边距 20px */}
            <div style={{ padding: 20, background: 'var(--ds-bg-card)', minHeight: contentTemplate === 'form' ? 340 : contentTemplate === 'detail' ? 300 : 280 }}>
              {contentTemplate === 'form' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {formRows.map((row, ri) => (
                    <div key={ri} style={{ display: 'flex', gap: 16, flexDirection: contentSize === 'small' ? 'column' : 'row' }}>
                      <div style={{ flex: (row.right && contentSize !== 'small') ? 1 : '1 1 100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)' }}>{row.left.label}</Text>
                        <div style={{ padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, lineHeight: '22px' }}>
                          {row.left.value}
                        </div>
                      </div>
                      {row.right && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)' }}>{row.right.label}</Text>
                          <div style={{ padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, lineHeight: '22px' }}>
                            {row.right.value}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {contentTemplate === 'detail' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {detailGroups.map((g, gi) => (
                    <div key={gi}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <Text style={{ fontSize: 12, color: 'var(--ds-text-tertiary)', fontWeight: 600 }}>{g.group}</Text>
                        <div style={{ flex: 1, height: 1, background: 'var(--ds-divider)' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: contentSize === 'small' ? '1fr' : '1fr 1fr', gap: '6px 16px' }}>
                        {g.fields.map((f, fi) => (
                          <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 26 }}>
                            <Text style={{ fontSize: 14, color: 'var(--ds-text-secondary)', width: 60, flexShrink: 0 }}>{f.label}</Text>
                            {f.tag ? (
                              <Tag color="success" style={{ margin: 0, fontSize: 12 }}>{f.value}</Tag>
                            ) : (
                              <Text style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>{f.value}</Text>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {contentTemplate === 'config' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {configItems.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', width: 100, flexShrink: 0 }}>{c.label}</Text>
                      {c.control === 'switch' && (
                        <div style={{ width: 40, height: 22, borderRadius: 11, background: 'var(--ds-primary)', position: 'relative', cursor: 'default' }}>
                          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', right: 2, top: 2 }} />
                        </div>
                      )}
                      {c.control === 'select' && (
                        <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {String(c.value)}
                          <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 10 }}>▼</span>
                        </div>
                      )}
                      {c.control === 'input' && (
                        <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13 }}>
                          {String(c.value)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Footer · 真实弹窗按钮 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '12px 20px', background: 'var(--ds-bg-card)', borderTop: '1px solid var(--ds-divider)' }}>
              {contentTemplate === 'form' && <><Button onClick={() => setOpenContent(false)}>取消 Cancel</Button><Button type="primary" onClick={() => setOpenContent(false)}>保存 Save</Button></>}
              {contentTemplate === 'detail' && <><Button onClick={() => setOpenContent(false)}>关闭 Close</Button><Button type="primary" onClick={() => setOpenContent(false)}>编辑 Edit</Button></>}
              {contentTemplate === 'config' && <><Button onClick={() => setOpenContent(false)}>重置 Reset</Button><Button type="primary" onClick={() => setOpenContent(false)}>应用配置 Apply</Button></>}
            </div>
          </div>
        </div>
      )}

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
