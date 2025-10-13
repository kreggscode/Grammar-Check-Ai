// Content script for Grammar Check Pro
// Handles text selection and displays grammar suggestions

console.log('🎯 Grammar Check Pro: Content script loaded successfully!');

// Test button removed as requested

let suggestionsPanel = null;

// Create a permanent overlay for grammar check UI
function createGrammarOverlay() {
  // Remove existing overlay if any
  const existing = document.getElementById('grammar-check-overlay');
  if (existing) document.body.removeChild(existing);

  const overlay = document.createElement('div');
  overlay.id = 'grammar-check-overlay';
  overlay.setAttribute('style', `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0,0,0,0.8) !important;
    z-index: 2147483647 !important;
    display: none !important;
    align-items: center !important;
    justify-content: center !important;
    font-family: Arial, sans-serif !important;
    pointer-events: auto !important;
    visibility: visible !important;
    opacity: 1 !important;
  `);

  const modal = document.createElement('div');
  modal.setAttribute('style', `
    background: white !important;
    border-radius: 12px !important;
    padding: 24px !important;
    max-width: 500px !important;
    width: 90% !important;
    max-height: 80vh !important;
    overflow-y: auto !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
    position: relative !important;
    border: 3px solid #10b981 !important;
  `);

  const closeButton = document.createElement('div');
  closeButton.textContent = '×';
  closeButton.id = 'grammar-overlay-close-btn';
  closeButton.setAttribute('style', `
    position: absolute !important;
    top: 12px !important;
    right: 12px !important;
    width: 24px !important;
    height: 24px !important;
    background: #f0f0f0 !important;
    border-radius: 50% !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 16px !important;
    font-weight: bold !important;
    color: #666 !important;
    z-index: 1 !important;
    transition: all 0.2s ease !important;
  `);
  closeButton.onmouseover = () => {
    closeButton.style.background = '#e0e0e0 !important';
    closeButton.style.transform = 'scale(1.1) !important';
  };
  closeButton.onmouseout = () => {
    closeButton.style.background = '#f0f0f0 !important';
    closeButton.style.transform = 'scale(1) !important';
  };

  // Multiple ways to handle close button click
  const closeHandler = () => {
    console.log('🎯 Grammar Check Pro: Close button clicked');
    hideGrammarOverlay();
  };

  closeButton.onclick = closeHandler;
  closeButton.addEventListener('click', closeHandler);
  closeButton.addEventListener('mousedown', closeHandler);

  const title = document.createElement('h2');
  title.textContent = 'Grammar Check Pro';
  title.setAttribute('style', `
    margin: 0 0 16px 0 !important;
    color: #333 !important;
    font-size: 24px !important;
    font-weight: bold !important;
  `);

  const content = document.createElement('div');
  content.id = 'grammar-content';
  content.setAttribute('style', `
    color: #666 !important;
    line-height: 1.5 !important;
  `);
  content.innerHTML = `
    <div style="text-align: center !important; padding: 20px !important;">
      <div style="font-size: 48px !important; margin-bottom: 16px !important;">🔍</div>
      <div style="font-size: 18px !important; margin-bottom: 8px !important;">Analyzing your text...</div>
      <div style="font-size: 14px !important; color: #888 !important;">This may take a few seconds</div>
    </div>
  `;

  modal.appendChild(closeButton);
  modal.appendChild(title);
  modal.appendChild(content);
  overlay.appendChild(modal);

  // Try multiple ways to add to DOM
  if (document.body) {
    document.body.appendChild(overlay);
  } else {
    // Fallback for when body isn't ready
    document.documentElement.appendChild(overlay);
  }

  // Add click outside to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      console.log('🎯 Grammar Check Pro: Clicked outside modal, closing');
      hideGrammarOverlay();
    }
  });

  // Add keyboard support
  const keyHandler = (e) => {
    if (e.key === 'Escape') {
      console.log('🎯 Grammar Check Pro: Escape key pressed, closing');
      hideGrammarOverlay();
    }
  };
  document.addEventListener('keydown', keyHandler);

  // Store the key handler so we can remove it later
  overlay._keyHandler = keyHandler;

  console.log('🎯 Grammar Check Pro: Grammar overlay created with aggressive styling');
  return overlay;
}

// Show grammar check overlay
function showGrammarOverlay() {
  let overlay = document.getElementById('grammar-check-overlay');
  if (!overlay) {
    overlay = createGrammarOverlay();
  }

  // Force show with multiple methods
  overlay.setAttribute('style', overlay.getAttribute('style').replace('display: none', 'display: flex'));
  overlay.style.display = 'flex !important';
  overlay.style.visibility = 'visible !important';
  overlay.style.opacity = '1 !important';
  overlay.style.zIndex = '2147483647 !important';

  console.log('🎯 Grammar Check Pro: Grammar overlay shown with aggressive styling');

  // Double-check after a short delay
  setTimeout(() => {
    const checkOverlay = document.getElementById('grammar-check-overlay');
    if (checkOverlay) {
      const computedStyle = window.getComputedStyle(checkOverlay);
      console.log('🎯 Grammar Check Pro: Overlay visibility check:', {
        display: computedStyle.display,
        visibility: computedStyle.visibility,
        opacity: computedStyle.opacity,
        zIndex: computedStyle.zIndex
      });

      // Force again if needed
      if (computedStyle.display === 'none') {
        checkOverlay.style.display = 'flex !important';
        checkOverlay.style.visibility = 'visible !important';
        checkOverlay.style.opacity = '1 !important';
        console.log('🎯 Grammar Check Pro: Overlay forced visible again');
      }
    }
  }, 100);
}

