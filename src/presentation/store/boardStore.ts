import { create } from "zustand";

import { BoardRepository } from "../../data/repositories/boardRepository";
import { BoardStatus, ConnectionStatus } from "../../domain/entities/types";

interface BoardState {
  status: BoardStatus;
  connectionStatus: ConnectionStatus;
  lastOutput: string;
  error: string | null;
  board: BoardRepository;
  initialize: () => Promise<void>;
  runScript: (script?: string) => Promise<void>;
  pauseScript: () => Promise<void>;
  resetBoard: () => Promise<void>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  status: BoardStatus.STOPPED,
  connectionStatus: ConnectionStatus.DISCONNECTED,
  lastOutput: "",
  error: null,
  board: new BoardRepository(),

  initialize: async () => {
    try {
      const board = get().board;
      await board.initialize();

      board.onStatusChange((status) => {
        set({ status });
      });

      board.onConnectionChange((connectionStatus) => {
        set({ connectionStatus });
      });

      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  runScript: async (script?: string) => {
    try {
      const board = get().board;
      await board.run(script);
      set({ lastOutput: board.getLastOutput(), error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  pauseScript: async () => {
    try {
      const board = get().board;
      await board.pause();
      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  resetBoard: async () => {
    try {
      const board = get().board;
      await board.reset();
      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
