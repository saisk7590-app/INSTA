import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';
import { ToggleSetting } from '../../types/social';

type Props = {
  item: ToggleSetting;
  onValueChange?: (value: boolean) => void;
};

export function SettingsToggleRow({ item, onValueChange }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.textWrap}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
      <Switch
        value={item.enabled}
        onValueChange={onValueChange}
        thumbColor={item.enabled ? colors.accent : colors.white}
        trackColor={{ false: colors.surfaceMuted, true: 'rgba(49,208,170,0.35)' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  textWrap: {
    flex: 1,
    paddingRight: spacing.md,
  },
  label: {
    color: colors.text,
    ...typography.subheading,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
    ...typography.caption,
  },
});
