import { useEffect } from "react";

import { ConnectionStatus } from "../../domain/entities/types";
import { useBoardStore } from "../store/boardStore";

export const useBoardConnection = () => {
  const { initialize, connectionStatus, error } = useBoardStore();

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.DISCONNECTED) {
      initialize();
    }
  }, [connectionStatus, initialize]);

  return {
    isConnected: connectionStatus === ConnectionStatus.CONNECTED,
    isConnecting: connectionStatus === ConnectionStatus.CONNECTING,
    error,
  };
};
