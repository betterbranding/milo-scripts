/* navfix-form-cards.js — Card-based Landing Page + 11-step form with ZIP routing
 * - Apple App Store "Today" card style: dark canvas, bold gradient cards
 * - Each LP section is a separate rounded card on near-black background
 * - 11-step form with ZIP routing, multi-select step 5, manual address
 * - Meta Pixel fires PageView + Lead on thank-you step
 * - leadSource: "Facebook", tags: ["meta lead"]
 */
(function() {
  'use strict';

  /* Preconnect to external origins for faster resource loading */
  ['https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://assets.cdn.filesafe.space'].forEach(function(origin) {
    if (!document.querySelector('link[href="' + origin + '"]')) {
      var link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      if (origin.indexOf('gstatic') > -1) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });

  /* Load Google Fonts */
  if (!document.querySelector('link[href*="League+Spartan"]')) {
    var fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@500;700;800&family=Nunito+Sans:wght@400;600;700&display=swap';
    document.head.appendChild(fonts);
  }

  var BASE = 'https://betterbranding.github.io/milo-scripts/';

  /* ── STYLES ── */
  var css = document.createElement('style');
  css.id = 'milo-cards-styles';
  css.textContent = '\n' +
    'html, body { margin: 0; padding: 0; background: #ffffff !important; min-height: 100vh; overflow-x: hidden; }\n' +
    '#milo-form-content { all: initial; display: block; width: 100%; font-family: \'Nunito Sans\', \'Gotham\', sans-serif; color: #fff; }\n' +
    '#milo-form-content, #milo-form-content *, #milo-form-content *::before, #milo-form-content *::after { margin: 0; padding: 0; box-sizing: border-box; }\n' +
    '#milo-form-content h1, #milo-form-content h2, #milo-form-content h3, #milo-form-content h4, #milo-form-content h5 { font-family: \'League Spartan\', sans-serif; }\n' +
    '\n' +
    ':root {\n' +
    '  --green: #288D11; --green-dark: #1a6b0a; --green-deepest: #0d3a06;\n' +
    '  --navy: #074387; --navy-dark: #042c5a; --navy-deepest: #021a38;\n' +
    '  --orange: #FF8200; --orange-hover: #e67400;\n' +
    '  --light-blue: #50ACE1; --white: #ffffff;\n' +
    '  --card-radius: 28px;\n' +
    '}\n' +
    '\n' +
    '/* ============ CARD-BASED LANDING PAGE ============ */\n' +
    '#milo-form-content .cards-page {\n' +
    '  width: 100%; max-width: 520px; margin: 0 auto;\n' +
    '  padding: 16px 14px 8px;\n' +
    '  display: flex; flex-direction: column; gap: 16px;\n' +
    '}\n' +
    '\n' +
    '/* ---- CARD BASE ---- */\n' +
    '#milo-form-content .c-card {\n' +
    '  border-radius: var(--card-radius); padding: 48px 32px;\n' +
    '  text-align: center; position: relative; overflow: hidden;\n' +
    '  opacity: 0; transform: translateY(24px);\n' +
    '  animation: cardReveal 0.7s ease forwards;\n' +
    '}\n' +
    '#milo-form-content .c-card:nth-child(1) { animation-delay: 0s; }\n' +
    '#milo-form-content .c-card:nth-child(2) { animation-delay: 0.12s; }\n' +
    '#milo-form-content .c-card:nth-child(3) { animation-delay: 0.24s; }\n' +
    '#milo-form-content .c-card:nth-child(4) { animation-delay: 0.36s; }\n' +
    '@keyframes cardReveal {\n' +
    '  to { opacity: 1; transform: translateY(0); }\n' +
    '}\n' +
    '\n' +
    '/* ---- HERO CARD ---- */\n' +
    '#milo-form-content .c-hero {\n' +
    '  background: linear-gradient(165deg, #2a9e14 0%, #1a6b0a 35%, #0d3a06 80%, #071f04 100%);\n' +
    '  padding-top: 56px; padding-bottom: 56px;\n' +
    '  box-shadow: 0 8px 40px rgba(0,0,0,0.18);\n' +
    '}\n' +
    '#milo-form-content .c-hero::before {\n' +
    '  content: ""; position: absolute; top: -60%; right: -40%; width: 300px; height: 300px;\n' +
    '  background: radial-gradient(circle, rgba(255,130,0,0.15) 0%, transparent 70%);\n' +
    '  pointer-events: none;\n' +
    '}\n' +
    '\n' +
    '/* ---- PROBLEM CARD ---- */\n' +
    '#milo-form-content .c-problem {\n' +
    '  background: linear-gradient(165deg, #122c4f 0%, #0a1e3d 45%, #071830 100%);\n' +
    '  box-shadow: 0 8px 40px rgba(0,0,0,0.18);\n' +
    '}\n' +
    '#milo-form-content .c-problem::before {\n' +
    '  content: ""; position: absolute; bottom: -40%; left: -30%; width: 250px; height: 250px;\n' +
    '  background: radial-gradient(circle, rgba(80,172,225,0.1) 0%, transparent 70%);\n' +
    '  pointer-events: none;\n' +
    '}\n' +
    '\n' +
    '/* ---- SOLUTION CARD ---- */\n' +
    '#milo-form-content .c-solution {\n' +
    '  background: linear-gradient(165deg, #0f4a08 0%, #1a6b0a 40%, #0d3a06 80%, #081f04 100%);\n' +
    '  box-shadow: 0 8px 40px rgba(40,141,17,0.15);\n' +
    '}\n' +
    '#milo-form-content .c-solution::before {\n' +
    '  content: ""; position: absolute; top: -30%; right: -20%; width: 200px; height: 200px;\n' +
    '  background: radial-gradient(circle, rgba(40,141,17,0.2) 0%, transparent 70%);\n' +
    '  pointer-events: none;\n' +
    '}\n' +
    '\n' +
    '/* ---- TRUST CARD ---- */\n' +
    '#milo-form-content .c-trust {\n' +
    '  background: linear-gradient(165deg, #0f3060 0%, #0a1e3d 50%, #071830 100%);\n' +
    '  box-shadow: 0 8px 40px rgba(0,0,0,0.18);\n' +
    '}\n' +
    '#milo-form-content .c-trust::before {\n' +
    '  content: ""; position: absolute; top: -50%; left: -20%; width: 280px; height: 280px;\n' +
    '  background: radial-gradient(circle, rgba(255,130,0,0.08) 0%, transparent 70%);\n' +
    '  pointer-events: none;\n' +
    '}\n' +
    '\n' +
    '/* ---- CARD LABEL ---- */\n' +
    '#milo-form-content .c-label {\n' +
    '  font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;\n' +
    '  color: var(--orange); margin-bottom: 20px;\n' +
    '  font-family: \'League Spartan\', sans-serif;\n' +
    '}\n' +
    '\n' +
    '/* ---- CARD LOGO ---- */\n' +
    '#milo-form-content .c-logo {\n' +
    '  height: 44px; filter: brightness(0) invert(1); margin-bottom: 28px;\n' +
    '}\n' +
    '\n' +
    '/* ---- CARD TYPOGRAPHY ---- */\n' +
    '#milo-form-content .c-card h1 {\n' +
    '  font-size: 34px; font-weight: 800; line-height: 1.12; margin-bottom: 16px;\n' +
    '  text-shadow: 0 2px 20px rgba(0,0,0,0.3);\n' +
    '}\n' +
    '#milo-form-content .c-card h2 {\n' +
    '  font-size: 30px; font-weight: 800; line-height: 1.15; margin-bottom: 14px;\n' +
    '}\n' +
    '#milo-form-content .c-sub {\n' +
    '  font-size: 16px; line-height: 1.65; opacity: 0.85; margin-bottom: 28px;\n' +
    '  max-width: 420px; margin-left: auto; margin-right: auto;\n' +
    '}\n' +
    '#milo-form-content .c-sub strong { color: var(--orange); }\n' +
    '#milo-form-content .c-note {\n' +
    '  font-size: 13px; opacity: 0.55; margin-top: 18px; letter-spacing: 0.2px;\n' +
    '}\n' +
    '\n' +
    '/* ---- CTA BUTTON ---- */\n' +
    '#milo-form-content .c-cta {\n' +
    '  display: inline-flex; align-items: center; gap: 8px;\n' +
    '  padding: 18px 36px; background: linear-gradient(135deg, var(--orange), var(--orange-hover));\n' +
    '  color: #fff; border: none; border-radius: 50px; font-size: 17px;\n' +
    '  font-weight: 600; font-family: \'League Spartan\', sans-serif;\n' +
    '  cursor: pointer; transition: all 0.3s ease;\n' +
    '  box-shadow: 0 4px 24px rgba(255,130,0,0.35);\n' +
    '  letter-spacing: 0.3px;\n' +
    '}\n' +
    '#milo-form-content .c-cta:hover {\n' +
    '  transform: translateY(-3px); box-shadow: 0 8px 32px rgba(255,130,0,0.5);\n' +
    '}\n' +
    '#milo-form-content .c-cta .arrow { transition: transform 0.2s; }\n' +
    '#milo-form-content .c-cta:hover .arrow { transform: translateX(4px); }\n' +
    '#milo-form-content .c-cta-big { font-size: 19px; padding: 20px 44px; }\n' +
    '\n' +
    '/* ---- PROBLEM ITEMS ---- */\n' +
    '#milo-form-content .c-items {\n' +
    '  display: flex; flex-direction: column; gap: 2px;\n' +
    '  margin-bottom: 32px; text-align: left;\n' +
    '}\n' +
    '#milo-form-content .c-item {\n' +
    '  display: flex; align-items: flex-start; gap: 16px;\n' +
    '  padding: 18px 20px; border-radius: 16px;\n' +
    '  background: rgba(255,255,255,0.04);\n' +
    '  transition: background 0.3s ease;\n' +
    '}\n' +
    '#milo-form-content .c-item:hover { background: rgba(255,255,255,0.08); }\n' +
    '#milo-form-content .c-item-icon {\n' +
    '  font-size: 28px; flex-shrink: 0; width: 44px; height: 44px;\n' +
    '  display: flex; align-items: center; justify-content: center;\n' +
    '  background: rgba(255,255,255,0.06); border-radius: 12px;\n' +
    '}\n' +
    '#milo-form-content .c-item-body h3 {\n' +
    '  font-size: 18px; font-weight: 700; margin-bottom: 4px;\n' +
    '}\n' +
    '#milo-form-content .c-item-body p { font-size: 14px; opacity: 0.65; line-height: 1.5; }\n' +
    '\n' +
    '/* ---- MASCOT ---- */\n' +
    '#milo-form-content .c-mascot-wrap { margin-bottom: 20px; }\n' +
    '#milo-form-content .c-mascot {\n' +
    '  height: 180px; filter: drop-shadow(0 8px 32px rgba(40,141,17,0.3));\n' +
    '  animation: cardFloat 4s ease-in-out infinite;\n' +
    '}\n' +
    '@keyframes cardFloat {\n' +
    '  0%, 100% { transform: translateY(0); }\n' +
    '  50% { transform: translateY(-10px); }\n' +
    '}\n' +
    '\n' +
    '/* ---- BENEFITS ---- */\n' +
    '#milo-form-content .c-benefits {\n' +
    '  text-align: left; margin-bottom: 32px;\n' +
    '}\n' +
    '#milo-form-content .c-benefit {\n' +
    '  font-size: 15px; line-height: 1.6; padding: 11px 0;\n' +
    '  border-bottom: 1px solid rgba(255,255,255,0.08);\n' +
    '}\n' +
    '#milo-form-content .c-benefit:last-child { border-bottom: none; }\n' +
    '#milo-form-content .c-check { color: var(--green); font-weight: 700; margin-right: 10px; }\n' +
    '\n' +
    '/* ---- STATS ---- */\n' +
    '#milo-form-content .c-stats {\n' +
    '  display: flex; gap: 12px; margin: 28px 0; flex-wrap: wrap; justify-content: center;\n' +
    '}\n' +
    '#milo-form-content .c-stat {\n' +
    '  background: rgba(255,255,255,0.06); border-radius: 18px;\n' +
    '  padding: 22px 18px; flex: 1; min-width: 120px;\n' +
    '  border: 1px solid rgba(255,255,255,0.08);\n' +
    '  transition: border-color 0.3s ease;\n' +
    '}\n' +
    '#milo-form-content .c-stat:hover { border-color: rgba(255,255,255,0.18); }\n' +
    '#milo-form-content .c-stat-num {\n' +
    '  font-size: 26px; font-weight: 800; font-family: \'League Spartan\', sans-serif;\n' +
    '  color: var(--orange); margin-bottom: 4px;\n' +
    '}\n' +
    '#milo-form-content .c-stat-label { font-size: 12px; opacity: 0.6; letter-spacing: 0.3px; }\n' +
    '#milo-form-content .c-pitch {\n' +
    '  font-size: 16px; line-height: 1.6; opacity: 0.75; margin-bottom: 28px;\n' +
    '  max-width: 420px; margin-left: auto; margin-right: auto;\n' +
    '}\n' +
    '\n' +
    '/* ============ FORM SECTION ============ */\n' +
    '#milo-form-content .form-wrapper {\n' +
    '  min-height: 100vh;\n' +
    '  background: linear-gradient(160deg, #021a38 0%, #042c5a 25%, #074387 50%, #042c5a 75%, #021a38 100%);\n' +
    '  background-attachment: fixed;\n' +
    '  display: flex; flex-direction: column; align-items: center;\n' +
    '  border-radius: var(--card-radius) var(--card-radius) 0 0;\n' +
    '  margin: 0 14px;\n' +
    '}\n' +
    '\n' +
    '/* ---- AMBIENT ORBS ---- */\n' +
    '#milo-form-content .ambient-orbs {\n' +
    '  position: fixed; top: 0; left: 0; right: 0; bottom: 0;\n' +
    '  pointer-events: none; z-index: 0; overflow: hidden;\n' +
    '}\n' +
    '#milo-form-content .ambient-orbs .orb {\n' +
    '  position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.08;\n' +
    '  animation: miloOrbFloat 20s ease-in-out infinite;\n' +
    '}\n' +
    '#milo-form-content .ambient-orbs .orb:nth-child(1) { width:500px;height:500px;background:var(--light-blue);top:-10%;left:-10%;animation-delay:0s; }\n' +
    '#milo-form-content .ambient-orbs .orb:nth-child(2) { width:400px;height:400px;background:var(--orange);top:50%;right:-10%;animation-delay:-7s; }\n' +
    '#milo-form-content .ambient-orbs .orb:nth-child(3) { width:350px;height:350px;background:var(--navy);bottom:-5%;left:30%;animation-delay:-14s; }\n' +
    '@keyframes miloOrbFloat {\n' +
    '  0%, 100% { transform: translate(0,0) scale(1); }\n' +
    '  33% { transform: translate(30px,-40px) scale(1.1); }\n' +
    '  66% { transform: translate(-20px,30px) scale(0.95); }\n' +
    '}\n' +
    '\n' +
    '/* ---- FORM HEADER ---- */\n' +
    '#milo-form-content .form-header {\n' +
    '  position: relative; z-index: 10; text-align: center; padding: 40px 20px 10px;\n' +
    '}\n' +
    '#milo-form-content .form-header img { height: 50px; filter: brightness(0) invert(1); margin-bottom: 6px; }\n' +
    '#milo-form-content .form-header .tagline {\n' +
    '  font-size: 24px; letter-spacing: 0.3px; text-transform: none; opacity: 1;\n' +
    '  line-height: 1.3; max-width: 650px; white-space: normal; margin: 0 auto; font-weight: 500;\n' +
    '}\n' +
    '\n' +
    '/* ---- FORM CONTAINER ---- */\n' +
    '#milo-form-content .form-container {\n' +
    '  position: relative; z-index: 10; width: 100%; max-width: 640px;\n' +
    '  padding: 20px; flex: 1; display: flex; flex-direction: column;\n' +
    '}\n' +
    '\n' +
    '/* ---- PROGRESS BAR ---- */\n' +
    '#milo-form-content .progress-section { margin-bottom: 24px; }\n' +
    '#milo-form-content .progress-label {\n' +
    '  display: flex; justify-content: space-between; align-items: center;\n' +
    '  font-size: 13px; margin-bottom: 8px; opacity: 0.8;\n' +
    '}\n' +
    '#milo-form-content .progress-label .step-text {\n' +
    '  font-weight: 500; letter-spacing: 1px; text-transform: uppercase;\n' +
    '  font-family: \'League Spartan\', sans-serif;\n' +
    '}\n' +
    '#milo-form-content .progress-bar-track { height:6px;background:rgba(255,255,255,0.15);border-radius:3px;overflow:hidden; }\n' +
    '#milo-form-content .progress-bar-fill {\n' +
    '  height:100%;background:linear-gradient(90deg,var(--orange),#ffaa40);border-radius:3px;\n' +
    '  transition:width 0.5s cubic-bezier(0.4,0,0.2,1);box-shadow:0 0 12px rgba(255,130,0,0.4);\n' +
    '}\n' +
    '\n' +
    '/* ---- GLASS CARD ---- */\n' +
    '#milo-form-content .glass-card {\n' +
    '  background: rgba(0,0,0,0.35); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);\n' +
    '  border: 1px solid rgba(255,255,255,0.12); border-radius: 20px;\n' +
    '  padding: 40px 36px; box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);\n' +
    '  transition: transform 0.3s ease;\n' +
    '}\n' +
    '\n' +
    '/* ---- STEPS ---- */\n' +
    '#milo-form-content .step { display: none; animation: miloStepIn 0.4s ease-out; }\n' +
    '#milo-form-content .step.active { display: block; }\n' +
    '@keyframes miloStepIn { from { opacity:0;transform:translateY(16px); } to { opacity:1;transform:translateY(0); } }\n' +
    '#milo-form-content .step-category {\n' +
    '  font-size:12px;text-transform:uppercase;letter-spacing:2.5px;color:var(--orange);\n' +
    '  font-weight:500;margin-bottom:10px;font-family:\'League Spartan\',sans-serif;\n' +
    '}\n' +
    '#milo-form-content .step h2 { font-size:26px;font-weight:800;line-height:1.2;margin-bottom:8px; }\n' +
    '#milo-form-content .step .subtitle { font-size:14px;opacity:0.65;margin-bottom:28px;line-height:1.5; }\n' +
    '\n' +
    '/* ---- OPTION CARDS ---- */\n' +
    '#milo-form-content .option-cards { display:flex;flex-direction:column;gap:12px;margin-bottom:28px; }\n' +
    '#milo-form-content .option-card {\n' +
    '  display:flex;align-items:center;gap:16px;padding:18px 20px;\n' +
    '  background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.12);\n' +
    '  border-radius:14px;cursor:pointer;transition:all 0.25s ease;user-select:none;\n' +
    '}\n' +
    '#milo-form-content .option-card:hover { background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.25);transform:translateY(-1px); }\n' +
    '#milo-form-content .option-card.selected { background:rgba(7,67,135,0.35);border-color:var(--light-blue);box-shadow:0 0 20px rgba(80,172,225,0.2); }\n' +
    '#milo-form-content .option-card .check-badge {\n' +
    '  display:none;position:absolute;top:8px;right:10px;width:22px;height:22px;border-radius:50%;\n' +
    '  background:var(--light-blue);color:#fff;font-size:13px;font-weight:500;\n' +
    '  font-family:\'League Spartan\',sans-serif;line-height:22px;text-align:center;\n' +
    '}\n' +
    '#milo-form-content .option-card.selected .check-badge { display:block; }\n' +
    '#milo-form-content .multi-select .option-card { position:relative; }\n' +
    '#milo-form-content .option-card .icon {\n' +
    '  font-size:28px;width:48px;height:48px;display:flex;align-items:center;justify-content:center;\n' +
    '  background:rgba(255,255,255,0.08);border-radius:12px;flex-shrink:0;\n' +
    '}\n' +
    '#milo-form-content .option-card .option-text h4 { font-size:18px;font-weight:500;font-family:\'League Spartan\',sans-serif;margin-bottom:2px; }\n' +
    '#milo-form-content .option-card .option-text p { font-size:15px;opacity:0.55; }\n' +
    '\n' +
    '/* ---- FORM INPUTS ---- */\n' +
    '#milo-form-content .form-grid { display:grid;gap:16px;margin-bottom:28px; }\n' +
    '#milo-form-content .form-grid.two-col { grid-template-columns:1fr 1fr; }\n' +
    '#milo-form-content .form-group { display:flex;flex-direction:column; }\n' +
    '#milo-form-content .form-group label {\n' +
    '  font-size:12px;text-transform:uppercase;letter-spacing:1.5px;font-weight:500;\n' +
    '  margin-bottom:8px;opacity:0.7;font-family:\'League Spartan\',sans-serif;\n' +
    '}\n' +
    '#milo-form-content .form-group input, #milo-form-content .form-group select {\n' +
    '  background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.15);\n' +
    '  border-radius:12px;padding:14px 16px;font-size:15px;color:var(--white);\n' +
    '  font-family:\'Nunito Sans\',sans-serif;transition:all 0.25s ease;outline:none;-webkit-appearance:none;\n' +
    '}\n' +
    '#milo-form-content .form-group input::placeholder { color:rgba(255,255,255,0.35); }\n' +
    '#milo-form-content .form-group input:focus, #milo-form-content .form-group select:focus {\n' +
    '  border-color:var(--light-blue);background:rgba(255,255,255,0.12);box-shadow:0 0 16px rgba(80,172,225,0.2);\n' +
    '}\n' +
    '#milo-form-content .form-group select option { background:#042c5a;color:white; }\n' +
    '#milo-form-content .form-group .input-error { border-color:#ff4444 !important; }\n' +
    '#milo-form-content .form-group .error-msg { color:#ff6b6b;font-size:12px;margin-top:4px;display:none; }\n' +
    '#milo-form-content .form-group .error-msg.show { display:block; }\n' +
    '\n' +
    '/* ---- ZIP WARNING ---- */\n' +
    '#milo-form-content .zip-warning {\n' +
    '  background:rgba(255,130,0,0.15);border:1px solid rgba(255,130,0,0.3);\n' +
    '  border-radius:12px;padding:14px 18px;margin-top:12px;font-size:14px;line-height:1.5;display:none;\n' +
    '}\n' +
    '#milo-form-content .zip-warning.show { display:block; }\n' +
    '\n' +
    '/* ---- BUTTONS ---- */\n' +
    '#milo-form-content .btn-row { display:flex;gap:12px;align-items:center; }\n' +
    '#milo-form-content .btn-primary {\n' +
    '  flex:1;padding:16px 32px;\n' +
    '  background:linear-gradient(135deg,var(--orange),var(--orange-hover));\n' +
    '  color:var(--white);border:none;border-radius:14px;font-size:16px;font-weight:500;\n' +
    '  font-family:\'League Spartan\',sans-serif;letter-spacing:0.5px;cursor:pointer;\n' +
    '  transition:all 0.3s ease;box-shadow:0 4px 20px rgba(255,130,0,0.3);\n' +
    '  display:flex;align-items:center;justify-content:center;gap:8px;\n' +
    '}\n' +
    '#milo-form-content .btn-primary:hover { transform:translateY(-2px);box-shadow:0 6px 28px rgba(255,130,0,0.45); }\n' +
    '#milo-form-content .btn-primary:active { transform:translateY(0); }\n' +
    '#milo-form-content .btn-primary:disabled { opacity:0.4;cursor:not-allowed;transform:none;box-shadow:none; }\n' +
    '#milo-form-content .btn-primary .arrow { transition:transform 0.2s; }\n' +
    '#milo-form-content .btn-primary:hover .arrow { transform:translateX(3px); }\n' +
    '#milo-form-content .btn-back {\n' +
    '  padding:16px 20px;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.15);\n' +
    '  color:var(--white);border-radius:14px;font-size:14px;font-weight:500;\n' +
    '  font-family:\'Nunito Sans\',sans-serif;cursor:pointer;transition:all 0.25s ease;\n' +
    '}\n' +
    '#milo-form-content .btn-back:hover { background:rgba(255,255,255,0.14);border-color:rgba(255,255,255,0.25); }\n' +
    '\n' +
    '/* ---- TRUST & VALUE ---- */\n' +
    '#milo-form-content .trust-line { text-align:center;margin-top:16px;font-size:12px;opacity:0.5;line-height:1.5; }\n' +
    '#milo-form-content .value-badge {\n' +
    '  background:rgba(255,130,0,0.12);border:1px solid rgba(255,130,0,0.25);\n' +
    '  border-radius:12px;padding:14px 18px;margin-bottom:24px;font-size:14px;line-height:1.5;text-align:center;\n' +
    '}\n' +
    '#milo-form-content .value-badge .gift { font-size:18px; }\n' +
    '\n' +
    '/* ---- THANK YOU ---- */\n' +
    '#milo-form-content .thank-you-section { text-align:center; }\n' +
    '#milo-form-content .thank-you-section .check-circle {\n' +
    '  width:80px;height:80px;background:linear-gradient(135deg,var(--green),var(--green-dark));\n' +
    '  border-radius:50%;display:flex;align-items:center;justify-content:center;\n' +
    '  margin:0 auto 24px;font-size:40px;animation:miloPopIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275);\n' +
    '  box-shadow:0 4px 24px rgba(40,141,17,0.3);\n' +
    '}\n' +
    '@keyframes miloPopIn { from{transform:scale(0);opacity:0;} to{transform:scale(1);opacity:1;} }\n' +
    '#milo-form-content .thank-you-section h2 { font-size:30px;margin-bottom:12px; }\n' +
    '#milo-form-content .thank-you-section p { font-size:15px;opacity:0.7;line-height:1.6;margin-bottom:20px; }\n' +
    '#milo-form-content .thank-you-details { text-align:left;max-width:400px;margin:0 auto 24px; }\n' +
    '#milo-form-content .thank-you-item { padding:8px 0;font-size:14px;opacity:0.8; }\n' +
    '\n' +
    '/* ---- RENTER ---- */\n' +
    '#milo-form-content .renter-section { text-align:center; }\n' +
    '#milo-form-content .renter-section .renter-icon { font-size:56px;margin-bottom:20px; }\n' +
    '#milo-form-content .renter-section h2 { font-size:26px;margin-bottom:16px; }\n' +
    '#milo-form-content .renter-section p { font-size:15px;opacity:0.7;line-height:1.6;margin-bottom:28px;max-width:440px;margin-left:auto;margin-right:auto; }\n' +
    '#milo-form-content .share-confirm { display:none;color:var(--green);font-weight:700;font-size:15px;margin-top:12px;animation:miloPopIn 0.3s ease; }\n' +
    '\n' +
    '/* ---- SPINNER ---- */\n' +
    '#milo-form-content .spinner {\n' +
    '  width:20px;height:20px;border:2.5px solid rgba(255,255,255,0.3);border-top-color:white;\n' +
    '  border-radius:50%;animation:miloSpin 0.6s linear infinite;display:none;\n' +
    '}\n' +
    '#milo-form-content .btn-primary.loading .spinner { display:inline-block; }\n' +
    '#milo-form-content .btn-primary.loading .btn-text { display:none; }\n' +
    '@keyframes miloSpin { to{transform:rotate(360deg);} }\n' +
    '\n' +
    '/* ---- FOOTER ---- */\n' +
    '#milo-form-content .form-footer {\n' +
    '  position:relative;z-index:10;text-align:center;padding:20px;margin-top:auto;\n' +
    '}\n' +
    '#milo-form-content .form-footer .lock-text {\n' +
    '  font-size:12px;opacity:0.4;display:flex;align-items:center;justify-content:center;gap:6px;\n' +
    '}\n' +
    '#milo-form-content .form-footer .copyright { font-size:11px;opacity:0.3;margin-top:8px; }\n' +
    '\n' +
    '/* ============ RESPONSIVE ============ */\n' +
    '@media (max-width: 600px) {\n' +
    '  #milo-form-content .cards-page { padding: 12px 10px 6px; gap: 12px; }\n' +
    '  #milo-form-content .c-card { padding: 36px 22px; border-radius: 22px; }\n' +
    '  #milo-form-content .c-card h1 { font-size: 28px; }\n' +
    '  #milo-form-content .c-card h2 { font-size: 24px; }\n' +
    '  #milo-form-content .c-cta { font-size: 15px; padding: 16px 28px; }\n' +
    '  #milo-form-content .c-cta-big { font-size: 16px; padding: 18px 32px; }\n' +
    '  #milo-form-content .c-mascot { height: 150px; }\n' +
    '  #milo-form-content .c-stats { flex-direction: column; }\n' +
    '  #milo-form-content .c-stat { min-width: 100%; }\n' +
    '  #milo-form-content .form-wrapper { margin: 0 10px; border-radius: 22px 22px 0 0; }\n' +
    '  #milo-form-content .glass-card { padding: 28px 22px; border-radius: 16px; }\n' +
    '  #milo-form-content .step h2 { font-size: 22px; }\n' +
    '  #milo-form-content .form-grid.two-col { grid-template-columns: 1fr; }\n' +
    '  #milo-form-content .btn-row { flex-direction: column-reverse; }\n' +
    '  #milo-form-content .btn-back { width: 100%; text-align: center; }\n' +
    '  #milo-form-content .btn-primary { width: 100%; }\n' +
    '  #milo-form-content .form-header { padding-top: 28px; }\n' +
    '  #milo-form-content .form-header .tagline { font-size: 17px; }\n' +
    '  #milo-form-content .option-card { padding: 14px 16px; }\n' +
    '}\n' +
    '@media (max-width: 768px) {\n' +
    '  #milo-form-content .ambient-orbs { display: none; }\n' +
    '}\n' +
    '';
  document.head.appendChild(css);

  /* ── INJECT CONTENT ── */
  function injectContent() {
    /* Hide GHL native sections */
    var sections = document.querySelectorAll('[class^="section-"]');
    sections.forEach(function(s) { s.style.display = 'none'; });
    var ghlNav = document.querySelector('nav, .navbar, [class*="navbar"]');
    if (ghlNav) ghlNav.style.display = 'none';
    var ghlFooter = document.querySelector('footer, [class*="footer"]');
    if (ghlFooter) ghlFooter.style.display = 'none';

    if (document.getElementById('milo-form-content')) return;
    var container = document.getElementById('preview-container') || document.body;

    var wrapper = document.createElement('div');
    wrapper.id = 'milo-form-content';
    if (container === document.body) {
      container.appendChild(wrapper);
    } else {
      var firstChild = container.querySelector('div');
      if (firstChild) {
        container.insertBefore(wrapper, firstChild);
      } else {
        container.appendChild(wrapper);
      }
    }

    fetch(BASE + 'milo-form-content-cards.html?v=' + Date.now())
      .then(function(r) { return r.text(); })
      .then(function(html) {
        wrapper.innerHTML = html;
        setTimeout(function() {
          initFormLogic();
        }, 100);
      })
      .catch(function(err) { console.error('Content fetch failed:', err); });
  }

  /* ── SCROLL TO FORM ── */
  window.scrollToForm = function() {
    var formEl = document.getElementById('formSection');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ── FORM LOGIC ── */
  function initFormLogic() {
    var TOTAL_STEPS = 11;
    var THANK_YOU_STEP = 13;
    var RENTER_STEP = '2b';

    var currentStep = 1;
    var formData = {
      uncomfortable: '', isHomeowner: '',
      topConcern: [], atticInspected: '',
      timeline: '', homeSize: '', timePreference: '',
      street: '', city: '', state: '', zip: '',
      firstName: '', lastName: '', email: '', phone: ''
    };

    /* ZIP routing */
    var zipLookup = window._miloZipLookup || {};
    var locationCache = {};

    function resolveLocation(zip) {
      if (!zip) return null;
      var clean = zip.replace(/\D/g, '').substring(0, 5);
      return zipLookup[clean] || null;
    }

    function fetchLocationConfig(locId) {
      return new Promise(function(resolve) {
        if (locationCache[locId]) { resolve(locationCache[locId]); return; }
        fetch(BASE + 'locations/' + locId + '.json?v=' + Date.now())
          .then(function(r) { return r.json(); })
          .then(function(cfg) { locationCache[locId] = cfg; resolve(cfg); })
          .catch(function() { resolve(null); });
      });
    }

    /* Option card selection */
    var root = document.getElementById('milo-form-content');
    root.querySelectorAll('.option-cards').forEach(function(group) {
      var field = group.dataset.field;
      var isMulti = group.classList.contains('multi-select');
      group.querySelectorAll('.option-card').forEach(function(card) {
        card.addEventListener('click', function() {
          if (isMulti) {
            card.classList.toggle('selected');
            var vals = [];
            group.querySelectorAll('.option-card.selected').forEach(function(c) { vals.push(c.dataset.value); });
            formData[field] = vals;
            var btn = document.getElementById('btn6');
            if (btn) btn.disabled = vals.length === 0;
            return;
          }
          group.querySelectorAll('.option-card').forEach(function(c) { c.classList.remove('selected'); });
          card.classList.add('selected');
          formData[field] = card.dataset.value;
          if (field === 'isHomeowner' && card.dataset.value === 'no') {
            setTimeout(function() { showRenterDeadEnd(); }, 350);
            return;
          }
          setTimeout(function() { goNext(); }, 350);
        });
      });
    });

    /* Navigation */
    function updateProgress() {
      var step = (typeof currentStep === 'string') ? TOTAL_STEPS : currentStep;
      var pct = Math.round(((step - 1) / TOTAL_STEPS) * 100);
      var fillEl = document.getElementById('progressFill');
      var numEl = document.getElementById('stepNum');
      var pctEl = document.getElementById('stepPercent');
      if (fillEl) fillEl.style.width = pct + '%';
      if (numEl) numEl.textContent = Math.min(step, TOTAL_STEPS);
      if (pctEl) pctEl.textContent = pct + '%';
    }

    function showStep(n) {
      root.querySelectorAll('.step').forEach(function(s) { s.classList.remove('active'); });
      var step = document.getElementById('step' + n);
      if (step) {
        step.classList.add('active');
        step.style.animation = 'none';
        step.offsetHeight;
        step.style.animation = '';
      }
      var prog = root.querySelector('.progress-section');
      var hideProgress = (n === THANK_YOU_STEP || n === RENTER_STEP);
      if (prog) prog.style.display = hideProgress ? 'none' : 'block';
    }

    function showRenterDeadEnd() {
      currentStep = RENTER_STEP;
      showStep(RENTER_STEP);
      var prog = root.querySelector('.progress-section');
      if (prog) prog.style.display = 'none';
    }

    function handleZipStep() {
      var zipEl = document.getElementById('earlyZip');
      if (!zipEl) return;
      var val = zipEl.value.replace(/\D/g, '');
      if (val.length < 5) { zipEl.classList.add('input-error'); return; }
      zipEl.classList.remove('input-error');
      formData.zip = val.substring(0, 5);

      var addrZip = document.getElementById('zip');
      if (addrZip) addrZip.value = formData.zip;

      var locId = resolveLocation(formData.zip);
      var successDiv = document.getElementById('zipSuccess');
      var notFoundDiv = document.getElementById('zipNotFound');

      if (locId) {
        fetchLocationConfig(locId).then(function(cfg) {
          var biz = (cfg && cfg.businessName) ? cfg.businessName : 'MILO Insulation';
          var msgEl = document.getElementById('zipSuccessMsg');
          if (msgEl) msgEl.textContent = 'Great news! ' + biz + ' has openings this week in your area!';
          if (successDiv) successDiv.style.display = 'block';
          if (notFoundDiv) notFoundDiv.style.display = 'none';
          currentStep = 4;
          showStep(4);
          updateProgress();
        });
      } else {
        var fallbackLocId = window.MILO_LOCATION || 'altus';
        fetchLocationConfig(fallbackLocId).then(function(cfg) {
          var phone = (cfg && cfg.phone) ? cfg.phone : '(580) 808-3780';
          var phoneLink = document.getElementById('notInAreaPhone');
          var phoneText = document.getElementById('notInAreaPhoneText');
          if (phoneText) phoneText.textContent = phone;
          if (phoneLink) phoneLink.href = 'tel:' + phone.replace(/\D/g, '');
          if (successDiv) successDiv.style.display = 'none';
          if (notFoundDiv) notFoundDiv.style.display = 'block';
          currentStep = 4;
          showStep(4);
          var prog = root.querySelector('.progress-section');
          if (prog) prog.style.display = 'none';
        });
      }
    }

    function goNext() {
      if (currentStep === 3) { handleZipStep(); return; }
      if (currentStep === 9 && !validateAddress()) return;
      currentStep++;
      showStep(currentStep);
      updateProgress();
    }

    function goPrev() {
      if (typeof currentStep === 'string') {
        currentStep = 2; showStep(2); updateProgress(); return;
      }
      if (currentStep === 4) {
        currentStep = 3; showStep(3); updateProgress(); return;
      }
      if (currentStep > 1) {
        currentStep--; showStep(currentStep); updateProgress();
      }
    }

    function validateAddress() {
      var fields = ['street', 'city', 'state', 'zip'];
      var valid = true;
      fields.forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        if (!el.value.trim()) { el.classList.add('input-error'); valid = false; }
        else { el.classList.remove('input-error'); }
      });
      if (valid) {
        formData.street = document.getElementById('street').value.trim();
        formData.city = document.getElementById('city').value.trim();
        formData.state = document.getElementById('state').value.trim();
        formData.zip = document.getElementById('zip').value.trim();
        var locId = resolveLocation(formData.zip);
        var warn = root.querySelector('.zip-warning');
        if (!locId && warn) { warn.classList.add('show'); }
        else if (warn) { warn.classList.remove('show'); }
      }
      return valid;
    }

    function validateContact() {
      var fields = ['firstName', 'lastName', 'email', 'phone'];
      var valid = true;
      fields.forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        if (!el.value.trim()) { el.classList.add('input-error'); valid = false; }
        else { el.classList.remove('input-error'); }
      });
      var emailEl = document.getElementById('email');
      if (emailEl && emailEl.value.trim() && emailEl.value.indexOf('@') === -1) {
        emailEl.classList.add('input-error'); valid = false;
      }
      if (valid) {
        formData.firstName = document.getElementById('firstName').value.trim();
        formData.lastName = document.getElementById('lastName').value.trim();
        formData.email = document.getElementById('email').value.trim();
        formData.phone = document.getElementById('phone').value.trim();
      }
      return valid;
    }

    /* Share link (renter) */
    function copyLink() {
      var url = window.location.href;
      if (navigator.clipboard) { navigator.clipboard.writeText(url); }
      else {
        var t = document.createElement('textarea'); t.value = url;
        document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t);
      }
      var confirm = document.getElementById('shareConfirm');
      if (confirm) { confirm.style.display = 'block'; setTimeout(function() { confirm.style.display = 'none'; }, 2000); }
    }

    function backToStart() {
      currentStep = 1;
      root.querySelectorAll('#step2 .option-card, #step1 .option-card').forEach(function(c) { c.classList.remove('selected'); });
      formData.isHomeowner = ''; formData.uncomfortable = '';
      showStep(1); updateProgress();
    }

    /* Phone formatting */
    var phoneEl = document.getElementById('phone');
    if (phoneEl) {
      phoneEl.addEventListener('input', function(e) {
        var x = e.target.value.replace(/\D/g, '').substring(0, 10);
        if (x.length > 6) { e.target.value = '(' + x.substring(0,3) + ') ' + x.substring(3,6) + '-' + x.substring(6); }
        else if (x.length > 3) { e.target.value = '(' + x.substring(0,3) + ') ' + x.substring(3); }
        else if (x.length > 0) { e.target.value = '(' + x; }
      });
    }
    root.querySelectorAll('input').forEach(function(input) {
      input.addEventListener('focus', function() { input.classList.remove('input-error'); });
    });

    /* Submit */
    function doSubmit() {
      if (!validateContact()) return;
      var btn = document.getElementById('btnSubmit');
      btn.classList.add('loading'); btn.disabled = true;

      var locId = resolveLocation(formData.zip);
      var fallbackLocId = window.MILO_LOCATION || 'altus';
      var targetLocId = locId || fallbackLocId;

      fetchLocationConfig(targetLocId).then(function(locCfg) {
        var webhookUrl = (locCfg && locCfg.webhookUrl) ? locCfg.webhookUrl : '';

        var payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: formData.firstName + ' ' + formData.lastName,
          email: formData.email,
          phone: formData.phone.replace(/\D/g, ''),
          address1: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zip,
          uncomfortable: formData.uncomfortable,
          isHomeowner: formData.isHomeowner,
          topConcern: Array.isArray(formData.topConcern) ? formData.topConcern.join(', ') : formData.topConcern,
          atticInspected: formData.atticInspected,
          timeline: formData.timeline,
          homeSize: formData.homeSize,
          timePreference: formData.timePreference,
          source: 'milo-form',
          leadSource: 'Facebook',
          tags: ['meta lead'],
          formName: 'Free Home Efficiency Scan',
          locationId: targetLocId,
          ghlLocationId: locCfg ? locCfg.ghlLocationId : '',
          repName: locCfg ? locCfg.rep : '',
          repUserId: locCfg ? locCfg.repUserId : '',
          businessName: locCfg ? locCfg.businessName : '',
          zipResolved: !!locId,
          submittedAt: new Date().toISOString()
        };

        var submitPromise;
        if (webhookUrl) {
          submitPromise = fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).catch(function(err) { console.warn('Webhook POST error:', err); });
        } else {
          console.warn('No webhook URL for location:', targetLocId);
          submitPromise = Promise.resolve();
        }

        submitPromise.finally(function() {
          btn.classList.remove('loading');
          currentStep = THANK_YOU_STEP;
          showStep(THANK_YOU_STEP);
          updateProgress();

          /* Populate phone */
          var tyPhone = document.getElementById('thankYouPhone');
          if (tyPhone && locCfg && locCfg.phone) { tyPhone.textContent = locCfg.phone; }
          else if (tyPhone) { tyPhone.parentElement.style.display = 'none'; }

          /* Fire Meta Pixel */
          if (locCfg && locCfg.metaPixelId) {
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
            }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', locCfg.metaPixelId);
            fbq('track', 'PageView');
            fbq('track', 'Lead');
          }
        });
      });
    }

    /* Expose globally */
    window.nextStep = goNext;
    window.prevStep = goPrev;
    window.submitForm = doSubmit;
    window.copyShareLink = copyLink;
    window.backFromRenter = backToStart;

    updateProgress();
  }

  /* ── BOOT ── */
  function bootForm() {
    if (!window._miloZipLookup) {
      fetch(BASE + 'zip-lookup.json?v=' + Date.now())
        .then(function(r) { return r.json(); })
        .then(function(data) { window._miloZipLookup = data; injectContent(); })
        .catch(function() { window._miloZipLookup = {}; injectContent(); });
    } else {
      injectContent();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootForm);
  } else {
    bootForm();
  }
  setTimeout(bootForm, 500);
  setTimeout(bootForm, 1500);
  setTimeout(bootForm, 3000);
})();
