import { Feather, Ionicons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/theme/text";
import { ThemedView } from "@/components/theme/view";
import { colors } from "@/styles/colors";

const projects = [
  { id: "1", name: "JoyStick Mode", path: "/joystick-mode/" },
  { id: "2", name: "SayHello", path: "/sayhello/" },
  { id: "3", name: "Semáforo", path: "/semaforo/" },
];

export default function WorkspaceScreen() {
  // @ts-ignore
  const renderItem = ({ item }) => (
    <TouchableOpacity className={`p-4 mb-2 rounded-lg ${"bg-sky-900"}`}>
      <ThemedText variant="body" fontWeight="semibold">
        {item.name}
      </ThemedText>
      <ThemedText variant="body">{item.path}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView className="flex-1 p-4">
      <ThemedView className="border border-1 rounded-md">
        <View className="flex-row justify-between">
          <ThemedText>MicroPython - Board in FS Mode</ThemedText>
          <Feather name="circle" size={20} color={colors.sky[950]} />
        </View>
      </ThemedView>
      <ThemedView className="flex-row justify-between items-center mb-4">
        <ThemedText variant="title" fontWeight="bold">
          Projects
        </ThemedText>
        <TouchableOpacity className="bg-blue-500 p-2 rounded-full">
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </ThemedView>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ThemedView>
  );
}
