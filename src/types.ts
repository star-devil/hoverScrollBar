export interface ScrollbarOptions {
  selector?: string;
  global?: boolean;
  style?: {
    thumbBgColor?: string;
    thumbHoverBgColor?: string;
  };
}

export interface ScrollbarInstance {
  destroy: () => void;
}
