import { useState } from 'react'
import { Spin, Skeleton, Empty, Button, Card, Row, Col, Typography } from 'antd'
import { ReloadOutlined, InboxOutlined, SearchOutlined, CheckCircleOutlined } from '@ant-design/icons'
import CodeBlock from './CodeBlock'

const { Text } = Typography

export default function LoadingPlayground() {
  const [loading, setLoading] = useState(true)

  const toggleLoading = () => {
    setLoading(false)
    setTimeout(() => setLoading(true), 200)
  }

  const darkCode = `// 加载 (Spin) · 暗色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorPrimary: 'var(--ds-primary)' → #5264E0  加载动画色
import { Spin, Skeleton, Empty, Button } from 'antd'
import { InboxOutlined, SearchOutlined, CheckCircleOutlined } from '@ant-design/icons'

{/* 旋转加载 → 加载完成 */}
<Spin tip="加载中..." spinning={loading}>
  {loading ? (
    <div style={{ textAlign: 'center', padding: 50 }}>
      <Spin size="large" />
      <div>加载中...</div>
    </div>
  ) : (
    <div style={{ textAlign: 'center', padding: 50 }}>
      <CheckCircleOutlined style={{ fontSize: 40, color: 'var(--ds-success)' }} />
      <div>加载完成</div>
    </div>
  )}
</Spin>

{/* 骨架屏 */}
<Skeleton active avatar paragraph={{ rows: 3 }} />

{/* 空状态 · 无数据 */}
<Empty
  image={<InboxOutlined style={{ fontSize: 48 }} />}
  description="暂无数据"
>
  <Button type="primary">创建新任务</Button>
</Empty>

{/* 空状态 · 无搜索结果 */}
<Empty
  image={<SearchOutlined style={{ fontSize: 48 }} />}
  description="未找到结果"
>
  <Button>清除筛选</Button>
</Empty>`

  const lightCode = `// 加载 (Spin) · 亮色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorPrimary: 'var(--ds-primary)' → #5264E0  加载动画色
import { Spin, Skeleton, Empty, Button } from 'antd'
import { InboxOutlined, SearchOutlined, CheckCircleOutlined } from '@ant-design/icons'

{/* 旋转加载 → 加载完成 */}
<Spin tip="加载中..." spinning={loading}>
  {loading ? (
    <div style={{ textAlign: 'center', padding: 50 }}>
      <Spin size="large" />
      <div>加载中...</div>
    </div>
  ) : (
    <div style={{ textAlign: 'center', padding: 50 }}>
      <CheckCircleOutlined style={{ fontSize: 40, color: 'var(--ds-success)' }} />
      <div>加载完成</div>
    </div>
  )}
</Spin>

{/* 骨架屏 */}
<Skeleton active avatar paragraph={{ rows: 3 }} />

{/* 空状态 · 无数据 */}
<Empty
  image={<InboxOutlined style={{ fontSize: 48 }} />}
  description="暂无数据"
>
  <Button type="primary">创建新任务</Button>
</Empty>

{/* 空状态 · 无搜索结果 */}
<Empty
  image={<SearchOutlined style={{ fontSize: 48 }} />}
  description="未找到结果"
>
  <Button>清除筛选</Button>
</Empty>`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          交互范例 · 加载与空状态 Loading & Empty States
        </Text>
        <Button size="small" icon={<ReloadOutlined />} onClick={toggleLoading}>
          刷新 Refresh
        </Button>
      </div>

      <Row gutter={16}>
        <Col span={8}>
          <Card size="small" style={{ minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading ? (
              <div style={{ textAlign: 'center' }}>
                <Spin size="large" />
                <div style={{ marginTop: 12 }}>
                  <Text strong>加载中 Loading...</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                  正在获取数据 Fetching data
                </Text>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(67,203,137,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <CheckCircleOutlined style={{ fontSize: 20, color: 'var(--ds-success)' }} />
                </div>
                <Text strong>加载完成</Text>
              </div>
            )}
          </Card>
        </Col>

        <Col span={8}>
          <Card size="small" style={{ minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Empty
              image={<InboxOutlined style={{ fontSize: 48 }} />}
              description="暂无数据 No Data"
            >
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                当前条件下没有找到任何结果
              </Text>
              <Button type="primary" size="small">创建新任务 Create Task</Button>
            </Empty>
          </Card>
        </Col>

        <Col span={8}>
          <Card size="small" style={{ minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Empty
              image={<SearchOutlined style={{ fontSize: 48 }} />}
              description="未找到结果 No Results"
            >
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                尝试调整搜索关键词或筛选条件
              </Text>
              <Button size="small">清除筛选 Clear Filters</Button>
            </Empty>
          </Card>
        </Col>
      </Row>

      {/* Skeleton */}
      <div>
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          骨架屏 Skeleton Loading
        </Text>
        <Card size="small">
          <Skeleton active avatar paragraph={{ rows: 3 }} />
        </Card>
      </div>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
