import "@/styles/global.css";
import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { useBoardConnection } from '../presentation/hooks/useBoardConnection';

import SplashScreen from "@/components/core/splash";
import { Loading } from "@/components/loading";

export const unstable_settings = {
  initialRouteName: "(drawer)",
};

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
  });
  const colorScheme = useColorScheme();
  useBoardConnection(); // Initialize board connection at app root

  if (!isAppReady) {
    return <SplashScreen onFinish={() => setIsAppReady(true)} />;
  }

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
          },
          headerTintColor: colorScheme === 'dark' ? '#FFFFFF' : '#1F2937',
          drawerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
          },
          drawerActiveTintColor: '#60A5FA',
          drawerInactiveTintColor: colorScheme === 'dark' ? '#9CA3AF' : '#4B5563',
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'IDE',
            drawerLabel: 'IDE',
          }}
        />
        <Drawer.Screen
          name="(drawer)/files"
          options={{
            title: 'Files',
            drawerLabel: 'Files',
          }}
        />
        <Drawer.Screen
          name="(drawer)/settings"
          options={{
            title: 'Settings',
            drawerLabel: 'Settings',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