// Hide grammar check overlay
function hideGrammarOverlay() {
  const overlay = document.getElementById('grammar-check-overlay');
  if (overlay) {
    // Remove keyboard event listener
    if (overlay._keyHandler) {
      document.removeEventListener('keydown', overlay._keyHandler);
    }

    // Multiple ways to ensure it's hidden
    overlay.style.setProperty('display', 'none', 'important');
    overlay.style.setProperty('visibility', 'hidden', 'important');
    overlay.style.setProperty('opacity', '0', 'important');
    overlay.style.setProperty('pointer-events', 'none', 'important');

    // Also try removing it completely if needed
    try {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    } catch (e) {
      console.log('🎯 Grammar Check Pro: Could not remove overlay:', e);
    }

    console.log('🎯 Grammar Check Pro: Grammar overlay hidden');
  }
}

// Update overlay content
function updateOverlayContent(content) {
  const contentDiv = document.getElementById('grammar-content');
  if (contentDiv) {
    contentDiv.innerHTML = content;
    console.log('🎯 Grammar Check Pro: Overlay content updated');

    // Force the overlay to stay visible after content update
    const overlay = document.getElementById('grammar-check-overlay');
    if (overlay) {
      overlay.style.display = 'flex !important';
      overlay.style.visibility = 'visible !important';
      overlay.style.opacity = '1 !important';
    }
  } else {
    console.log('🎯 Grammar Check Pro: Content div not found for update');
  }
}

// Grammar check button removed - only right-click functionality remains

// Button protection removed - no buttons to protect

// Create the suggestions panel
function createSuggestionsPanel() {
  const panel = document.createElement('div');
  panel.id = 'grammar-suggestions-panel';
  panel.innerHTML = `
    <div style="
      position: absolute;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      z-index: 10000;
      max-width: 400px;
      min-width: 300px;
      max-height: 500px;
      overflow-y: auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <div style="
        padding: 16px;
        border-bottom: 1px solid #f0f0f0;
        background: #f8f9fa;
        border-radius: 8px 8px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #202124;">Grammar Check Results</h3>
        <button id="close-suggestions" style="
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          color: #5f6368;
        ">✕</button>
      </div>
      <div id="suggestions-content" style="padding: 16px;">
        <div style="text-align: center; color: #5f6368;">
          <div style="margin-bottom: 8px;">🔍</div>
          Analyzing your text...
        </div>
      </div>
    </div>
  `;

  // Close button functionality
  panel.querySelector('#close-suggestions').onclick = () => hideSuggestionsPanel();

  return panel;
}

// Button display functions removed - only right-click functionality remains

// Show suggestions panel
function showSuggestionsPanel(position) {
  if (suggestionsPanel) {
    document.body.removeChild(suggestionsPanel);
  }

  suggestionsPanel = createSuggestionsPanel();

  // Position the panel
  let top = position.top + 10;
  let left = position.left;

  // Ensure panel stays within viewport
  if (top + 500 > window.innerHeight) {
    top = position.top - 510;
  }
  if (left + 400 > window.innerWidth) {
    left = window.innerWidth - 410;
  }

  suggestionsPanel.style.position = 'fixed';
  suggestionsPanel.style.top = top + 'px';
  suggestionsPanel.style.left = left + 'px';

  document.body.appendChild(suggestionsPanel);
}

// Hide suggestions panel
function hideSuggestionsPanel() {
  if (suggestionsPanel && document.body.contains(suggestionsPanel)) {
    document.body.removeChild(suggestionsPanel);
    suggestionsPanel = null;
  }
}

