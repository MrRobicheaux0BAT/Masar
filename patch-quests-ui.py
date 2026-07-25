#!/usr/bin/env python3
"""Patch index.html to add the Quests Codex tab."""
from pathlib import Path
import re

path = Path('index.html')
html = path.read_text()

QUEST_CSS = r'''
/* ===== QUESTS CODEX ===== */
:root {
  --q-bg: radial-gradient(ellipse at 70% 0%, #243040 0%, #141820 40%, #0c1016 100%);
  --q-panel: linear-gradient(160deg, #1c2430 0%, #121820 100%);
  --q-border: #3d4f66;
  --q-gold: #c9d4e0;
  --q-ink: #dce4ee;
  --q-muted: #8a9bb0;
  --q-dim: #5c6d82;
  --q-accent: #6b8cae;
  --q-alt: #c4a35a;
  --q-done: #7a9e7e;
}

body.theme-quests {
  font-family: 'Libre Baskerville', Georgia, serif;
  background: var(--q-bg);
  color: var(--q-ink);
}

body.theme-quests .tab-btn {
  font-family: 'Cormorant Garamond', serif;
  border-color: var(--q-border);
  background: rgba(14, 18, 26, 0.9);
  color: var(--q-muted);
  font-size: 1.0em;
  letter-spacing: 1.5px;
}
body.theme-quests .tab-btn.active {
  color: var(--q-gold);
  border-color: var(--q-gold);
  box-shadow: 0 0 18px rgba(107, 140, 174, 0.25);
  background: rgba(28, 36, 48, 0.95);
}

.tab-bar.tabs-3 { grid-template-columns: 1fr 1fr 1fr; }

.quests-container {
  background: var(--q-panel);
  border: 2px solid var(--q-border);
  border-radius: 4px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.65), inset 0 0 80px rgba(80,100,130,0.08);
  padding: 28px 20px 36px;
  position: relative;
  overflow: hidden;
}
.quests-container::before {
  content: '';
  position: absolute; inset: 0;
  background:
    repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(107,140,174,0.04) 30px),
    radial-gradient(ellipse at 20% 0%, rgba(107,140,174,0.1), transparent 45%);
  pointer-events: none;
}
.quests-container > * { position: relative; z-index: 1; }

.quests-header { text-align: center; margin-bottom: 20px; border-bottom: 1px solid var(--q-border); padding-bottom: 16px; }
.quests-eyebrow { font-family: 'Cormorant Garamond', serif; font-size: 0.95em; letter-spacing: 4px; text-transform: uppercase; color: var(--q-muted); margin-bottom: 8px; }
.quests-title { font-family: 'Cormorant Garamond', serif; font-size: 2.4em; font-weight: 700; color: var(--q-gold); letter-spacing: 1px; line-height: 1.1; }
.quests-sub { margin-top: 10px; font-size: 0.9em; color: var(--q-muted); font-style: italic; line-height: 1.45; max-width: 34em; margin-left: auto; margin-right: auto; }
.quests-stats { margin-top: 14px; display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; font-family: 'Cormorant Garamond', serif; font-size: 1.05em; color: var(--q-gold); }

.quest-search-row { display: flex; flex-direction: column; gap: 8px; margin: 10px 0 14px; }
.quest-search-row input, .quest-search-row select {
  width: 100%; padding: 11px 12px; border: 1px solid var(--q-border); border-radius: 3px;
  background: rgba(8,12,18,0.7); color: var(--q-ink); font-family: 'Libre Baskerville', serif; font-size: 0.9em;
}
.quest-search-row input::placeholder { color: var(--q-dim); }

.quest-group-label {
  font-family: 'Cormorant Garamond', serif; font-size: 0.85em; letter-spacing: 3px;
  text-transform: uppercase; color: var(--q-dim); margin: 18px 0 8px;
}

.cat-chip-row {
  display: flex; gap: 8px; overflow-x: auto; padding: 4px 2px 12px;
  -webkit-overflow-scrolling: touch;
}
.cat-chip {
  flex: 0 0 auto; border: 1px solid var(--q-border); background: rgba(0,0,0,0.25);
  color: var(--q-muted); padding: 8px 12px; border-radius: 4px; cursor: pointer;
  font-family: 'Cormorant Garamond', serif; font-size: 0.95em; letter-spacing: 0.5px;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}
.cat-chip:hover { border-color: var(--q-accent); color: var(--q-ink); }
.cat-chip.active { color: #0e1218; background: var(--q-gold); border-color: var(--q-gold); font-weight: 700; }
.cat-chip .cat-count { opacity: 0.75; font-size: 0.85em; margin-left: 4px; }

.cat-summary {
  background: rgba(0,0,0,0.22); border: 1px solid var(--q-border); border-radius: 3px;
  padding: 14px; margin-bottom: 12px; font-size: 0.85em; line-height: 1.5; color: var(--q-muted);
}
.cat-summary strong { color: var(--q-gold); font-family: 'Cormorant Garamond', serif; font-size: 1.25em; display: block; margin-bottom: 6px; font-weight: 700; }
.cat-exclusive {
  margin-top: 10px; padding: 10px 12px; background: rgba(196,163,90,0.12);
  border: 1px dashed var(--q-alt); color: var(--q-alt); font-size: 0.82em; line-height: 1.45;
}

.quest-row {
  display: flex; gap: 10px; align-items: flex-start; padding: 12px; margin-bottom: 8px;
  background: rgba(12,16,24,0.55); border: 1px solid #2a384c; border-left: 4px solid var(--q-accent);
  border-radius: 2px; cursor: pointer; transition: border-color 0.2s ease, background 0.2s ease, opacity 0.2s ease;
}
.quest-row:hover { border-color: var(--q-gold); background: rgba(28,40,56,0.7); }
.quest-row.done { border-left-color: var(--q-done); opacity: 0.82; }
.quest-row.alt-path { border-left-color: var(--q-alt); }
.quest-row.locked { opacity: 0.45; }
.quest-row input { width: 20px; height: 20px; margin-top: 3px; accent-color: var(--q-accent); flex-shrink: 0; }
.quest-meta { flex: 1; min-width: 0; }
.quest-name { font-family: 'Cormorant Garamond', serif; font-size: 1.15em; color: var(--q-gold); font-weight: 700; line-height: 1.2; }
.quest-loc { font-size: 0.75em; color: var(--q-dim); font-style: italic; margin: 3px 0 6px; }
.quest-blurb {
  font-size: 0.8em; color: var(--q-muted); line-height: 1.45;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.quest-tags { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 6px; }
.q-tag {
  font-size: 0.65em; letter-spacing: 0.5px; text-transform: uppercase; color: var(--q-dim);
  border: 1px solid #3d4f66; padding: 2px 7px; border-radius: 3px;
  font-family: 'Cormorant Garamond', serif;
}
.q-tag.alt { color: var(--q-alt); border-color: var(--q-alt); }
.q-tag.fail { color: #c47a7a; border-color: #8a5050; }
.q-tag.radiant { color: var(--q-accent); border-color: var(--q-accent); }
.q-tag.done-tag { color: var(--q-done); border-color: var(--q-done); }

.quests-footer { margin-top: 20px; text-align: center; font-size: 0.7em; color: var(--q-dim); line-height: 1.45; }
.quests-footer a { color: var(--q-muted); }

body.theme-quests .detail-card {
  background: linear-gradient(160deg, #243040, #121820);
  border-color: var(--q-gold);
  color: var(--q-ink);
}
body.theme-quests .detail-card h2 { color: var(--q-gold); font-family: 'Cormorant Garamond', serif; }
body.theme-quests .detail-label { color: var(--q-gold); }
body.theme-quests .detail-card .key { background: rgba(107,140,174,0.12); border-left-color: var(--q-accent); }
body.theme-quests .detail-card .close-x { border-color: var(--q-border); color: var(--q-muted); }
body.theme-quests .conn-chip { border-color: var(--q-border); color: var(--q-muted); background: rgba(0,0,0,0.3); }
body.theme-quests .lore-chip { border-color: var(--q-border); color: var(--q-muted); background: rgba(0,0,0,0.25); }
body.theme-quests .lore-chip.active { color: #0e1218; background: var(--q-gold); border-color: var(--q-gold); }

.alt-box {
  margin-top: 10px; padding: 12px; background: rgba(196,163,90,0.1);
  border-left: 3px solid var(--q-alt); font-size: 0.88em; line-height: 1.5;
}
.fail-box {
  margin-top: 10px; padding: 12px; background: rgba(196,122,122,0.1);
  border-left: 3px solid #c47a7a; font-size: 0.88em; line-height: 1.5; color: #e0b4b4;
}
.note-box {
  margin-top: 10px; padding: 12px; background: rgba(107,140,174,0.12);
  border-left: 3px solid var(--q-accent); font-size: 0.88em; line-height: 1.5;
}

@media (max-width: 480px) {
  .quests-title { font-size: 1.9em; }
  .tab-btn { font-size: 0.72em; padding: 10px 6px; letter-spacing: 0.5px; }
  body.theme-quests .tab-btn, body.theme-lore .tab-btn { font-size: 0.85em; letter-spacing: 1px; }
}
'''

