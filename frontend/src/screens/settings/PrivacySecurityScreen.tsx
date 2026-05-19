import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { PrivacyOptionCard } from '../../components/settings';
import { privacyOptions } from '../../services/profile';
import { colors, spacing, typography } from '../../theme';
import { SettingsStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<SettingsStackParamList, 'PrivacySecurity'>;

export function PrivacySecurityScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <HeaderBar title="Privacy & Security" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <Text style={styles.helper}>Control how visible you are and how securely your account behaves.</Text>
      {privacyOptions.map((option) => (
        <PrivacyOptionCard key={option.id} option={option} />
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
