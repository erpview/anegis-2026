/* ===========================================
   POPUP COMPONENT JAVASCRIPT
   Reusable slide-in popup functionality
   =========================================== */

// Initialize popup when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Create popup HTML if not exists
    if (!document.getElementById('popup-overlay')) {
        createPopupHTML();
    }

    // Close popup on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
});

// Create popup HTML structure
function createPopupHTML() {
    const popupHTML = `
    <div class="popup-overlay" id="popup-overlay" onclick="closePopup()"></div>
    <div class="popup-panel" id="popup-panel">
      <div class="popup-content">
        <button class="popup-close" onclick="closePopup()" aria-label="Close">×</button>
        
        <div class="popup-icon" id="popup-icon">
          <img src="" alt="">
        </div>

        <h2 class="popup-title" id="popup-title"></h2>

        <p class="popup-description" id="popup-description"></p>

        <hr class="popup-divider">

        <a href="#" class="popup-cta" id="popup-cta">
          Dowiedz się więcej
          <span class="popup-cta-icon">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </a>
      </div>
      
      <div class="popup-gradient"></div>
    </div>
  `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);
}

/**
 * Open popup with custom content
 * @param {Object} options - Popup options
 * @param {string} options.title - Popup title
 * @param {string} options.description - Popup description text
 * @param {string} options.icon - URL to icon image
 * @param {string} options.ctaLink - URL for CTA button
 * @param {string} options.ctaText - Text for CTA button (optional)
 */
function openPopup(options) {
    // Support both object and legacy arguments format
    let title, description, icon, ctaLink, ctaText;

    if (typeof options === 'object') {
        title = options.title;
        description = options.description;
        icon = options.icon;
        ctaLink = options.ctaLink;
        ctaText = options.ctaText;
    } else {
        // Legacy format: openPopup(title, description, icon, ctaLink)
        title = arguments[0];
        description = arguments[1];
        icon = arguments[2];
        ctaLink = arguments[3];
    }

    // Set content
    const titleEl = document.getElementById('popup-title');
    const descEl = document.getElementById('popup-description');
    const iconEl = document.getElementById('popup-icon');
    const ctaEl = document.getElementById('popup-cta');

    if (titleEl) titleEl.textContent = title || '';
    if (descEl) descEl.textContent = description || '';
    if (iconEl && icon) iconEl.querySelector('img').src = icon;
    if (ctaEl) {
        ctaEl.href = ctaLink || '#';
        if (ctaText) {
            ctaEl.childNodes[0].textContent = ctaText + ' ';
        }
    }

    // Show popup
    document.getElementById('popup-overlay').classList.add('active');
    document.getElementById('popup-panel').classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close popup
 */
function closePopup() {
    const overlay = document.getElementById('popup-overlay');
    const panel = document.getElementById('popup-panel');

    if (overlay) overlay.classList.remove('active');
    if (panel) panel.classList.remove('active');
    document.body.style.overflow = '';
}