QUEST_PANEL = r'''
<div class="quests-container">
  <div class="quests-header">
    <div class="quests-eyebrow">Journal · All of Skyrim</div>
    <h1 class="quests-title">Quest Codex</h1>
    <p class="quests-sub">Every named quest path — main story, factions, DLC, Daedric, and side work by hold — with starts, alternatives, and fail states for a true 100% journal.</p>
    <div class="quests-stats">
      <span id="quest-stat-total">0 Quests</span>
      <span id="quest-stat-done">0 done</span>
      <span id="quest-stat-cats">0 paths</span>
    </div>
  </div>

  <div class="quest-search-row">
    <input id="quest-search" type="search" placeholder="Search quests, locations, or keywords…">
    <select id="quest-filter">
      <option value="all">All quests</option>
      <option value="open">Not completed</option>
      <option value="done">Completed</option>
      <option value="alt">Has alternatives</option>
      <option value="exclusive">Exclusive / ALT paths</option>
    </select>
  </div>

  <div id="quest-groups"></div>
  <div class="cat-chip-row" id="quest-cat-chips"></div>
  <div class="cat-summary" id="quest-cat-summary"></div>
  <div id="quest-list"></div>

  <div class="reset-all" style="margin-top:24px">
    <button class="btn btn-reset btn-reset-all" onclick="resetQuestProgress()" style="font-family:'Cormorant Garamond',serif;border-color:var(--q-border);background:linear-gradient(135deg,#2a3544,#1a222e);color:var(--q-ink)">Reset Quest Log</button>
  </div>
  <p class="quests-footer">
    Starts &amp; alternatives distilled from
    <a href="https://en.uesp.net/wiki/Skyrim:Quests" target="_blank" rel="noopener">UESP Skyrim:Quests</a>.
    Radiants listed once as types. Mutually exclusive paths are marked ALT.
  </p>
</div>
'''