// Check grammar of selected text (use overlay directly)
async function checkSelectedGrammar() {
  console.log('🎯 Grammar Check Pro: checkSelectedGrammar function called');

  const selection = window.getSelection();
  console.log('🎯 Grammar Check Pro: Selection object:', selection);

  if (!selection.rangeCount) {
    alert('No text selection found!');
    return;
  }

  const selectedText = selection.toString().trim();
  console.log('🎯 Grammar Check Pro: Selected text:', selectedText);

  if (!selectedText) {
    alert('No text selected!');
    return;
  }

  // Show overlay immediately
  showGrammarOverlay();

  // Show enhanced loading animation with glowing effects
  updateOverlayContent(`
    <div style="text-align: center !important; padding: 40px 20px !important;">
      <!-- Pulsing and glowing magnifying glass -->
      <div style="
        font-size: 80px !important;
        margin-bottom: 20px !important;
        animation: pulse-glow 2s ease-in-out infinite !important;
        filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.6)) !important;
        text-shadow: 0 0 30px rgba(16, 185, 129, 0.8), 0 0 60px rgba(16, 185, 129, 0.4) !important;
      ">🔍</div>

      <!-- Animated title with typing effect -->
      <div style="
        font-size: 28px !important;
        margin-bottom: 16px !important;
        font-weight: 700 !important;
        color: #1f2937 !important;
        animation: text-glow 3s ease-in-out infinite alternate !important;
        background: linear-gradient(45deg, #10b981, #059669, #10b981) !important;
        background-size: 200% 200% !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        animation: gradient-shift 3s ease-in-out infinite, text-glow 2s ease-in-out infinite alternate !important;
      ">Analyzing Your Text</div>

      <!-- Enhanced spinning loader with glow -->
      <div style="margin: 30px 0 !important;">
        <div style="
          display: inline-block !important;
          width: 60px !important;
          height: 60px !important;
          border: 6px solid #e5e7eb !important;
          border-top: 6px solid #10b981 !important;
          border-radius: 50% !important;
          animation: spin-glow 1s linear infinite !important;
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3) !important;
        "></div>
      </div>

      <!-- Animated processing text -->
      <div style="
        font-size: 16px !important;
        margin-bottom: 8px !important;
        color: #10b981 !important;
        font-weight: 600 !important;
        animation: fade-pulse 2s ease-in-out infinite !important;
      ">AI is processing...</div>

      <div style="
        font-size: 14px !important;
        color: #6b7280 !important;
        animation: fade-pulse 2s ease-in-out infinite 0.5s !important;
      ">Checking grammar, spelling, punctuation & style</div>

      <!-- Animated Progress Bar -->
      <div style="margin: 30px 0 20px 0 !important;">
        <div style="width: 100% !important; height: 6px !important; background: #e5e7eb !important; border-radius: 3px !important; overflow: hidden !important; position: relative !important;">
          <div style="
            position: absolute !important;
            left: -100% !important;
            width: 100% !important;
            height: 100% !important;
            background: linear-gradient(90deg, #10b981, #059669, #10b981) !important;
            animation: progress-slide 2s ease-in-out infinite !important;
          "></div>
        </div>
        <div style="font-size: 12px !important; color: #6b7280 !important; margin-top: 8px !important; animation: fade-pulse 2s ease-in-out infinite !important;">Processing your text...</div>
      </div>

      <!-- Bouncing dots animation -->
      <div style="margin: 20px 0 !important; display: flex !important; justify-content: center !important; align-items: center !important; gap: 8px !important;">
        <div style="width: 8px !important; height: 8px !important; background: #10b981 !important; border-radius: 50% !important; animation: bounce 1.4s ease-in-out infinite both !important;"></div>
        <div style="width: 8px !important; height: 8px !important; background: #10b981 !important; border-radius: 50% !important; animation: bounce 1.4s ease-in-out infinite both 0.2s !important;"></div>
        <div style="width: 8px !important; height: 8px !important; background: #10b981 !important; border-radius: 50% !important; animation: bounce 1.4s ease-in-out infinite both 0.4s !important;"></div>
      </div>

      <!-- Enhanced selected text preview -->
      <div style="
        margin-top: 24px !important;
        padding: 16px !important;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
        border-radius: 12px !important;
        border: 2px solid #e5e7eb !important;
        border-image: linear-gradient(45deg, #10b981, #059669) 1 !important;
        animation: border-glow 3s ease-in-out infinite !important;
      ">
        <div style="font-size: 12px !important; color: #6b7280 !important; margin-bottom: 8px !important;">Selected text:</div>
        <div style="font-size: 14px !important; color: #374151 !important; font-style: italic !important;">"${selectedText.substring(0, 150)}${selectedText.length > 150 ? '...' : ''}"</div>
      </div>
    </div>

    <style>
      @keyframes spin-glow {
        0% {
          transform: rotate(0deg);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
        }
        50% {
          box-shadow: 0 0 50px rgba(16, 185, 129, 0.6), 0 0 70px rgba(16, 185, 129, 0.3);
        }
        100% {
          transform: rotate(360deg);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
        }
      }

      @keyframes pulse-glow {
        0%, 100% {
          transform: scale(1);
          filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.6));
          text-shadow: 0 0 30px rgba(16, 185, 129, 0.8), 0 0 60px rgba(16, 185, 129, 0.4);
        }
        50% {
          transform: scale(1.05);
          filter: drop-shadow(0 0 40px rgba(16, 185, 129, 0.9));
          text-shadow: 0 0 50px rgba(16, 185, 129, 1), 0 0 80px rgba(16, 185, 129, 0.6);
        }
      }

      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }

      @keyframes text-glow {
        0%, 100% { text-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
        50% { text-shadow: 0 0 40px rgba(16, 185, 129, 0.8), 0 0 60px rgba(16, 185, 129, 0.4); }
      }

      @keyframes fade-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      @keyframes border-glow {
        0%, 100% {
          border-image-source: linear-gradient(45deg, #10b981, #059669);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }
        50% {
          border-image-source: linear-gradient(45deg, #059669, #10b981);
          box-shadow: 0 0 40px rgba(16, 185, 129, 0.4);
        }
      }

      @keyframes progress-slide {
        0% { left: -100%; }
        100% { left: 100%; }
      }

      @keyframes bounce {
        0%, 80%, 100% {
          transform: scale(0);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }
    </style>
  `);

  try {
    // Send message to background script
    console.log('🎯 Grammar Check Pro: Sending request to background script...');

    // Force minimum loading time so animation is visible
    const startTime = Date.now();
    const result = await chrome.runtime.sendMessage({
      action: 'checkGrammar',
      text: selectedText
    });

    // Ensure loading animation shows for at least 3 seconds
    const elapsed = Date.now() - startTime;
    console.log('🎯 Grammar Check Pro: API call took', elapsed, 'ms');
    if (elapsed < 3000) {
      console.log('🎯 Grammar Check Pro: Adding delay to show loading animation');
      await new Promise(resolve => setTimeout(resolve, 3000 - elapsed));
    }

    console.log('🎯 Grammar Check Pro: Received result from background script:', result);
    displayGrammarResults(result, selectedText);
  } catch (error) {
    console.error('🎯 Grammar Check Pro: Error communicating with background script:', error);
    updateOverlayContent(`
      <div style="text-align: center !important; color: #d93025 !important;">
        <div style="font-size: 48px !important; margin-bottom: 16px !important;">❌</div>
        <div style="font-size: 18px !important; margin-bottom: 8px !important;">Grammar Check Failed</div>
        <div style="font-size: 14px !important;">${error.message}</div>
        <button class="error-close-btn" style="
          background: #f0f0f0 !important;
          color: #333 !important;
          border: none !important;
          padding: 12px 24px !important;
          border-radius: 6px !important;
          font-size: 16px !important;
          cursor: pointer !important;
          margin-top: 16px !important;
        ">Close</button>
      </div>
    `);
  }
}

