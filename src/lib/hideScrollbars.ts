/**
 * Utility to hide scrollbars in iframes and dynamically created elements
 * Place this in src/utils/hideScrollbars.ts
 */

// CSS to inject into iframes
const scrollbarHidingCSS = `
  <style>
    * {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    *::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
      display: none !important;
    }
    html, body {
      overflow-y: auto !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    html::-webkit-scrollbar,
    body::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
      display: none !important;
    }
  </style>
`;

/**
 * Inject scrollbar-hiding CSS into an iframe
 */
export function hideIframeScrollbars(iframe: HTMLIFrameElement) {
  try {
    iframe.addEventListener('load', () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          // Inject CSS into iframe head
          const style = iframeDoc.createElement('style');
          style.textContent = scrollbarHidingCSS.replace(/<\/?style>/g, '');
          iframeDoc.head.appendChild(style);

          // Also set styles directly on html and body
          if (iframeDoc.documentElement) {
            iframeDoc.documentElement.style.scrollbarWidth = 'none';
            iframeDoc.documentElement.style.msOverflowStyle = 'none';
            iframeDoc.documentElement.style.overflowY = 'auto';
          }
          if (iframeDoc.body) {
            iframeDoc.body.style.scrollbarWidth = 'none';
            iframeDoc.body.style.msOverflowStyle = 'none';
            iframeDoc.body.style.overflowY = 'auto';
          }
        }
      } catch (e) {
        console.warn('Cannot access iframe contents (cross-origin):', e);
        // For cross-origin iframes, we can only hide the iframe's own scrollbar
        iframe.style.overflow = 'hidden';
      }
    });
  } catch (e) {
    console.error('Error hiding iframe scrollbars:', e);
  }
}

/**
 * Apply scrollbar hiding to all iframes on the page
 */
export function hideAllIframeScrollbars() {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(hideIframeScrollbars);
}

/**
 * Watch for new iframes being added to the DOM
 */
export function watchForIframes() {
  // Handle existing iframes
  hideAllIframeScrollbars();

  // Watch for new iframes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLIFrameElement) {
          hideIframeScrollbars(node);
        } else if (node instanceof Element) {
          const iframes = node.querySelectorAll('iframe');
          iframes.forEach(hideIframeScrollbars);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
}

/**
 * Hide scrollbars in modal dialogs (for Radix UI or similar)
 */
export function hideModalScrollbars() {
  // Watch for modal content being added
  const observer = new MutationObserver(() => {
    // Target common modal/dialog selectors
    const modals = document.querySelectorAll([
      '[role="dialog"]',
      '[role="alertdialog"]',
      '.modal',
      '[data-radix-dialog-content]',
      '[data-state="open"]',
    ].join(','));

    modals.forEach((modal) => {
      if (modal instanceof HTMLElement) {
        modal.style.scrollbarWidth = 'none';
        modal.style.msOverflowStyle = 'none';
        
        // Also apply to all children
        const scrollableElements = modal.querySelectorAll('*');
        scrollableElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.scrollbarWidth = 'none';
            el.style.msOverflowStyle = 'none';
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-state', 'role'],
  });

  return observer;
}

/**
 * Initialize all scrollbar hiding functionality
 * Call this once in your main app component
 */
export function initScrollbarHiding() {
  // Hide scrollbars immediately
  hideAllIframeScrollbars();
  
  // Watch for new iframes
  const iframeObserver = watchForIframes();
  
  // Watch for modals
  const modalObserver = hideModalScrollbars();
  
  return () => {
    iframeObserver.disconnect();
    modalObserver.disconnect();
  };
}
