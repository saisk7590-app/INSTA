import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { SettingsToggleRow } from '../../components/settings';
import { notificationSettingsData } from '../../services/profile';
import { colors, spacing, typography } from '../../theme';
import { SettingsStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<SettingsStackParamList, 'NotificationSettings'>;

export function NotificationSettingsScreen({ navigation }: Props) {
  const [settings, setSettings] = useState(notificationSettingsData);

  return (
    <ScreenContainer>
      <HeaderBar title="Notification Settings" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <Text style={styles.helper}>Fine-tune alerts to keep nearby discovery useful, not noisy.</Text>
      {settings.map((item) => (
        <SettingsToggleRow
          key={item.id}
          item={item}
          onValueChange={(value) =>
            setSettings((current) =>
              current.map((entry) => (entry.id === item.id ? { ...entry, enabled: value } : entry))
            )
          }
        />
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  helper: {
    marginBottom: spacing.md,
    color: colors.textSecondary,
    ...typography.body,
  },
});
