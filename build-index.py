#!/usr/bin/env python3
"""Assemble dual-theme Thieves Guild + Lore Library index.html"""
from pathlib import Path

CSS = r'''
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Uncial+Antiqua&family=Libre+Baskerville:ital,wght@0;400;0;700;1;400&family=Cormorant+Garamond:ital,wght@0;500;0;700;1;500&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --g-bg: linear-gradient(135deg, #1a1510 0%, #2d2416 50%, #1a1510 100%);
  --g-panel: linear-gradient(145deg, #251e17 0%, #1a1410 100%);
  --g-border: #3d2f1f;
  --g-gold: #d4af37;
  --g-ink: #c9a962;
  --g-muted: #8b7355;
  --g-dim: #6a5844;

  --l-bg: radial-gradient(ellipse at 20% 0%, #3d2a18 0%, #1a120c 45%, #0e0a08 100%);
  --l-panel: linear-gradient(160deg, #2a1f14 0%, #17110c 100%);
  --l-border: #6b4e2e;
  --l-gold: #e8c97a;
  --l-ink: #f0e6d2;
  --l-muted: #b9a078;
  --l-dim: #8a7355;
  --l-shelf: rgba(90, 60, 30, 0.35);
  --l-accent: #8b4513;
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  transition: background 0.5s ease, color 0.4s ease;
}

body.theme-guild {
  font-family: 'Cinzel', serif;
  background: var(--g-bg);
  color: var(--g-ink);
}

body.theme-lore {
  font-family: 'Libre Baskerville', Georgia, serif;
  background: var(--l-bg);
  color: var(--l-ink);
}

.app-shell {
  width: 100%;
  max-width: 720px;
  position: relative;
}

.tab-bar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 14px;
  position: sticky;
  top: 8px;
  z-index: 40;
}

.tab-btn {
  border: 2px solid;
  padding: 12px 10px;
  cursor: pointer;
  font-size: 0.85em;
  letter-spacing: 1px;
  font-weight: 700;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.3s ease, background 0.3s ease;
  backdrop-filter: blur(8px);
}

body.theme-guild .tab-btn {
  font-family: 'Cinzel', serif;
  border-color: var(--g-border);
  background: rgba(26, 20, 16, 0.85);
  color: var(--g-muted);
}
body.theme-guild .tab-btn.active {
  color: var(--g-gold);
  border-color: var(--g-gold);
  box-shadow: 0 0 16px rgba(212, 175, 55, 0.25);
  background: rgba(58, 46, 32, 0.95);
}

body.theme-lore .tab-btn {
  font-family: 'Cormorant Garamond', serif;
  border-color: var(--l-border);
  background: rgba(20, 14, 10, 0.88);
  color: var(--l-muted);
  font-size: 1.05em;
  letter-spacing: 2px;
}
body.theme-lore .tab-btn.active {
  color: var(--l-gold);
  border-color: var(--l-gold);
  box-shadow: 0 0 18px rgba(232, 201, 122, 0.2);
  background: rgba(42, 31, 20, 0.95);
}

.tab-btn:hover { transform: translateY(-1px); }

.panel { display: none; animation: fadeIn 0.45s ease; }
.panel.active { display: block; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===== GUILD PANEL (preserved look) ===== */
.guild-container {
  background: var(--g-panel);
  border: 3px solid var(--g-border);
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0,0,0,0.8), inset 0 0 50px rgba(0,0,0,0.5);
  padding: 28px 22px 40px;
  position: relative;
}
.guild-container::before {
  content: '';
  position: absolute; inset: -2px;
  background: linear-gradient(45deg, #4a3829, #2d2416, #4a3829, #2d2416);
  border-radius: 10px; z-index: -1; filter: blur(10px); opacity: 0.5;
}
.header { text-align: center; margin-bottom: 28px; border-bottom: 2px solid #4a3829; padding-bottom: 18px; }
.title { font-family: 'Uncial Antiqua', cursive; font-size: 2.2em; color: var(--g-gold); text-shadow: 0 0 10px rgba(201,169,98,0.5); margin-bottom: 8px; letter-spacing: 2px; }
.subtitle { font-size: 0.9em; color: var(--g-muted); font-style: italic; letter-spacing: 1px; }
.guild-symbol { width: 56px; height: 56px; margin: 0 auto 16px; background: radial-gradient(circle, #4a3829 0%, #2d2416 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8em; box-shadow: 0 0 15px rgba(0,0,0,0.7); border: 2px solid #5a4839; }
.section-title { font-family: 'Uncial Antiqua', cursive; font-size: 1.35em; color: var(--g-gold); text-align: center; margin: 32px 0 14px; letter-spacing: 1px; }
.section-note { font-size: 0.78em; color: var(--g-dim); text-align: center; margin: -6px 0 16px; font-style: italic; line-height: 1.4; }
.city-tracker { background: rgba(58,46,32,0.3); border: 2px solid #4a3829; border-radius: 8px; padding: 18px; margin-bottom: 16px; transition: all 0.3s ease; box-shadow: inset 0 0 20px rgba(0,0,0,0.5); }
.city-tracker:hover { background: rgba(58,46,32,0.5); box-shadow: 0 0 15px rgba(74,56,41,0.5), inset 0 0 20px rgba(0,0,0,0.5); transform: translateY(-2px); }
.city-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.city-name { font-size: 1.3em; color: var(--g-gold); font-weight: 600; }
.city-count { font-size: 1.9em; color: var(--g-ink); font-weight: 700; min-width: 50px; text-align: center; }
.controls { display: flex; gap: 10px; margin-bottom: 10px; }
.btn { padding: 10px 18px; border: 2px solid #4a3829; background: linear-gradient(135deg, #3a2e20 0%, #2a1e14 100%); color: var(--g-ink); font-family: 'Cinzel', serif; font-size: 0.95em; cursor: pointer; border-radius: 5px; transition: all 0.3s ease; font-weight: 600; letter-spacing: 1px; }
.btn:hover { background: linear-gradient(135deg, #4a3829 0%, #3a2e20 100%); transform: translateY(-2px); }
.btn-add { flex: 1; }
.btn-reset { background: linear-gradient(135deg, #4a2e20 0%, #2a1e14 100%); border-color: #5a3e29; }
.special-quest-toggle { display: flex; align-items: flex-start; gap: 10px; margin-top: 10px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 5px; font-size: 0.85em; color: var(--g-muted); line-height: 1.35; }
.special-quest-toggle input[type="checkbox"] { width: 20px; height: 20px; cursor: pointer; accent-color: var(--g-ink); flex-shrink: 0; margin-top: 2px; }
.special-quest-toggle label { cursor: pointer; user-select: none; }
.special-quest-toggle.completed { background: rgba(201,169,98,0.2); color: var(--g-gold); }
.milestone-indicator { margin-top: 10px; padding: 8px; background: linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(201,169,98,0.1) 100%); border: 2px solid var(--g-gold); border-radius: 5px; text-align: center; font-size: 0.8em; color: var(--g-gold); font-weight: 600; animation: pulse 2s infinite; line-height: 1.35; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
.quest-requirement { font-size: 0.78em; color: var(--g-dim); margin-top: 6px; font-style: italic; line-height: 1.4; }
.total-section { background: rgba(58,46,32,0.4); border: 3px solid #4a3829; border-radius: 8px; padding: 24px 18px; text-align: center; margin-top: 24px; box-shadow: 0 0 20px rgba(0,0,0,0.6), inset 0 0 30px rgba(0,0,0,0.5); }
.total-label { font-size: 1.1em; color: var(--g-muted); margin-bottom: 8px; letter-spacing: 2px; }
.total-count { font-size: 3.2em; color: var(--g-gold); font-weight: 700; text-shadow: 0 0 20px rgba(212,175,55,0.7); }
.total-progress { font-size: 0.9em; color: var(--g-muted); margin-top: 8px; }
.next-unlock { margin-top: 14px; padding: 12px; background: rgba(212,175,55,0.12); border: 1px solid #5a4839; border-radius: 6px; font-size: 0.85em; color: var(--g-gold); line-height: 1.45; }
.next-unlock span { color: var(--g-muted); display: block; font-size: 0.85em; margin-bottom: 4px; letter-spacing: 1px; }
.unlock-list { margin-top: 14px; text-align: left; }
.unlock-item { display: flex; gap: 10px; padding: 8px 10px; border-radius: 5px; margin-bottom: 6px; background: rgba(0,0,0,0.25); border: 1px solid transparent; font-size: 0.78em; line-height: 1.35; color: var(--g-dim); }
.unlock-item.reached { color: var(--g-ink); border-color: #4a3829; background: rgba(201,169,98,0.1); }
.unlock-item.next { color: var(--g-gold); border-color: var(--g-gold); background: rgba(212,175,55,0.15); animation: pulse 2s infinite; }
.unlock-at { flex-shrink: 0; min-width: 42px; font-weight: 700; }
.special-unlocks { background: rgba(58,46,32,0.3); border: 2px solid #4a3829; border-radius: 8px; padding: 16px; margin-top: 8px; }
.stones-header { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; margin-bottom: 12px; }
.stones-count { font-size: 1em; color: var(--g-gold); font-weight: 700; }
.stone-item { display: flex; gap: 12px; align-items: flex-start; padding: 12px; margin-bottom: 8px; background: rgba(58,46,32,0.3); border: 2px solid #4a3829; border-radius: 8px; cursor: pointer; }
.stone-item.found { border-color: #5a4839; background: rgba(201,169,98,0.12); }
.stone-item.found .stone-place, .stone-item.found .stone-detail { color: var(--g-muted); text-decoration: line-through; text-decoration-color: #5a4839; }
.stone-item input[type="checkbox"] { width: 22px; height: 22px; margin-top: 2px; flex-shrink: 0; cursor: pointer; accent-color: var(--g-ink); }
.stone-hold { display: inline-block; font-size: 0.7em; color: var(--g-muted); letter-spacing: 0.5px; margin-bottom: 4px; text-transform: uppercase; }
.stone-place { font-size: 0.95em; color: var(--g-gold); font-weight: 600; margin-bottom: 4px; line-height: 1.3; }
.stone-detail { font-size: 0.78em; color: var(--g-muted); line-height: 1.4; font-family: Georgia, serif; }
.reset-all { margin-top: 28px; text-align: center; display: flex; flex-direction: column; gap: 10px; align-items: center; }
.btn-reset-all { padding: 14px 28px; font-size: 1em; }
.source-note { margin-top: 18px; font-size: 0.7em; color: #5a4839; text-align: center; line-height: 1.4; }
.source-note a { color: var(--g-muted); }

/* ===== LORE LIBRARY ===== */
.lore-container {
  background: var(--l-panel);
  border: 2px solid var(--l-border);
  border-radius: 4px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.65), inset 0 0 80px rgba(80,50,20,0.15);
  padding: 28px 20px 36px;
  position: relative;
  overflow: hidden;
}
.lore-container::before {
  content: '';
  position: absolute; inset: 0;
  background:
    repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(139,69,19,0.04) 28px),
    radial-gradient(ellipse at 80% 10%, rgba(232,201,122,0.08), transparent 40%);
  pointer-events: none;
}
.lore-container > * { position: relative; z-index: 1; }

.lore-header { text-align: center; margin-bottom: 22px; border-bottom: 1px solid var(--l-border); padding-bottom: 18px; }
.lore-eyebrow { font-family: 'Cormorant Garamond', serif; font-size: 0.95em; letter-spacing: 4px; text-transform: uppercase; color: var(--l-muted); margin-bottom: 8px; }
.lore-title { font-family: 'Cormorant Garamond', serif; font-size: 2.6em; font-weight: 700; color: var(--l-gold); letter-spacing: 1px; line-height: 1.1; }
.lore-sub { margin-top: 10px; font-size: 0.92em; color: var(--l-muted); font-style: italic; line-height: 1.45; max-width: 34em; margin-left: auto; margin-right: auto; }
.lore-stats { margin-top: 14px; display: flex; justify-content: center; gap: 18px; flex-wrap: wrap; font-family: 'Cormorant Garamond', serif; font-size: 1.05em; color: var(--l-gold); }

.lore-nav {
  display: flex; gap: 8px; overflow-x: auto; padding: 4px 2px 12px; margin-bottom: 8px;
  -webkit-overflow-scrolling: touch;
}
.lore-chip {
  flex: 0 0 auto; border: 1px solid var(--l-border); background: rgba(0,0,0,0.25);
  color: var(--l-muted); padding: 8px 14px; border-radius: 999px; cursor: pointer;
  font-family: 'Cormorant Garamond', serif; font-size: 1em; letter-spacing: 1px;
}
.lore-chip.active { color: #1a120c; background: var(--l-gold); border-color: var(--l-gold); font-weight: 700; }

.timeline {
  display: flex; gap: 0; overflow-x: auto; padding: 10px 0 20px; margin-bottom: 8px;
  -webkit-overflow-scrolling: touch;
}
.era-node {
  flex: 0 0 auto; width: 148px; margin-right: 8px; padding: 14px 12px; cursor: pointer;
  background: var(--l-shelf); border: 1px solid var(--l-border); border-radius: 3px;
  position: relative; transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.era-node::after {
  content: '›'; position: absolute; right: -11px; top: 50%; transform: translateY(-50%);
  color: var(--l-dim); font-size: 1.4em; font-family: sans-serif;
}
.era-node:last-child::after { display: none; }
.era-node:hover, .era-node.active {
  border-color: var(--l-gold); transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.35);
}
.era-node .era-name { font-family: 'Cormorant Garamond', serif; font-size: 1.15em; color: var(--l-gold); font-weight: 700; }
.era-node .era-hint { font-size: 0.72em; color: var(--l-dim); margin-top: 6px; line-height: 1.35; }

.lore-block {
  background: rgba(0,0,0,0.22); border: 1px solid var(--l-border); border-radius: 3px;
  padding: 16px; margin-bottom: 14px;
}
.lore-block h2 {
  font-family: 'Cormorant Garamond', serif; font-size: 1.55em; color: var(--l-gold);
  margin-bottom: 8px; font-weight: 700;
}
.lore-block p { font-size: 0.88em; line-height: 1.55; color: var(--l-ink); margin-bottom: 10px; }
.insight-list { list-style: none; }
.insight-list li {
  font-size: 0.82em; line-height: 1.45; color: var(--l-muted); padding: 7px 0 7px 14px;
  border-left: 2px solid var(--l-accent); margin-bottom: 6px;
}
.skyrim-link {
  margin-top: 10px; padding: 10px 12px; background: rgba(232,201,122,0.08);
  border: 1px dashed var(--l-border); font-size: 0.8em; color: var(--l-gold); line-height: 1.45; font-style: italic;
}

.topic-grid { display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 16px; }
@media (min-width: 560px) { .topic-grid { grid-template-columns: 1fr 1fr; } }
.topic-card {
  padding: 14px; background: var(--l-shelf); border: 1px solid var(--l-border);
  border-radius: 3px; cursor: pointer; transition: border-color 0.2s ease, transform 0.2s ease;
}
.topic-card:hover, .topic-card.active { border-color: var(--l-gold); transform: translateY(-1px); }
.topic-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.15em; color: var(--l-gold); margin-bottom: 6px; }
.topic-card p { font-size: 0.78em; color: var(--l-muted); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

.shelf-controls { display: flex; flex-direction: column; gap: 8px; margin: 8px 0 12px; }
.shelf-controls input, .shelf-controls select {
  width: 100%; padding: 11px 12px; border: 1px solid var(--l-border); border-radius: 3px;
  background: rgba(10,8,6,0.65); color: var(--l-ink); font-family: 'Libre Baskerville', serif; font-size: 0.9em;
}
.shelf-controls input::placeholder { color: var(--l-dim); }

.book-row {
  display: flex; gap: 10px; align-items: flex-start; padding: 12px; margin-bottom: 8px;
  background: rgba(20,14,10,0.55); border: 1px solid #4a3420; border-left: 4px solid #7a5230;
  border-radius: 2px; cursor: pointer; transition: border-color 0.2s ease, background 0.2s ease;
}
.book-row:hover { border-color: var(--l-gold); background: rgba(40,28,16,0.7); }
.book-row.read { border-left-color: var(--l-gold); opacity: 0.85; }
.book-row input { width: 20px; height: 20px; margin-top: 3px; accent-color: var(--l-gold); flex-shrink: 0; }
.book-meta { flex: 1; min-width: 0; }
.book-title { font-family: 'Cormorant Garamond', serif; font-size: 1.15em; color: var(--l-gold); font-weight: 700; line-height: 1.2; }
.book-author { font-size: 0.75em; color: var(--l-dim); font-style: italic; margin: 3px 0 6px; }
.book-summary { font-size: 0.8em; color: var(--l-muted); line-height: 1.4; }
.book-tags { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 6px; }
.tag { font-size: 0.65em; letter-spacing: 0.5px; text-transform: uppercase; color: var(--l-dim); border: 1px solid #5a4030; padding: 2px 7px; border-radius: 999px; font-family: 'Cormorant Garamond', serif; }

.detail-overlay {
  display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.72); z-index: 60;
  padding: 20px 12px; overflow-y: auto;
}
.detail-overlay.open { display: block; }
.detail-card {
  max-width: 560px; margin: 20px auto; background: linear-gradient(160deg, #2c2116, #16110c);
  border: 2px solid var(--l-gold); border-radius: 4px; padding: 22px 18px; color: var(--l-ink);
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
}
.detail-card h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.8em; color: var(--l-gold); margin-bottom: 6px; }
.detail-card .close-x {
  float: right; border: 1px solid var(--l-border); background: transparent; color: var(--l-muted);
  width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 1.1em;
}
.detail-card .key { margin-top: 12px; padding: 12px; background: rgba(232,201,122,0.1); border-left: 3px solid var(--l-gold); font-size: 0.88em; line-height: 1.5; }
.connections { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.conn-chip {
  border: 1px solid var(--l-border); background: rgba(0,0,0,0.3); color: var(--l-muted);
  padding: 6px 10px; border-radius: 999px; cursor: pointer; font-size: 0.78em;
  font-family: 'Cormorant Garamond', serif;
}

.empty-shelf { text-align: center; color: var(--l-dim); font-style: italic; padding: 24px 8px; font-size: 0.9em; }
.lore-footer { margin-top: 20px; text-align: center; font-size: 0.7em; color: var(--l-dim); line-height: 1.45; }
.lore-footer a { color: var(--l-muted); }

@media (max-width: 480px) {
  .title { font-size: 1.8em; }
  .lore-title { font-size: 2.1em; }
  .total-count { font-size: 2.6em; }
  .era-node { width: 132px; }
}
'''

