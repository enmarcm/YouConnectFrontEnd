import { useState, useCallback, useMemo, CSSProperties } from "react";
import { UseInputStylesProps } from "../types";

const useInputStyles = ({
  type,
  style,
  error,
  styles,
}: UseInputStylesProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(type === "password");

  const handleEyePress = useCallback(() => {
    setSecureTextEntry((prevState) => !prevState);
  }, []);

  const inputStyle = useMemo(
    () => ({ ...styles.textInput, ...style }),
    [style]
  );
  const containerStyle = useMemo(
    () => [styles.container, error && styles.errorContainer],
    [error]
  );

  return { secureTextEntry, handleEyePress, inputStyle, containerStyle };
};

export default useInputStyles;
