// @ts-nocheck
import { Asset } from "expo-asset";

import CSSImage from "@/assets/files/css.png";
import HTMLImage from "@/assets/files/html.png";
import JSImage from "@/assets/files/js.png";
import PyImage from "@/assets/files/py.png";
import TSImage from "@/assets/files/ts.png";
import FolderImage from "@/assets/folders/lib.png";

export const loadSvg = async (path: string): Promise<string> => {
  try {
    const asset = Asset.fromModule(path);
    await asset.downloadAsync();
    const response = await fetch(asset.uri);
    return await response.text();
  } catch (error) {
    console.error("Erro ao carregar SVG:", error);
    return "";
  }
};

export const iconMap = {
  py: PyImage,
  html: HTMLImage,
  css: CSSImage,
  js: JSImage,
  ts: TSImage,
  folder: FolderImage,
};

export type IconName = keyof typeof iconMap;

export const language = {
  py: "python",
  js: "javascript",
  ts: "typescript",
  css: "css",
  html: "html",
};
