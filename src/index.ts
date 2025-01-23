import type { ScrollbarOptions, ScrollbarInstance } from './types.ts';

export const createHoverScrollbar = (
  options: ScrollbarOptions = {}
): ScrollbarInstance => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.warn('HoverScrollbar: Window or Document is not defined');
    return {
      destroy: () => {}
    };
  }

  let styleElement: HTMLStyleElement | null = null;

  const mergedOptions = {
    global: false,
    ...options
  };

  const generateCSS = (): string => {
    const { selector, global, style } = mergedOptions;
    const thumbBgColor = style?.thumbBgColor || 'darkgray';
    const thumbHoverBgColor = style?.thumbHoverBgColor || 'rgb(128 128 128)';

    if (global) {
      return `
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          display: block;
        }
        
        *::-webkit-scrollbar-track {
          background: unset;
        }
        
        *::-webkit-scrollbar-thumb {
          background: ${thumbBgColor};
          border-radius: 12px;
        }

        *::-webkit-scrollbar-thumb:hover {
          cursor: pointer;
          background: ${thumbHoverBgColor};
        }
      `;
    } else if (selector) {
      try {
        let elementWidth = 0;
        const element = document.querySelector(selector) as HTMLElement;
        const originalWidth = element?.getBoundingClientRect().width;
        const display = window.getComputedStyle(element).display;

        if (display !== 'flex' && display !== 'inline-flex') {
          elementWidth = originalWidth + 6;
        } else {
          elementWidth = originalWidth;
        }

        return `
        ${selector} {
          padding-right: 10px !important;
          padding-left: 10px !important;
          overflow: auto !important;
          scrollbar-gutter: stable !important;
        }
            
        ${selector}:hover {
          padding-right: 2px !important;
          width: ${elementWidth}px !important;
        }

        ${selector}:hover::-webkit-scrollbar {
          display: block;
        }
          
        ${selector}::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          display: none;
        }
        
        ${selector}::-webkit-scrollbar-track {
           background: unset;
        }
        
        ${selector}::-webkit-scrollbar-thumb {
          background: ${thumbBgColor};
          border-radius: 12px;
        }

        ${selector}::-webkit-scrollbar-thumb:hover {
          cursor: pointer;
          background: ${thumbHoverBgColor};
        }
      `;
      } catch (error) {
        console.error(
          'HoverScrollbar: Error getting element dimensions',
          error
        );
        return '';
      }
    }

    return '';
  };

  const init = () => {
    try {
      const style = document.createElement('style');
      const cssContent = generateCSS();
      style.textContent = cssContent;
      document.head.appendChild(style);
      styleElement = style;
    } catch (error) {
      console.error('HoverScrollbar: Error initializing styles', error);
    }
  };

  const destroy = () => {
    if (styleElement) {
      try {
        document.head.removeChild(styleElement);
        styleElement = null;
      } catch (error) {
        console.error('HoverScrollbar: Error destroying styles', error);
      }
    }
  };

  // 初始化
  init();

  // 返回实例接口
  return {
    destroy
  };
};

export type { ScrollbarOptions, ScrollbarInstance };
export default createHoverScrollbar;
