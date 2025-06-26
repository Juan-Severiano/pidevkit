import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Circle, CircleX, Minus, PlugZap, RotateCcw, Square } from "lucide-react-native";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

import { Action } from "../action";
import { Divider } from "../divider";

import { ThemedText as Text } from "@/components/theme/text";
import { ThemedView } from "@/components/theme/view";
import { ConnectionStatus } from "@/domain/entities/types";
import { useBoardConnection } from "@/presentation/hooks/useBoardConnection";
import { useBoardStore } from "@/presentation/store/boardStore";
import { useFileSystemStore } from "@/presentation/store/fileSystemStore";
import { colors } from "@/styles/colors";
import { useState } from "react";

export function BoardInfo() {
  const { board, connectionStatus } = useBoardStore();
  const [boardName, setBoardName] = useState('')

  useBoardConnection();

  const { listFiles, files } = useFileSystemStore();

  const isConnectedStatus = connectionStatus === ConnectionStatus.CONNECTED;
  const isUnconnectedStatus = connectionStatus === ConnectionStatus.DISCONNECTED;

  const connect = async () => {
    try {
      const res = await board.initialize();
      setBoardName(res)
      await listFiles();
      console.log(files);
    } catch (e) {
      console.error("Erro ao conectar:", e);
    }
  };

  const disconnect = async () => {
    try {
      // await board.disconnect?.(); // Verifique se o método existe
    } catch (e) {
      console.error("Erro ao desconectar:", e);
    }
  };

  const reset = async () => {
    try {
      await board.reset();
    } catch (e) {
      console.error("Erro ao resetar:", e);
    }
  };

  const close = async () => {
    try {
      await board.pause();
    } catch (e) {
      console.error("Erro ao encerrar execução:", e);
    }
  };

  const renderStatusInfo = () => {
    switch (connectionStatus) {
      case ConnectionStatus.CONNECTED:
        return boardName;
      case ConnectionStatus.DISCONNECTED:
        return "Desconectado";
      case ConnectionStatus.CONNECTING:
        return "Conectando ao serviço ...";
      case ConnectionStatus.ERROR:
        return "Erro";
      default:
        return "";
    }
  };

  console.log("Current connectionStatus:", connectionStatus);

  return (
    <View>
      <View className="bg-white/5 p-4 rounded-xl">
        <TouchableOpacity
          className="flex-row justify-between items-center mb-4"
          onPress={connect}
          activeOpacity={0.7}
        >
          <View className="flex-1">
            <Text className="text-white text-lg font-semibold mb-1">
              {renderStatusInfo()}
            </Text>
            {isConnectedStatus && (
              <View className="space-y-1">
                <Text className="text-gray-300 text-sm">VendorID: 11912</Text>
                <Text className="text-gray-300 text-sm">ProductID: 5</Text>
                <Text className="text-gray-400 text-xs mt-2">
                  Storage: 187KB used, 5MB free
                </Text>
              </View>
            )}
          </View>
          <View className="ml-4">
            {isConnectedStatus ? (
              <Circle size={20} color={colors.green[500]} fill={colors.green[500]} />
            ) : isUnconnectedStatus ? (
              <CircleX size={20} color={colors.red[600]} />
            ) : (
              <ActivityIndicator color={colors.sky[500]} size="small" />
            )}
          </View>
        </TouchableOpacity>

        {!isConnectedStatus ? (
          <TouchableOpacity
            className="flex-row items-center justify-center bg-blue-500 rounded-xl py-3 px-4"
            onPress={connect}
            activeOpacity={0.8}
          >
            <PlugZap size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Connect Board</Text>
          </TouchableOpacity>
        ) : (
          <View className="space-y-2">
            <View className="h-px bg-white/10 my-2" />
            <View className="flex-row space-x-2">
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center bg-white/10 rounded-lg py-2.5"
                onPress={disconnect}
                activeOpacity={0.7}
              >
                <Minus size={16} color={colors.gray[300]} />
                <Text className="text-gray-300 text-sm font-medium ml-1">Disconnect</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center bg-white/10 rounded-lg py-2.5"
                onPress={reset}
                activeOpacity={0.7}
              >
                <RotateCcw size={16} color={colors.gray[300]} />
                <Text className="text-gray-300 text-sm font-medium ml-1">Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center bg-white/10 rounded-lg py-2.5"
                onPress={close}
                activeOpacity={0.7}
              >
                <Square size={16} color={colors.gray[300]} />
                <Text className="text-gray-300 text-sm font-medium ml-1">Stop</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
