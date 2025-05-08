import { files } from 'expo-micro-ide';
import { MicroFile } from '../../domain/entities/types';
import { FileSystemUseCases } from '../../domain/useCases/fileSystemUseCases';

export class FileSystemRepository implements FileSystemUseCases {
  async list(path?: string): Promise<MicroFile[]> {
    try {
      return await files.list(path);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create(name: string, path?: string): Promise<string> {
    try {
      return await files.create(name, path);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async remove(fileName: string, path?: string): Promise<string> {
    try {
      return await files.remove(fileName, path);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async rename(oldName: string, newName: string, path?: string): Promise<string> {
    try {
      return await files.rename(oldName, newName, path);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async read(path: string): Promise<string> {
    try {
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
    if (error?.code) {
      return error;
    }
    return new Error(error.message || 'Unknown error occurred');
  }
} 