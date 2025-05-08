import React from "react";
import { View, Text, useWindowDimensions } from "react-native";

import { Editor } from "../presentation/components/CodeEditor";
import { FileExplorer } from "../presentation/components/FileExplorer";
import { useBoardConnection } from "../presentation/hooks/useBoardConnection";

export default function IDEScreen() {
  const { width } = useWindowDimensions();
  const { isConnected, isConnecting, error } = useBoardConnection();

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500">Failed to connect: {error}</Text>
      </View>
    );
  }

  if (isConnecting) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500">Connecting to board...</Text>
      </View>
    );
  }

  if (!isConnected) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500">Not connected to board</Text>
      </View>
    );
  }

  // On mobile, show only the editor
  if (width < 768) {
    return (
      <View className="flex-1">
        <Editor />
      </View>
    );
  }

  // On tablet/desktop, show split view
  return (
    <View className="flex-1 flex-row">
      <View className="w-1/3 border-r border-gray-200">
        <FileExplorer />
      </View>
      <View className="flex-1">
        <Editor />
      </View>
    </View>
  );
}
