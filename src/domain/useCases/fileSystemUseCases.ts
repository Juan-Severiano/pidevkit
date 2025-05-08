import { MicroFile } from "../entities/types";

export interface FileSystemUseCases {
  list(): Promise<MicroFile[]>;
  create(name: string): Promise<string>;
  remove(fileName: string): Promise<string>;
  rename(oldName: string, newName: string): Promise<string>;
  read(path: string): Promise<string>;
  write(path: string, content: string): Promise<string>;
}
