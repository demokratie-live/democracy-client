// PII patterns for redaction
const PII_PATTERNS = [
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email addresses
  /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, // Credit card numbers
  /\b(?:\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}\b/g, // Phone numbers
  /\b[A-Z]{2}\d{2}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{2}\b/g, // IBAN
  /\b\d{3}[\s-]?\d{2}[\s-]?\d{4}\b/g, // SSN-like patterns
  /bearer\s+[a-zA-Z0-9_-]+/gi, // Bearer tokens
  /\btoken[:\s]+[a-zA-Z0-9_-]+/gi, // General tokens
  /\bpassword[:\s]+\S+/gi, // Passwords
  /\bapi[_-]?key[:\s]+[a-zA-Z0-9_-]+/gi, // API keys
];

// Allowed attribute keys that are safe to log
const ALLOWED_ATTRIBUTES = new Set([
  'action',
  'screen',
  'component',
  'event',
  'feature',
  'platform',
  'version',
  'build',
  'locale',
  'theme',
  'network_status',
  'error_code',
  'duration',
  'count',
  'size',
  'type',
  'status',
  'method',
  'url_path', // Only path, not full URL
  'user_agent_platform',
  // HTTP Request logging specific attributes
  'operation_name',
  'operation_type',
  'variables_count',
  'has_variables',
  'has_data',
  'has_errors',
  'error_count',
  'error_index',
  'error_message',
  'error_path',
  'error_extensions',
  'error_name',
  'network_error',
  'status_code',
  'request_id',
  'cache_hit',
  'response_size',
]);

/**
 * Redacts PII from a string using predefined patterns
 */
export function redactPII(text: string): string {
  let redacted = text;
  
  for (const pattern of PII_PATTERNS) {
    redacted = redacted.replace(pattern, '[REDACTED]');
  }
  
  return redacted;
}

/**
 * Filters attributes to only include allowed keys and redacts PII from values
 */
export function sanitizeAttributes(attributes: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(attributes)) {
    if (ALLOWED_ATTRIBUTES.has(key)) {
      if (typeof value === 'string') {
        sanitized[key] = redactPII(value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[key] = value;
      } else {
        sanitized[key] = redactPII(String(value));
      }
    }
  }
  
  return sanitized;
}

/**
 * Sanitizes a log message by redacting PII
 */
export function sanitizeMessage(message: string): string {
  return redactPII(message);
}