import { useState } from 'react'
import { Input, Select, DatePicker, InputNumber, Switch, Slider, Checkbox, Radio, Space, Typography, Button, Segmented } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import CodeBlock from './CodeBlock'

const { Text } = Typography

export default function InputPlayground() {
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('middle')
  const [disabled, setDisabled] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [selectVal, setSelectVal] = useState('全部领域')
  const [searchVal, setSearchVal] = useState('')
  const [numVal, setNumVal] = useState<number | null>(24)
  const [switchA, setSwitchA] = useState(true)
  const [switchB, setSwitchB] = useState(false)
  const [sliderVal, setSliderVal] = useState(65)
  const [checks, setChecks] = useState<string[]>(['计算机科学', '医学'])
  const [radioVal, setRadioVal] = useState('精确匹配')

  const darkCode = `// 输入控件 (Input) · 暗色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorBgContainer: 'var(--ds-bg-input)'    → #1d1f23  输入框背景
//   colorBorder: 'var(--ds-border)'           → #323640  边框
//   activeBorderColor: 'var(--ds-primary)'     → #5264E0  聚焦边框
//   colorText: 'var(--ds-text-primary)'        → #d0d2d8  输入文字
//   colorTextPlaceholder: 'var(--ds-text-tertiary)' → #6d717a  占位符
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

{/* 基础输入 */}
<Input placeholder="请输入任务名称" />

{/* 错误状态 */}
<Input status="error" placeholder="请输入" />

{/* 搜索框 · 带前缀图标 + 一键清除 */}
<Input
  prefix={<SearchOutlined />}
  placeholder="搜索任务..."
  allowClear
/>

{/* 前后缀标签 */}
<Input
  addonBefore="https://"
  addonAfter=".com"
  defaultValue="example"
/>

{/* 密码框 */}
<Input.Password placeholder="请输入密码" />

{/* 文本域 · 带字数统计 */}
<Input.TextArea
  rows={4}
  placeholder="请输入描述"
  showCount
  maxLength={200}
/>

{/* 禁用态 */}
<Input placeholder="禁用状态" disabled />

{/* 三种尺寸 */}
<Input size="small" placeholder="小尺寸 sm" />
<Input size="middle" placeholder="中尺寸 md" />
<Input size="large" placeholder="大尺寸 lg" />

{/* 配套表单控件 */}
<Select
  defaultValue="全部领域"
  options={[
    { value: '全部领域', label: '全部领域' },
    { value: '计算机科学', label: '计算机科学' },
  ]}
/>
<DatePicker placeholder="选择日期" />
<InputNumber min={1} max={100} defaultValue={24} />

{/* 禁用态标签 — 使用 --ds-disabled-bg + --ds-disabled-text */}
<span style={{
  display: 'inline-flex', alignItems: 'center',
  padding: '4px 12px', borderRadius: 6,
  background: 'var(--ds-disabled-bg)',
  color: 'var(--ds-disabled-text)',
  fontSize: 12, lineHeight: '18px'
}}>禁用标签 Disabled Tag</span>`

  const lightCode = `// 输入控件 (Input) · 亮色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorBgContainer: 'var(--ds-bg-input)'    → #f5f6fa  输入框背景
//   colorBorder: 'var(--ds-border)'           → #e4e5e9  边框
//   activeBorderColor: 'var(--ds-primary)'     → #5264E0  聚焦边框
//   colorText: 'var(--ds-text-primary)'        → #1d1f23  输入文字
//   colorTextPlaceholder: 'var(--ds-text-tertiary)' → #b8bcc4  占位符
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

{/* 基础输入 */}
<Input placeholder="请输入任务名称" />

{/* 错误状态 */}
<Input status="error" placeholder="请输入" />

{/* 搜索框 · 带前缀图标 + 一键清除 */}
<Input
  prefix={<SearchOutlined />}
  placeholder="搜索任务..."
  allowClear
/>

{/* 前后缀标签 */}
<Input
  addonBefore="https://"
  addonAfter=".com"
  defaultValue="example"
/>

{/* 密码框 */}
<Input.Password placeholder="请输入密码" />

{/* 文本域 · 带字数统计 */}
<Input.TextArea
  rows={4}
  placeholder="请输入描述"
  showCount
  maxLength={200}
/>

{/* 禁用态 */}
<Input placeholder="禁用状态" disabled />

{/* 三种尺寸 */}
<Input size="small" placeholder="小尺寸 sm" />
<Input size="middle" placeholder="中尺寸 md" />
<Input size="large" placeholder="大尺寸 lg" />

{/* 配套表单控件 */}
<Select
  defaultValue="全部领域"
  options={[
    { value: '全部领域', label: '全部领域' },
    { value: '计算机科学', label: '计算机科学' },
  ]}
/>
<DatePicker placeholder="选择日期" />
<InputNumber min={1} max={100} defaultValue={24} />

{/* 禁用态标签 — 使用 --ds-disabled-bg + --ds-disabled-text */}
<span style={{
  display: 'inline-flex', alignItems: 'center',
  padding: '4px 12px', borderRadius: 6,
  background: 'var(--ds-disabled-bg)',
  color: 'var(--ds-disabled-text)',
  fontSize: 12, lineHeight: '18px'
}}>禁用标签 Disabled Tag</span>`

  const selectOptions = [
    { value: '全部领域', label: '全部领域 (All)' },
    { value: '计算机科学', label: '计算机科学 (12篇)' },
    { value: '工程技术', label: '工程技术 (8篇)' },
    { value: '医学', label: '医学 (5篇)' },
    { value: '人文社科', label: '人文社科 (3篇)' },
  ]

  const checkOptions = [
    { label: '计算机科学 (12篇)', value: '计算机科学' },
    { label: '工程技术 (8篇)', value: '工程技术' },
    { label: '医学 (5篇)', value: '医学' },
    { label: '人文社科 (3篇)', value: '人文社科' },
    { label: '全部 (6篇)', value: '全部' },
  ]

  const radioOptions = ['精确匹配', '模糊匹配', '语义匹配', '全文检索']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* 控件栏 · 尺寸 + 禁用 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text type="secondary" style={{ fontSize: 12 }}>交互范例 · Interactive Example</Text>
        <Space>
          <Text type="secondary" style={{ fontSize: 12 }}>禁用 Disabled</Text>
          <Switch checked={disabled} onChange={setDisabled} size="small" />
        </Space>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Text type="secondary" style={{ fontSize: 12, width: 60 }}>尺寸 Size</Text>
        <Segmented
          size="small"
          value={size}
          onChange={(val) => setSize(val as 'small' | 'middle' | 'large')}
          options={[
            { label: '小 sm', value: 'small' },
            { label: '中 md', value: 'middle' },
            { label: '大 lg', value: 'large' },
          ]}
        />
      </div>

      {/* ═══ 禁用态对比 · 始终可见 ═══ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 4, height: 16, borderRadius: 2, background: 'var(--ds-disabled-text)' }} />
          <Text strong style={{ fontSize: 13, color: 'var(--ds-text-primary)' }}>禁用态对比</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>Disabled State Showcase</Text>
        </div>

        {/* Ant Design 组件禁用态 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ padding: 16, borderRadius: 8, background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
            <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>正常 Normal</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Input placeholder="可编辑的输入框" style={{ width: '100%' }} />
              <Select defaultValue="option1" options={[{ value: 'option1', label: '可选的下拉框' }]} style={{ width: '100%' }} />
              <Button type="primary">可点击按钮</Button>
            </div>
          </div>
          <div style={{ padding: 16, borderRadius: 8, background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
            <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>禁用 Disabled</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Input placeholder="禁用的输入框" disabled style={{ width: '100%' }} />
              <Select defaultValue="option1" options={[{ value: 'option1', label: '禁用的下拉框' }]} disabled style={{ width: '100%' }} />
              <Button type="primary" disabled>禁用的按钮</Button>
            </div>
          </div>
        </div>

        {/* 自定义元素 · 使用 --ds-disabled-text / --ds-disabled-bg / --ds-disabled-border（确认按钮含描边） */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ padding: 16, borderRadius: 8, background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
            <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>正常 Normal</Text>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: 6, background: 'var(--ds-primary-subtle)', color: 'var(--ds-primary)', fontSize: 12, fontWeight: 500, lineHeight: '18px' }}>正常标签</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: 6, background: 'var(--ds-success-bg)', color: 'var(--ds-success)', fontSize: 12, lineHeight: '18px' }}>启用选项</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 16px', borderRadius: 6, background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)', fontSize: 13, fontWeight: 500, lineHeight: '20px' }}>确认</span>
            </div>
          </div>
          <div style={{ padding: 16, borderRadius: 8, background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
            <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>禁用 Disabled</Text>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: 6, background: 'var(--ds-disabled-bg)', color: 'var(--ds-disabled-text)', fontSize: 12, fontWeight: 500, lineHeight: '18px' }}>禁用标签</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: 6, background: 'var(--ds-disabled-bg)', color: 'var(--ds-disabled-text)', fontSize: 12, lineHeight: '18px' }}>已停用</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '5px 16px', borderRadius: 6, background: 'var(--ds-disabled-bg)', color: 'var(--ds-disabled-text)', border: '1px solid var(--ds-disabled-border)', fontSize: 13, fontWeight: 500, lineHeight: '20px', minHeight: 32, boxSizing: 'border-box' }}>确认</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input 变体 · 基础 + 错误 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            基础输入 Basic
          </Text>
          <Input placeholder="请输入任务名称" size={size} disabled={disabled} style={{ width: '100%' }} />
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            错误状态 Error <span style={{ color: 'var(--ds-danger)' }}>*</span>
          </Text>
          <Input
            placeholder={hasError ? '' : '请输入'}
            status={hasError ? 'error' : undefined}
            size={size}
            disabled={disabled}
            style={{ width: '100%' }}
          />
          {hasError && (
            <Text type="danger" style={{ fontSize: 12, display: 'block', marginTop: 6 }}>
              此项为必填字段
            </Text>
          )}
          <Button
            type="link"
            size="small"
            onClick={() => setHasError(!hasError)}
            style={{ padding: 0, marginTop: 4, fontSize: 12 }}
          >
            切换错误 Toggle Error
          </Button>
        </div>
      </div>

      {/* Input 变体 · 搜索 + 前后缀 + 密码 + 文本域 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            搜索 Search · prefix + allowClear
          </Text>
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索任务..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            allowClear
            size={size}
            disabled={disabled}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            前后缀 addonBefore / addonAfter
          </Text>
          <Input
            addonBefore="https://"
            addonAfter=".com"
            defaultValue="example"
            size={size}
            disabled={disabled}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            密码 Input.Password
          </Text>
          <Input.Password
            placeholder="请输入密码"
            size={size}
            disabled={disabled}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            文本域 TextArea · showCount
          </Text>
          <Input.TextArea
            rows={4}
            placeholder="请输入描述"
            showCount
            maxLength={200}
            disabled={disabled}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Select + Search + Date + Number */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 20 }}>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            领域 Field
          </Text>
          <Select
            value={selectVal}
            onChange={setSelectVal}
            options={selectOptions}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            搜索 Search
          </Text>
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索任务..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            allowClear
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            日期 Date
          </Text>
          <DatePicker style={{ width: '100%' }} placeholder="选择日期" />
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            数量 Number
          </Text>
          <InputNumber min={1} max={100} value={numVal} onChange={setNumVal} style={{ width: '100%' }} />
        </div>
      </div>

      {/* Switch + Slider + Checkbox + Radio */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>
            开关 Switch
          </Text>
          <Space direction="vertical" size="middle">
            <Space>
              <Switch checked={switchA} onChange={setSwitchA} />
              <Text>启用自动保存 Auto Save {switchA ? '(开)' : '(关)'}</Text>
            </Space>
            <Space>
              <Switch checked={switchB} onChange={setSwitchB} />
              <Text>启用通知 Notifications {switchB ? '(开)' : '(关)'}</Text>
            </Space>
          </Space>

          <div style={{ marginTop: 24 }}>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
              滑块 Slider · {sliderVal}%
            </Text>
            <Slider value={sliderVal} onChange={setSliderVal} style={{ maxWidth: 300 }} />
          </div>
        </div>

        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>
            复选框 Checkbox
          </Text>
          <Checkbox.Group
            options={checkOptions}
            value={checks}
            onChange={(vals) => setChecks(vals as string[])}
          />

          <div style={{ marginTop: 24 }}>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>
              单选框 Radio Group
            </Text>
            <Radio.Group
              value={radioVal}
              onChange={(e) => setRadioVal(e.target.value)}
            >
              <Space direction="vertical">
                {radioOptions.map((opt) => (
                  <Radio key={opt} value={opt}>{opt}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </div>
      </div>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
