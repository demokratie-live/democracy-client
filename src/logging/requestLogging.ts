import { ApolloLink, Operation, NextLink, FetchResult } from '@apollo/client';
import { Observable } from '@apollo/client/utilities';
import { useLoggingStore } from '../api/state/logging';
import { Logger } from './index';

/**
 * Sanitizes URLs by removing sensitive query parameters and tokens
 */
function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // Remove sensitive query parameters
    const sensitiveParams = ['token', 'auth', 'key', 'secret', 'password', 'jwt'];
    sensitiveParams.forEach(param => {
      if (urlObj.searchParams.has(param)) {
        urlObj.searchParams.set(param, '[REDACTED]');
      }
    });
    
    return urlObj.toString();
  } catch {
    // If URL parsing fails, just return the original URL
    return url;
  }
}

/**
 * Sanitizes request/response bodies by removing sensitive data
 */
function sanitizeBody(body: any): any {
  if (!body || typeof body !== 'object') {
    return body;
  }

  const sensitiveFields = [
    'password', 'token', 'auth', 'secret', 'key', 'jwt',
    'phoneNumber', 'email', 'creditCard', 'ssn', 'iban'
  ];

  const sanitized = { ...body };
  
  // Recursively sanitize object fields
  for (const [key, value] of Object.entries(sanitized)) {
    const lowerKey = key.toLowerCase();
    
    if (sensitiveFields.some(field => lowerKey.includes(field))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeBody(value);
    }
  }
  
  return sanitized;
}

/**
 * Apollo Link for logging HTTP requests and responses
 */
export const requestLoggingLink = new ApolloLink((operation: Operation, forward: NextLink) => {
  return new Observable<FetchResult>((observer) => {
    const { isRequestLoggingEnabled, isEnabled } = useLoggingStore.getState();
    
    // Only log if both general logging and request logging are enabled
    if (!isEnabled || !isRequestLoggingEnabled) {
      return forward(operation).subscribe(observer);
    }

    const startTime = Date.now();
    const operationName = operation.operationName || 'UnnamedOperation';
    const variables = sanitizeBody(operation.variables);
    
    // Log request start
    Logger.debug('GraphQL request started', {
      action: 'graphql_request_start',
      operation_name: operationName,
      operation_type: operation.query.definitions[0]?.kind === 'OperationDefinition' 
        ? operation.query.definitions[0].operation 
        : 'unknown',
      variables_count: Object.keys(variables || {}).length,
      has_variables: Boolean(variables && Object.keys(variables).length > 0)
    });

    return forward(operation).subscribe({
      next: (result) => {
        const duration = Date.now() - startTime;
        
        // Log successful response
        Logger.info('GraphQL request completed', {
          action: 'graphql_request_success',
          operation_name: operationName,
          duration,
          has_data: Boolean(result.data),
          has_errors: Boolean(result.errors && result.errors.length > 0),
          error_count: result.errors?.length || 0
        });

        // Log GraphQL errors if present
        if (result.errors && result.errors.length > 0) {
          result.errors.forEach((error, index) => {
            Logger.warn('GraphQL error in response', {
              action: 'graphql_error',
              operation_name: operationName,
              error_index: index,
              error_message: error.message,
              error_path: error.path ? JSON.stringify(error.path) : undefined,
              error_extensions: error.extensions ? JSON.stringify(sanitizeBody(error.extensions)) : undefined
            });
          });
        }

        observer.next(result);
      },
      error: (error) => {
        const duration = Date.now() - startTime;
        
        // Log network/request errors
        Logger.error('GraphQL request failed', {
          action: 'graphql_request_error',
          operation_name: operationName,
          duration,
          error_name: error.name,
          error_message: error.message,
          network_error: Boolean(error.networkError),
          status_code: error.networkError?.statusCode,
        });

        observer.error(error);
      },
      complete: () => {
        observer.complete();
      }
    });
  });
});

/**
 * Additional link for logging REST API requests (if any)
 */
export const restRequestLoggingLink = new ApolloLink((operation: Operation, forward: NextLink) => {
  return new Observable<FetchResult>((observer) => {
    const { isRequestLoggingEnabled, isEnabled } = useLoggingStore.getState();
    
    if (!isEnabled || !isRequestLoggingEnabled) {
      return forward(operation).subscribe(observer);
    }

    const startTime = Date.now();
    
    // Check if this is a REST operation
    const context = operation.getContext();
    if (context.uri && context.uri.includes('democracy-deutschland.de')) {
      Logger.debug('REST API request started', {
        action: 'rest_request_start',
        url_path: sanitizeUrl(context.uri).split('?')[0], // Only log path without query params
        method: context.method || 'GET',
      });
    }

    return forward(operation).subscribe({
      next: (result) => {
        if (context.uri && context.uri.includes('democracy-deutschland.de')) {
          const duration = Date.now() - startTime;
          
          Logger.info('REST API request completed', {
            action: 'rest_request_success',
            url_path: sanitizeUrl(context.uri).split('?')[0],
            duration,
            has_data: Boolean(result.data)
          });
        }
        
        observer.next(result);
      },
      error: (error) => {
        if (context.uri && context.uri.includes('democracy-deutschland.de')) {
          const duration = Date.now() - startTime;
          
          Logger.error('REST API request failed', {
            action: 'rest_request_error',
            url_path: sanitizeUrl(context.uri).split('?')[0],
            duration,
            error_name: error.name,
            error_message: error.message,
            status_code: error.statusCode
          });
        }
        
        observer.error(error);
      },
      complete: () => {
        observer.complete();
      }
    });
  });
});