QUEST_JS = r'''
/* ===== Quest Codex ===== */
const QUEST_DONE_KEY = 'skyrim_quests_done';
const QUEST_CAT_KEY = 'skyrim_quests_cat';
const QD = window.QUESTS_DATA;

let questState = {
  categoryId: null,
  search: '',
  filter: 'all'
};

function loadQuestDone() {
  try { return JSON.parse(localStorage.getItem(QUEST_DONE_KEY) || '{}'); } catch { return {}; }
}
function saveQuestDone(map) { localStorage.setItem(QUEST_DONE_KEY, JSON.stringify(map)); }
let questDone = loadQuestDone();

function questById(id) { return QD.quests.find(q => q.id === id); }
function catById(id) { return QD.categories.find(c => c.id === id); }

function countQuestDone() { return Object.values(questDone).filter(Boolean).length; }

function exclusiveLocked(q) {
  if (!q.exclusiveGroup) return false;
  if (questDone[q.id]) return false;
  const rivals = QD.quests.filter(o =>
    o.exclusiveGroup === q.exclusiveGroup && o.id !== q.id && questDone[o.id]
  );
  return rivals.length > 0;
}

function questMatches(q) {
  if (questState.categoryId && q.categoryId !== questState.categoryId) return false;
  if (questState.filter === 'open' && questDone[q.id]) return false;
  if (questState.filter === 'done' && !questDone[q.id]) return false;
  if (questState.filter === 'alt' && !(q.alternatives && q.alternatives.length)) return false;
  if (questState.filter === 'exclusive' && !q.exclusiveGroup && !(q.note && /ALT/i.test(q.note))) return false;
  if (questState.search) {
    const blob = `${q.name} ${q.howToStart} ${q.description} ${q.location || ''} ${(q.alternatives||[]).join(' ')} ${q.note || ''} ${q.canFail || ''}`.toLowerCase();
    if (!blob.includes(questState.search)) return false;
  }
  return true;
}

function initQuestsChrome() {
  if (!QD) return;
  questState.categoryId = localStorage.getItem(QUEST_CAT_KEY) || QD.categories[0].id;
  document.getElementById('quest-stat-total').textContent = QD.quests.length + ' Quests';
  document.getElementById('quest-stat-cats').textContent = QD.categories.length + ' paths';
  document.getElementById('quest-stat-done').textContent = countQuestDone() + ' done';

  document.getElementById('quest-search').addEventListener('input', (e) => {
    questState.search = e.target.value.trim().toLowerCase();
    renderQuestList();
  });
  document.getElementById('quest-filter').addEventListener('change', (e) => {
    questState.filter = e.target.value;
    renderQuestList();
  });

  renderQuestChips();
  renderQuestList();
}

function renderQuestChips() {
  const groups = [];
  const seen = new Set();
  QD.categories.forEach(c => {
    if (!seen.has(c.group)) { seen.add(c.group); groups.push(c.group); }
  });

  const groupHost = document.getElementById('quest-groups');
  groupHost.innerHTML = groups.map(g => {
    const cats = QD.categories.filter(c => c.group === g);
    const chips = cats.map(c => {
      const total = QD.quests.filter(q => q.categoryId === c.id).length;
      const done = QD.quests.filter(q => q.categoryId === c.id && questDone[q.id]).length;
      return `<button type="button" class="cat-chip ${c.id === questState.categoryId ? 'active' : ''}" data-cat="${c.id}">${c.name}<span class="cat-count">${done}/${total}</span></button>`;
    }).join('');
    return `<div class="quest-group-label">${g}</div><div class="cat-chip-row">${chips}</div>`;
  }).join('');

  groupHost.querySelectorAll('.cat-chip').forEach(btn => {
    btn.addEventListener('click', () => selectQuestCategory(btn.dataset.cat));
  });

  // hide duplicate chip row
  document.getElementById('quest-cat-chips').style.display = 'none';
}

function selectQuestCategory(id) {
  questState.categoryId = id;
  localStorage.setItem(QUEST_CAT_KEY, id);
  renderQuestChips();
  renderQuestList();
}

function renderQuestList() {
  const cat = catById(questState.categoryId);
  const summary = document.getElementById('quest-cat-summary');
  if (cat) {
    summary.innerHTML = `<strong>${escapeHtml(cat.name)}</strong>${escapeHtml(cat.summary || '')}${
      cat.exclusiveNote ? `<div class="cat-exclusive"><strong>Exclusive paths:</strong> ${escapeHtml(cat.exclusiveNote)}</div>` : ''
    }`;
  } else {
    summary.innerHTML = '';
  }

  const list = QD.quests.filter(questMatches).sort((a, b) => (a.order || 0) - (b.order || 0) || a.name.localeCompare(b.name));
  const host = document.getElementById('quest-list');
  if (!list.length) {
    host.innerHTML = '<div class="empty-shelf" style="color:var(--q-dim)">No quests match this filter.</div>';
    return;
  }
  host.innerHTML = `<div class="section-note" style="text-align:left;color:var(--q-muted);margin-bottom:10px;font-style:italic">${list.length} shown</div>` +
    list.map(questRowHtml).join('');
  document.getElementById('quest-stat-done').textContent = countQuestDone() + ' done';
}

function questRowHtml(q) {
  const done = !!questDone[q.id];
  const locked = exclusiveLocked(q);
  const hasAlt = !!(q.alternatives && q.alternatives.length) || !!q.exclusiveGroup || !!(q.note && /ALT/i.test(q.note));
  const tags = [];
  if (hasAlt) tags.push('<span class="q-tag alt">ALT</span>');
  if (q.canFail) tags.push('<span class="q-tag fail">Can fail</span>');
  if (q.radiant) tags.push('<span class="q-tag radiant">Radiant</span>');
  if (done) tags.push('<span class="q-tag done-tag">Done</span>');
  if (locked) tags.push('<span class="q-tag alt">Other path chosen</span>');
  return `<div class="quest-row ${done ? 'done' : ''} ${hasAlt ? 'alt-path' : ''} ${locked ? 'locked' : ''}" onclick="openQuest('${q.id}')">
    <input type="checkbox" ${done ? 'checked' : ''} onclick="event.stopPropagation(); toggleQuestDone('${q.id}')" aria-label="Mark complete">
    <div class="quest-meta">
      <div class="quest-name">${escapeHtml(q.name)}</div>
      <div class="quest-loc">${escapeHtml(q.location || 'Skyrim')}</div>
      <div class="quest-blurb">${escapeHtml(q.description || '')}</div>
      <div class="quest-tags">${tags.join('')}</div>
    </div>
  </div>`;
}

function toggleQuestDone(id) {
  questDone[id] = !questDone[id];
  saveQuestDone(questDone);
  renderQuestChips();
  renderQuestList();
  const overlay = document.getElementById('detail-overlay');
  if (overlay.classList.contains('open')) {
    const current = document.querySelector('#detail-card h2');
    const q = questById(id);
    if (current && q && current.textContent === q.name) openQuest(id);
  }
}

function openQuest(id) {
  const q = questById(id);
  if (!q) return;
  const cat = catById(q.categoryId);
  const done = !!questDone[q.id];
  const locked = exclusiveLocked(q);
  const alts = (q.alternatives || []).map(a => `<li>${escapeHtml(a)}</li>`).join('');
  const rivals = q.exclusiveGroup
    ? QD.quests.filter(o => o.exclusiveGroup === q.exclusiveGroup && o.id !== q.id)
    : [];
  openDetail(`
    <button class="close-x" onclick="closeDetail()">×</button>
    <h2>${escapeHtml(q.name)}</h2>
    <div class="book-author" style="margin-bottom:6px;color:var(--q-muted)">${escapeHtml(cat ? cat.name : '')}${q.location ? ' · ' + escapeHtml(q.location) : ''}</div>
    <div class="quest-tags" style="margin-bottom:8px">
      ${q.exclusiveGroup || (q.note && /ALT/i.test(q.note)) ? '<span class="q-tag alt">ALT PATH</span>' : ''}
      ${q.radiant ? '<span class="q-tag radiant">Radiant</span>' : ''}
      ${done ? '<span class="q-tag done-tag">Done</span>' : ''}
      ${locked ? '<span class="q-tag alt">Locked by other path</span>' : ''}
    </div>
    <div class="detail-label">How to start</div>
    <p class="detail-summary">${escapeHtml(q.howToStart || '')}</p>
    <div class="detail-label">About this quest</div>
    <p class="detail-summary">${escapeHtml(q.description || '')}</p>
    ${alts ? `<div class="detail-label">Alternatives &amp; endings</div><ul class="insight-list" style="border:none">${alts}</ul>` : ''}
    ${q.canFail ? `<div class="fail-box"><strong>Can fail / soft-lock:</strong> ${escapeHtml(q.canFail)}</div>` : ''}
    ${q.note ? `<div class="note-box">${escapeHtml(q.note)}</div>` : ''}
    ${rivals.length ? `<div class="alt-box"><strong>Mutually exclusive with:</strong> ${rivals.map(r => escapeHtml(r.name)).join(' · ')}</div>` : ''}
    <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="lore-chip ${done ? 'active' : ''}" onclick="toggleQuestDone('${q.id}')">${done ? '✓ Completed' : 'Mark complete'}</button>
      ${cat ? `<button class="lore-chip" onclick="closeDetail(); selectQuestCategory('${cat.id}')">All ${escapeHtml(cat.name)}</button>` : ''}
    </div>
  `);
}

function resetQuestProgress() {
  if (!confirm('Clear all quest completion marks?')) return;
  questDone = {};
  saveQuestDone(questDone);
  renderQuestChips();
  renderQuestList();
}

if (QD) initQuestsChrome();
'''

