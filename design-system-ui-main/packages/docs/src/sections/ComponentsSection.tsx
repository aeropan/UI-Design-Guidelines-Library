import TokenDownload from './TokenDownload';
import ButtonPlayground from './ButtonPlayground';
import InputPlayground from './InputPlayground';
import TagPlayground from './TagPlayground';
import CardPlayground from './CardPlayground';
import TablePlayground from './TablePlayground';
import ModalPlayground from './ModalPlayground';
import StepPlayground from './StepPlayground';
import CalendarPlayground from './CalendarPlayground';
import LoadingPlayground from './LoadingPlayground';
import TooltipPlayground from './TooltipPlayground';
import MenuPlayground from './MenuPlayground';
import CodeBlockPlayground from './CodeBlockPlayground';
import PaginationPlayground from './PaginationPlayground';
import UploadPlayground from './UploadPlayground';
import TabsPlayground from './TabsPlayground';

export const componentSections = [
  { id: 'comp-button', title: '按钮', titleEn: 'Button', color: '#5264E0', Component: ButtonPlayground },
  { id: 'comp-input', title: '输入控件', titleEn: 'Input', color: '#FFA564', Component: InputPlayground },
  { id: 'comp-tag', title: '状态标签', titleEn: 'Tag / Status', color: '#FF6464', Component: TagPlayground },
  { id: 'comp-card', title: '卡片', titleEn: 'Card', color: '#43CB89', Component: CardPlayground },
  { id: 'comp-table', title: '表格', titleEn: 'Table', color: '#8a8f99', Component: TablePlayground },
  { id: 'comp-modal', title: '弹窗', titleEn: 'Modal', color: '#5264E0', Component: ModalPlayground },
  { id: 'comp-step', title: '步骤条', titleEn: 'Step', color: '#FFA564', Component: StepPlayground },
  { id: 'comp-calendar', title: '日历', titleEn: 'Calendar', color: '#43CB89', Component: CalendarPlayground },
  { id: 'comp-loading', title: '加载与空状态', titleEn: 'Loading / Empty', color: '#8c8c8c', Component: LoadingPlayground },
  { id: 'comp-tooltip', title: '气泡与提示', titleEn: 'Tooltip', color: '#5264E0', Component: TooltipPlayground },
  { id: 'comp-menu', title: '导航菜单', titleEn: 'Navigation Menu', color: '#5264E0', Component: MenuPlayground },
  { id: 'comp-pagination', title: '分页器', titleEn: 'Pagination', color: '#5264E0', Component: PaginationPlayground },
  { id: 'comp-upload', title: '上传', titleEn: 'Upload', color: '#FFA564', Component: UploadPlayground },
  { id: 'comp-tabs', title: '分类标签', titleEn: 'Tabs', color: '#5264E0', Component: TabsPlayground },
  { id: 'comp-codeblock', title: '代码块', titleEn: 'Code Block', color: '#43CB89', Component: CodeBlockPlayground },
];

export default function ComponentsSection() {

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>组件规范</h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Components · 所有组件支持交互，切换明暗主题可查看不同配色代码
        </p>
      </div>

      <TokenDownload
        title="下载组件配置文件"
        subtitle="支持 JSON / CSS Variables / SCSS / LESS 四种格式"
        filePrefix="component-tokens"
        data={{
          'Button': {
            'btn-height': '36px',
            'btn-padding-x': '16px',
            'btn-radius': '6px',
            'btn-font-size': '14px',
            'btn-font-weight': 500,
            'btn-primary': '#5264E0',
            'btn-primary-hover': '#6B80F0',
            'btn-primary-active': '#3F50C0',
            'btn-primary-subtle': 'rgba(82,100,224,0.08)',
            'btn-danger': '#FF6464',
            'btn-success': '#43CB89',
          },
          'Input': {
            'input-height': '36px',
            'input-padding-x': '12px',
            'input-radius': '6px',
            'input-bg': '#f5f6fa',
            'input-border': '#e4e5e9',
            'input-focus-border': '#5264E0',
            'input-focus-shadow': '0 0 0 2px rgba(82,100,224,0.12)',
            'input-error-border': '#FF6464',
            'input-error-shadow': '0 0 0 2px rgba(255,100,100,0.12)',
            'input-placeholder': 'var(--ds-text-tertiary)',
          },
          'Tag': {
            'tag-padding-x': '12px',
            'tag-padding-y': '4px',
            'tag-radius': '4px',
            'tag-font-size': '12px',
            'tag-font-weight': 500,
          },
          'Card': {
            'card-radius': '8px',
            'card-padding': '16px',
            'card-bg': '#ffffff',
            'card-border': '#e4e5e9',
          },
          'Modal': {
            'modal-radius': '12px',
            'modal-width-sm': '480px',
            'modal-width-md': '640px',
            'modal-width-lg': '900px',
            'modal-padding': '20px',
          },
          'Switch': {
            'switch-width': '40px',
            'switch-height': '22px',
            'switch-knob-size': '16px',
            'switch-checked': '#5264E0',
            'switch-unchecked': '#d0d2d8',
          },
          'Slider': {
            'slider-track-height': '4px',
            'slider-track-bg': '#e4e5e9',
            'slider-fill': '#5264E0',
            'slider-thumb-size': '16px',
          },
        }}
      />

      {componentSections.map(({ id, title, titleEn, color, Component }) => (
        <section
          key={id}
          id={id}
          className="scroll-section"
          style={{ scrollMarginTop: 24 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full" style={{ background: color }} />
            <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>{title}</h2>
            <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{titleEn}</span>
          </div>
          <div className="rounded-lg p-6" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
            <Component />
          </div>
        </section>
      ))}
    </div>
  );
}
