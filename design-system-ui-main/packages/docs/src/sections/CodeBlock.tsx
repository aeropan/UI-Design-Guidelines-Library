import { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '../theme';

interface CodeBlockProps {
  darkCode: string;
  lightCode: string;
  lang?: string;
  /** 是否显示语法高亮 */
  highlight?: boolean;
  /** 最大高度，超出滚动 */
  maxHeight?: number;
}

/** 轻量 TSX/JS 语法高亮 —— 无外部依赖 */
function highlightTSX(code: string): string {
  return code
    // 注释
    .replace(/(\/\/[^\n]*)/g, '<span class="cb-comment">$1</span>')
    .replace(/(\{\/\*[\s\S]*?\*\/\})/g, '<span class="cb-comment">$1</span>')
    // 字符串
    .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="cb-string">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="cb-string">$1</span>')
    .replace(/(`(?:[^`\\]|\\.)*`)/g, '<span class="cb-string">$1</span>')
    // JSX 标签
    .replace(/(&lt;\/?)(\w+)/g, '$1<span class="cb-tag">$2</span>')
    .replace(/(\/?&gt;)/g, '<span class="cb-tag">$1</span>')
    // 关键字
    .replace(/\b(import|export|default|from|const|let|var|function|return|if|else|for|while|class|extends|new|this|typeof|instanceof|void|delete|throw|try|catch|finally|async|await|yield|switch|case|break|continue|interface|type|enum|as|in|of)\b/g,
      '<span class="cb-keyword">$1</span>')
    // JSX 属性
    .replace(/\b(\w+)=/g, '<span class="cb-attr">$1</span>=')
    // 数字
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="cb-number">$1</span>')
    // true / false / null / undefined
    .replace(/\b(true|false|null|undefined)\b/g, '<span class="cb-boolean">$1</span>');
}

export default function CodeBlock({ darkCode, lightCode, lang = 'tsx', highlight = true, maxHeight = 280 }: CodeBlockProps) {
  const { mode } = useTheme();
  const [copied, setCopied] = useState(false);
  const code = mode === 'light' ? lightCode : darkCode;

  const highlighted = useMemo(() => (highlight ? highlightTSX(code) : code), [code, highlight]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        border: '1px solid var(--ds-border)',
        background: 'var(--ds-bg-sidebar)',
      }}
    >
      {/* 工具栏 */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          borderBottom: '1px solid var(--ds-divider)',
          background: 'var(--ds-bg-elevated)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--ds-danger)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--ds-warning)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--ds-success)' }} />
          </div>
          <span className="text-caption font-mono" style={{ color: 'var(--ds-text-tertiary)' }}>
            {lang}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-caption transition-all duration-150 border-none cursor-pointer font-medium"
          style={{
            background: copied ? 'var(--ds-success-bg)' : 'var(--ds-primary-subtle)',
            color: copied ? 'var(--ds-success)' : 'var(--ds-text-secondary)',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? '已复制' : '复制代码'}
        </button>
      </div>

      {/* 代码区 */}
      {highlight ? (
        <pre
          className="p-4 overflow-x-auto text-small font-mono leading-relaxed cb-pre"
          style={{ color: 'var(--ds-text-primary)', maxHeight, overflowY: 'auto' }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        <pre
          className="p-4 overflow-x-auto text-small font-mono leading-relaxed"
          style={{ color: 'var(--ds-text-primary)', maxHeight, overflowY: 'auto' }}
        >
          <code>{code}</code>
        </pre>
      )}

      {/* 高亮样式注入 */}
      {highlight && (
        <style>{`
          .cb-pre { tab-size: 2; margin: 0; }
          .cb-comment { color: var(--ds-text-tertiary); font-style: italic; }
          .cb-string  { color: var(--ds-success); }
          .cb-keyword { color: var(--ds-primary); font-weight: 500; }
          .cb-tag     { color: var(--ds-primary); }
          .cb-attr    { color: var(--ds-warning); }
          .cb-number  { color: var(--ds-warning); }
          .cb-boolean { color: var(--ds-primary); }
        `}</style>
      )}
    </div>
  );
}