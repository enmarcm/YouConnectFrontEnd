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
