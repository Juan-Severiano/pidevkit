import { MicroFile } from '../entities/types';

export interface FileSystemUseCases {
  list(path?: string): Promise<MicroFile[]>;
  create(name: string, path?: string): Promise<string>;
  remove(fileName: string, path?: string): Promise<string>;
  rename(oldName: string, newName: string, path?: string): Promise<string>;
  read(path: string): Promise<string>;
  write(path: string, content: string): Promise<string>;
} 