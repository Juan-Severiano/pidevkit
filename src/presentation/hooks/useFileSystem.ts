import { useState, useCallback } from "react";
import { MicroFile } from "@/domain/entities/types";
import { FileSystemRepository } from "@/data/repositories/fileSystemRepository";

const fileSystem = new FileSystemRepository();

export function useFileSystem(initialPath: string = "/") {
  const [files, setFiles] = useState<MicroFile[]>([]);
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [selectedFile, setSelectedFile] = useState<MicroFile | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const listFiles = useCallback(async (path?: string) => {
    try {
      const targetPath = path ?? currentPath;
      const result = await fileSystem.list();
      setFiles(result);
      setCurrentPath(targetPath);
      setError(null);
    } catch (err: any) {
      console.error("listFiles error:", err);
      setError(err.message);
    }
  }, [currentPath]);

  const createFile = useCallback(async (name: string, path?: string) => {
    try {
      const targetPath = path ?? currentPath;
      await fileSystem.create(name);
      await listFiles(targetPath);
    } catch (err: any) {
      console.error("createFile error:", err);
      setError(err.message);
    }
  }, [currentPath, listFiles]);

  const removeFile = useCallback(async (name: string, path?: string) => {
    try {
      const targetPath = path ?? currentPath;
      await fileSystem.remove(name);
      await listFiles(targetPath);
    } catch (err: any) {
      console.error("removeFile error:", err);
      setError(err.message);
    }
  }, [currentPath, listFiles]);

  const renameFile = useCallback(async (oldName: string, newName: string, path?: string) => {
    try {
      const targetPath = path ?? currentPath;
      await fileSystem.rename(oldName, newName);
      await listFiles(targetPath);
    } catch (err: any) {
      console.error("renameFile error:", err);
      setError(err.message);
    }
  }, [currentPath, listFiles]);

  const readFile = useCallback(async (path: string) => {
    try {
      const content = await fileSystem.read(path);
      setFileContent(content);
      setError(null);
      return content
    } catch (err: any) {
      console.error("readFile error:", err);
      setError(err.message);
    }
  }, []);

  const writeFile = useCallback(async (path: string, content: string) => {
    try {
      await fileSystem.write(path, content);
      setError(null);
    } catch (err: any) {
      console.error("writeFile error:", err);
      setError(err.message);
    }
  }, []);

  const resetError = () => setError(null);

  return {
    // State
    files,
    currentPath,
    selectedFile,
    fileContent,
    error,

    // Actions
    listFiles,
    createFile,
    removeFile,
    renameFile,
    readFile,
    writeFile,
    setSelectedFile,
    resetError,
  };
}
