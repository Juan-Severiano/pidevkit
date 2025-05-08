import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { CircleX, PlugZap } from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";

import { Action } from "../action";
import { Divider } from "../divider";

import { ThemedText } from "@/components/theme/text";
import { ThemedView } from "@/components/theme/view";
import { useBitStore } from "@/storage/bit-storage";
import { colors } from "@/styles/colors";

export function BoardInfo() {
  const { status, setStatus } = useBitStore();

  function connect() {
    setTimeout(() => {
      setStatus("connecting");
      setTimeout(() => {
        setStatus("loading");
        setTimeout(() => {
          setStatus("connected");
        }, 1000);
      }, 1000);
    }, 1000);
  }

  function disconnect() {
    setTimeout(() => {
      setStatus("loading");
      setTimeout(() => {
        setStatus("unconnected");
      }, 1000);
    }, 1000);
  }

  function reset() {}

  function close() {}

  return (
    <ThemedView
      className="border border-3 border-gray-400 rounded-lg px-0 pt-6 pb-2"
      bg="900"
    >
      <View className="px-4 mb-6">
        <View className="flex-row justify-between">
          <ThemedText fontWeight="semibold">
            {status === "connected" && " MicroPython - Board in FS Mode"}
            {status === "unconnected" && "Desconectado"}
            {status === "connecting" && "Conectando ao serviço ..."}
            {status === "loading" && "Carregando ..."}
          </ThemedText>
          {status === "connected" && (
            <FontAwesome name="circle" size={20} color={colors.green[500]} />
          )}
          {status !== "connected" && status !== "unconnected" && (
            <ActivityIndicator color={colors.sky[500]} />
          )}
          {status === "unconnected" && (
            <CircleX size={20} color={colors.red[600]} />
          )}
        </View>
        {status === "connected" && (
          <>
            <ThemedText>VendorID - 11912</ThemedText>
            <ThemedText>ProductID - 5</ThemedText>
            <ThemedText className="mt-2 mb-1 text-xs">
              Armazenamento usado: 187KB, Livre: 5MB
            </ThemedText>
          </>
        )}
      </View>
      <Divider />
      {status !== "connected" && (
        <View className="px-4">
          <Action disabled={status !== "unconnected"} action={connect}>
            <PlugZap size={20} color={colors.gray[100]} />
            <Action.Title>Conectar Placa</Action.Title>
          </Action>
        </View>
      )}
      {status === "connected" && (
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
