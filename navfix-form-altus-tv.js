/* navfix-form.js — v5: 11-step qualifying form with ZIP-based location routing
 * - Gateway yes/no + homeowner check + 5 qualifying questions + address + contact
 * - Renter dead-end with share link
 * - Auto-advance on card selection (steps 1-9)
 * - ZIP-based routing: resolves ZIP → location → webhook + calendar
 * - Functions exposed globally for onclick handlers
 */
(function() {
  'use strict';

  /* Load Google Fonts */
  if (!document.querySelector('link[href*="League+Spartan"]')) {
    var fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;600;700;800&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap';
    document.head.appendChild(fonts);
  }

  var BASE = 'https://betterbranding.github.io/milo-scripts/';

  /* ── FORM CSS (scoped to #milo-form-content) ── */
  var css = document.createElement('style');
  css.id = 'milo-form-styles';
  css.textContent = '\n' +
    'html, body { margin: 0; padding: 0; background: #021a38 !important; min-height: 100vh; }\n' +
    '#milo-form-content {\n' +
    '  all: initial;\n' +
    '  display: block;\n' +
    '  width: 100%;\n' +
    '  min-height: 100vh;\n' +
    '  font-family: \'Nunito Sans\', \'Gotham\', sans-serif;\n' +
    '}\n' +
    '    #milo-form-content, #milo-form-content *, #milo-form-content *::before, #milo-form-content *::after { margin: 0; padding: 0; box-sizing: border-box; }\n' +
    '\n' +
    '    :root {\n' +
    '      --green: #288D11;\n' +
    '      --green-dark: #1a6b0a;\n' +
    '      --green-deepest: #0d3a06;\n' +
    '      --navy: #074387;\n' +
    '      --navy-dark: #042c5a;\n' +
    '      --navy-deepest: #021a38;\n' +
    '      --orange: #FF8200;\n' +
    '      --orange-hover: #e67400;\n' +
    '      --light-blue: #50ACE1;\n' +
    '      --white: #ffffff;\n' +
    '      --gray-50: #f8faf8;\n' +
    '      --gray-100: #f0f4f0;\n' +
    '      --gray-200: #dce5dc;\n' +
    '      --gray-400: #94a894;\n' +
    '      --gray-600: #5a6b5a;\n' +
    '      --gray-800: #2a352a;\n' +
    '      --glass-bg: rgba(255,255,255,0.12);\n' +
    '      --glass-border: rgba(255,255,255,0.2);\n' +
    '      --glass-shadow: rgba(0,0,0,0.15);\n' +
    '    }\n' +
    '\n' +
    '    #milo-form-content {\n' +
    '      font-family: \'Nunito Sans\', \'Gotham\', sans-serif;\n' +
    '      color: var(--white);\n' +
    '      min-height: 100vh;\n' +
    '      background: linear-gradient(160deg, #021a38 0%, #042c5a 25%, #074387 50%, #042c5a 75%, #021a38 100%);\n' +
    '      background-attachment: fixed;\n' +
    '      display: flex;\n' +
    '      flex-direction: column;\n' +
    '      align-items: center;\n' +
    '      overflow-x: hidden;\n' +
    '    }\n' +
    '\n' +
    '    #milo-form-content h1,\n' +
    '    #milo-form-content h2,\n' +
    '    #milo-form-content h3,\n' +
    '    #milo-form-content h4,\n' +
    '    #milo-form-content h5 {\n' +
    '      font-family: \'League Spartan\', sans-serif;\n' +
    '    }\n' +
    '\n' +
    '    /* ====== AMBIENT BACKGROUND ====== */\n' +
    '    #milo-form-content .ambient-orbs {\n' +
    '      position: fixed;\n' +
    '      top: 0; left: 0; right: 0; bottom: 0;\n' +
    '      pointer-events: none;\n' +
    '      z-index: 0;\n' +
    '      overflow: hidden;\n' +
    '    }\n' +
    '    #milo-form-content .ambient-orbs .orb {\n' +
    '      position: absolute;\n' +
    '      border-radius: 50%;\n' +
    '      filter: blur(80px);\n' +
    '      opacity: 0.08;\n' +
    '      animation: miloOrbFloat 20s ease-in-out infinite;\n' +
    '    }\n' +
    '    #milo-form-content .ambient-orbs .orb:nth-child(1) {\n' +
    '      width: 500px; height: 500px;\n' +
    '      background: var(--light-blue);\n' +
    '      top: -10%; left: -10%;\n' +
    '      animation-delay: 0s;\n' +
    '    }\n' +
    '    #milo-form-content .ambient-orbs .orb:nth-child(2) {\n' +
    '      width: 400px; height: 400px;\n' +
    '      background: var(--orange);\n' +
    '      top: 50%; right: -10%;\n' +
    '      animation-delay: -7s;\n' +
    '    }\n' +
    '    #milo-form-content .ambient-orbs .orb:nth-child(3) {\n' +
    '      width: 350px; height: 350px;\n' +
    '      background: var(--navy);\n' +
    '      bottom: -5%; left: 30%;\n' +
    '      animation-delay: -14s;\n' +
    '    }\n' +
    '    @keyframes miloOrbFloat {\n' +
    '      0%, 100% { transform: translate(0, 0) scale(1); }\n' +
    '      33% { transform: translate(30px, -40px) scale(1.1); }\n' +
    '      66% { transform: translate(-20px, 30px) scale(0.95); }\n' +
    '    }\n' +
    '\n' +
    '    /* ====== HEADER ====== */\n' +
    '    #milo-form-content .form-header {\n' +
    '      position: relative;\n' +
    '      z-index: 10;\n' +
    '      text-align: center;\n' +
    '      padding: 40px 20px 10px;\n' +
    '    }\n' +
    '    #milo-form-content .form-header img {\n' +
    '      height: 50px;\n' +
    '      filter: brightness(0) invert(1);\n' +
    '      margin-bottom: 6px;\n' +
    '    }\n' +
    '    #milo-form-content .form-header .tagline {\n' +
    '      font-size: 24px;\n' +
    '      letter-spacing: 0.3px;\n' +
    '      text-transform: none;\n' +
    '      opacity: 1;\n' +
    '      line-height: 1.3;\n' +
    '      max-width: 650px;\n' +
    '      white-space: normal;\n' +
    '      margin: 0 auto;\n' +
    '      font-weight: 500;\n' +
    '    }\n' +
    '\n' +
    '    /* ====== FORM CONTAINER ====== */\n' +
    '    #milo-form-content .form-container {\n' +
    '      position: relative;\n' +
    '      z-index: 10;\n' +
    '      width: 100%;\n' +
    '      max-width: 640px;\n' +
    '      padding: 20px;\n' +
    '      flex: 1;\n' +
    '      display: flex;\n' +
    '      flex-direction: column;\n' +
    '    }\n' +
    '\n' +
    '    /* ====== PROGRESS BAR ====== */\n' +
    '    #milo-form-content .progress-section {\n' +
    '      margin-bottom: 24px;\n' +
    '    }\n' +
    '    #milo-form-content .progress-label {\n' +
    '      display: flex;\n' +
    '      justify-content: space-between;\n' +
    '      align-items: center;\n' +
    '      font-size: 13px;\n' +
    '      margin-bottom: 8px;\n' +
    '      opacity: 0.8;\n' +
    '    }\n' +
    '    #milo-form-content .progress-label .step-text {\n' +
    '      font-weight: 500;\n' +
    '      letter-spacing: 1px;\n' +
    '      text-transform: uppercase;\n' +
    '      font-family: \'League Spartan\', sans-serif;\n' +
    '    }\n' +
    '    #milo-form-content .progress-bar-track {\n' +
    '      height: 6px;\n' +
    '      background: rgba(255,255,255,0.15);\n' +
    '      border-radius: 3px;\n' +
    '      overflow: hidden;\n' +
    '    }\n' +
    '    #milo-form-content .progress-bar-fill {\n' +
    '      height: 100%;\n' +
    '      background: linear-gradient(90deg, var(--orange), #ffaa40);\n' +
    '      border-radius: 3px;\n' +
    '      transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n' +
    '      box-shadow: 0 0 12px rgba(255,130,0,0.4);\n' +
    '    }\n' +
    '\n' +
    '    /* ====== GLASS CARD ====== */\n' +
    '    #milo-form-content .glass-card {\n' +
    '      background: rgba(0,0,0,0.35);\n' +
    '      backdrop-filter: blur(24px);\n' +
    '      -webkit-backdrop-filter: blur(24px);\n' +
    '      border: 1px solid rgba(255,255,255,0.12);\n' +
    '      border-radius: 20px;\n' +
    '      padding: 40px 36px;\n' +
    '      box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);\n' +
    '      transition: transform 0.3s ease;\n' +
    '    }\n' +
    '\n' +
    '    /* ====== STEP CONTENT ====== */\n' +
    '    #milo-form-content .step {\n' +
    '      display: none;\n' +
    '      animation: miloStepIn 0.4s ease-out;\n' +
    '    }\n' +
    '    #milo-form-content .step.active {\n' +
    '      display: block;\n' +
    '    }\n' +
    '    @keyframes miloStepIn {\n' +
    '      from { opacity: 0; transform: translateY(16px); }\n' +
    '      to { opacity: 1; transform: translateY(0); }\n' +
    '    }\n' +
    '\n' +
    '    #milo-form-content .step-category {\n' +
    '      font-size: 12px;\n' +
    '      text-transform: uppercase;\n' +
    '      letter-spacing: 2.5px;\n' +
    '      color: var(--orange);\n' +
    '      font-weight: 500;\n' +
    '      margin-bottom: 10px;\n' +
    '      font-family: \'League Spartan\', sans-serif;\n' +
    '    }\n' +
    '\n' +
    '    #milo-form-content .step h2 {\n' +
    '      font-size: 26px;\n' +
    '      font-weight: 800;\n' +
    '      line-height: 1.2;\n' +
    '      margin-bottom: 8px;\n' +
    '    }\n' +
    '    #milo-form-content .step .subtitle {\n' +
    '      font-size: 14px;\n' +
    '      opacity: 0.65;\n' +
    '      margin-bottom: 28px;\n' +
    '      line-height: 1.5;\n' +
    '    }\n' +
    '\n' +
    '    /* ====== OPTION CARDS ====== */\n' +
    '    #milo-form-content .option-cards {\n' +
    '      display: flex;\n' +
    '      flex-direction: column;\n' +
    '      gap: 12px;\n' +
    '      margin-bottom: 28px;\n' +
    '    }\n' +
    '    #milo-form-content .option-card {\n' +
    '      display: flex;\n' +
    '      align-items: center;\n' +
    '      gap: 16px;\n' +
    '      padding: 18px 20px;\n' +
    '      background: rgba(255,255,255,0.06);\n' +
    '      border: 1.5px solid rgba(255,255,255,0.12);\n' +
    '      border-radius: 14px;\n' +
    '      cursor: pointer;\n' +
    '      transition: all 0.25s ease;\n' +
    '      user-select: none;\n' +
    '    }\n' +
    '    #milo-form-content .option-card:hover {\n' +
    '      background: rgba(255,255,255,0.12);\n' +
    '      border-color: rgba(255,255,255,0.25);\n' +
    '      transform: translateY(-1px);\n' +
    '    }\n' +
    '    #milo-form-content .option-card.selected {\n' +
    '      background: rgba(7,67,135,0.35);\n' +
    '      border-color: var(--light-blue);\n' +
    '      box-shadow: 0 0 20px rgba(80,172,225,0.2);\n' +
    '    }\n' +
    '    #milo-form-content .option-card .check-badge {\n' +
    '      display: none;\n' +
    '      position: absolute;\n' +
    '      top: 8px;\n' +
    '      right: 10px;\n' +
    '      width: 22px;\n' +
    '      height: 22px;\n' +
    '      border-radius: 50%;\n' +
    '      background: var(--light-blue);\n' +
    '      color: #fff;\n' +
    '      font-size: 13px;\n' +
    '      font-weight: 500;\n' +
    '      font-family: \'League Spartan\', sans-serif;\n' +
    '      line-height: 22px;\n' +
    '      text-align: center;\n' +
    '    }\n' +
    '    #milo-form-content .option-card.selected .check-badge {\n' +
    '      display: block;\n' +
    '    }\n' +
    '    #milo-form-content .multi-select .option-card {\n' +
    '      position: relative;\n' +
    '    }\n' +
    '    #milo-form-content .option-card .icon {\n' +
    '      font-size: 28px;\n' +
    '      width: 48px;\n' +
    '      height: 48px;\n' +
    '      display: flex;\n' +
    '      align-items: center;\n' +
    '      justify-content: center;\n' +
    '      background: rgba(255,255,255,0.08);\n' +
    '      border-radius: 12px;\n' +
    '      flex-shrink: 0;\n' +
    '    }\n' +
    '    #milo-form-content .option-card .option-text h4 {\n' +
    '      font-size: 18px;\n' +
    '      font-weight: 500;\n' +
    '      font-family: \'League Spartan\', sans-serif;\n' +
    '      margin-bottom: 2px;\n' +
    '    }\n' +
    '    #milo-form-content .option-card .option-text p {\n' +
    '      font-size: 15px;\n' +
    '      opacity: 0.55;\n' +
    '    }\n' +
    '\n' +
    '    /* ====== FORM INPUTS ====== */\n' +
    '    #milo-form-content .form-grid {\n' +
    '      display: grid;\n' +
    '      gap: 16px;\n' +
    '      margin-bottom: 28px;\n' +
    '    }\n' +
    '    #milo-form-content .form-grid.two-col {\n' +
    '      grid-template-columns: 1fr 1fr;\n' +
    '    }\n' +
    '    #milo-form-content .form-group {\n' +
    '      display: flex;\n' +
    '      flex-direction: column;\n' +
    '    }\n' +
    '    #milo-form-content .form-group label {\n' +
    '      font-size: 12px;\n' +
    '      text-transform: uppercase;\n' +
    '      letter-spacing: 1.5px;\n' +
    '      font-weight: 500;\n' +
    '      margin-bottom: 8px;\n' +
    '      opacity: 0.7;\n' +
    '      font-family: \'League Spartan\', sans-serif;\n' +
    '    }\n' +
    '    #milo-form-content .form-group input,\n' +
    '    #milo-form-content .form-group select {\n' +
    '      background: rgba(255,255,255,0.08);\n' +
    '      border: 1.5px solid rgba(255,255,255,0.15);\n' +
    '      border-radius: 12px;\n' +
    '      padding: 14px 16px;\n' +
    '      font-size: 15px;\n' +
    '      color: var(--white);\n' +
    '      font-family: \'Nunito Sans\', sans-serif;\n' +
    '      transition: all 0.25s ease;\n' +
    '      outline: none;\n' +
    '      -webkit-appearance: none;\n' +
    '    }\n' +
    '    #milo-form-content .form-group input::placeholder {\n' +
    '      color: rgba(255,255,255,0.35);\n' +
    '    }\n' +
    '    #milo-form-content .form-group input:focus,\n' +
    '    #milo-form-content .form-group select:focus {\n' +
    '      border-color: var(--light-blue);\n' +
    '      background: rgba(255,255,255,0.12);\n' +
    '      box-shadow: 0 0 16px rgba(80,172,225,0.2);\n' +
    '    }\n' +
    '    #milo-form-content .form-group select option {\n' +
    '      background: #042c5a;\n' +
    '      color: white;\n' +
    '    }\n' +
    '    #milo-form-content .form-group .input-error {\n' +
    '      border-color: #ff4444 !important;\n' +
    '    }\n' +
    '    #milo-form-content .form-group .error-msg {\n' +
    '      color: #ff6b6b;\n' +
    '      font-size: 12px;\n' +
    '      margin-top: 4px;\n' +
    '      display: none;\n' +
    '    }\n' +
    '    #milo-form-content .form-group .error-msg.show {\n' +
    '      display: block;\n' +
    '    }\n' +
    '\n' +
    '\n' +
    '    /* ====== ZIP NOT FOUND WARNING ====== */\n' +
    '    #milo-form-content .zip-warning {\n' +
    '      background: rgba(255, 130, 0, 0.15);\n' +
    '      border: 1px solid rgba(255, 130, 0, 0.3);\n' +
    '      border-radius: 12px;\n' +
    '      padding: 14px 18px;\n' +
    '      margin-top: 12px;\n' +
    '      font-size: 14px;\n' +
    '      line-height: 1.5;\n' +
    '      display: none;\n' +
    '    }\n' +
    '    #milo-form-content .zip-warning.show {\n' +
    '      display: block;\n' +
    '    }\n' +
    '\n' +
    '    /* ====== BUTTONS ====== */\n' +
    '    #milo-form-content .btn-row {\n' +
    '      display: flex;\n' +
    '      gap: 12px;\n' +
    '      align-items: center;\n' +
    '    }\n' +
    '    #milo-form-content .btn-primary {\n' +
    '      flex: 1;\n' +
    '      padding: 16px 32px;\n' +
    '      background: linear-gradient(135deg, var(--orange), var(--orange-hover));\n' +
    '      color: var(--white);\n' +
    '      border: none;\n' +
    '      border-radius: 14px;\n' +
    '      font-size: 16px;\n' +
    '      font-weight: 500;\n' +
    '      font-family: \'League Spartan\', sans-serif;\n' +
    '      letter-spacing: 0.5px;\n' +
    '      cursor: pointer;\n' +
    '      transition: all 0.3s ease;\n' +
    '      box-shadow: 0 4px 20px rgba(255,130,0,0.3);\n' +
    '      display: flex;\n' +
    '      align-items: center;\n' +
    '      justify-content: center;\n' +
    '      gap: 8px;\n' +
    '    }\n' +
    '    #milo-form-content .btn-primary:hover {\n' +
    '      transform: translateY(-2px);\n' +
    '      box-shadow: 0 6px 28px rgba(255,130,0,0.45);\n' +
    '    }\n' +
    '    #milo-form-content .btn-primary:active {\n' +
    '      transform: translateY(0);\n' +
    '    }\n' +
    '    #milo-form-content .btn-primary:disabled {\n' +
    '      opacity: 0.4;\n' +
    '      cursor: not-allowed;\n' +
    '      transform: none;\n' +
    '      box-shadow: none;\n' +
    '    }\n' +
    '    #milo-form-content .btn-primary .arrow {\n' +
    '      transition: transform 0.2s;\n' +
    '    }\n' +
    '    #milo-form-content .btn-primary:hover .arrow {\n' +
    '      transform: translateX(3px);\n' +
    '    }\n' +
    '    #milo-form-content .btn-back {\n' +
    '      padding: 16px 20px;\n' +
    '      background: rgba(255,255,255,0.08);\n' +
    '      border: 1.5px solid rgba(255,255,255,0.15);\n' +
    '      color: var(--white);\n' +
    '      border-radius: 14px;\n' +
    '      font-size: 14px;\n' +
    '      font-weight: 500;\n' +
    '      font-family: \'Nunito Sans\', sans-serif;\n' +
    '      cursor: pointer;\n' +
    '      transition: all 0.25s ease;\n' +
    '    }\n' +
    '    #milo-form-content .btn-back:hover {\n' +
    '      background: rgba(255,255,255,0.14);\n' +
    '      border-color: rgba(255,255,255,0.25);\n' +
    '    }\n' +
    '\n' +
    '    /* ====== TRUST BADGE ====== */\n' +
    '    #milo-form-content .trust-line {\n' +
    '      text-align: center;\n' +
    '      margin-top: 16px;\n' +
    '      font-size: 12px;\n' +
    '      opacity: 0.5;\n' +
    '      line-height: 1.5;\n' +
    '    }\n' +
    '\n' +
    '    /* ====== VALUE BADGE ====== */\n' +
    '    #milo-form-content .value-badge {\n' +
    '      background: rgba(255,130,0,0.12);\n' +
    '      border: 1px solid rgba(255,130,0,0.25);\n' +
    '      border-radius: 12px;\n' +
    '      padding: 14px 18px;\n' +
    '      margin-bottom: 24px;\n' +
    '      font-size: 14px;\n' +
    '      line-height: 1.5;\n' +
    '      text-align: center;\n' +
    '    }\n' +
    '    #milo-form-content .value-badge .gift { font-size: 18px; }\n' +
    '\n' +
    '    /* ====== THANK YOU ====== */\n' +
    '    #milo-form-content .thank-you-section {\n' +
    '      text-align: center;\n' +
    '    }\n' +
    '    #milo-form-content .thank-you-section .check-circle {\n' +
    '      width: 80px;\n' +
    '      height: 80px;\n' +
    '      background: linear-gradient(135deg, var(--green), var(--green-dark));\n' +
    '      border-radius: 50%;\n' +
    '      display: flex;\n' +
    '      align-items: center;\n' +
    '      justify-content: center;\n' +
    '      margin: 0 auto 24px;\n' +
    '      font-size: 40px;\n' +
    '      animation: miloPopIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n' +
    '      box-shadow: 0 4px 24px rgba(40,141,17,0.3);\n' +
    '    }\n' +
    '    @keyframes miloPopIn {\n' +
    '      from { transform: scale(0); opacity: 0; }\n' +
    '      to { transform: scale(1); opacity: 1; }\n' +
    '    }\n' +
    '    #milo-form-content .thank-you-section h2 {\n' +
    '      font-size: 30px;\n' +
    '      margin-bottom: 12px;\n' +
    '    }\n' +
    '    #milo-form-content .thank-you-section p {\n' +
    '      font-size: 15px;\n' +
    '      opacity: 0.7;\n' +
    '      line-height: 1.6;\n' +
    '      margin-bottom: 20px;\n' +
    '    }\n' +
    '    #milo-form-content .btn-schedule {\n' +
    '      display: inline-flex;\n' +
    '      align-items: center;\n' +
    '      gap: 8px;\n' +
    '      padding: 14px 28px;\n' +
    '      background: rgba(255,255,255,0.1);\n' +
    '      border: 1.5px solid rgba(255,255,255,0.2);\n' +
    '      border-radius: 14px;\n' +
    '      color: white;\n' +
    '      font-size: 15px;\n' +
    '      font-weight: 500;\n' +
    '      font-family: \'Nunito Sans\', sans-serif;\n' +
    '      text-decoration: none;\n' +
    '      transition: all 0.25s ease;\n' +
    '    }\n' +
    '    #milo-form-content .btn-schedule:hover {\n' +
    '      background: rgba(255,255,255,0.18);\n' +
    '      transform: translateY(-2px);\n' +
    '    }\n' +
    '    #milo-form-content .divider-arrow {\n' +
    '      font-size: 24px;\n' +
    '      opacity: 0.4;\n' +
    '      margin-bottom: 16px;\n' +
    '      animation: miloBounceDown 1.5s ease-in-out infinite;\n' +
    '    }\n' +
    '    @keyframes miloBounceDown {\n' +
    '      0%, 100% { transform: translateY(0); }\n' +
    '      50% { transform: translateY(6px); }\n' +
    '    }\n' +
    '\n' +
    '    /* ====== FOOTER ====== */\n' +
    '    #milo-form-content .form-footer {\n' +
    '      position: relative;\n' +
    '      z-index: 10;\n' +
    '      text-align: center;\n' +
    '      padding: 20px;\n' +
    '      margin-top: auto;\n' +
    '    }\n' +
    '    #milo-form-content .form-footer .lock-text {\n' +
    '      font-size: 12px;\n' +
    '      opacity: 0.4;\n' +
    '      display: flex;\n' +
    '      align-items: center;\n' +
    '      justify-content: center;\n' +
    '      gap: 6px;\n' +
    '    }\n' +
    '    #milo-form-content .form-footer .copyright {\n' +
    '      font-size: 11px;\n' +
    '      opacity: 0.3;\n' +
    '      margin-top: 8px;\n' +
    '    }\n' +
    '\n' +
    '    /* ====== LOADING SPINNER ====== */\n' +
    '    #milo-form-content .spinner {\n' +
    '      width: 20px; height: 20px;\n' +
    '      border: 2.5px solid rgba(255,255,255,0.3);\n' +
    '      border-top-color: white;\n' +
    '      border-radius: 50%;\n' +
    '      animation: miloSpin 0.6s linear infinite;\n' +
    '      display: none;\n' +
    '    }\n' +
    '    #milo-form-content .btn-primary.loading .spinner { display: inline-block; }\n' +
    '    #milo-form-content .btn-primary.loading .btn-text { display: none; }\n' +
    '    @keyframes miloSpin { to { transform: rotate(360deg); } }\n' +
    '\n' +
    '    /* ====== RENTER DEAD END ====== */\n' +
    '    #milo-form-content .renter-section { text-align: center; }\n' +
    '    #milo-form-content .renter-section .renter-icon { font-size: 56px; margin-bottom: 20px; }\n' +
    '    #milo-form-content .renter-section h2 { font-size: 26px; margin-bottom: 16px; }\n' +
    '    #milo-form-content .renter-section p {\n' +
    '      font-size: 15px; opacity: 0.7; line-height: 1.6; margin-bottom: 28px;\n' +
    '      max-width: 440px; margin-left: auto; margin-right: auto;\n' +
    '    }\n' +
    '    #milo-form-content .share-confirm {\n' +
    '      display: none; color: var(--green); font-weight: 700; font-size: 15px;\n' +
    '      margin-top: 12px; animation: miloPopIn 0.3s ease;\n' +
    '    }\n' +
    '\n' +
    '    /* ====== RESPONSIVE ====== */\n' +
    '    @media (max-width: 600px) {\n' +
    '      #milo-form-content .glass-card {\n' +
    '        padding: 28px 22px;\n' +
    '        border-radius: 16px;\n' +
    '      }\n' +
    '      #milo-form-content .step h2 { font-size: 22px; }\n' +
    '      #milo-form-content .form-grid.two-col { grid-template-columns: 1fr; }\n' +
    '      #milo-form-content .btn-row { flex-direction: column-reverse; }\n' +
    '      #milo-form-content .btn-back { width: 100%; text-align: center; }\n' +
    '      #milo-form-content .btn-primary { width: 100%; }\n' +
    '      #milo-form-content .form-header { padding-top: 28px; }\n' +
    '      #milo-form-content .form-header .tagline { font-size: 17px; }\n' +
    '      #milo-form-content .option-card { padding: 14px 16px; }\n' +
    '    }\n' +
    '';
  document.head.appendChild(css);

  /* ── INJECT FORM CONTENT ── */
  function injectContent() {
    /* Hide GHL native sections */
    var sections = document.querySelectorAll('[class^="section-"]');
    sections.forEach(function(s) { s.style.display = 'none'; });

    /* Hide GHL native nav */
    var ghlNav = document.querySelector('nav, .navbar, [class*="navbar"]');
    if (ghlNav) ghlNav.style.display = 'none';

    /* Hide GHL native footer */
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

    fetch(BASE + 'milo-form-content-altus-tv.html?v=' + Date.now())
      .then(function(r) { return r.text(); })
      .then(function(html) {
        wrapper.innerHTML = html;
        setTimeout(initFormLogic, 100);
      })
      .catch(function(err) { console.error('Form content fetch failed:', err); });
  }

  /* ── FORM LOGIC ── */
  function initFormLogic() {
    var TOTAL_STEPS = 11;
    var THANK_YOU_STEP = 11;
    var RENTER_STEP = '2b';
    var NOT_IN_AREA_STEP = '2x';

    // ----------- STATE -----------
    var currentStep = 1;
    var formData = {
      uncomfortable: '',
      isHomeowner: '',
      serviceType: '',
      topConcern: [],
      atticInspected: '',
      energyBill: '',
      timeline: '',
      homeSize: '',
      timePreference: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };

    // ----------- ZIP ROUTING (loaded at boot) -----------
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
          .then(function(cfg) {
            locationCache[locId] = cfg;
            resolve(cfg);
          })
          .catch(function() { resolve(null); });
      });
    }

    // ----------- OPTION CARD SELECTION (auto-advance) -----------
    var root = document.getElementById('milo-form-content');
    root.querySelectorAll('.option-cards').forEach(function(group) {
      var field = group.dataset.field;
      var isMulti = group.classList.contains('multi-select');
      group.querySelectorAll('.option-card').forEach(function(card) {
        card.addEventListener('click', function() {
          if (isMulti) {
            /* Multi-select: toggle card */
            card.classList.toggle('selected');
            var selected = group.querySelectorAll('.option-card.selected');
            var vals = [];
            selected.forEach(function(c) { vals.push(c.dataset.value); });
            formData[field] = vals;
            /* Enable/disable Continue button */
            var btn = document.getElementById('btn6');
            if (btn) btn.disabled = vals.length === 0;
            return;
          }

          group.querySelectorAll('.option-card').forEach(function(c) { c.classList.remove('selected'); });
          card.classList.add('selected');
          formData[field] = card.dataset.value;

          /* Renter dead-end: if homeowner question answered "no" */
          if (field === 'isHomeowner' && card.dataset.value === 'no') {
            setTimeout(function() { showRenterDeadEnd(); }, 350);
            return;
          }

          setTimeout(function() { goNext(); }, 350);
        });
      });
    });

    // ----------- NAVIGATION -----------
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
      if (val.length < 5) {
        zipEl.classList.add('input-error');
        return;
      }
      zipEl.classList.remove('input-error');
      formData.zip = val.substring(0, 5);

      /* Pre-fill the address step ZIP field */
      var addrZip = document.getElementById('zip');
      if (addrZip) addrZip.value = formData.zip;

      var locId = resolveLocation(formData.zip);
      var successDiv = document.getElementById('zipSuccess');
      var notFoundDiv = document.getElementById('zipNotFound');

      if (locId) {
        /* Fetch location config to get business name */
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
        /* Not in service area — show dead end with phone */
        var fallbackLocId = window.MILO_LOCATION || 'tulia';
        fetchLocationConfig(fallbackLocId).then(function(cfg) {
          var phone = (cfg && cfg.phone) ? cfg.phone : '(806) 401-9750';
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
      if (currentStep === 9 && !validateAddress()) return;
      currentStep++;
      showStep(currentStep);
      updateProgress();
    }

    function goPrev() {
      if (typeof currentStep === 'string') {
        /* From renter dead-end, go back to step 2 */
        currentStep = 2;
        showStep(2);
        updateProgress();
        return;
      }
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgress();
      }
    }

    function validateAddress() {
      var fields = ['street', 'city', 'state', 'zip'];
      var valid = true;
      fields.forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        if (!el.value.trim()) {
          el.classList.add('input-error');
          valid = false;
        } else {
          el.classList.remove('input-error');
        }
      });
      if (valid) {
        formData.street = document.getElementById('street').value.trim();
        formData.city = document.getElementById('city').value.trim();
        formData.state = document.getElementById('state').value.trim();
        formData.zip = document.getElementById('zip').value.trim();

        /* Check if ZIP is in our service area */
        var locId = resolveLocation(formData.zip);
        var warn = root.querySelector('.zip-warning');
        if (!locId && warn) {
          warn.classList.add('show');
          /* Still allow proceeding — lead goes to fallback location */
        } else if (warn) {
          warn.classList.remove('show');
        }
      }
      return valid;
    }

    /* ----------- SHARE LINK (renter dead-end) ----------- */
    function copyLink() {
      var url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
      } else {
        var t = document.createElement('textarea');
        t.value = url;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
      }
      var confirm = document.getElementById('shareConfirm');
      if (confirm) {
        confirm.style.display = 'block';
        setTimeout(function() { confirm.style.display = 'none'; }, 2000);
      }
    }

    function backToStart() {
      currentStep = 1;
      /* Reset step 4 selection */
      root.querySelectorAll('#step2 .option-card').forEach(function(c) { c.classList.remove('selected'); });
      formData.isHomeowner = '';
      formData.uncomfortable = '';
      root.querySelectorAll('#step1 .option-card').forEach(function(c) { c.classList.remove('selected'); });
      showStep(1);
      updateProgress();
    }

    function validateContact() {
      var fields = ['firstName', 'lastName', 'email', 'phone'];
      var valid = true;
      fields.forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        if (!el.value.trim()) {
          el.classList.add('input-error');
          valid = false;
        } else {
          el.classList.remove('input-error');
        }
      });
      var emailEl = document.getElementById('email');
      if (emailEl && emailEl.value.trim() && emailEl.value.indexOf('@') === -1) {
        emailEl.classList.add('input-error');
        valid = false;
      }
      if (valid) {
        formData.firstName = document.getElementById('firstName').value.trim();
        formData.lastName = document.getElementById('lastName').value.trim();
        formData.email = document.getElementById('email').value.trim();
        formData.phone = document.getElementById('phone').value.trim();
      }
      return valid;
    }

    // ----------- PHONE FORMATTING -----------
    var phoneEl = document.getElementById('phone');
    if (phoneEl) {
      phoneEl.addEventListener('input', function(e) {
        var x = e.target.value.replace(/\D/g, '').substring(0, 10);
        if (x.length > 6) {
          e.target.value = '(' + x.substring(0,3) + ') ' + x.substring(3,6) + '-' + x.substring(6);
        } else if (x.length > 3) {
          e.target.value = '(' + x.substring(0,3) + ') ' + x.substring(3);
        } else if (x.length > 0) {
          e.target.value = '(' + x;
        }
      });
    }

    root.querySelectorAll('input').forEach(function(input) {
      input.addEventListener('focus', function() { input.classList.remove('input-error'); });
    });

    // ----------- SUBMIT -----------
    function doSubmit() {
      if (!validateContact()) return;

      var btn = document.getElementById('btnSubmit');
      btn.classList.add('loading');
      btn.disabled = true;

      /* Resolve location from ZIP */
      var locId = resolveLocation(formData.zip);
      var fallbackLocId = window.MILO_LOCATION || 'tulia';
      var targetLocId = locId || fallbackLocId;

      fetchLocationConfig(targetLocId).then(function(locCfg) {
        var webhookUrl = (locCfg && locCfg.webhookUrl) ? locCfg.webhookUrl : '';
        var scheduleUrl = (locCfg && locCfg.scheduleUrl) ? locCfg.scheduleUrl : '#';

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
          serviceType: formData.serviceType,
          topConcern: Array.isArray(formData.topConcern) ? formData.topConcern.join(', ') : formData.topConcern,
          atticInspected: formData.atticInspected,
          energyBill: formData.energyBill,
          timeline: formData.timeline,
          homeSize: formData.homeSize,
          timePreference: formData.timePreference,
          source: 'milo-form',
          formName: 'Free Home Efficiency Scan',
          locationId: targetLocId,
          leadSource: 'TV Spot',
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
            body: JSON.stringify(payload),
            mode: 'no-cors'
          }).catch(function(err) {
            console.warn('Webhook POST error (may be expected with no-cors):', err);
          });
        } else {
          console.warn('No webhook URL configured for location:', targetLocId);
          submitPromise = Promise.resolve();
        }

        submitPromise.finally(function() {
          btn.classList.remove('loading');
          currentStep = THANK_YOU_STEP;
          showStep(THANK_YOU_STEP);
          updateProgress();
          /* Populate phone number */
          var phoneEl = document.getElementById('thankYouPhone');
          if (phoneEl && locCfg && locCfg.phone) {
            phoneEl.textContent = locCfg.phone;
          } else if (phoneEl) {
            phoneEl.parentElement.style.display = 'none';
          }
          /* Fire Meta Pixel conversion */
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

    // ----------- EXPOSE FUNCTIONS GLOBALLY -----------
    window.nextStep = goNext;
    window.prevStep = goPrev;
    window.submitForm = doSubmit;
    window.copyShareLink = copyLink;
    window.backFromRenter = backToStart;

    // ----------- INIT -----------
    updateProgress();
  }

  /* ── BOOT SEQUENCE ── */
  function bootForm() {
    /* Altus TV - no ZIP lookup needed, go straight to content */
    window._miloZipLookup = {};
    injectContent();
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