// Display grammar check results
function displayGrammarResults(result, originalText) {
  console.log('🎯 Grammar Check Pro: Displaying results:', result);
  console.log('🎯 Grammar Check Pro: Original text:', originalText);

  if (result.error) {
    updateOverlayContent(`
      <div style="text-align: center !important; color: #dc2626 !important;">
        <div style="font-size: 48px !important; margin-bottom: 16px !important;">❌</div>
        <div style="font-size: 18px !important; margin-bottom: 8px !important; font-weight: 600 !important;">Grammar Check Failed</div>
        <div style="font-size: 14px !important; color: #6b7280 !important;">${result.error}</div>
        <button onclick="window.postMessage({type: 'close-grammar-overlay'}, '*')" style="
          background: #6b7280 !important;
          color: white !important;
          border: none !important;
          padding: 12px 24px !important;
          border-radius: 8px !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          margin-top: 20px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
        ">Close</button>
      </div>
    `);
    return;
  }

  let html = '';

  // Overall score with copy button - Grammarly-style design
  const score = result.overall_score || 0;
  const scoreColor = score >= 8 ? '#10b981' : score >= 6 ? '#f59e0b' : '#ef4444';
  const scoreText = `Writing Quality Score: ${score}/10`;
  const scoreEmoji = score >= 8 ? '🟢' : score >= 6 ? '🟡' : '🔴';

  html += `
    <div style="margin-bottom: 24px !important; padding: 20px !important; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important; border-radius: 12px !important; border: 2px solid ${scoreColor} !important; position: relative !important;">
      <div style="position: absolute !important; top: -8px !important; left: 16px !important; background: white !important; padding: 4px 8px !important; border-radius: 12px !important; border: 2px solid ${scoreColor} !important; font-size: 12px !important; font-weight: 600 !important; color: ${scoreColor} !important;">
        ${scoreEmoji} QUALITY SCORE
      </div>
      <div style="display: flex !important; justify-content: space-between !important; align-items: center !important; margin-bottom: 16px !important; margin-top: 8px !important;">
        <span style="font-weight: 700 !important; font-size: 18px !important; color: #1f2937 !important;">Writing Analysis</span>
        <button class="copy-score-btn" data-score-text="${scoreText}" style="
          background: ${scoreColor} !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: 8px !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
          transition: all 0.2s ease !important;
        " title="Copy score">📋 Copy Score</button>
      </div>
      <div style="display: flex !important; align-items: center !important; gap: 16px !important;">
        <div style="flex: 1 !important;">
          <div style="background: #e2e8f0 !important; height: 20px !important; border-radius: 10px !important; overflow: hidden !important; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1) !important;">
            <div style="background: linear-gradient(90deg, ${scoreColor} 0%, ${scoreColor}dd 100%) !important; height: 100% !important; width: ${score * 10}% !important; transition: width 1s ease-out !important; border-radius: 10px !important; position: relative !important;">
              <div style="position: absolute !important; right: -8px !important; top: -2px !important; width: 16px !important; height: 24px !important; background: white !important; border-radius: 50% !important; box-shadow: 0 0 4px rgba(0,0,0,0.2) !important;"></div>
            </div>
          </div>
        </div>
        <div style="display: flex !important; align-items: baseline !important; gap: 4px !important;">
          <span style="font-size: 36px !important; font-weight: 800 !important; color: ${scoreColor} !important; line-height: 1 !important;">${score}</span>
          <span style="font-size: 20px !important; font-weight: 600 !important; color: #6b7280 !important;">/10</span>
        </div>
      </div>
    </div>
  `;

  // Corrections - Grammarly-style cards
  if (result.corrections && result.corrections.length > 0) {
    html += '<div style="display: flex !important; justify-content: space-between !important; align-items: center !important; margin: 24px 0 16px 0 !important;">';
    html += '<h4 style="margin: 0 !important; font-size: 20px !important; font-weight: 700 !important; color: #1f2937 !important; display: flex !important; align-items: center !important; gap: 8px !important;"><span>🔧</span> Corrections & Suggestions:</h4>';

    // Add "Copy All Fixes" button
    const allCorrectedTexts = result.corrections.map(c => c.corrected.replace(/^["']|["']$/g, '')).join('\n\n');
    html += `<button class="copy-all-fixes-btn" data-all-fixes="${allCorrectedTexts.replace(/"/g, '&quot;')}" style="
      background: linear-gradient(135deg, #059669, #047857) !important;
      color: white !important;
      border: none !important;
      padding: 10px 20px !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3) !important;
      transition: all 0.2s ease !important;
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
    " title="Copy all corrected texts">
      <span>📋</span> Copy All Fixes
    </button>`;

    html += '</div>';

    result.corrections.forEach((correction, index) => {
      const typeColors = {
        grammar: '#3b82f6',
        spelling: '#ef4444',
        punctuation: '#f59e0b',
        style: '#10b981',
        clarity: '#8b5cf6'
      };

      const color = typeColors[correction.type] || '#3b82f6';
      const typeIcons = {
        grammar: '📖',
        spelling: '🔤',
        punctuation: '❓',
        style: '✨',
        clarity: '💡'
      };
      const icon = typeIcons[correction.type] || '📝';

      html += `
        <div style="margin-bottom: 20px !important; padding: 20px !important; border-left: 5px solid ${color} !important; background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%) !important; border-radius: 12px !important; box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important; position: relative !important;">
          <div style="margin-bottom: 12px !important;">
            <span style="background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%) !important; color: white !important; padding: 6px 12px !important; border-radius: 8px !important; font-size: 13px !important; font-weight: 600 !important; display: inline-flex !important; align-items: center !important; gap: 6px !important; box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;">
              ${icon} ${correction.type.toUpperCase()}
            </span>
          </div>
          <div style="margin-bottom: 12px !important; font-style: italic !important; color: #dc2626 !important; font-size: 16px !important; background: #fef2f2 !important; padding: 12px !important; border-radius: 8px !important; border-left: 4px solid #dc2626 !important; position: relative !important;">
            <div style="position: absolute !important; top: 8px !important; left: -12px !important; color: #dc2626 !important; font-size: 18px !important;">✗</div>
            "${correction.original}"
          </div>
          <div style="margin-bottom: 12px !important;">
            <div style="display: flex !important; align-items: center !important; gap: 12px !important; margin-bottom: 8px !important;">
              <div style="font-weight: 600 !important; color: #059669 !important; font-size: 16px !important; background: #f0fdf4 !important; padding: 12px !important; border-radius: 8px !important; border-left: 4px solid #059669 !important; position: relative !important; flex: 1 !important;">
                <div style="position: absolute !important; top: 8px !important; left: -12px !important; color: #059669 !important; font-size: 18px !important;">✓</div>
                "${correction.corrected}"
              </div>
              <button class="copy-correction-btn" data-corrected-text="${correction.corrected.replace(/^["']|["']$/g, '').replace(/"/g, '&quot;')}" style="
                background: #10b981 !important;
                color: white !important;
                border: none !important;
                padding: 8px 16px !important;
                border-radius: 6px !important;
                font-size: 14px !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3) !important;
                transition: all 0.2s ease !important;
                white-space: nowrap !important;
              " title="Copy corrected text">Copy Fix</button>
            </div>
          </div>
          <div style="font-size: 15px !important; color: #374151 !important; line-height: 1.6 !important; margin-bottom: 16px !important; background: #f9fafb !important; padding: 12px !important; border-radius: 8px !important;">
            💡 ${correction.explanation}
          </div>
        </div>
      `;
    });
  } else {
    html += `
      <div style="text-align: center !important; color: #10b981 !important; padding: 40px 20px !important;">
        <div style="font-size: 64px !important; margin-bottom: 20px !important;">🎉</div>
        <div style="font-size: 24px !important; font-weight: 700 !important; margin-bottom: 12px !important;">Perfect Writing!</div>
        <div style="font-size: 16px !important; color: #6b7280 !important; margin-bottom: 20px !important;">No corrections needed for this text.</div>
        <button class="copy-results-btn" data-results-text="✅ Perfect writing! Quality Score: ${score}/10 - No corrections needed." style="
          background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
          color: white !important;
          border: none !important;
          padding: 14px 28px !important;
          border-radius: 10px !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3) !important;
          transition: all 0.2s ease !important;
        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 16px rgba(16, 185, 129, 0.3)'">📋 Copy Results</button>
      </div>
    `;
  }

  // Suggestions - Enhanced design
  if (result.suggestions && result.suggestions.length > 0) {
    html += '<h4 style="margin: 24px 0 16px 0 !important; font-size: 20px !important; font-weight: 700 !important; color: #1f2937 !important; display: flex !important; align-items: center !important; gap: 8px !important;"><span>💡</span> Writing Tips:</h4>';
    html += '<div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important; border-radius: 12px !important; padding: 20px !important; border: 1px solid #0ea5e9 !important;">';
    result.suggestions.forEach((suggestion, index) => {
      html += `<div style="margin-bottom: 12px !important;">
        <div style="display: flex !important; align-items: center !important; gap: 12px !important; margin-bottom: 8px !important;">
          <div style="color: #1e40af !important; line-height: 1.6 !important; padding: 12px !important; background: rgba(255,255,255,0.7) !important; border-radius: 8px !important; border-left: 4px solid #3b82f6 !important; flex: 1 !important;">
            <div style="display: flex !important; align-items: flex-start !important; gap: 12px !important;">
              <span style="color: #3b82f6 !important; font-size: 20px !important; font-weight: bold !important; margin-top: 2px !important;">${index + 1}</span>
              <span style="flex: 1 !important;">${suggestion}</span>
            </div>
          </div>
          <button class="copy-suggestion-btn" data-suggestion-text="${suggestion.replace(/'/g, '\\\'').replace(/"/g, '\\"')}" style="
            background: #3b82f6 !important;
            color: white !important;
            border: none !important;
            padding: 8px 16px !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3) !important;
            transition: all 0.2s ease !important;
            white-space: nowrap !important;
          " title="Copy suggestion">Copy Tip</button>
        </div>
      </div>`;
    });
    html += '</div>';
  }

  // Enhanced close button at bottom
  html += `
    <div style="text-align: center !important; margin-top: 32px !important; padding-top: 20px !important; border-top: 2px solid #e5e7eb !important;">
      <button onclick="window.postMessage({type: 'close-grammar-overlay'}, '*')" style="
        background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%) !important;
        color: white !important;
        border: none !important;
        padding: 16px 40px !important;
        border-radius: 12px !important;
        font-size: 18px !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2) !important;
        transition: all 0.3s ease !important;
        text-transform: uppercase !important;
        letter-spacing: 0.5px !important;
      " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 16px rgba(0,0,0,0.2)'">
        ✨ Done
      </button>
    </div>
  `;

  updateOverlayContent(html);
  console.log('🎯 Grammar Check Pro: HTML content updated, buttons should be created now');

  // Add event listeners to dynamically created buttons
  setTimeout(() => {
    console.log('🎯 Grammar Check Pro: Attaching event listeners...');

    // Copy score button
    const copyScoreBtn = document.querySelector('.copy-score-btn');
    if (copyScoreBtn) {
      console.log('🎯 Found copy score button');
      copyScoreBtn.onclick = () => {
        console.log('🎯 Copy score button clicked');
        const scoreText = copyScoreBtn.getAttribute('data-score-text');
        navigator.clipboard.writeText(scoreText).then(() => {
          console.log('🎯 Score copied to clipboard');
        });
        copyScoreBtn.textContent = '✅ Copied!';
        setTimeout(() => {
          copyScoreBtn.innerHTML = '📋 Copy Score';
        }, 2000);
      };
      copyScoreBtn.onmouseover = () => copyScoreBtn.style.transform = 'scale(1.05)';
      copyScoreBtn.onmouseout = () => copyScoreBtn.style.transform = 'scale(1)';
    }

    // Copy correction buttons - copy only the corrected text
    const copyCorrectionBtns = document.querySelectorAll('.copy-correction-btn');
    console.log('🎯 Found', copyCorrectionBtns.length, 'copy correction buttons');
    copyCorrectionBtns.forEach((btn, index) => {
      console.log('🎯 Attaching listener to copy correction button', index);
      btn.onclick = () => {
        console.log('🎯 Copy correction button', index, 'clicked');
        try {
          const correctedText = btn.getAttribute('data-corrected-text');
          console.log('🎯 Text to copy:', correctedText);
          navigator.clipboard.writeText(correctedText).then(() => {
            console.log('🎯 Correction copied to clipboard successfully');
          }).catch(err => {
            console.error('🎯 Clipboard write failed:', err);
          });
          btn.textContent = '✅ Copied!';
          btn.style.background = '#059669 !important';
          setTimeout(() => {
            btn.textContent = 'Copy Fix';
            btn.style.background = '#10b981 !important';
          }, 2000);
        } catch (e) {
          console.error('Error copying correction:', e);
        }
      };
      btn.onmouseover = () => {
        btn.style.transform = 'translateY(-2px)';
        btn.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4) !important';
      };
      btn.onmouseout = () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3) !important';
      };
    });

    // Close overlay button
    const closeBtn = document.querySelector('.close-overlay-btn');
    if (closeBtn) {
      closeBtn.onclick = () => {
        console.log('🎯 Grammar Check Pro: Done button clicked');
        hideGrammarOverlay();
      };
      closeBtn.onmouseover = () => {
        closeBtn.style.transform = 'translateY(-3px)';
        closeBtn.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
      };
      closeBtn.onmouseout = () => {
        closeBtn.style.transform = 'translateY(0)';
        closeBtn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
      };
    }

    // Perfect writing copy button
    const copyResultsBtn = document.querySelector('.copy-results-btn');
    if (copyResultsBtn) {
      copyResultsBtn.onclick = () => {
        const resultsText = copyResultsBtn.getAttribute('data-results-text');
        navigator.clipboard.writeText(resultsText);
        copyResultsBtn.textContent = '✅ Copied!';
        setTimeout(() => {
          copyResultsBtn.innerHTML = '<span>📋</span> Copy Results';
        }, 2000);
      };
    }

    // Copy all fixes button
    const copyAllFixesBtn = document.querySelector('.copy-all-fixes-btn');
    if (copyAllFixesBtn) {
      copyAllFixesBtn.onclick = () => {
        const allFixesText = copyAllFixesBtn.getAttribute('data-all-fixes');
        navigator.clipboard.writeText(allFixesText);
        copyAllFixesBtn.innerHTML = '<span>✅</span> All Copied!';
        copyAllFixesBtn.style.background = '#047857 !important';
        setTimeout(() => {
          copyAllFixesBtn.innerHTML = '<span>📋</span> Copy All Fixes';
          copyAllFixesBtn.style.background = 'linear-gradient(135deg, #059669, #047857) !important';
        }, 2000);
      };
      copyAllFixesBtn.onmouseover = () => {
        copyAllFixesBtn.style.transform = 'translateY(-2px)';
        copyAllFixesBtn.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4) !important';
      };
      copyAllFixesBtn.onmouseout = () => {
        copyAllFixesBtn.style.transform = 'translateY(0)';
        copyAllFixesBtn.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3) !important';
      };
    }

    // Copy suggestion buttons
    const copySuggestionBtns = document.querySelectorAll('.copy-suggestion-btn');
    copySuggestionBtns.forEach(btn => {
      btn.onclick = () => {
        const suggestionText = btn.getAttribute('data-suggestion-text');
        navigator.clipboard.writeText(suggestionText);
        btn.textContent = '✅ Copied!';
        btn.style.background = '#1e40af !important';
        setTimeout(() => {
          btn.textContent = 'Copy Tip';
          btn.style.background = '#3b82f6 !important';
        }, 2000);
      };
      btn.onmouseover = () => {
        btn.style.transform = 'translateY(-2px)';
        btn.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4) !important';
      };
      btn.onmouseout = () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3) !important';
      };
    });
  }, 100);
}

