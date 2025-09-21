# Local Logging System

This document describes how to use the local logging system implemented with OpenTelemetry.

## Overview

The logging system provides privacy-compliant local log collection that follows GDPR data minimization principles:
- **Disabled by default** - requires manual opt-in via Dev Mode
- **Local storage only** - no automatic server transmission
- **PII redaction** - automatically removes sensitive data
- **Automatic cleanup** - logs are rotated and cleaned up after 14 days
- **iOS backup exclusion** - logs are excluded from iCloud backups
- **Optional HTTP request logging** - can log all GraphQL and REST API requests

## Features

### Basic Logging
- Application events (screen navigation, user actions, errors)
- Structured logging with safe attributes
- Automatic PII redaction and whitelisting

### HTTP Request Logging (Optional)
- GraphQL operation logging (queries, mutations, subscriptions)
- REST API request logging
- Request/response timing and status codes
- Error logging with sanitized error details
- **Disabled by default** - must be explicitly enabled in Dev Mode

## Usage

### Basic Logging

```typescript
import { Logger } from '../logging';

// Simple log messages
Logger.info('User opened procedure screen');
Logger.warn('Network request failed, retrying...');
Logger.error('Failed to load data');
Logger.debug('Debug information');

// With attributes
Logger.info('Button clicked', {
  action: 'vote_submit',
  screen: 'procedure_detail',
  procedure_id: '12345'
});
```

### HTTP Request Logging

HTTP request logging is automatically integrated when enabled via the Dev Mode screen. It logs:

**GraphQL Operations:**
- Operation name and type (query/mutation/subscription)
- Request timing and success/failure status
- Error details (with PII redaction)
- Variable counts (actual values are not logged for privacy)

**REST API Calls:**
- URL paths (without sensitive query parameters)
- HTTP methods and status codes
- Response timing
- Error information

**Example log entries:**
```json
{"timestamp":1640995200000,"level":"DEBUG","message":"GraphQL request started","attributes":{"action":"graphql_request_start","operation_name":"GetProcedures","operation_type":"query","variables_count":2}}
{"timestamp":1640995245000,"level":"INFO","message":"GraphQL request completed","attributes":{"action":"graphql_request_success","operation_name":"GetProcedures","duration":245,"has_data":true,"has_errors":false}}
```

## Configuration via Dev Mode

### Enabling Logging
1. Open the app's Dev Screen (usually accessible via debug menu)
2. Tap "Local Logging" to open the logging interface
3. Toggle "Local Logging" on to enable basic application logging

### Enabling HTTP Request Logging  
1. Ensure basic logging is enabled first
2. Toggle "HTTP Request Logging" on to enable API request logging
3. **Note**: This is disabled by default and only visible when basic logging is active

## Privacy & Security

### Automatic Data Protection
- **PII Redaction**: Emails, phone numbers, tokens, passwords automatically removed
- **URL Sanitization**: Sensitive query parameters replaced with `[REDACTED]`
- **Body Sanitization**: Request/response bodies filtered for sensitive fields
- **Attribute Whitelisting**: Only predefined safe attributes are logged

### Safe HTTP Request Logging
- **No sensitive data**: Authentication tokens, passwords, personal data filtered out
- **Path-only URLs**: Full URLs with query parameters are sanitized
- **Error details**: Error messages are logged but sensitive context is removed
- **No response bodies**: Actual API response data is not logged

### GDPR Compliance
- **Data minimization**: Only essential debugging information is collected
- **User control**: Both logging features require explicit opt-in
- **Local storage**: No automatic transmission to servers
- **Retention limits**: 14-day automatic cleanup policy
- **Right to deletion**: "Clear Logs" button available

## Allowed Attributes for HTTP Logging

Additional safe attributes for HTTP request logging:
- `operation_name` - GraphQL operation name
- `operation_type` - query/mutation/subscription  
- `variables_count` - Number of variables (not values)
- `has_data`/`has_errors` - Boolean flags for response status
- `duration` - Request timing in milliseconds
- `status_code` - HTTP status codes
- `error_name`/`error_message` - Sanitized error information

## Best Practices

### When to Enable HTTP Request Logging
- **Debugging API issues**: Network timeouts, failed requests, authentication problems
- **Performance analysis**: Slow queries, request timing patterns
- **Error investigation**: Systematic API errors or GraphQL issues
- **Development/testing**: Verifying API integration during development

### Privacy Considerations
- **Enable only when needed**: Request logging provides detailed information but should be used sparingly
- **Disable after debugging**: Turn off request logging when investigation is complete
- **Review logs before sharing**: Check that no unexpected sensitive data appears in logs

### Performance Impact
- **Minimal overhead**: Logging is asynchronous and batched
- **Request timing**: Adds negligible latency to API calls
- **Memory usage**: Logs are written to disk, not kept in memory
- **Auto-cleanup**: Old logs are automatically deleted

## Log File Format

HTTP request logs follow the same JSON-Lines format:

```json
{"timestamp":1640995200000,"level":"DEBUG","message":"GraphQL request started","attributes":{"action":"graphql_request_start","operation_name":"GetProcedures","operation_type":"query","variables_count":2,"has_variables":true}}
{"timestamp":1640995245000,"level":"INFO","message":"GraphQL request completed","attributes":{"action":"graphql_request_success","operation_name":"GetProcedures","duration":245,"has_data":true,"has_errors":false,"error_count":0}}
{"timestamp":1640995250000,"level":"ERROR","message":"GraphQL request failed","attributes":{"action":"graphql_request_error","operation_name":"GetUser","duration":5000,"error_name":"NetworkError","error_message":"Network request failed","network_error":true,"status_code":500}}
```

## Troubleshooting

### Request Logging Not Working
1. Ensure basic logging is enabled first
2. Check that HTTP request logging toggle is enabled
3. Verify that API requests are being made (logs appear with a slight delay)
4. Check that the app is making GraphQL/REST requests to the democracy-app.de API

### Too Many/Few Logs
- **Too many**: Request logging captures all API activity - this is normal for active usage
- **Too few**: Ensure the app is connected to the internet and making API calls
- **Missing operations**: Some background requests may not trigger the logging if they use different HTTP clients

### Performance Concerns
- Request logging adds minimal overhead (~1-2ms per request)
- If experiencing issues, disable request logging and keep only basic logging enabled
- Auto-cleanup ensures logs don't consume excessive storage space