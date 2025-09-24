import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Switch,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { useLoggingStore } from '../../api/state/logging';
import { getLogService, LogEntry } from '../../logging';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Header = styled.View`
  margin-bottom: 20px;
`;

const ToggleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ToggleText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Description = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 16px;
  line-height: 20px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
`;

const ActionButton = styled.TouchableOpacity<{ variant?: 'danger' }>`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme, variant }) => 
    variant === 'danger' ? theme.colors.text.danger || '#dc3545' : theme.colors.primary || '#007bff'};
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const LogsHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const LogsTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const LogCount = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const LogItem = styled.TouchableOpacity`
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.background.secondary};
`;

const LogLevel = styled.Text<{ level: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ level }) => {
    switch (level.toUpperCase()) {
      case 'ERROR': return '#dc3545';
      case 'WARN': return '#fd7e14';
      case 'INFO': return '#0dcaf0';
      case 'DEBUG': return '#6c757d';
      default: return '#6c757d';
    }
  }};
`;

const LogTimestamp = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const LogMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: 4px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export default function LocalLogsScreen() {
  const { 
    isEnabled, 
    isRequestLoggingEnabled,
    isLoading, 
    setEnabled, 
    setRequestLoggingEnabled,
    loadInitialState 
  } = useLoggingStore();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const logService = getLogService();

  const loadLogs = useCallback(async () => {
    try {
      const logEntries = await logService.getLogs();
      setLogs(logEntries);
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  }, [logService]);

  // Load initial state
  useEffect(() => {
    loadInitialState();
  }, [loadInitialState]);

  // Set up polling for logs when enabled
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isEnabled) {
      loadLogs();
      interval = setInterval(loadLogs, 2000); // Refresh every 2 seconds
    } else {
      setLogs([]);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isEnabled, loadLogs]);

  const toggleLogging = useCallback(async () => {
    if (isEnabled) {
      try {
        await logService.stop();
        await setEnabled(false);
        setLogs([]);
      } catch (_error) {
        Alert.alert('Error', 'Failed to stop logging');
      }
    } else {
      try {
        await logService.start();
        await setEnabled(true);
        
        // Test basic logging immediately
        setTimeout(() => {
          const { Logger } = require('../../logging');
          Logger.info('Logging system test', {
            action: 'test_logging',
            screen: 'dev_logs',
            timestamp: Date.now()
          });
          Logger.debug('Debug test message', {
            action: 'test_debug',
            feature: 'logging'
          });
        }, 1000);
      } catch (_error) {
        Alert.alert('Error', 'Failed to start logging');
      }
    }
  }, [isEnabled, logService, setEnabled]);

  const toggleRequestLogging = useCallback(async () => {
    await setRequestLoggingEnabled(!isRequestLoggingEnabled);
    
    // Test request logging if being enabled
    if (!isRequestLoggingEnabled) {
      setTimeout(() => {
        const { Logger } = require('../../logging');
        Logger.info('Request logging enabled', {
          action: 'request_logging_enabled',
          screen: 'dev_logs'
        });
      }, 500);
    }
  }, [isRequestLoggingEnabled, setRequestLoggingEnabled]);

  const handleTestLogging = useCallback(() => {
    const { Logger } = require('../../logging');
    Logger.info('Manual test log entry', {
      action: 'manual_test',
      screen: 'dev_logs',
      timestamp: Date.now(),
      test_id: Math.random().toString(36).substr(2, 9)
    });
    
    Logger.warn('Test warning message', {
      action: 'test_warning',
      feature: 'manual_test'
    });
    
    Logger.error('Test error message', {
      action: 'test_error',
      error_code: 999,
      feature: 'manual_test'
    });
    
    // Trigger a reload after a short delay
    setTimeout(loadLogs, 1500);
  }, [loadLogs]);

  const handleShare = useCallback(async () => {
    try {
      await logService.shareLogFile();
    } catch (_error) {
      Alert.alert(
        'Share Failed',
        'No log files available to share or sharing failed.'
      );
    }
  }, [logService]);

  const handleClear = useCallback(() => {
    Alert.alert(
      'Clear Logs',
      'Are you sure you want to delete all log files? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await logService.clearLogs();
              setLogs([]);
              Alert.alert('Success', 'All logs have been cleared.');
            } catch (_error) {
              Alert.alert('Error', 'Failed to clear logs.');
            }
          },
        },
      ]
    );
  }, [logService]);

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const renderLogItem = ({ item }: { item: LogEntry }) => (
    <LogItem
      onPress={() => {
        Alert.alert(
          'Log Details',
          `Time: ${new Date(item.timestamp).toLocaleString()}\n` +
          `Level: ${item.level}\n` +
          `Message: ${item.message}\n` +
          `Attributes: ${JSON.stringify(item.attributes, null, 2)}`,
          [{ text: 'OK' }]
        );
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <LogLevel level={item.level}>{item.level}</LogLevel>
        <LogTimestamp>{formatTimestamp(item.timestamp)}</LogTimestamp>
      </View>
      <LogMessage numberOfLines={2}>{item.message}</LogMessage>
    </LogItem>
  );

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 16, textAlign: 'center' }}>
            {isEnabled ? 'Stopping logging...' : 'Starting logging...'}
          </Text>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <ToggleRow>
          <View style={{ flex: 1 }}>
            <ToggleText>Local Logging</ToggleText>
            <Description style={{ marginBottom: 0 }}>
              Collect app logs locally on this device
            </Description>
          </View>
          <Switch
            value={isEnabled}
            onValueChange={toggleLogging}
            disabled={isLoading}
          />
        </ToggleRow>

        {isEnabled && (
          <ToggleRow>
            <View style={{ flex: 1 }}>
              <ToggleText>HTTP Request Logging</ToggleText>
              <Description style={{ marginBottom: 0 }}>
                Log all GraphQL and REST API requests
              </Description>
            </View>
            <Switch
              value={isRequestLoggingEnabled}
              onValueChange={toggleRequestLogging}
              disabled={isLoading}
            />
          </ToggleRow>
        )}

        <Description>
          When enabled, app events are logged to local files on your device. 
          {isRequestLoggingEnabled && isEnabled && '\n\nHTTP request logging includes API calls, response times, and error details (sensitive data is automatically redacted).'}
          {' '}No data is sent to servers automatically. You can view, share, or delete 
          logs manually. Logs are automatically cleaned up after 14 days.
        </Description>

        {isEnabled && (
          <ButtonRow>
            <ActionButton onPress={handleShare}>
              <ButtonText>Share Logs</ButtonText>
            </ActionButton>
            <ActionButton variant="danger" onPress={handleClear}>
              <ButtonText>Clear Logs</ButtonText>
            </ActionButton>
          </ButtonRow>
        )}

        {isEnabled && (
          <ButtonRow>
            <ActionButton onPress={handleTestLogging}>
              <ButtonText>Test Logging</ButtonText>
            </ActionButton>
          </ButtonRow>
        )}
      </Header>

      {isEnabled && (
        <>
          <LogsHeader>
            <LogsTitle>Recent Logs</LogsTitle>
            <LogCount>{logs.length} entries</LogCount>
          </LogsHeader>

          {logs.length === 0 ? (
            <EmptyState>
              <EmptyText>
                No logs yet.{'\n'}
                Use the app to generate log entries.
              </EmptyText>
            </EmptyState>
          ) : (
            <FlatList
              data={logs}
              renderItem={renderLogItem}
              keyExtractor={(item, index) => `${item.timestamp}-${index}`}
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await loadLogs();
                setRefreshing(false);
              }}
              showsVerticalScrollIndicator={true}
              style={{ flex: 1 }}
            />
          )}
        </>
      )}
    </Container>
  );
}