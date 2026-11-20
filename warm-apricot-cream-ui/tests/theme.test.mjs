import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { tokens, colors, typography, layout } from '../packages/theme/dist/index.js';
const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const source = JSON.parse(read('packages/theme/src/tokens.json'));
const css = read('packages/theme/dist/tokens.css');

test('CSS/JSON/JS产物与唯一源一致，数值导出不依赖UI框架', () => {
  assert.deepEqual(tokens, source);
  assert.deepEqual(JSON.parse(read('packages/theme/dist/tokens.json')), source);
  assert.equal(colors.primary, '#9E5F4E');
  assert.equal(typography.body.size, 15);
  assert.equal(layout.sidebar, 240);
  assert.ok(Object.isFrozen(tokens.color));
  for (const [name, value] of Object.entries(colors)) assert.ok(css.includes(`--wac-color-${name}: ${value};`), name);
  assert.doesNotMatch(read('packages/theme/dist/index.js'), /from ['"](?:react|antd|gradio)/);
});

test('组件与示例不引用未定义token，断点由源生成', () => {
  const defined = new Set([...css.matchAll(/(--wac-[\w-]+):/g)].map(m=>m[1]));
  for (const path of ['packages/theme/dist/components.css', 'packages/docs/docs.css']) {
    const content = read(path);
    assert.doesNotMatch(content, /__WAC_/);
    for (const match of content.matchAll(/var\((--wac-[\w-]+)/g)) assert.ok(defined.has(match[1]), `${path}: ${match[1]}`);
  }
  assert.ok(read('packages/theme/dist/components.css').includes(`max-width:${layout['breakpoint-compact']}px`));
  assert.ok(read('packages/theme/dist/components.css').includes(`max-width:${layout['breakpoint-small']}px`));
});

function luminance(hex) {
  const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
  return rgb.reduce((sum,v,i)=>sum+v*[0.2126,0.7152,0.0722][i],0);
}
function contrast(a,b) { const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05); }
test('核心按钮、正文和语义文字达到普通小字号4.5对比度', () => {
  const pairs=[['primary','text-inverse'],['primary-hover','text-inverse'],['text','page'],['text-secondary','page'],['success-text','success-bg'],['warning-text','warning-bg'],['danger-text','danger-bg'],['info-text','info-bg']];
  for(const [a,b] of pairs) assert.ok(contrast(colors[a],colors[b])>=4.5, `${a}/${b}: ${contrast(colors[a],colors[b])}`);
  assert.ok(contrast(colors.accent,colors['text-inverse'])<4.5,'品牌强调不能误用作小字白字按钮');
});

test('规范元数据、AI入口与包名独立，未携带原项目运行能力', () => {
  const spec=JSON.parse(read('spec.json'));
  assert.equal(spec.id,'warm-apricot-cream-ui');
  assert.equal(spec.name,'暖杏奶油风设计规范');
  assert.deepEqual(spec.themes,['light']);
  assert.equal(spec.version,tokens.meta.version);
  for(const path of [spec.ai.codex,spec.ai.workbuddy,spec.tokens,spec.examples,...Object.values(spec.links)]) assert.ok(read(path).length>0,path);
  const pkg=JSON.parse(read('packages/theme/package.json'));
  assert.equal(pkg.name,'@warm-apricot-cream/theme');
  assert.ok(!pkg.dependencies);
  const app=read('packages/docs/app.js');
  assert.doesNotMatch(app,/innerHTML|feishu|neo4j|server\.respond|seed_conversations|MOONSHOT_API_KEY/);
  assert.ok(app.includes('isComposing'));
  assert.ok(app.includes('showModal()'));
});
