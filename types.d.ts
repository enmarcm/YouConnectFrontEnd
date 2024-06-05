export interface LogoProps {
  color?: string;
  width?: number;
  height?: number;
}

export interface ButtonCustomProps {
  to?: string;
  children: React.ReactNode;
  color?: string;
  onPress?: () => void;
  shadow?: boolean;
}

export interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: Record<string, unknown>;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export interface StylesErrorInputs {
  textInput: CSSProperties;
  container: CSSProperties;
  errorContainer: CSSProperties;
}

export interface UseInputStylesProps {
  type: string;
  style: CSSProperties;
  error: string;
  styles: StylesErrorInputs;
}

export interface LoadingContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface FetchoParams {
  url: string;
  method?: HttpMethod;
  body?: Record<string, unknown>;
  isCors?: boolean;
  config?: Record<string, unknown>;
}

export interface PropsChildren {
  children: ReactNode;
}

export type TabViewProps = {
  tabs: string[];
  children: React.ReactNode[];
  location?: "top" | "bottom";
};

export interface Tab {
  title: string;
  icon: ICONS;
}

export interface TabViewProps {
  tabs: Tab[];
  children: React.ReactNode[];
}

export interface ContactItemProps {
  contact: {
    id: string;
    name: string;
    number: string[];
    image: string;
  };
}
export interface GroupItemProps {
  group: {
    id: string;
    name: string;
    description: string;
    idUser: string;
  };
}

export type ToastContextType = {
  toastData: {
    isVisible: boolean;
    message: string;
    type: string;
  };
  toggleToast: () => void;
  showToast: (message: string, type: string) => void;
  hideToast: () => void;
};
