import { board } from 'expo-micro-ide';
import { BoardStatus, ConnectionStatus } from '../../domain/entities/types';
import { BoardUseCases } from '../../domain/useCases/boardUseCases';

export class BoardRepository implements BoardUseCases {
  async initialize(): Promise<string> {
    try {
      return await board.initialize();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async run(script?: string): Promise<string> {
    try {
      return await board.run(script);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async pause(): Promise<string> {
    try {
      return await board.pause();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async reset(): Promise<string> {
    try {
      return await board.reset();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  getLastOutput(): string {
    return board.getLastOutput();
  }

  getConnectionStatus(): ConnectionStatus {
    return board.getConnectionStatus();
  }

  getBoardStatus(): BoardStatus {
    return board.getBoardStatus();
  }

  onStatusChange(callback: (status: BoardStatus) => void): () => void {
    return board.onStatusChange(callback);
  }

  onConnectionChange(callback: (status: ConnectionStatus) => void): () => void {
    return board.onConnectionChange(callback);
  }

  private handleError(error: any): Error {
    if (error?.code) {
      return error;
    }
    return new Error(error.message || 'Unknown error occurred');
  }
} 