// Initialize overlay when extension loads
function initializeExtension() {
  console.log('🎯 Grammar Check Pro: Initializing extension...');
  createGrammarOverlay(); // Create overlay upfront
  console.log('🎯 Grammar Check Pro: Overlay created for right-click functionality.');
  console.log('🎯 Grammar Check Pro: For debugging: use forceShowOverlay() or emergencyCheck() in console');

  // Test overlay visibility after initialization
  setTimeout(() => {
    const overlay = document.getElementById('grammar-check-overlay');
    if (overlay) {
      console.log('🎯 Grammar Check Pro: Overlay exists in DOM after init');
    } else {
      console.log('🎯 Grammar Check Pro: Overlay NOT found in DOM after init - this is bad!');
    }
  }, 500);
}

// Text selection button removed as requested - only right-click functionality remains

// Fallback button removed as requested by user

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showGrammarCheck' && request.text) {
    // Use overlay for context menu (more reliable than panels)
    showGrammarOverlay();
    updateOverlayContent(`
      <div style="text-align: center !important;">
        <div style="font-size: 48px !important; margin-bottom: 16px !important;">🔍</div>
        <div style="font-size: 18px !important; margin-bottom: 8px !important;">Context Menu Selection</div>
        <div style="font-size: 14px !important; margin-bottom: 16px !important;">"${request.text.substring(0, 100)}${request.text.length > 100 ? '...' : ''}"</div>
        <button class="context-check-btn" data-context-text="${request.text.replace(/'/g, '\\\'').replace(/"/g, '\\"')}" style="
          background: #4285f4 !important;
          color: white !important;
          border: none !important;
          padding: 12px 24px !important;
          border-radius: 6px !important;
          font-size: 16px !important;
          cursor: pointer !important;
          margin: 8px !important;
        ">Check Grammar</button>
        <button class="context-cancel-btn" style="
          background: #f0f0f0 !important;
          color: #333 !important;
          border: none !important;
          padding: 12px 24px !important;
          border-radius: 6px !important;
          font-size: 16px !important;
          cursor: pointer !important;
          margin: 8px !important;
        ">Cancel</button>
      </div>
    `);

    // Add event listeners for error close buttons
    setTimeout(() => {
      const errorCloseBtns = document.querySelectorAll('.error-close-btn');
      errorCloseBtns.forEach(btn => {
        btn.onclick = () => {
          hideGrammarOverlay();
        };
      });
    }, 100);

    // Add event listeners for context menu buttons
    setTimeout(() => {
      const contextCheckBtn = document.querySelector('.context-check-btn');
      if (contextCheckBtn) {
        contextCheckBtn.onclick = () => {
          const text = contextCheckBtn.getAttribute('data-context-text');
          window.postMessage({type: 'grammar-check-context', text: text}, '*');
        };
      }

      const contextCancelBtn = document.querySelector('.context-cancel-btn');
      if (contextCancelBtn) {
        contextCancelBtn.onclick = () => {
          hideGrammarOverlay();
        };
      }
    }, 100);
  } else if (request.action === 'checkSelection') {
    checkSelectedGrammar();
  }
});

