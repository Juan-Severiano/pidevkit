import "@/styles/global.css";
import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useBoardConnection } from "../presentation/hooks/useBoardConnection";

import { Loading } from "@/components/loading";

export const unstable_settings = {
  initialRouteName: "(drawer)",
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useBoardConnection();

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="modal" />
      </Stack>
    </GestureHandlerRootView>
  );
}
