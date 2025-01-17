interface ScrollbarOptions {
  selector?: string;
  global?: boolean;
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
          width: 10px;
          height: 10px;
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
    }

    if (selector) {
      return `
        ${selector}::-webkit-scrollbar {
          width: 10px;
          height: 10px;
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


          
        ${selector}:hover::-webkit-scrollbar {
          display: block;
        }

        ${selector} {
          overflow: auto !important;
          scrollbar-gutter: stable !important;
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

export default HoverScrollbar;