// Listen for window messages (for context menu and close button)
window.addEventListener('message', (event) => {
  if (event.data.type === 'grammar-check-context') {
    // Process the context menu selection directly
    processGrammarCheck(event.data.text);
  } else if (event.data.type === 'close-grammar-overlay') {
    // Close the overlay
    hideGrammarOverlay();
  }
});

// Direct grammar check processing (bypasses button visibility issues)
async function processGrammarCheck(text) {
  console.log('🎯 Grammar Check Pro: Processing grammar check for:', text.substring(0, 50) + '...');

  // Show enhanced loading animation immediately
  updateOverlayContent(`
    <div style="text-align: center !important; padding: 40px 20px !important;">
      <!-- Pulsing and glowing magnifying glass -->
      <div style="
        font-size: 80px !important;
        margin-bottom: 20px !important;
        animation: pulse-glow 2s ease-in-out infinite !important;
        filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.6)) !important;
        text-shadow: 0 0 30px rgba(16, 185, 129, 0.8), 0 0 60px rgba(16, 185, 129, 0.4) !important;
      ">🔍</div>

      <!-- Animated title with typing effect -->
      <div style="
        font-size: 28px !important;
        margin-bottom: 16px !important;
        font-weight: 700 !important;
        color: #1f2937 !important;
        animation: text-glow 3s ease-in-out infinite alternate !important;
        background: linear-gradient(45deg, #10b981, #059669, #10b981) !important;
        background-size: 200% 200% !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        animation: gradient-shift 3s ease-in-out infinite, text-glow 2s ease-in-out infinite alternate !important;
      ">Analyzing Your Text</div>

      <!-- Enhanced spinning loader with glow -->
      <div style="margin: 30px 0 !important;">
        <div style="
          display: inline-block !important;
          width: 60px !important;
          height: 60px !important;
          border: 6px solid #e5e7eb !important;
          border-top: 6px solid #10b981 !important;
          border-radius: 50% !important;
          animation: spin-glow 1s linear infinite !important;
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3) !important;
        "></div>
      </div>

      <!-- Animated processing text -->
      <div style="
        font-size: 16px !important;
        margin-bottom: 8px !important;
        color: #10b981 !important;
        font-weight: 600 !important;
        animation: fade-pulse 2s ease-in-out infinite !important;
      ">AI is processing...</div>

      <div style="
        font-size: 14px !important;
        color: #6b7280 !important;
        animation: fade-pulse 2s ease-in-out infinite 0.5s !important;
      ">Checking grammar, spelling, punctuation & style</div>

      <!-- Animated Progress Bar -->
      <div style="margin: 30px 0 20px 0 !important;">
        <div style="width: 100% !important; height: 6px !important; background: #e5e7eb !important; border-radius: 3px !important; overflow: hidden !important; position: relative !important;">
          <div style="
            position: absolute !important;
            left: -100% !important;
            width: 100% !important;
            height: 100% !important;
            background: linear-gradient(90deg, #10b981, #059669, #10b981) !important;
            animation: progress-slide 2s ease-in-out infinite !important;
          "></div>
        </div>
        <div style="font-size: 12px !important; color: #6b7280 !important; margin-top: 8px !important; animation: fade-pulse 2s ease-in-out infinite !important;">Processing your text...</div>
      </div>

      <!-- Bouncing dots animation -->
      <div style="margin: 20px 0 !important; display: flex !important; justify-content: center !important; align-items: center !important; gap: 8px !important;">
        <div style="width: 8px !important; height: 8px !important; background: #10b981 !important; border-radius: 50% !important; animation: bounce 1.4s ease-in-out infinite both !important;"></div>
        <div style="width: 8px !important; height: 8px !important; background: #10b981 !important; border-radius: 50% !important; animation: bounce 1.4s ease-in-out infinite both 0.2s !important;"></div>
        <div style="width: 8px !important; height: 8px !important; background: #10b981 !important; border-radius: 50% !important; animation: bounce 1.4s ease-in-out infinite both 0.4s !important;"></div>
      </div>

      <!-- Enhanced selected text preview -->
      <div style="
        margin-top: 24px !important;
        padding: 16px !important;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
        border-radius: 12px !important;
        border: 2px solid #e5e7eb !important;
        border-image: linear-gradient(45deg, #10b981, #059669) 1 !important;
        animation: border-glow 3s ease-in-out infinite !important;
      ">
        <div style="font-size: 12px !important; color: #6b7280 !important; margin-bottom: 8px !important;">Selected text:</div>
        <div style="font-size: 14px !important; color: #374151 !important; font-style: italic !important;">"${text.substring(0, 150)}${text.length > 150 ? '...' : ''}"</div>
      </div>
    </div>

    <style>
      @keyframes spin-glow {
        0% {
          transform: rotate(0deg);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
        }
        50% {
          box-shadow: 0 0 50px rgba(16, 185, 129, 0.6), 0 0 70px rgba(16, 185, 129, 0.3);
        }
        100% {
          transform: rotate(360deg);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
        }
      }

      @keyframes pulse-glow {
        0%, 100% {
          transform: scale(1);
          filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.6));
          text-shadow: 0 0 30px rgba(16, 185, 129, 0.8), 0 0 60px rgba(16, 185, 129, 0.4);
        }
        50% {
          transform: scale(1.05);
          filter: drop-shadow(0 0 40px rgba(16, 185, 129, 0.9));
          text-shadow: 0 0 50px rgba(16, 185, 129, 1), 0 0 80px rgba(16, 185, 129, 0.6);
        }
      }

      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }

      @keyframes text-glow {
        0%, 100% { text-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
        50% { text-shadow: 0 0 40px rgba(16, 185, 129, 0.8), 0 0 60px rgba(16, 185, 129, 0.4); }
      }

      @keyframes fade-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      @keyframes border-glow {
        0%, 100% {
          border-image-source: linear-gradient(45deg, #10b981, #059669);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }
        50% {
          border-image-source: linear-gradient(45deg, #059669, #10b981);
          box-shadow: 0 0 40px rgba(16, 185, 129, 0.4);
        }
      }

      @keyframes progress-slide {
        0% { left: -100%; }
        100% { left: 100%; }
      }

      @keyframes bounce {
        0%, 80%, 100% {
          transform: scale(0);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }
    </style>
  `);

  try {
    // Force minimum loading time so animation is visible
    const startTime = Date.now();
    const result = await chrome.runtime.sendMessage({
      action: 'checkGrammar',
      text: text
    });

    // Ensure loading animation shows for at least 3 seconds
    const elapsed = Date.now() - startTime;
    console.log('🎯 Grammar Check Pro: API call took', elapsed, 'ms');
    if (elapsed < 3000) {
      console.log('🎯 Grammar Check Pro: Adding delay to show loading animation');
      await new Promise(resolve => setTimeout(resolve, 3000 - elapsed));
    }

    console.log('🎯 Grammar Check Pro: Received result:', result);
    displayGrammarResults(result, text);
  } catch (error) {
    console.error('🎯 Grammar Check Pro: Error:', error);
    updateOverlayContent(`
      <div style="text-align: center !important; color: #d93025 !important;">
        <div style="font-size: 48px !important; margin-bottom: 16px !important;">❌</div>
        <div style="font-size: 18px !important; margin-bottom: 8px !important;">Grammar Check Failed</div>
        <div style="font-size: 14px !important;">${error.message || 'Unknown error'}</div>
        <button class="error-close-btn" style="
          background: #f0f0f0 !important;
          color: #333 !important;
          border: none !important;
          padding: 12px 24px !important;
          border-radius: 6px !important;
          font-size: 16px !important;
          cursor: pointer !important;
          margin-top: 16px !important;
        ">Close</button>
      </div>
    `);
  }
}

