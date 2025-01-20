interface ScrollbarOptions {
  selector?: string;
  global?: boolean;
}

interface ScrollbarConstructor {
  new (options?: ScrollbarOptions): HoverScrollbar;
}

export class HoverScrollbar {
  private options: ScrollbarOptions;
  private styleElement: HTMLStyleElement | null = null;

  constructor(options: ScrollbarOptions = {}) {
    this.options = {
      global: false,
      ...options
    };
    this.init();
  }
  private init() {
    const style = document.createElement('style');
    const cssContent = this.generateCSS();
    style.textContent = cssContent;
    document.head.appendChild(style);
    this.styleElement = style;
  }

  private generateCSS(): string {
    const { selector, global } = this.options;

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
          background: darkgray;
          border-radius: 12px;
        }

        *::-webkit-scrollbar-thumb:hover {
          cursor: pointer;
          background: rgb(128 128 128);
        }
      `;
    } else if (selector) {
      const originWidth =
        document.querySelector(selector)?.getBoundingClientRect().width || 0;

      return `
        ${selector} {
          padding-right: 10px !important;
          padding-left: 10px !important;
          overflow: auto !important;
          scrollbar-gutter: stable !important;
        }
            
        ${selector}:hover {
          padding-right: 2px !important;
          width: ${originWidth + 6}px !important;
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
          background: darkgray;
          border-radius: 12px;
        }

        ${selector}::-webkit-scrollbar-thumb:hover {
          cursor: pointer;
          background: rgb(128 128 128);
        }
      `;
    }

    return '';
  }

  public destroy() {
    if (this.styleElement) {
      document.head.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }
}

// 重要：添加类型断言
const ScrollbarWithConstructor =
  HoverScrollbar as unknown as ScrollbarConstructor;
export default ScrollbarWithConstructor;
