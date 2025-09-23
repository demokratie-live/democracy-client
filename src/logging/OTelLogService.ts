import * as logsAPI from '@opentelemetry/api-logs';
import { LoggerProvider, BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { Platform } from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

import { LogService, LogConfig, LogEntry } from './types';
import { FileLogExporter } from './FileLogExporter';

export class OTelLogService implements LogService {
  private provider: LoggerProvider | null = null;
  private logger: logsAPI.Logger | null = null;
  private fileExporter: FileLogExporter | null = null;
  private config: LogConfig;
  private _isEnabled = false; // Internal enabled state

  constructor() {
    // Default configuration
    this.config = {
      maxFileSize: 2 * 1024 * 1024, // 2MB
      maxFiles: 10,
      retentionDays: 14,
      logDirectory: this.getLogDirectory(),
    };
  }

  private getLogDirectory(): string {
    const baseDir = Platform.OS === 'ios' 
      ? RNFS.LibraryDirectoryPath 
      : RNFS.DocumentDirectoryPath;
    
    return `${baseDir}/Logs`;
  }

  async start(): Promise<void> {
    if (this.provider) {
      return; // Already started
    }

    try {
      // Create resource
      const resource = resourceFromAttributes({
        'service.name': 'democracy-client',
        'service.version': '1.0.0',
        'platform': Platform.OS,
      });

      // Create file exporter
      this.fileExporter = new FileLogExporter(this.config);

      // Create batch processor
      const processor = new BatchLogRecordProcessor(this.fileExporter, {
        maxQueueSize: 1000,
        maxExportBatchSize: 100,
        scheduledDelayMillis: 1000, // Export every 1 second
      });

      // Create provider with processor
      this.provider = new LoggerProvider({ 
        resource,
        processors: [processor],
      });

      // Set global provider
      logsAPI.logs.setGlobalLoggerProvider(this.provider);

      // Get logger
      this.logger = logsAPI.logs.getLogger('democracy-client');

      // Mark as enabled
      this._isEnabled = true;

      // Log startup
      this.log('INFO', 'Local logging started');
    } catch (error) {
      console.error('Failed to start logging:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (!this.provider) {
      return; // Already stopped
    }

    try {
      // Log shutdown
      this.log('INFO', 'Local logging stopped');

      // Give time for final logs to be processed
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Shutdown provider
      await this.provider.shutdown();
      
      this.provider = null;
      this.logger = null;
      this.fileExporter = null;
      this._isEnabled = false;
    } catch (error) {
      console.error('Failed to stop logging:', error);
      throw error;
    }
  }

  isEnabled(): boolean {
    return this._isEnabled && this.provider !== null;
  }

  log(level: string, message: string, attributes?: Record<string, any>): void {
    if (!this.logger || !this.isEnabled()) {
      return;
    }

    try {
      this.logger.emit({
        severityText: level.toUpperCase(),
        body: message,
        attributes: attributes ?? {},
      });
    } catch (error) {
      console.error('Failed to log message:', error);
    }
  }

  async getLogs(): Promise<LogEntry[]> {
    if (!this.fileExporter) {
      return [];
    }

    try {
      const logs = await this.fileExporter.readAllLogs();
      // Return last 1000 entries to avoid memory issues
      return logs.slice(0, 1000);
    } catch (error) {
      console.error('Failed to get logs:', error);
      return [];
    }
  }

  async clearLogs(): Promise<void> {
    if (!this.fileExporter) {
      return;
    }

    try {
      await this.fileExporter.clearAllLogs();
    } catch (error) {
      console.error('Failed to clear logs:', error);
      throw error;
    }
  }

  async getLogFiles(): Promise<string[]> {
    if (!this.fileExporter) {
      return [];
    }

    try {
      return await this.fileExporter.getLogFiles();
    } catch (error) {
      console.error('Failed to get log files:', error);
      return [];
    }
  }

  async shareLogFile(): Promise<void> {
    try {
      const logFiles = await this.getLogFiles();
      
      if (logFiles.length === 0) {
        throw new Error('No log files available to share');
      }

      // Share the most recent log file
      const mostRecentFile = logFiles[0];
      
      await Share.open({
        url: Platform.OS === 'android' ? `file://${mostRecentFile}` : mostRecentFile,
        type: 'application/json',
        title: 'Democracy App Logs',
        subject: 'Democracy App Logs',
        failOnCancel: false,
      });
    } catch (error) {
      console.error('Failed to share log file:', error);
      throw error;
    }
  }

  // Convenience methods for different log levels
  debug(message: string, attributes?: Record<string, any>): void {
    this.log('DEBUG', message, attributes);
  }

  info(message: string, attributes?: Record<string, any>): void {
    this.log('INFO', message, attributes);
  }

  warn(message: string, attributes?: Record<string, any>): void {
    this.log('WARN', message, attributes);
  }

  error(message: string, attributes?: Record<string, any>): void {
    this.log('ERROR', message, attributes);
  }
}