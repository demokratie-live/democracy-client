# UI Screenshots and Flow

Since this is a React Native app and we can't run it in the current environment, here are mockups showing the key UI screens and functionality:

## Dev Screen - Main Entry Point

```
┌─────────────────────────────────────┐
│ Development Tools                   │
├─────────────────────────────────────┤
│                                     │
│ [Local Logging]                     │ ← NEW: Opens logging interface
│                                     │
│ [Delete auth]                       │
│                                     │
│ [Delete local votes]                │
│                                     │
│ [Delete all AsyncStorage data]      │
│                                     │
│ Token:                              │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6...     │
│                                     │
│ APN Token:                          │
│ a1b2c3d4e5f6g7h8i9j0...             │
│                                     │
└─────────────────────────────────────┘
```

## Logging Screen - Disabled State

```
┌─────────────────────────────────────┐
│ ← Local Logging                     │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Local Logging            [ OFF ] │ │ ← Toggle switch (OFF)
│ │ Collect app logs locally on     │ │
│ │ this device                     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ When enabled, app events are logged │
│ to local files on your device. No   │
│ data is sent to servers automati-   │
│ cally. You can view, share, or      │
│ delete logs manually. Logs are      │
│ automatically cleaned up after 14   │
│ days.                               │
│                                     │
│                                     │
│         No logging active          │
│      Use toggle above to start     │
│                                     │
└─────────────────────────────────────┘
```

## Logging Screen - Enabled State

```
┌─────────────────────────────────────┐
│ ← Local Logging                     │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Local Logging             [ ON ] │ │ ← Toggle switch (ON)
│ │ Collect app logs locally on     │ │
│ │ this device                     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ When enabled, app events are logged │
│ to local files...                   │
│                                     │
│ [ Share Logs ]  [ Clear Logs ]      │ ← Action buttons
│                                     │
│ Recent Logs                142 ents │ ← Header with count
│ ┌─────────────────────────────────┐ │
│ │ INFO • 14:32:15                 │ │
│ │ Procedure shared                │ │
│ ├─────────────────────────────────┤ │
│ │ ERROR • 14:31:42               │ │ ← Error in red
│ │ Network request failed          │ │
│ ├─────────────────────────────────┤ │
│ │ INFO • 14:31:20                │ │
│ │ Button clicked                  │ │
│ ├─────────────────────────────────┤ │
│ │ DEBUG • 14:31:18               │ │ ← Debug in gray
│ │ API request completed           │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

## Log Detail Modal (on tap)

```
┌─────────────────────────────────────┐
│ Log Details                         │
├─────────────────────────────────────┤
│                                     │
│ Time: Jan 21, 2025, 2:32:15 PM     │
│                                     │
│ Level: INFO                         │
│                                     │
│ Message: Procedure shared           │
│                                     │
│ Attributes:                         │
│ {                                   │
│   "action": "share_procedure",      │
│   "type": "antrag",                 │
│   "platform": "ios",               │
│   "method": "native_share"          │
│ }                                   │
│                                     │
│                                     │
│                                     │
│                    [ OK ]           │
│                                     │
└─────────────────────────────────────┘
```

## Share Sheet (iOS)

```
┌─────────────────────────────────────┐
│             Share Logs              │
├─────────────────────────────────────┤
│                                     │
│ 📧 Mail     💬 Messages  📱 AirDrop │
│                                     │
│ 💾 Save to  📋 Copy      📤 More   │
│    Files                            │
│                                     │
│ Democracy App Logs                  │
│ app-logs-2025-01-21.jsonl          │
│                                     │
│                                     │
│              [ Cancel ]             │
│                                     │
└─────────────────────────────────────┘
```

## Key Features Demonstrated:

1. **Privacy by Design**: Disabled by default, explicit opt-in required
2. **Real-time Updates**: Log list refreshes every 2 seconds when enabled
3. **Rich Log Details**: Tap any log entry to see full details including attributes
4. **Native Sharing**: Uses platform share sheet for easy log export
5. **Clear Visual Hierarchy**: Different colors for log levels (ERROR=red, INFO=blue, DEBUG=gray)
6. **User-Friendly**: Clear explanations of what logging does and privacy implications

## Log File Format Example:

```json
{"timestamp":1758439346995,"level":"INFO","message":"Screen opened","attributes":{"screen":"procedure_list","action":"navigate","platform":"ios"}}
{"timestamp":1758439346996,"level":"INFO","message":"Button clicked","attributes":{"action":"button_click","component":"vote_button","vote_type":"yes","screen":"procedure_detail"}}
{"timestamp":1758439346997,"level":"ERROR","message":"Network request failed","attributes":{"action":"api_error","error_code":500,"retry_count":2,"feature":"voting"}}
```

Each line is a valid JSON object with:
- `timestamp`: Unix timestamp in milliseconds
- `level`: Log level (DEBUG, INFO, WARN, ERROR)  
- `message`: Human-readable message (PII redacted)
- `attributes`: Structured data (only whitelisted keys)
- `traceId`/`spanId`: Optional OpenTelemetry trace correlation