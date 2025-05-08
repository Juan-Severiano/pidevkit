const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// eslint-disable-next-line no-undef
const defaultConfig = getDefaultConfig(__dirname);

module.exports = withNativeWind(
  {
    ...defaultConfig,
    transformer: {
      ...defaultConfig.transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer"), // Adiciona o transformer para SVGs
    },
    resolver: {
      ...defaultConfig.resolver,
      assetExts: defaultConfig.resolver.assetExts.filter(
        (ext) => ext !== "svg",
      ),
      sourceExts: [...defaultConfig.resolver.sourceExts, "svg"], // Permite carregar SVGs como componentes
    },
  },
  { input: "./src/styles/global.css" },
);
