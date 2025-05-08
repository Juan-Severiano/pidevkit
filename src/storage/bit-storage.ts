import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type BitState = {
  status: "connected" | "connecting" | "unconnected" | "loading";
  connectedBoard: string;
  setStatus: (payload: BitState["status"]) => void;
};

export const useBitStore = create(
  persist<BitState>(
    (set, get) => ({
      status: "unconnected",
      connectedBoard: "None",
      setStatus: (payload) => {
        set({ status: payload });
      },
    }),
    {
      name: "@bitdoglab:global",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
