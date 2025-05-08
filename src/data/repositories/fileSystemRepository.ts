import { files } from "expo-micro-ide";

import { MicroFile } from "../../domain/entities/types";
import { FileSystemUseCases } from "../../domain/useCases/fileSystemUseCases";

export class FileSystemRepository implements FileSystemUseCases {
  async list(): Promise<MicroFile[]> {
    try {
      return await files.list();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create(name: string): Promise<string> {
    try {
      return await files.create(name);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async remove(fileName: string): Promise<string> {
    try {
      return await files.remove(fileName);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async rename(oldName: string, newName: string): Promise<string> {
    try {
      return await files.rename(oldName, newName);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async read(path: string): Promise<string> {
    try {
      console.log("path aqui dentro de read", path);
      return await files.read(path);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async write(path: string, content: string): Promise<string> {
    try {
      return await files.write(path, content);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    console.log(error);
    if (error?.code) {
      return error;
    }
    return new Error(error.message || "Unknown error occurred");
  }
}
