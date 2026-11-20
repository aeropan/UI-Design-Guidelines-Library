import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(resolve(root, 'src/tokens.json'), 'utf8'));
const out = resolve(root, 'dist');
mkdirSync(out, { recursive: true });
const lines = [];
for (const group of ['color', 'space', 'radius', 'shadow', 'size', 'layout', 'motion', 'z']) {
  for (const [name, value] of Object.entries(tokens[group])) {
    const unit = typeof value !== 'number' ? '' : ['space','radius','size','layout'].includes(group) ? 'px' : group === 'motion' ? 'ms' : '';
    lines.push(`  --wac-${group}-${name}: ${value}${unit};`);
  }
}
for (const [name, value] of Object.entries(tokens.font)) lines.push(`  --wac-font-${name}: ${value};`);
for (const [name, value] of Object.entries(tokens.typography)) {
  lines.push(`  --wac-font-size-${name}: ${value.size}px;`, `  --wac-line-${name}: ${value.line}px;`, `  --wac-weight-${name}: ${value.weight};`);
}
writeFileSync(resolve(out, 'tokens.css'), `/* 自动生成；只修改 src/tokens.json。只提供浅色主题。 */
:root, [data-design-system="warm-apricot-cream-ui"] {
${lines.join('\n')}
}
`);
writeFileSync(resolve(out, 'tokens.json'), JSON.stringify(tokens, null, 2) + '\n');
writeFileSync(resolve(out, 'index.js'), `// 自动生成，框架无关，无外部依赖。
function freeze(value) { for (const entry of Object.values(value)) if (entry && typeof entry === 'object') freeze(entry); return Object.freeze(value); }
export const tokens = freeze(${JSON.stringify(tokens, null, 2)});
export const colors = tokens.color;
export const typography = tokens.typography;
export const layout = tokens.layout;
`);
writeFileSync(resolve(out, 'index.d.ts'), `export declare const tokens: ${JSON.stringify(tokens, null, 2)};
export declare const colors: typeof tokens.color;
export declare const typography: typeof tokens.typography;
export declare const layout: typeof tokens.layout;
`);
writeFileSync(resolve(out, 'components.css'), readFileSync(resolve(root, 'src/components.css'), 'utf8').replaceAll('__WAC_COMPACT__', tokens.layout['breakpoint-compact'] + 'px').replaceAll('__WAC_SMALL__', tokens.layout['breakpoint-small'] + 'px'));
console.log('Built @warm-apricot-cream/theme: CSS / JSON / JS / declarations / components.css');
