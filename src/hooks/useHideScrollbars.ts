/**
 * React hooks for hiding scrollbars
 * Place this in src/hooks/useHideScrollbars.ts
 */

import { useEffect, useRef } from 'react';

/**
 * Hook to hide scrollbars on a specific element
 * Usage: const ref = useHideScrollbars<HTMLDivElement>();
 */
export function useHideScrollbars<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Apply scrollbar hiding styles
    element.style.scrollbarWidth = 'none';
    element.style.msOverflowStyle = 'none';
    
    // Create and inject style for webkit browsers
    const style = document.createElement('style');
    const uniqueClass = `hide-scrollbar-${Math.random().toString(36).substr(2, 9)}`;
    element.classList.add(uniqueClass);
    
    style.textContent = `
      .${uniqueClass}::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      element.classList.remove(uniqueClass);
      document.head.removeChild(style);
    };
  }, []);

  return ref;
}

/**
 * Hook to hide scrollbars in an iframe
 * Usage: const iframeRef = useIframeScrollbarHiding();
 */
export function useIframeScrollbarHiding() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          // Inject CSS
          const style = iframeDoc.createElement('style');
          style.textContent = `
            * {
              scrollbar-width: none !important;
              -ms-overflow-style: none !important;
            }
            *::-webkit-scrollbar {
              display: none !important;
            }
          `;
          iframeDoc.head.appendChild(style);

          // Apply to html and body
          if (iframeDoc.documentElement) {
            iframeDoc.documentElement.style.scrollbarWidth = 'none';
            iframeDoc.documentElement.style.msOverflowStyle = 'none';
          }
          if (iframeDoc.body) {
            iframeDoc.body.style.scrollbarWidth = 'none';
            iframeDoc.body.style.msOverflowStyle = 'none';
          }
        }
      } catch (e) {
        // Cross-origin iframe - can only hide the iframe's scrollbar
        console.warn('Cannot access iframe (cross-origin). Hiding iframe scrollbar only.');
        iframe.style.overflow = 'hidden';
      }
    };

    iframe.addEventListener('load', handleLoad);
    
    // Try immediately in case already loaded
    if (iframe.contentDocument?.readyState === 'complete') {
      handleLoad();
    }

    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, []);

  return iframeRef;
}

/**
 * Hook to hide scrollbars in modal dialogs
 * Usage: useModalScrollbarHiding();
 */
export function useModalScrollbarHiding() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Find all open modals/dialogs
      const modals = document.querySelectorAll([
        '[role="dialog"]',
        '[role="alertdialog"]',
        '[data-state="open"]',
        '.modal',
      ].join(','));

      modals.forEach((modal) => {
        if (modal instanceof HTMLElement) {
          modal.style.scrollbarWidth = 'none';
          modal.style.msOverflowStyle = 'none';

          // Apply to all scrollable children
          const scrollable = modal.querySelectorAll('*');
          scrollable.forEach((el) => {
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

    return () => observer.disconnect();
  }, []);
}
