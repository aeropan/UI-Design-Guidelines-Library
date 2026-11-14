import { useState } from 'react'
import { Calendar, Card, Tag, Typography, Space } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { ClockCircleOutlined } from '@ant-design/icons'
import CodeBlock from './CodeBlock'

const { Text } = Typography

const getEvents = (date: Dayjs) => {
  const events: Record<string, { color: string; label: string }> = {
    '2025-08-05': { color: 'var(--ds-primary)', label: '图谱构建' },
    '2025-08-12': { color: 'var(--ds-warning)', label: '专家审核' },
    '2025-08-15': { color: 'var(--ds-primary)', label: '论文截止' },
    '2025-08-20': { color: 'var(--ds-success)', label: '版本发布' },
    '2025-08-28': { color: 'var(--ds-danger)', label: '数据备份' },
  }
  return events[date.format('YYYY-MM-DD')]
}

export default function CalendarPlayground() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs('2025-08-15'))

  const selectedEvent = getEvents(selectedDate)

  const allEvents = [
    { date: '08-05', label: '图谱构建', color: 'var(--ds-primary)' },
    { date: '08-12', label: '专家审核', color: 'var(--ds-warning)' },
    { date: '08-15', label: '论文截止', color: 'var(--ds-primary)' },
    { date: '08-20', label: '版本发布', color: 'var(--ds-success)' },
    { date: '08-28', label: '数据备份', color: 'var(--ds-danger)' },
  ]

  const darkCode = `// 日历 (Calendar) · 暗色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorBgContainer: 'var(--ds-bg-input)'       → #1d1f23  日历背景
//   colorBgElevated: 'var(--ds-bg-elevated)'     → #2C2E31  浮层
//   cellHoverBg: 'var(--ds-primary-subtle)'       → rgba(82,100,224,0.08)  悬停
import { useState } from 'react'
import { Calendar, Card, Tag, Space } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const [selectedDate, setSelectedDate] = useState(dayjs('2025-08-15'))

{/* 日历主体 · 带事件标记 */}
<Calendar
  value={selectedDate}
  onSelect={setSelectedDate}
  fullscreen={false}
  dateCellRender={(date) => {
    const event = getEvent(date)
    return event ? (
      <Tag color="processing">{event.label}</Tag>
    ) : null
  }}
/>

{/* 事件详情面板 */}
<Card size="small" title="事件详情">
  <p>{selectedDate.format('M月D日')} 事件</p>
  <Card size="small" style={{ background: 'var(--ds-primary-subtle)' }}>
    <Space>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ds-primary)' }} />
      <span style={{ color: 'var(--ds-primary)', fontWeight: 500 }}>图谱构建</span>
    </Space>
    <div><ClockCircleOutlined /> 全天事件</div>
  </Card>
</Card>

{/* 事件列表 · 点击跳转日期 */}
<div>
  <p>本月事件</p>
  <div onClick={() => setSelectedDate(dayjs('2025-08-05'))} style={{ cursor: 'pointer' }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ds-primary)' }} />
    8/05 图谱构建
  </div>
  <div onClick={() => setSelectedDate(dayjs('2025-08-12'))} style={{ cursor: 'pointer' }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ds-warning)' }} />
    8/12 专家审核
  </div>
  <div onClick={() => setSelectedDate(dayjs('2025-08-20'))} style={{ cursor: 'pointer' }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ds-success)' }} />
    8/20 版本发布
  </div>
</div>`

  const lightCode = `// 日历 (Calendar) · 亮色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorBgContainer: 'var(--ds-bg-card)'        → #ffffff  日历背景
//   colorBgElevated: 'var(--ds-bg-elevated)'     → #ffffff  浮层
//   cellHoverBg: 'var(--ds-primary-subtle)'       → rgba(82,100,224,0.06)  悬停
import { useState } from 'react'
import { Calendar, Card, Tag, Space } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const [selectedDate, setSelectedDate] = useState(dayjs('2025-08-15'))

{/* 日历主体 · 带事件标记 */}
<Calendar
  value={selectedDate}
  onSelect={setSelectedDate}
  fullscreen={false}
  dateCellRender={(date) => {
    const event = getEvent(date)
    return event ? (
      <Tag color="processing">{event.label}</Tag>
    ) : null
  }}
/>

{/* 事件详情面板 */}
<Card size="small" title="事件详情">
  <p>{selectedDate.format('M月D日')} 事件</p>
  <Card size="small" style={{ background: 'var(--ds-primary-subtle)' }}>
    <Space>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ds-primary)' }} />
      <span style={{ color: 'var(--ds-primary)', fontWeight: 500 }}>图谱构建</span>
    </Space>
    <div><ClockCircleOutlined /> 全天事件</div>
  </Card>
</Card>

{/* 事件列表 · 点击跳转日期 */}
<div>
  <p>本月事件</p>
  <div onClick={() => setSelectedDate(dayjs('2025-08-05'))} style={{ cursor: 'pointer' }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ds-primary)' }} />
    8/05 图谱构建
  </div>
  <div onClick={() => setSelectedDate(dayjs('2025-08-12'))} style={{ cursor: 'pointer' }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ds-warning)' }} />
    8/12 专家审核
  </div>
  <div onClick={() => setSelectedDate(dayjs('2025-08-20'))} style={{ cursor: 'pointer' }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ds-success)' }} />
    8/20 版本发布
  </div>
</div>`

  const dateCellRender = (date: Dayjs) => {
    const event = getEvents(date)
    if (!event) return null

    const getColor = (c: string) => {
      switch (c) {
        case 'var(--ds-primary)': return 'processing'
        case 'var(--ds-success)': return 'success'
        case 'var(--ds-warning)': return 'warning'
        case 'var(--ds-danger)': return 'error'
        default: return 'default'
      }
    }

    return (
      <Tag color={getColor(event.color)} style={{ fontSize: 10, lineHeight: '16px', padding: '0 4px' }}>
        {event.label}
      </Tag>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Text type="secondary" style={{ fontSize: 12 }}>
        交互范例 · 点击日期查看事件 Click date to see events
      </Text>

      <div style={{ display: 'flex', gap: 16 }}>
        <Card size="small" style={{ flex: 1 }}>
          <Calendar
            value={selectedDate}
            onSelect={setSelectedDate}
            fullscreen={false}
            dateCellRender={dateCellRender}
          />
        </Card>

        <Card size="small" title="事件详情" style={{ width: 220 }}>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            {selectedDate.format('M月D日')} 事件
          </Text>
          {selectedEvent ? (
            <Card
              size="small"
              style={{
                background: `${selectedEvent.color}15`,
                borderColor: `${selectedEvent.color}30`,
              }}
            >
              <Space>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: selectedEvent.color,
                    display: 'inline-block',
                  }}
                />
                <Text style={{ color: selectedEvent.color, fontWeight: 500 }}>
                  {selectedEvent.label}
                </Text>
              </Space>
              <div style={{ marginTop: 4 }}>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  <ClockCircleOutlined style={{ fontSize: 10 }} /> 全天事件
                </Text>
              </div>
            </Card>
          ) : (
            <Text type="secondary" style={{ fontSize: 12 }}>该日期暂无事件</Text>
          )}

          <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--ds-divider)' }}>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
              本月事件
            </Text>
            {allEvents.map((ev) => (
              <div
                key={ev.date}
                onClick={() => setSelectedDate(dayjs(`2025-${ev.date}`))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 0',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: ev.color,
                    display: 'inline-block',
                  }}
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  8/{ev.date}
                </Text>
                <Text style={{ fontSize: 12, color: ev.color }}>{ev.label}</Text>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
