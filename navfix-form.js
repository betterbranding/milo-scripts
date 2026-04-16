/* navfix-form.js — v2: Multi-step form page
 * - No nav/footer (standalone form)
 * - Blue gradient background
 * - Auto-advance on option card click
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

  /* ── FORM CSS (scoped to #milo-form-content) ── */
  var css = document.createElement('style');
  css.id = 'milo-form-styles';
  css.textContent = '\n' +
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
    '      white-space: nowrap;\n' +
    '      margin: 0 auto;\n' +
    '      font-weight: 600;\n' +
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
    '      font-weight: 700;\n' +
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
    '      background: rgba(255,255,255,0.08);\n' +
    '      backdrop-filter: blur(20px);\n' +
    '      -webkit-backdrop-filter: blur(20px);\n' +
    '      border: 1px solid rgba(255,255,255,0.15);\n' +
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
    '      font-weight: 700;\n' +
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
    '      font-size: 16px;\n' +
    '      font-weight: 700;\n' +
    '      margin-bottom: 2px;\n' +
    '    }\n' +
    '    #milo-form-content .option-card .option-text p {\n' +
    '      font-size: 13px;\n' +
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
    '      font-weight: 700;\n' +
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
    '      font-weight: 700;\n' +
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
    '      font-weight: 600;\n' +
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
    '      font-weight: 600;\n' +
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

    var baseUrl = 'https://betterbranding.github.io/milo-scripts/';
    fetch(baseUrl + 'milo-form-content.html?v=' + Date.now())
      .then(function(r) { return r.text(); })
      .then(function(html) {
        wrapper.innerHTML = html;
        setTimeout(initFormLogic, 100);
      })
      .catch(function(err) { console.error('Form content fetch failed:', err); });
  }

  /* ── FORM LOGIC ── */
  function initFormLogic() {
    // ==========================================
    // MILO INSULATION — MULTI-STEP FORM
    // ==========================================

    // ----------- CONFIG -----------
    var WEBHOOK_URL = 'https://PLACEHOLDER-WEBHOOK-URL.com'; // TODO: Replace with GHL webhook
    var SCHEDULE_URL = '#'; // TODO: Replace with scheduling link
    var TOTAL_STEPS = 5;

    // ----------- ZIP CODE ROUTING -----------
    var ZIP_ROUTES = {
      // '73': { team: 'oklahoma', label: 'Oklahoma Team' },
      // '75': { team: 'dallas', label: 'Dallas Team' },
    };

    function getRouteForZip(zip) {
      if (!zip) return { team: 'default', label: 'Default Team' };
      for (var len = 5; len >= 2; len--) {
        var prefix = zip.substring(0, len);
        if (ZIP_ROUTES[prefix]) return ZIP_ROUTES[prefix];
      }
      return { team: 'default', label: 'Default Team' };
    }

    // ----------- STATE -----------
    var currentStep = 1;
    var formData = {
      serviceType: '',
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

    // ----------- OPTION CARD SELECTION (auto-advance) -----------
    var root = document.getElementById('milo-form-content');
    root.querySelectorAll('.option-cards').forEach(function(group) {
      var field = group.dataset.field;
      group.querySelectorAll('.option-card').forEach(function(card) {
        card.addEventListener('click', function() {
          // Deselect siblings
          group.querySelectorAll('.option-card').forEach(function(c) { c.classList.remove('selected'); });
          card.classList.add('selected');
          formData[field] = card.dataset.value;
          // Auto-advance after brief visual feedback
          setTimeout(function() {
            goNext();
          }, 350);
        });
      });
    });

    // ----------- NAVIGATION -----------
    function updateProgress() {
      var pct = Math.round(((currentStep - 1) / TOTAL_STEPS) * 100);
      var fillEl = document.getElementById('progressFill');
      var numEl = document.getElementById('stepNum');
      var pctEl = document.getElementById('stepPercent');
      if (fillEl) fillEl.style.width = pct + '%';
      if (numEl) numEl.textContent = Math.min(currentStep, TOTAL_STEPS);
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
      if (prog) prog.style.display = n > TOTAL_STEPS ? 'none' : 'block';
    }

    function goNext() {
      if (currentStep === 4 && !validateAddress()) return;
      currentStep++;
      showStep(currentStep);
      updateProgress();
    }

    function goPrev() {
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
      }
      return valid;
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

    // Remove error styling on focus
    root.querySelectorAll('input').forEach(function(input) {
      input.addEventListener('focus', function() { input.classList.remove('input-error'); });
    });

    // ----------- SUBMIT -----------
    function doSubmit() {
      if (!validateContact()) return;

      var btn = document.getElementById('btnSubmit');
      btn.classList.add('loading');
      btn.disabled = true;

      var route = getRouteForZip(formData.zip);

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
        serviceType: formData.serviceType,
        homeSize: formData.homeSize,
        timePreference: formData.timePreference,
        zipRoute: route.team,
        zipRouteLabel: route.label,
        source: 'milo-form',
        formName: 'Free Home Efficiency Scan',
        submittedAt: new Date().toISOString()
      };

      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      }).catch(function(err) {
        console.warn('Webhook POST error (may be expected with no-cors):', err);
      }).finally(function() {
        btn.classList.remove('loading');
        currentStep = 6;
        showStep(6);
        updateProgress();
        var schedLink = document.getElementById('scheduleLink');
        if (schedLink) schedLink.href = SCHEDULE_URL;
      });
    }

    // ----------- EXPOSE FUNCTIONS GLOBALLY -----------
    window.nextStep = goNext;
    window.prevStep = goPrev;
    window.submitForm = doSubmit;

    // ----------- INIT -----------
    updateProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectContent);
  } else {
    injectContent();
  }
  setTimeout(injectContent, 500);
  setTimeout(injectContent, 1500);
  setTimeout(injectContent, 3000);
})();
