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
import { getLogService, LogEntry } from '../logging';

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

interface Props {
  onBack?: () => void;
}

export const DevLogsScreen: React.FC<Props> = ({ onBack }) => {
  const [enabled, setEnabled] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
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
    setEnabled(logService.isEnabled());
    if (logService.isEnabled()) {
      loadLogs();
    }
  }, [logService, loadLogs]);

  // Set up polling for logs when enabled
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (enabled) {
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
  }, [enabled, loadLogs]);

  const toggleLogging = useCallback(async () => {
    if (enabled) {
      setLoading(true);
      try {
        await logService.stop();
        setEnabled(false);
        setLogs([]);
      } catch (_error) {
        Alert.alert('Error', 'Failed to stop logging');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        await logService.start();
        setEnabled(true);
      } catch (_error) {
        Alert.alert('Error', 'Failed to start logging');
      } finally {
        setLoading(false);
      }
    }
  }, [enabled, logService]);

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

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 16, textAlign: 'center' }}>
            {enabled ? 'Stopping logging...' : 'Starting logging...'}
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
            value={enabled}
            onValueChange={toggleLogging}
            disabled={loading}
          />
        </ToggleRow>

        <Description>
          When enabled, app events are logged to local files on your device. 
          No data is sent to servers automatically. You can view, share, or delete 
          logs manually. Logs are automatically cleaned up after 14 days.
        </Description>

        {enabled && (
          <ButtonRow>
            <ActionButton onPress={handleShare}>
              <ButtonText>Share Logs</ButtonText>
            </ActionButton>
            <ActionButton variant="danger" onPress={handleClear}>
              <ButtonText>Clear Logs</ButtonText>
            </ActionButton>
          </ButtonRow>
        )}
      </Header>

      {enabled && (
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
};