export enum BoardStatus {
  RUNNING = "Running",
  PAUSED = "Paused",
  STOPPED = "Stopped",
  ERROR = "Error",
}

export enum ConnectionStatus {
  CONNECTED = "Connected",
  CONNECTING = "Connecting",
  ERROR = "Error",
  DISCONNECTED = "Disconnected",
}

export enum FileType {
  FILE = 0,
  DIRECTORY = 1,
}

export enum ErrorType {
  CONNECTION_ERROR = "CONNECTION_ERROR",
  FILE_SYSTEM_ERROR = "FILE_SYSTEM_ERROR",
  EXECUTION_ERROR = "EXECUTION_ERROR",
  PERMISSION_ERROR = "PERMISSION_ERROR",
  DEVICE_ERROR = "DEVICE_ERROR",
}

export interface MicroFile {
  name: string;
  path: string;
  size: number;
  type: FileType;
  modifiedAt?: Date;
}

export interface BoardError {
  code: ErrorType;
  message: string;
}
