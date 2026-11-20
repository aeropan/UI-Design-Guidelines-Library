const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let layoutTokens;
function syncNavigation() {
  if (!layoutTokens) return;
  const compact = innerWidth <= layoutTokens['breakpoint-compact'];
  const expanded = !compact && !$('#shell').classList.contains('wac-shell--collapsed');
  $('#collapse').disabled = compact;
  $('#collapse').setAttribute('aria-expanded', String(expanded));
  $('#collapse').setAttribute('aria-label', compact ? '窄屏导航已缩略' : expanded ? '折叠导航' : '展开导航');
}
window.addEventListener('resize', syncNavigation);
let toastTimer;
function toast(text) { const el = $('#toast'); el.textContent = text; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 3500); }
function view() {
  const id = location.hash.slice(1) || 'overview';
  const active = document.getElementById(id)?.hasAttribute('data-page') ? id : 'overview';
  $$('[data-page]').forEach(el => { el.hidden = el.id !== active; });
  $$('[data-view]').forEach(el => { if (el.dataset.view === active) { el.setAttribute('aria-current','page'); $('#crumb').textContent = el.getAttribute('aria-label'); } else el.removeAttribute('aria-current'); });
  $('#main').scrollTop = 0;
}
window.addEventListener('hashchange', view); view();
$('#collapse').addEventListener('click', () => { const collapsed = $('#shell').classList.toggle('wac-shell--collapsed'); $('#collapse').setAttribute('aria-expanded', String(!collapsed)); $('#collapse').setAttribute('aria-label', collapsed ? '展开导航' : '折叠导航'); syncNavigation(); });
let detailTrigger;
function toggleDetail(open) {
  $('#detail').hidden = !open;
  $$('[data-toggle-detail]').forEach(el => el.setAttribute('aria-expanded', String(open)));
  if (open) $('[data-close-detail]').focus(); else detailTrigger?.focus();
}
$$('[data-toggle-detail]').forEach(el => el.addEventListener('click', () => { detailTrigger = el; toggleDetail($('#detail').hidden); }));
$('[data-close-detail]').addEventListener('click', () => toggleDetail(false));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#detail').hidden && !$('#demo-dialog').open) toggleDetail(false); });
$$('[data-step]').forEach(el => el.addEventListener('click', () => { $('#step-title').textContent = el.dataset.step; $('#step-copy').textContent = { '理解问题':'先明确问题的目标与范围，必要时请求澄清。','检索资料':'将来源、证据片段和适用范围分别呈现；不虚构引用。','检查边界':'区分已知、未知和风险，资料不足时明确说明。' }[el.dataset.step]; }));
const resize = $('[role="separator"]'); let resizing;
function resizeTo(width) { width = Math.max(250, Math.min(560, width)); $('#detail').style.width = `${width}px`; resize.setAttribute('aria-valuenow',String(width)); }
resize.addEventListener('pointerdown', event => { resizing = { x:event.clientX, width:$('#detail').getBoundingClientRect().width }; resize.setPointerCapture(event.pointerId); });
resize.addEventListener('pointermove', event => { if (resizing) resizeTo(resizing.width + resizing.x - event.clientX); });
resize.addEventListener('pointerup', () => { resizing = null; });
resize.addEventListener('pointercancel', () => { resizing = null; });
resize.addEventListener('keydown', event => { const change = {ArrowLeft:16,ArrowRight:-16}[event.key]; if (change || ['Home','End'].includes(event.key)) { event.preventDefault(); resizeTo(event.key === 'Home' ? 250 : event.key === 'End' ? 560 : Number(resize.getAttribute('aria-valuenow')) + change); } });
const dialog = $('#demo-dialog'); let dialogTrigger;
$$('[data-open-dialog]').forEach(el => el.addEventListener('click', () => { dialogTrigger = el; dialog.showModal(); }));
$$('[data-close-dialog]').forEach(el => el.addEventListener('click', () => dialog.close()));
dialog.addEventListener('close', () => dialogTrigger?.focus());
$('#dialog-form').addEventListener('submit', event => { event.preventDefault(); const title = new FormData(event.target).get('title').trim(); const input = $('[name="title"]',event.target); input.setCustomValidity(title ? '' : '请填写资料标题'); if (!title) return input.reportValidity(); dialog.close(); toast(`本地界面示例已确认：${title}`); event.target.reset(); });
$('[name="title"]').addEventListener('input', event => event.target.setCustomValidity(''));
$$('[data-toast]').forEach(el => el.addEventListener('click', () => toast(el.dataset.toast)));
$$('[data-copy]').forEach(el => el.addEventListener('click', async () => { try { await navigator.clipboard.writeText(document.getElementById(el.dataset.copy).textContent); toast('代码已复制'); } catch { toast('无法访问剪贴板，请手动选择代码复制。'); } }));
let tooltipTimer; let tooltipAnchor;
function hideTooltip() { clearTimeout(tooltipTimer); $('#tooltip').hidden = true; tooltipAnchor?.removeAttribute('aria-describedby'); tooltipAnchor = null; }
function showTooltip(anchor) { hideTooltip(); tooltipAnchor = anchor; tooltipTimer = setTimeout(() => { const tip=$('#tooltip'); tip.textContent=anchor.dataset.tooltip; tip.hidden=false; anchor.setAttribute('aria-describedby','tooltip'); const rect=anchor.getBoundingClientRect(); tip.style.left=`${Math.min(innerWidth-tip.offsetWidth-12,Math.max(12,rect.left))}px`; tip.style.top=`${Math.max(12,rect.top-tip.offsetHeight-8)}px`; },400); }
document.addEventListener('pointerover', event => { const anchor=event.target.closest('[data-tooltip]'); if (anchor && anchor !== tooltipAnchor) showTooltip(anchor); });
document.addEventListener('pointerout', event => { if (event.target.closest('[data-tooltip]')) hideTooltip(); });
document.addEventListener('focusin', event => { const anchor=event.target.closest('[data-tooltip]'); if (anchor) showTooltip(anchor); });
document.addEventListener('focusout', hideTooltip); document.addEventListener('keydown', event => { if(event.key === 'Escape') hideTooltip(); });
// No backend, clinical claims, imported conversations, analytics or external assets.
let replyTimer; let pending;
function message(kind, text) { const row=document.createElement('div'); row.className=`wac-message${kind === 'user' ? ' wac-message--user' : ''}`; const bubble=document.createElement('div'); bubble.className='wac-bubble'; bubble.textContent=text; if(kind !== 'user') { const avatar=document.createElement('span'); avatar.className='wac-avatar'; avatar.textContent='助'; avatar.setAttribute('aria-hidden','true'); row.append(avatar); } row.append(bubble); $('#chat-log').append(row); return row; }
function updateSend() { $('#send').disabled = !pending && !$('#question').value.trim(); $('#send').textContent=pending ? '停止' : '发送'; $('#question').disabled=!!pending; $('#composer').setAttribute('aria-busy',String(!!pending)); }
function stopReply() { clearTimeout(replyTimer); pending?.remove(); pending=null; message('assistant','已停止生成。你可以调整问题后重新发送。'); updateSend(); $('#question').focus(); }
function sendQuestion() {
  if(pending) return stopReply(); const text=$('#question').value.trim(); if(!text) return;
  $('.welcome')?.remove(); message('user',text); $('#question').value=''; pending=message('assistant','正在整理问题与依据…'); pending.setAttribute('role','status'); updateSend();
  replyTimer=setTimeout(() => { pending?.remove(); pending=null; const row=message('assistant','这是交互示例：可以先整理问题范围，再列出需要的资料与证据。真实产品应展示实际来源、适用范围及不确定性，不能把演示内容当成已验证结论。'); const action=document.createElement('button'); action.type='button'; action.className='wac-button wac-button--ghost wac-button--small'; action.textContent='查看依据结构'; action.addEventListener('click',()=>{detailTrigger=action;toggleDetail(true);}); $('.wac-bubble',row).append(document.createElement('br'),action); updateSend(); },1100);
}
$('#question').addEventListener('input',updateSend); $('#composer').addEventListener('submit', event=>{event.preventDefault();sendQuestion();});
$('#question').addEventListener('keydown', event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing){event.preventDefault();sendQuestion();}});
$$('[data-question]').forEach(el=>el.addEventListener('click',()=>{$('#question').value=el.dataset.question;updateSend();$('#question').focus();}));
const docs=[{title:'研究问题的拆解方法',category:'research',author:'示例团队',year:'2026',summary:'用目标、范围与证据需求组织问题，便于后续检索和验证。',tags:['研究方法','问题定义']},{title:'证据与来源的评估清单',category:'evidence',author:'示例团队',year:'2026',summary:'区分原始资料、二次整理和待核查线索，避免把不确定信息包装成定论。',tags:['证据评估','来源']},{title:'知识整理的结构化模板',category:'research',author:'示例团队',year:'2026',summary:'从概念、关联、限制与引用四个角度整理资料，形成可追溯的知识条目。',tags:['知识整理','模板']},{title:'解释结果与未知边界',category:'evidence',author:'示例团队',year:'2026',summary:'在结果之外，同时说明依据、适用范围与尚未解决的问题。',tags:['解释性','边界']}];
let filter='all';
function renderLibrary() {
  const query=$('#library-search').value.trim().toLowerCase(); const matching=docs.filter(doc=>(filter==='all'||doc.category===filter)&&[doc.title,doc.author,doc.summary,...doc.tags].join(' ').toLowerCase().includes(query));
  $('#library').replaceChildren(); $('#library-empty').hidden=matching.length>0;
  for(const doc of matching){const article=document.createElement('article');article.className='wac-document';const cover=document.createElement('div');cover.className='wac-cover';cover.textContent='资料示例';cover.setAttribute('aria-hidden','true');const body=document.createElement('div');const title=document.createElement('h3');title.textContent=doc.title;const meta=document.createElement('div');meta.className='wac-caption';meta.textContent=`${doc.author} · ${doc.year} · 本地示例`;const summary=document.createElement('p');summary.textContent=doc.summary;const tags=document.createElement('div');tags.className='wac-row';for(const tag of doc.tags){const chip=document.createElement('span');chip.className='wac-tag';chip.textContent=tag;tags.append(chip);}body.append(title,meta,summary,tags);article.append(cover,body);$('#library').append(article);}
}
$('#library-search').addEventListener('input',renderLibrary);$$('[data-filter]').forEach(el=>el.addEventListener('click',()=>{filter=el.dataset.filter;$$('[data-filter]').forEach(button=>{button.setAttribute('aria-pressed',String(button===el));button.classList.toggle('wac-button--ghost',button!==el);});renderLibrary();}));renderLibrary();
$$('[data-node]').forEach(el=>el.addEventListener('click',()=>{$$('[data-node]').forEach(node=>node.setAttribute('aria-pressed',String(node===el)));$('#node-detail').textContent=`当前节点：${el.dataset.node}。真实产品应在此展示分类、关系、来源及限制；本图仅为组合组件示意，不连接图数据库。`;}));
async function renderTokens(){const response=await fetch('/theme/tokens.json');if(!response.ok)throw new Error('token load failed');const tokens=await response.json();layoutTokens=tokens.layout;syncNavigation();const swatches=[['page','页面底色'],['card','内容卡片'],['accent','品牌强调'],['primary','核心操作'],['text','主要文字'],['text-secondary','辅助文字']];for(const [key,label]of swatches){const card=document.createElement('div');card.className='swatch';const color=document.createElement('div');color.className='swatch-color';color.style.background=tokens.color[key];const copy=document.createElement('div');copy.className='swatch-copy';copy.textContent=label;const code=document.createElement('code');code.textContent=tokens.color[key];copy.append(code);card.append(color,copy);$('#palette').append(card);}for(const [key,role]of Object.entries(tokens.typography)){const row=document.createElement('div');row.className='type-row';const label=document.createElement('span');label.className='wac-caption';label.textContent=key.toUpperCase();const example=document.createElement('span');example.textContent=key==='display'?'让知识更易理解':'温暖清晰的信息表达';example.style.fontSize=`${role.size}px`;example.style.lineHeight=`${role.line}px`;example.style.fontWeight=role.weight;const meta=document.createElement('span');meta.className='wac-caption';meta.textContent=`${role.size} / ${role.line} / ${role.weight}`;row.append(label,example,meta);$('#type-sheet').append(row);}}
renderTokens().catch(()=>toast('未能加载 token；请先执行 npm run build，再通过本地预览服务打开。'));
