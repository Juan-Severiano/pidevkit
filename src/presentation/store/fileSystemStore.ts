import { create } from "zustand";

import { MicroFile } from "../../domain/entities/types";

import { FileSystemRepository } from "@/data/repositories/fileSystemRepository";

interface FileSystemState {
  files: MicroFile[];
  currentPath: string;
  selectedFile: MicroFile | null;
  fileContent: string;
  error: string | null;
  fileSystem: FileSystemRepository;
  listFiles: (path?: string) => Promise<void>;
  createFile: (name: string, path?: string) => Promise<void>;
  removeFile: (fileName: string, path?: string) => Promise<void>;
  renameFile: (
    oldName: string,
    newName: string,
    path?: string,
  ) => Promise<void>;
  readFile: (path: string) => Promise<void>;
  writeFile: (path: string, content: string) => Promise<void>;
  setSelectedFile: (file: MicroFile | null) => void;
}

export const useFileSystemStore = create<FileSystemState>((set, get) => ({
  files: [],
  currentPath: "/",
  selectedFile: null,
  fileContent: "",
  error: null,
  fileSystem: new FileSystemRepository(),

  listFiles: async () => {
    try {
      const result = await get().fileSystem.list();
      console.log(result);
      set({ files: result, currentPath: "/", error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  createFile: async (name: string) => {
    try {
      await get().fileSystem.create(name);
      await get().listFiles(get().currentPath);
      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  removeFile: async (fileName: string) => {
    try {
      await get().fileSystem.remove(fileName);
      await get().listFiles(get().currentPath);
      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  renameFile: async (oldName: string, newName: string) => {
    try {
      await get().fileSystem.rename(oldName, newName);
      await get().listFiles(get().currentPath);
      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  readFile: async (path: string) => {
    try {
      const content = await get().fileSystem.read(path);
      console.log("content", content);
      set({ fileContent: content, error: null });
    } catch (error: any) {
      console.log(error);
      set({ error: error.message });
    }
  },

  writeFile: async (path: string, content: string) => {
    try {
      await get().fileSystem.write(path, content);
      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  setSelectedFile: (file: MicroFile | null) => {
    set({ selectedFile: file });
  },
}));
