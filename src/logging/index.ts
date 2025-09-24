import { LogService } from './types';
import { OTelLogService } from './OTelLogService';

// Singleton instance
let logServiceInstance: LogService | null = null;

/**
 * Gets the global log service instance
 */
export function getLogService(): LogService {
  if (!logServiceInstance) {
    logServiceInstance = new OTelLogService();
  }
  return logServiceInstance;
}

/**
 * Convenience functions for quick logging
 */
export const Logger = {
  debug: (message: string, attributes?: Record<string, any>) => {
    getLogService().log('DEBUG', message, attributes);
  },
  
  info: (message: string, attributes?: Record<string, any>) => {
    getLogService().log('INFO', message, attributes);
  },
  
  warn: (message: string, attributes?: Record<string, any>) => {
    getLogService().log('WARN', message, attributes);
  },
  
  error: (message: string, attributes?: Record<string, any>) => {
    getLogService().log('ERROR', message, attributes);
  },
  
  log: (level: string, message: string, attributes?: Record<string, any>) => {
    getLogService().log(level, message, attributes);
  },
};

// Export types and main service
export * from './types';
export { OTelLogService } from './OTelLogService';
export { FileLogExporter } from './FileLogExporter';
export * from './piiRedaction';