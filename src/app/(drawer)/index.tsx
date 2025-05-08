import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Cpu } from "lucide-react-native";
import { FlatList, TouchableOpacity, View } from "react-native";

import { BoardInfo } from "@/components/core/board-info";
import { ThemedText } from "@/components/theme/text";
import { ThemedView } from "@/components/theme/view";
import { Input } from "@/components/ui/input";
import { colors } from "@/styles/colors";

const projects = [
  { id: "1", name: "JoyStick Mode", path: "/joystick-mode/" },
  { id: "2", name: "SayHello", path: "/sayhello/" },
  { id: "3", name: "Semáforo", path: "/semaforo/" },
];

export default function WorkspaceScreen() {
  // @ts-ignore
  const renderItem = ({ item }) => (
    <TouchableOpacity
      className={`p-4 mb-2 rounded-lg ${"bg-sky-900"} border border-1 border-gray-400`}
    >
      <ThemedText variant="body" fontWeight="semibold">
        {item.name}
      </ThemedText>
      <ThemedText variant="body">{item.path}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView className="flex-1 p-4">
      <View className="flex-row items-start mb-2 gap-2">
        <Cpu size={16} color={colors.gray[400]} className="mr-2" />
        <ThemedText className="uppercase text-sm" fontWeight="semibold">
          placa de desenvolvimento
        </ThemedText>
      </View>
      <BoardInfo />
      <View className="flex-row my-3 gap-1 items-center">
        <Input variant="secondary" className="flex-1">
          <MaterialCommunityIcons
            name="tag-search"
            size={20}
            color={colors.gray[400]}
          />
          <Input.Field />
        </Input>
        <TouchableOpacity className="bg-blue-500 p-2 w-14 h-14 rounded-md items-center justify-center">
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ThemedView className="flex-row justify-between items-center py-2 px-0 mb-4">
        <ThemedText className="uppercase text-sm" fontWeight="semibold">
          projetos
        </ThemedText>
      </ThemedView>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ThemedView>
  );
}
