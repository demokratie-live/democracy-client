# Local Logging System

This document describes how to use the local logging system implemented with OpenTelemetry.

## Overview

The logging system provides privacy-compliant local log collection that follows GDPR data minimization principles:
- **Disabled by default** - requires manual opt-in via Dev Mode
- **Local storage only** - no automatic server transmission
- **PII redaction** - automatically removes sensitive data
- **Automatic cleanup** - logs are rotated and cleaned up after 14 days
- **iOS backup exclusion** - logs are excluded from iCloud backups

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

### Using the LogService Directly

```typescript
import { getLogService } from '../logging';

const logService = getLogService();

// Check if logging is enabled
if (logService.isEnabled()) {
  logService.log('INFO', 'Custom log message', {
    feature: 'voting',
    count: 42
  });
}

// Start/stop logging programmatically
await logService.start();
await logService.stop();
```

### Example Integration in React Components

```typescript
import React, { useEffect } from 'react';
import { Logger } from '../logging';

export const ProcedureScreen: React.FC = () => {
  useEffect(() => {
    Logger.info('Screen mounted', {
      screen: 'procedure_list',
      timestamp: Date.now()
    });
    
    return () => {
      Logger.debug('Screen unmounted', {
        screen: 'procedure_list'
      });
    };
  }, []);

  const handleVoteSubmit = (vote: string) => {
    Logger.info('Vote submitted', {
      action: 'vote_submit',
      vote_type: vote, // 'yes', 'no', 'abstain'
      method: 'tap'
    });
  };

  // ... rest of component
};
```

## Allowed Attributes

Only these attribute keys are logged (whitelist approach):

- `action` - User actions (button_click, screen_open, etc.)
- `screen` - Screen/component name
- `component` - Component identifier
- `event` - Event type
- `feature` - Feature being used
- `platform` - Platform (ios/android)
- `version` - App version
- `build` - Build number
- `locale` - User locale
- `theme` - Theme setting
- `network_status` - Network connectivity status
- `error_code` - Error codes (numeric)
- `duration` - Time measurements
- `count` - Numeric counts
- `size` - Size measurements
- `type` - Type identifiers
- `status` - Status values
- `method` - Method used
- `url_path` - URL path only (not full URL)
- `user_agent_platform` - Platform from user agent

## PII Redaction

The following patterns are automatically redacted:
- Email addresses → `[REDACTED]`
- Phone numbers → `[REDACTED]`
- Credit card numbers → `[REDACTED]`
- IBAN numbers → `[REDACTED]`
- Bearer tokens → `[REDACTED]`
- API keys → `[REDACTED]`
- Passwords → `[REDACTED]`

## Dev Mode Access

1. Open the app's dev screen (usually accessible via debug menu)
2. Tap "Local Logging" to open the logging interface
3. Toggle logging on/off
4. View recent log entries
5. Share logs or clear all logs

## File Format

Logs are stored in JSON-Lines format (.jsonl):

```json
{"timestamp":1640995200000,"level":"INFO","message":"User logged in","attributes":{"action":"login","screen":"auth"},"traceId":"abc123","spanId":"def456"}
{"timestamp":1640995260000,"level":"ERROR","message":"Network request failed","attributes":{"error_code":500,"retry_count":3}}
```

## Configuration

The logging system uses these default settings:
- **Max file size**: 2MB (then rotates to new file)
- **Max files**: 10 files
- **Retention**: 14 days
- **Log directory**: `[App Documents]/Logs/` (iOS: Library/Logs)
- **Export batch size**: 100 entries
- **Export interval**: 1 second

## Privacy Compliance

- ✅ **Data minimization**: Only whitelisted attributes are logged
- ✅ **Consent**: Requires explicit opt-in (disabled by default)
- ✅ **Local storage**: No automatic data transmission
- ✅ **Right to deletion**: Clear logs button available
- ✅ **Data security**: iOS backup exclusion, app sandbox isolation
- ✅ **Transparency**: Clear UI indicating when logging is active

## Best Practices

1. **Use structured attributes** instead of putting data in messages:
   ```typescript
   // Good
   Logger.info('Vote submitted', { vote_type: 'yes', method: 'tap' });
   
   // Bad
   Logger.info('User voted yes using tap');
   ```

2. **Use appropriate log levels**:
   - `error` - For actual errors that need attention
   - `warn` - For warnings or retry situations  
   - `info` - For important user actions and flow events
   - `debug` - For detailed debugging information

3. **Avoid logging sensitive data**:
   ```typescript
   // Good
   Logger.info('Authentication successful', { method: 'phone' });
   
   // Bad - phone number will be redacted anyway
   Logger.info('User +1-555-123-4567 authenticated');
   ```

4. **Check if logging is enabled** for expensive operations:
   ```typescript
   const logService = getLogService();
   if (logService.isEnabled()) {
     const expensiveData = calculateComplexMetrics();
     Logger.debug('Complex metrics', { metrics: expensiveData });
   }
   ```