import { Upload, Button, Typography } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import CodeBlock from './CodeBlock'

const { Text } = Typography
const { Dragger } = Upload

const darkCode = `// 上传 (Upload) · 暗色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorBgContainer: var(--ds-bg-input)      → #1d1f23  拖拽区背景
//   colorBorder:      var(--ds-border)         → #323640  虚线边框
//   colorPrimary:     var(--ds-primary)        → #5264E0  上传中/选中
//   colorText:        var(--ds-text-primary)    → #d0d2d8  主文字
//   colorTextSecondary: var(--ds-text-secondary) → #8a8f99  说明文字
//   colorError:       var(--ds-danger)          → #FF6464  错误状态
import { Upload, Button } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'

{/* 点击上传 */}
<Upload>
  <Button icon={<UploadOutlined />}>选择文件</Button>
</Upload>

{/* 拖拽上传 — Dragger */}
<Upload.Dragger name="file" multiple>
  <p className="ant-upload-drag-icon">
    <InboxOutlined />
  </p>
  <p>点击或拖拽文件到此区域上传</p>
  <p>支持单个或批量上传</p>
</Upload.Dragger>

{/* 已上传文件列表 */}
<Upload
  defaultFileList={[
    { uid: '1', name: '文献数据.xlsx', status: 'done' },
    { uid: '2', name: '知识图谱.json', status: 'uploading', percent: 60 },
    { uid: '3', name: '本体模型.owl', status: 'error' },
  ]}
>
  <Button icon={<UploadOutlined />}>上传文件</Button>
</Upload>`

const lightCode = `// 上传 (Upload) · 亮色主题
// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   colorBgContainer: var(--ds-bg-input)      → #f5f6fa  拖拽区背景
//   colorBorder:      var(--ds-border)         → #e4e5e9  虚线边框
//   colorPrimary:     var(--ds-primary)        → #5264E0  上传中/选中
//   colorText:        var(--ds-text-primary)    → #1d1f23  主文字
//   colorTextSecondary: var(--ds-text-secondary) → #5c5f66  说明文字
//   colorError:       var(--ds-danger)          → #FF6464  错误状态
import { Upload, Button } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'

{/* 点击上传 */}
<Upload>
  <Button icon={<UploadOutlined />}>选择文件</Button>
</Upload>

{/* 拖拽上传 — Dragger */}
<Upload.Dragger name="file" multiple>
  <p className="ant-upload-drag-icon">
    <InboxOutlined />
  </p>
  <p>点击或拖拽文件到此区域上传</p>
  <p>支持单个或批量上传</p>
</Upload.Dragger>

{/* 已上传文件列表 */}
<Upload
  defaultFileList={[
    { uid: '1', name: '文献数据.xlsx', status: 'done' },
    { uid: '2', name: '知识图谱.json', status: 'uploading', percent: 60 },
    { uid: '3', name: '本体模型.owl', status: 'error' },
  ]}
>
  <Button icon={<UploadOutlined />}>上传文件</Button>
</Upload>`

const fileList: UploadProps['defaultFileList'] = [
  { uid: '1', name: '文献数据.xlsx', status: 'done' },
  { uid: '2', name: '知识图谱.json', status: 'uploading', percent: 60 },
  { uid: '3', name: '本体模型.owl', status: 'error' },
]

export default function UploadPlayground() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text type="secondary" style={{ fontSize: 12 }}>交互范例 · Interactive Example</Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* 点击上传 */}
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            点击上传 Click to Upload
          </Text>
          <Upload>
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
        </div>

        {/* 拖拽上传 */}
        <div style={{ maxWidth: 480 }}>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            拖拽上传 Dragger
          </Text>
          <Dragger name="file" multiple style={{ minHeight: 160 }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: 48, color: 'var(--ds-primary)' }} />
            </p>
            <p className="ant-upload-text" style={{ color: 'var(--ds-text-primary)' }}>
              点击或拖拽文件到此区域上传
            </p>
            <p className="ant-upload-hint" style={{ color: 'var(--ds-text-secondary)' }}>
              支持单个或批量上传
            </p>
          </Dragger>
        </div>

        {/* 文件列表状态 */}
        <div style={{ maxWidth: 480 }}>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            文件列表状态 · 完成 / 上传中 / 失败
          </Text>
          <Upload defaultFileList={fileList}>
            <Button icon={<UploadOutlined />}>上传文件</Button>
          </Upload>
        </div>
      </div>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}