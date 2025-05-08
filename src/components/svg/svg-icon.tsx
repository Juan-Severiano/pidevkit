import React from "react";
import { SvgXml } from "react-native-svg";

import { IconName } from "@/lib/svg-loader";

interface SvgIconProps {
  name: IconName;
  width?: number;
  height?: number;
  color?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  width = 24,
  height = 24,
  color = "black",
}) => {
  const getSvgContent = (iconName: IconName): string => {
    switch (iconName) {
      case "py":
        return require("@/assets/icons/py.svg");
      case "html":
        return require("@/assets/icons/html.svg");
      case "css":
        return require("@/assets/icons/css.svg");
      case "js":
        return require("@/assets/icons/js.svg");
      case "ts":
        return require("@/assets/icons/ts.svg");
      case "folder":
        return require("@/assets/icons/folder.svg");
      default:
        console.warn(`Icon "${iconName}" not found`);
        return "";
    }
  };

  const svgContent = getSvgContent(name);

  if (!svgContent) {
    return null;
  }

  return (
    <SvgXml xml={svgContent} width={width} height={height} color={color} />
  );
};