# 1) Insert CSS before closing </style>
if '/* ===== QUESTS CODEX ===== */' not in html:
    html = html.replace('    </style>', QUEST_CSS + '\n    </style>', 1)

# 2) Tab bar → 3 tabs
html = html.replace(
    '''        <div class="tab-bar">
            <button class="tab-btn active" data-theme="guild">Thieves' Guild</button>
            <button class="tab-btn" data-theme="lore">Lore Library</button>
        </div>''',
    '''        <div class="tab-bar tabs-3">
            <button class="tab-btn active" data-theme="guild">Thieves' Guild</button>
            <button class="tab-btn" data-theme="lore">Lore Library</button>
            <button class="tab-btn" data-theme="quests">Quests</button>
        </div>'''
)

# 3) Insert quests panel before closing app-shell (after lore panel)
if 'id="panel-quests"' not in html:
    # Find end of lore panel — the detail overlay is inside lore panel currently
    # Structure: panel-lore contains lore-container AND detail-overlay, then </div> closes panel-lore, then </div> app-shell
    marker = '''        </div>
    </div>

    <script src="lore-data.js"></script>'''
    replacement = f'''        </div>

        <div id="panel-quests" class="panel">
{QUEST_PANEL}
        </div>
    </div>

    <script src="lore-data.js"></script>
    <script src="quests-data.js"></script>'''
    if marker not in html:
        raise SystemExit('Could not find lore-data script injection point')
    html = html.replace(marker, replacement, 1)

