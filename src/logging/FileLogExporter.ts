import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import { LogRecordExporter, ReadableLogRecord } from '@opentelemetry/sdk-logs';
import { LogConfig, LogEntry } from './types';
import { sanitizeMessage, sanitizeAttributes } from './piiRedaction';

export class FileLogExporter implements LogRecordExporter {
  private config: LogConfig;
  private currentFilePath: string;

  constructor(config: LogConfig) {
    this.config = config;
    this.currentFilePath = this.getCurrentLogFilePath();
  }

  async export(
    batch: ReadableLogRecord[],
    resultCallback: (result: { code: number }) => void
  ): Promise<void> {
    try {
      await this.ensureLogDirectory();
      await this.rotateIfNeeded();

      const lines = batch
        .map((record) => {
          const logEntry: LogEntry = {
            timestamp: Date.now(),
            level: record.severityText ?? 'INFO',
            message: sanitizeMessage(
              typeof record.body === 'string' ? record.body : String(record.body ?? '')
            ),
            attributes: sanitizeAttributes(record.attributes ?? {}),
            traceId: record.spanContext?.traceId,
            spanId: record.spanContext?.spanId,
          };
          return JSON.stringify(logEntry);
        })
        .join('\n') + '\n';

      await RNFS.appendFile(this.currentFilePath, lines, 'utf8');
      resultCallback({ code: 0 });
    } catch (error) {
      console.error('Failed to export logs:', error);
      resultCallback({ code: 1 });
    }
  }

  async shutdown(): Promise<void> {
    // No cleanup needed for file exporter
  }

  /**
   * Ensures the log directory exists with proper iOS backup exclusion
   */
  private async ensureLogDirectory(): Promise<void> {
    const dirExists = await RNFS.exists(this.config.logDirectory);
    
    if (!dirExists) {
      const options: any = {};
      
      // Exclude from iOS backup
      if (Platform.OS === 'ios') {
        options.NSURLIsExcludedFromBackupKey = true;
      }
      
      await RNFS.mkdir(this.config.logDirectory, options);
    }
  }

  /**
   * Gets the current log file path
   */
  private getCurrentLogFilePath(): string {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return `${this.config.logDirectory}/app-logs-${today}.jsonl`;
  }

  /**
   * Rotates log files if the current file exceeds the size limit
   */
  private async rotateIfNeeded(): Promise<void> {
    try {
      const stats = await RNFS.stat(this.currentFilePath);
      
      if (stats.size >= this.config.maxFileSize) {
        // Create new file with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const newPath = `${this.config.logDirectory}/app-logs-${timestamp}.jsonl`;
        this.currentFilePath = newPath;
      }
    } catch (_error) {
      // File doesn't exist yet, that's okay
    }

    // Clean up old files
    await this.cleanupOldFiles();
  }

  /**
   * Removes log files older than the retention period
   */
  private async cleanupOldFiles(): Promise<void> {
    try {
      const files = await RNFS.readDir(this.config.logDirectory);
      const cutoffTime = Date.now() - (this.config.retentionDays * 24 * 60 * 60 * 1000);

      for (const file of files) {
        if (file.name.endsWith('.jsonl') && file.mtime && file.mtime.getTime() < cutoffTime) {
          await RNFS.unlink(file.path);
        }
      }

      // Also limit total number of files
      const remainingFiles = await RNFS.readDir(this.config.logDirectory);
      const logFiles = remainingFiles
        .filter(f => f.name.endsWith('.jsonl'))
        .sort((a, b) => (b.mtime?.getTime() ?? 0) - (a.mtime?.getTime() ?? 0));

      if (logFiles.length > this.config.maxFiles) {
        const filesToDelete = logFiles.slice(this.config.maxFiles);
        for (const file of filesToDelete) {
          await RNFS.unlink(file.path);
        }
      }
    } catch (_error) {
      console.error('Failed to cleanup old log files:', _error);
    }
  }

  /**
   * Gets all log files in the directory
   */
  async getLogFiles(): Promise<string[]> {
    try {
      const files = await RNFS.readDir(this.config.logDirectory);
      return files
        .filter(f => f.name.endsWith('.jsonl'))
        .map(f => f.path);
    } catch (error) {
      return [];
    }
  }

  /**
   * Reads and parses all log entries from files
   */
  async readAllLogs(): Promise<LogEntry[]> {
    try {
      const logFiles = await this.getLogFiles();
      const allLogs: LogEntry[] = [];

      for (const filePath of logFiles) {
        try {
          const content = await RNFS.readFile(filePath, 'utf8');
          const lines = content.trim().split('\n');
          
          for (const line of lines) {
            if (line.trim()) {
              try {
                const logEntry = JSON.parse(line) as LogEntry;
                allLogs.push(logEntry);
              } catch (parseError) {
                console.warn('Failed to parse log line:', parseError);
              }
            }
          }
        } catch (fileError) {
          console.warn('Failed to read log file:', filePath, fileError);
        }
      }

      // Sort by timestamp (newest first)
      return allLogs.sort((a, b) => b.timestamp - a.timestamp);
    } catch (_error) {
      console.error('Failed to read logs:', _error);
      return [];
    }
  }

  /**
   * Deletes all log files
   */
  async clearAllLogs(): Promise<void> {
    try {
      const logFiles = await this.getLogFiles();
      for (const filePath of logFiles) {
        await RNFS.unlink(filePath);
      }
      // Reset current file path
      this.currentFilePath = this.getCurrentLogFilePath();
    } catch (_error) {
      console.error('Failed to clear logs:', _error);
    }
  }
}