# Guild HTML body (static structure) - JS will fill dynamic parts
GUILD_HTML = r'''
<div class="guild-container">
  <div class="header">
    <div class="guild-symbol">◆</div>
    <h1 class="title">Thieves' Guild</h1>
    <p class="subtitle">Quest Tracker</p>
  </div>
  <div id="cities-container"></div>
  <div class="total-section">
    <div class="total-label">TOTAL JOBS COMPLETED</div>
    <div class="total-count" id="total-count">0</div>
    <div class="total-progress" id="total-progress">0/125 for the guildmaster safe</div>
    <div class="next-unlock" id="next-unlock"></div>
    <div class="unlock-list" id="job-unlocks"></div>
  </div>
  <h2 class="section-title">Special Job Unlocks</h2>
  <p class="section-note">After 5 jobs in a city (not Riften), Delvin offers that city’s special quest. Merchants arrive by how many specials you’ve finished.</p>
  <div class="special-unlocks" id="special-unlocks"></div>
  <h2 class="section-title">Stones of Barenziah</h2>
  <p class="section-note">No Stone Unturned — tap a stone to mark it found. Progress saves on this phone separately from job counts.</p>
  <div class="stones-header"><div class="stones-count" id="stones-count">0 / 24</div></div>
  <div id="stones-container"></div>
  <div class="reset-all">
    <button class="btn btn-reset btn-reset-all" onclick="resetAll()">Reset Job Progress</button>
    <button class="btn btn-reset btn-reset-all" onclick="resetStones()">Reset Stones Log</button>
  </div>
  <p class="source-note">
    Unlocks from <a href="https://en.uesp.net/wiki/Skyrim:Thieves_Guild_(faction)" target="_blank" rel="noopener">UESP Thieves Guild</a>.
    Stones from <a href="https://elderscrolls.fandom.com/wiki/No_Stone_Unturned_(Skyrim)" target="_blank" rel="noopener">No Stone Unturned wiki</a>.
  </p>
</div>
'''

