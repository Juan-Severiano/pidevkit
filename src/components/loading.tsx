import { ActivityIndicator, Image, View } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-black gap-6">
      <Image className="h-60 w-60" source={require('@/assets/icon.png')} resizeMode="contain" />
      <ActivityIndicator size="large" className="color-blue-200" />
    </View>
  );
}