// Event listeners - removed text selection handlers, only context menu functionality remains
// Hide UI elements when clicking outside
document.addEventListener('click', (e) => {
  // Don't hide anything since we removed the button
  if (!suggestionsPanel?.contains(e.target)) {
    hideSuggestionsPanel();
  }
});

// Hide UI on scroll
window.addEventListener('scroll', () => {
  hideSuggestionsPanel();
});

// Manual keyboard trigger removed - only right-click functionality remains

// Emergency manual trigger (for testing)
function emergencyCheck() {
  // Create a test selection
  const testText = "This is a test sentence to check grammar.";
  processGrammarCheck(testText);
}

// Force show overlay (call from console)
function forceShowOverlay() {
  console.log('🎯 Force showing overlay...');
  const overlay = document.getElementById('grammar-check-overlay') || createGrammarOverlay();
  overlay.style.display = 'flex !important';
  overlay.style.visibility = 'visible !important';
  overlay.style.opacity = '1 !important';
  overlay.style.zIndex = '2147483647 !important';
  console.log('🎯 Overlay forced visible');
}

// Make functions available globally for console testing
window.forceShowOverlay = forceShowOverlay;
window.emergencyCheck = emergencyCheck;
// Note: Button functionality removed - only right-click works now

// Initialize the extension when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}