LORE_HTML = r'''
<div class="lore-container">
  <div class="lore-header">
    <div class="lore-eyebrow">The Arcaneum · Skyrim Shelf</div>
    <h1 class="lore-title">Library of the Ages</h1>
    <p class="lore-sub">A connected map of Tamriel’s history — eras, threads, and the books that carry them — ending in the Fourth Era crises of Skyrim.</p>
    <div class="lore-stats">
      <span id="stat-eras">6 Eras</span>
      <span id="stat-topics">— Threads</span>
      <span id="stat-books">— Books</span>
      <span id="stat-read">0 read</span>
    </div>
  </div>

  <div class="lore-nav" id="lore-view-nav">
    <button class="lore-chip active" data-view="map">Lore Map</button>
    <button class="lore-chip" data-view="topics">Threads</button>
    <button class="lore-chip" data-view="books">Book Shelves</button>
  </div>

  <div id="view-map">
    <div class="timeline" id="era-timeline"></div>
    <div class="lore-block" id="era-detail"></div>
    <h2 class="section-title" style="font-family:'Cormorant Garamond',serif;color:var(--l-gold);font-size:1.4em;margin:18px 0 10px;text-align:left;letter-spacing:1px;">Connected Threads</h2>
    <div class="topic-grid" id="era-topics"></div>
    <h2 class="section-title" style="font-family:'Cormorant Garamond',serif;color:var(--l-gold);font-size:1.4em;margin:18px 0 10px;text-align:left;letter-spacing:1px;">Key Books for this Era</h2>
    <div id="era-books"></div>
  </div>

  <div id="view-topics" style="display:none">
    <div class="topic-grid" id="all-topics"></div>
  </div>

  <div id="view-books" style="display:none">
    <div class="shelf-controls">
      <input id="book-search" type="search" placeholder="Search title, author, or keyword…">
      <select id="book-subject">
        <option value="">All subjects</option>
      </select>
      <select id="book-era">
        <option value="">All eras</option>
      </select>
    </div>
    <div id="book-shelf"></div>
  </div>

  <p class="lore-footer">
    Summaries distilled from UESP lore &amp; Skyrim book descriptions.
    <a href="https://en.uesp.net/wiki/Lore:History" target="_blank" rel="noopener">Lore:History</a> ·
    <a href="https://en.uesp.net/wiki/Skyrim:Books" target="_blank" rel="noopener">Skyrim:Books</a>
  </p>
</div>

<div class="detail-overlay" id="detail-overlay" onclick="if(event.target===this)closeDetail()">
  <div class="detail-card" id="detail-card"></div>
</div>
'''

