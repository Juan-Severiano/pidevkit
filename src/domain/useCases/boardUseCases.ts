import { BoardStatus, ConnectionStatus } from "../entities/types";

export interface BoardUseCases {
  initialize(): Promise<string>;
  run(): Promise<string>;
  pause(): Promise<string>;
  reset(): Promise<string>;
  getLastOutput(): string;
  getConnectionStatus(): ConnectionStatus;
  getBoardStatus(): BoardStatus;
  onStatusChange(callback: (status: BoardStatus) => void): () => void;
  onConnectionChange(callback: (status: ConnectionStatus) => void): () => void;
}
