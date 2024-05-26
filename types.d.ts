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