# Read guild script from backup - extract script content after cities const through end
backup = Path('index.guild-backup.html').read_text()
# We'll keep guild JS in guild.js separately for cleanliness - embed from backup script tag
import re
m = re.search(r'<script>\s*(.*?)\s*</script>\s*</body>', backup, re.S)
guild_js = m.group(1) if m else ''
# Remove trailing renderCities/renderStones calls - we'll call after tab init
# Actually keep them - they're fine

LORE_JS = r'''
/* ===== Theme / Tabs ===== */
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
setTheme(localStorage.getItem(THEME_KEY) || 'guild');

/* ===== Lore Library ===== */
const READ_KEY = 'skyrim_lore_read';
const LORE = window.LORE_DATA;
let loreState = {
  view: 'map',
  eraId: LORE.eras[LORE.eras.length - 1].id,
  topicId: null,
  search: '',
  subject: '',
  eraFilter: ''
};

function loadRead() {
  try { return JSON.parse(localStorage.getItem(READ_KEY) || '{}'); } catch { return {}; }
}
function saveRead(map) { localStorage.setItem(READ_KEY, JSON.stringify(map)); }
let readMap = loadRead();

function bookById(id) { return LORE.books.find(b => b.id === id); }
function topicById(id) { return LORE.topics.find(t => t.id === id); }
function eraById(id) { return LORE.eras.find(e => e.id === id); }

function countRead() { return Object.values(readMap).filter(Boolean).length; }

function initLoreChrome() {
  document.getElementById('stat-topics').textContent = LORE.topics.length + ' Threads';
  document.getElementById('stat-books').textContent = LORE.books.length + ' Books';
  document.getElementById('stat-read').textContent = countRead() + ' read';

  const subSel = document.getElementById('book-subject');
  const subjects = [...new Set(LORE.books.map(b => b.subject))].sort();
  subjects.forEach(s => {
    const o = document.createElement('option'); o.value = s; o.textContent = s; subSel.appendChild(o);
  });
  const eraSel = document.getElementById('book-era');
  LORE.eras.forEach(e => {
    const o = document.createElement('option'); o.value = e.id; o.textContent = e.name; eraSel.appendChild(o);
  });

  document.getElementById('lore-view-nav').addEventListener('click', (e) => {
    const chip = e.target.closest('.lore-chip');
    if (!chip) return;
    loreState.view = chip.dataset.view;
    document.querySelectorAll('#lore-view-nav .lore-chip').forEach(c => c.classList.toggle('active', c === chip));
    document.getElementById('view-map').style.display = loreState.view === 'map' ? '' : 'none';
    document.getElementById('view-topics').style.display = loreState.view === 'topics' ? '' : 'none';
    document.getElementById('view-books').style.display = loreState.view === 'books' ? '' : 'none';
    if (loreState.view === 'topics') renderAllTopics();
    if (loreState.view === 'books') renderBookShelf();
  });

  document.getElementById('book-search').addEventListener('input', (e) => {
    loreState.search = e.target.value.trim().toLowerCase();
    renderBookShelf();
  });
  document.getElementById('book-subject').addEventListener('change', (e) => {
    loreState.subject = e.target.value;
    renderBookShelf();
  });
  document.getElementById('book-era').addEventListener('change', (e) => {
    loreState.eraFilter = e.target.value;
    renderBookShelf();
  });

  renderTimeline();
  renderEraDetail();
}

function renderTimeline() {
  const el = document.getElementById('era-timeline');
  el.innerHTML = LORE.eras.map(era => `
    <div class="era-node ${era.id === loreState.eraId ? 'active' : ''}" onclick="selectEra('${era.id}')">
      <div class="era-name">${era.name}</div>
      <div class="era-hint">${(era.skyrimRelevance || '').slice(0, 70)}…</div>
    </div>
  `).join('');
}

function selectEra(id) {
  loreState.eraId = id;
  loreState.topicId = null;
  loreState.view = 'map';
  document.querySelectorAll('#lore-view-nav .lore-chip').forEach(c => c.classList.toggle('active', c.dataset.view === 'map'));
  document.getElementById('view-map').style.display = '';
  document.getElementById('view-topics').style.display = 'none';
  document.getElementById('view-books').style.display = 'none';
  renderTimeline();
  renderEraDetail();
}

function renderEraDetail() {
  const era = eraById(loreState.eraId);
  const detail = document.getElementById('era-detail');
  detail.innerHTML = `
    <h2>${era.name}</h2>
    <p>${era.summary}</p>
    <ul class="insight-list">${era.keyInsights.map(i => `<li>${i}</li>`).join('')}</ul>
    <div class="skyrim-link"><strong>Why it matters in Skyrim:</strong> ${era.skyrimRelevance}</div>
    <div class="connections">
      ${(era.connections || []).map(cid => {
        const t = topicById(cid) || eraById(cid);
        const label = t ? t.name : cid;
        const kind = topicById(cid) ? 'topic' : 'era';
        return `<button class="conn-chip" onclick="openConnection('${kind}','${cid}')">${label}</button>`;
      }).join('')}
    </div>
  `;

  const topics = LORE.topics.filter(t => (t.eraIds || []).includes(era.id));
  document.getElementById('era-topics').innerHTML = topics.map(t => topicCardHtml(t)).join('') || '<div class="empty-shelf">No threads tagged to this era.</div>';

  // Books linked via topic relatedBookIds or eraIds
  const relatedIds = new Set();
  topics.forEach(t => (t.relatedBookIds || []).forEach(id => relatedIds.add(id)));
  let books = LORE.books.filter(b => relatedIds.has(b.id) || (b.eraIds || []).includes(era.id));
  // Prefer related first, cap list for map view
  books = books.slice(0, 24);
  document.getElementById('era-books').innerHTML = books.map(b => bookRowHtml(b)).join('') || '<div class="empty-shelf">Browse Book Shelves for the full catalog.</div>';
}

function topicCardHtml(t) {
  return `<div class="topic-card ${loreState.topicId === t.id ? 'active' : ''}" onclick="openTopic('${t.id}')">
    <h3>${t.name}</h3>
    <p>${t.summary}</p>
  </div>`;
}

function renderAllTopics() {
  document.getElementById('all-topics').innerHTML = LORE.topics.map(t => topicCardHtml(t)).join('');
}

function openTopic(id) {
  const t = topicById(id);
  if (!t) return;
  loreState.topicId = id;
  const books = (t.relatedBookIds || []).map(bookById).filter(Boolean);
  const eras = (t.eraIds || []).map(eraById).filter(Boolean);
  openDetail(`
    <button class="close-x" onclick="closeDetail()">×</button>
    <h2>${t.name}</h2>
    <p style="font-size:0.9em;line-height:1.55;margin:10px 0">${t.summary}</p>
    <ul class="insight-list">${(t.keyInsights||[]).map(i => `<li>${i}</li>`).join('')}</ul>
    <div class="connections" style="margin-top:14px">
      ${eras.map(e => `<button class="conn-chip" onclick="closeDetail();selectEra('${e.id}')">${e.name}</button>`).join('')}
    </div>
    <h3 style="font-family:'Cormorant Garamond',serif;color:var(--l-gold);margin:16px 0 8px;font-size:1.3em">Related books</h3>
    ${books.map(b => bookRowHtml(b)).join('') || '<div class="empty-shelf">No linked titles yet — search the shelves.</div>'}
  `);
  if (loreState.view === 'topics') renderAllTopics();
}

function openConnection(kind, id) {
  if (kind === 'era') selectEra(id);
  else openTopic(id);
}

function bookRowHtml(b) {
  const read = !!readMap[b.id];
  return `<div class="book-row ${read ? 'read' : ''}" onclick="openBook('${b.id}')">
    <input type="checkbox" ${read ? 'checked' : ''} onclick="event.stopPropagation(); toggleRead('${b.id}')" aria-label="Mark read">
    <div class="book-meta">
      <div class="book-title">${escapeHtml(b.title)}</div>
      <div class="book-author">${escapeHtml(b.author || 'Unknown')}</div>
      <div class="book-summary">${escapeHtml(b.summary || '')}</div>
      <div class="book-tags">
        <span class="tag">${escapeHtml(b.subject || 'Lore')}</span>
        ${(b.eraIds||[]).slice(0,2).map(eid => {
          const e = eraById(eid); return e ? `<span class="tag">${e.name}</span>` : '';
        }).join('')}
      </div>
    </div>
  </div>`;
}

function filteredBooks() {
  return LORE.books.filter(b => {
    if (loreState.subject && b.subject !== loreState.subject) return false;
    if (loreState.eraFilter && !(b.eraIds || []).includes(loreState.eraFilter)) return false;
    if (loreState.search) {
      const blob = `${b.title} ${b.author} ${b.summary} ${b.keyInsight}`.toLowerCase();
      if (!blob.includes(loreState.search)) return false;
    }
    return true;
  });
}

function renderBookShelf() {
  const books = filteredBooks();
  const shelf = document.getElementById('book-shelf');
  if (!books.length) {
    shelf.innerHTML = '<div class="empty-shelf">No volumes match these shelves.</div>';
    return;
  }
  shelf.innerHTML = `<div class="section-note" style="text-align:left;color:var(--l-muted);margin-bottom:10px">${books.length} volumes</div>` +
    books.map(b => bookRowHtml(b)).join('');
}

function openBook(id) {
  const b = bookById(id);
  if (!b) return;
  const topics = (b.topicIds || []).map(topicById).filter(Boolean);
  const eras = (b.eraIds || []).map(eraById).filter(Boolean);
  openDetail(`
    <button class="close-x" onclick="closeDetail()">×</button>
    <h2>${escapeHtml(b.title)}</h2>
    <div class="book-author" style="margin-bottom:10px">${escapeHtml(b.author || 'Unknown')} · ${escapeHtml(b.subject || '')}</div>
    <p style="font-size:0.92em;line-height:1.55">${escapeHtml(b.summary || '')}</p>
    <div class="key"><strong>Key insight:</strong> ${escapeHtml(b.keyInsight || b.summary || '')}</div>
    <div class="connections">
      ${eras.map(e => `<button class="conn-chip" onclick="closeDetail();selectEra('${e.id}')">${e.name}</button>`).join('')}
      ${topics.map(t => `<button class="conn-chip" onclick="closeDetail();openTopic('${t.id}')">${t.name}</button>`).join('')}
    </div>
    <div style="margin-top:16px">
      <button class="lore-chip ${readMap[b.id] ? 'active' : ''}" onclick="toggleRead('${b.id}'); openBook('${b.id}')">${readMap[b.id] ? '✓ Logged as read' : 'Mark as read'}</button>
    </div>
  `);
}

function toggleRead(id) {
  readMap[id] = !readMap[id];
  saveRead(readMap);
  document.getElementById('stat-read').textContent = countRead() + ' read';
  if (loreState.view === 'books') renderBookShelf();
  if (loreState.view === 'map') renderEraDetail();
}

function openDetail(html) {
  document.getElementById('detail-card').innerHTML = html;
  document.getElementById('detail-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDetail() {
  document.getElementById('detail-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

if (LORE) initLoreChrome();
'''

# Fix guild JS - it references render at end; keep as-is from backup
# But guild JS uses `const cities` etc - fine

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thieves' Guild Quest Tracker</title>
    <style>
{CSS}
    </style>
</head>
<body class="theme-guild">
    <div class="app-shell">
        <div class="tab-bar">
            <button class="tab-btn active" data-theme="guild">Thieves' Guild</button>
            <button class="tab-btn" data-theme="lore">Lore Library</button>
        </div>

        <div id="panel-guild" class="panel active">
{GUILD_HTML}
        </div>

        <div id="panel-lore" class="panel">
{LORE_HTML}
        </div>
    </div>

    <script src="lore-data.js"></script>
    <script>
{guild_js}
    </script>
    <script>
{LORE_JS}
    </script>
</body>
</html>
'''

Path('index.html').write_text(html)
Path('thieves-guild-tracker.html').write_text(html)
print('Wrote index.html', Path('index.html').stat().st_size)
print('Guild JS chars', len(guild_js))