# 4) Replace setTheme function to support 3 themes
old_theme = r'''/\* ===== Theme / Tabs ===== \*/
const THEME_KEY = 'skyrim_app_theme';
function setTheme\(theme\) \{
  document\.body\.classList\.remove\('theme-guild', 'theme-lore'\);
  document\.body\.classList\.add\(theme === 'lore' \? 'theme-lore' : 'theme-guild'\);
  document\.getElementById\('panel-guild'\)\.classList\.toggle\('active', theme !== 'lore'\);
  document\.getElementById\('panel-lore'\)\.classList\.toggle\('active', theme === 'lore'\);
  document\.querySelectorAll\('\.tab-btn'\)\.forEach\(btn => \{
    btn\.classList\.toggle\('active', btn\.dataset\.theme === theme\);
  \}\);
  localStorage\.setItem\(THEME_KEY, theme\);
  document\.title = theme === 'lore' \? "Library of the Ages" : "Thieves' Guild Quest Tracker";
\}
document\.querySelectorAll\('\.tab-btn'\)\.forEach\(btn => \{
  btn\.addEventListener\('click', \(\) => setTheme\(btn\.dataset\.theme\)\);
\}\);
setTheme\(localStorage\.getItem\(THEME_KEY\) \|\| 'guild'\);'''

