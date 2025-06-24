import { View, ViewProps } from "react-native";

interface ThemedViewProps extends ViewProps {
  bg?: "900" | "950";
}

export function ThemedView({
  children,
  className,
  bg = "950",
  ...rest
}: ThemedViewProps) {
  return (
    <View className={`p-6 bg-black ` + className} {...rest}>
      {children}
    </View>
  );
}
