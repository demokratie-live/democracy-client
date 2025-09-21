export interface LogEntry {
  timestamp: number;
  level: string;
  message: string;
  attributes?: Record<string, any>;
  traceId?: string;
  spanId?: string;
}

export interface LogService {
  start(): Promise<void>;
  stop(): Promise<void>;
  isEnabled(): boolean;
  log(level: string, message: string, attributes?: Record<string, any>): void;
  getLogs(): Promise<LogEntry[]>;
  clearLogs(): Promise<void>;
  getLogFiles(): Promise<string[]>;
  shareLogFile(): Promise<void>;
}

export interface LogConfig {
  maxFileSize: number; // in bytes
  maxFiles: number;
  retentionDays: number;
  logDirectory: string;
}