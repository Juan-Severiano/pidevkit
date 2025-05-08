import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { CircleX, PlugZap } from "lucide-react-native";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

import { Action } from "../action";
import { Divider } from "../divider";

import { ThemedText } from "@/components/theme/text";
import { ThemedView } from "@/components/theme/view";
import { ConnectionStatus } from "@/domain/entities/types";
import { useBoardConnection } from "@/presentation/hooks/useBoardConnection";
import { useBoardStore } from "@/presentation/store/boardStore";
import { useFileSystemStore } from "@/presentation/store/fileSystemStore";
import { colors } from "@/styles/colors";

export function BoardInfo() {
  const { board, connectionStatus } = useBoardStore();

  useBoardConnection();

  const { listFiles, files } = useFileSystemStore();

  const isConnectedStatus = connectionStatus === ConnectionStatus.CONNECTED;
  const isUnconnectedStatus =
    connectionStatus === ConnectionStatus.DISCONNECTED;

  const connect = async () => {
    try {
      await board.initialize();
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
        return "MicroPython - Board in FS Mode";
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

  return (
    <ThemedView
      className="border border-3 border-gray-400 rounded-lg px-0 pt-6 pb-2"
      bg="900"
    >
      <TouchableOpacity className="px-4 mb-6" onPress={connect}>
        <View className="flex-row justify-between items-center">
          <ThemedText fontWeight="semibold">{renderStatusInfo()}</ThemedText>
          {isConnectedStatus ? (
            <FontAwesome name="circle" size={20} color={colors.green[500]} />
          ) : isUnconnectedStatus ? (
            <CircleX size={20} color={colors.red[600]} />
          ) : (
            <ActivityIndicator color={colors.sky[500]} />
          )}
        </View>

        {isConnectedStatus && (
          <>
            <ThemedText>VendorID - 11912</ThemedText>
            <ThemedText>ProductID - 5</ThemedText>
            <ThemedText className="mt-2 mb-1 text-xs">
              Armazenamento usado: 187KB, Livre: 5MB
            </ThemedText>
          </>
        )}
      </TouchableOpacity>

      <Divider />

      {!isConnectedStatus ? (
        <View className="px-4">
          <Action action={connect}>
            <PlugZap size={20} color={colors.gray[100]} />
            <Action.Title>Conectar Placa</Action.Title>
          </Action>
        </View>
      ) : (
        <>
          <View className="px-4">
            <Action action={disconnect}>
              <MaterialCommunityIcons
                name="pipe-disconnected"
                size={20}
                color={colors.gray[300]}
              />
              <Action.Title>Desconectar Placa</Action.Title>
            </Action>
          </View>
          <Divider />
          <View className="px-4">
            <Action action={reset}>
              <MaterialCommunityIcons
                name="reload"
                size={20}
                color={colors.gray[300]}
              />
              <Action.Title>Resetar Execução</Action.Title>
            </Action>
          </View>
          <Divider />
          <View className="px-4">
            <Action action={close}>
              <MaterialCommunityIcons
                name="stop"
                size={20}
                color={colors.gray[300]}
              />
              <Action.Title>Encerrar Execução</Action.Title>
            </Action>
          </View>
        </>
      )}
    </ThemedView>
  );
}
