import { View } from "react-native";

import { colors } from "@/styles/colors";

export function Divider() {
  return (
    <View
      className="my-1"
      style={{
        borderWidth: 0.25,
        borderColor: colors.gray[400],
      }}
    />
  );
}
