import React from "react";
import { SvgXml } from "react-native-svg";

interface DynamicSvgIconProps {
  svgContent: string;
  width?: number;
  height?: number;
  color?: string;
}

export const DynamicSvgIcon: React.FC<DynamicSvgIconProps> = ({
  svgContent,
  width = 24,
  height = 24,
  color = "black",
}) => {
  return (
    <SvgXml xml={svgContent} width={width} height={height} color={color} />
  );
};
