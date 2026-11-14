import { useState } from 'react'
import { Pagination, Space, Typography, Segmented } from 'antd'
import CodeBlock from './CodeBlock'

const { Text } = Typography

const darkCode = `// 分页器 (Pagination) · 暗色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   itemActiveBg:   var(--ds-primary)      → #5264E0  激活项背景
//   itemBg:         var(--ds-bg-card)       → #222427  默认项背景
//   colorPrimary:   '#ffffff'                  → #ffffff  激活项文字(反白)
//   colorText:      var(--ds-text-secondary) → #8a8f99  页码文字
import { Pagination } from 'antd'

{/* 基础分页 */}
<Pagination defaultCurrent={1} total={50} />

{/* 显示总数 + 快速跳转 */}
<Pagination
  defaultCurrent={1}
  total={200}
  showTotal={(total) => \`共 \${total} 条\`}
  showQuickJumper
/>

{/* 不同尺寸 */}
<Pagination size="small" defaultCurrent={1} total={50} />
<Pagination defaultCurrent={1} total={50} />
{/* size="default" 同上，省略 */}

{/* 简洁模式 */}
<Pagination simple defaultCurrent={2} total={50} />

{/* 禁用态 */}
<Pagination defaultCurrent={1} total={50} disabled />`

const lightCode = `// 分页器 (Pagination) · 亮色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   itemActiveBg:   var(--ds-primary)      → #5264E0  激活项背景
//   itemBg:         var(--ds-bg-card)       → #ffffff  默认项背景
//   colorPrimary:   '#ffffff'                  → #ffffff  激活项文字(反白)
//   colorText:      var(--ds-text-secondary) → #5c5f66  页码文字
import { Pagination } from 'antd'

{/* 基础分页 */}
<Pagination defaultCurrent={1} total={50} />

{/* 显示总数 + 快速跳转 */}
<Pagination
  defaultCurrent={1}
  total={200}
  showTotal={(total) => \`共 \${total} 条\`}
  showQuickJumper
/>

{/* 不同尺寸 */}
<Pagination size="small" defaultCurrent={1} total={50} />
<Pagination defaultCurrent={1} total={50} />

{/* 简洁模式 */}
<Pagination simple defaultCurrent={2} total={50} />

{/* 禁用态 */}
<Pagination defaultCurrent={1} total={50} disabled />`

export default function PaginationPlayground() {
  const [size, setSize] = useState<'small' | 'middle'>('middle')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text type="secondary" style={{ fontSize: 12 }}>交互范例 · Interactive Example</Text>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Text type="secondary" style={{ fontSize: 12, width: 60 }}>尺寸</Text>
        <Segmented
          size="small"
          value={size}
          onChange={(val) => setSize(val as 'small' | 'middle')}
          options={[
            { label: '小 sm', value: 'small' },
            { label: '中 md', value: 'middle' },
          ]}
        />
      </div>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>基础 + 显示总数 + 快速跳转</Text>
          <Pagination
            size={size}
            defaultCurrent={1}
            total={200}
            showTotal={(total) => `共 ${total} 条`}
            showQuickJumper
            showSizeChanger
          />
        </div>

        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>小型 · 少量数据</Text>
          <Pagination
            size={size}
            defaultCurrent={1}
            total={30}
          />
        </div>

        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>简洁模式</Text>
          <Pagination
            size={size}
            simple
            defaultCurrent={3}
            total={50}
          />
        </div>
      </Space>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}