new_theme = '''/* ===== Theme / Tabs ===== */
const THEME_KEY = 'skyrim_app_theme';
const THEME_TITLES = {
  guild: "Thieves' Guild Quest Tracker",
  lore: "Library of the Ages",
  quests: "Skyrim Quest Codex"
};
function setTheme(theme) {
  if (!['guild', 'lore', 'quests'].includes(theme)) theme = 'guild';
  document.body.classList.remove('theme-guild', 'theme-lore', 'theme-quests');
  document.body.classList.add('theme-' + theme);
  document.getElementById('panel-guild').classList.toggle('active', theme === 'guild');
  document.getElementById('panel-lore').classList.toggle('active', theme === 'lore');
  const pq = document.getElementById('panel-quests');
  if (pq) pq.classList.toggle('active', theme === 'quests');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
  localStorage.setItem(THEME_KEY, theme);
  document.title = THEME_TITLES[theme] || THEME_TITLES.guild;
}
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});
setTheme(localStorage.getItem(THEME_KEY) || 'guild');'''

html2, n = re.subn(old_theme, new_theme, html, count=1)
if n != 1:
    # try plain replace without regex escaping issues - use exact text from file
    exact_old = '''/* ===== Theme / Tabs ===== */
const THEME_KEY = 'skyrim_app_theme';
function setTheme(theme) {
  document.body.classList.remove('theme-guild', 'theme-lore');
  document.body.classList.add(theme === 'lore' ? 'theme-lore' : 'theme-guild');
  document.getElementById('panel-guild').classList.toggle('active', theme !== 'lore');
  document.getElementById('panel-lore').classList.toggle('active', theme === 'lore');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
  localStorage.setItem(THEME_KEY, theme);
  document.title = theme === 'lore' ? "Library of the Ages" : "Thieves' Guild Quest Tracker";
}
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});
setTheme(localStorage.getItem(THEME_KEY) || 'guild');'''
    if exact_old not in html:
        raise SystemExit('Could not find setTheme block')
    html = html.replace(exact_old, new_theme, 1)
else:
    html = html2

# 5) Append quest JS before final </script> of lore block — after initLoreChrome call
needle = 'if (LORE) initLoreChrome();\n\n    </script>'
if needle not in html:
    needle = 'if (LORE) initLoreChrome();\n\n'
    if 'if (LORE) initLoreChrome();' not in html:
        raise SystemExit('Could not find lore init')
    html = html.replace(
        'if (LORE) initLoreChrome();',
        'if (LORE) initLoreChrome();\n\n' + QUEST_JS,
        1
    )
else:
    html = html.replace(needle, 'if (LORE) initLoreChrome();\n\n' + QUEST_JS + '\n\n    </script>', 1)

path.write_text(html)
Path('thieves-guild-tracker.html').write_text(html)
print('Patched index.html', path.stat().st_size)
print('Synced thieves-guild-tracker.html')
print('Has panel-quests:', 'id="panel-quests"' in html)
print('Has quests-data script:', 'quests-data.js' in html)
print('Has theme-quests:', 'theme-quests' in html)
print('Has initQuestsChrome:', 'initQuestsChrome' in html)
