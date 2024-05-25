import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../enums";
import { GradientBackgroundProps } from "../types";

const GradientBackground = ({
  children,
  colors = [COLORS.PRIMARY, COLORS.SECONDARY, COLORS.TERTIARY],
  start = { x: 1, y: 0 },
  end = { x: 0, y: 0 },
}: GradientBackgroundProps) => {
  return (
    <LinearGradient style={{ flex: 1 }} start={start} end={end} colors={colors}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
