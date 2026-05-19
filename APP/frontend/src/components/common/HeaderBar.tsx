import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Bell, ChevronLeft, Plus, Settings2 } from 'lucide-react-native';
import { colors, spacing, typography } from '../../theme';

type HeaderBarProps = {
  title: string;
  leftAction?: 'back' | 'create';
  rightAction?: 'notifications' | 'settings';
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

export function HeaderBar({
  title,
  leftAction,
  rightAction,
  onLeftPress,
  onRightPress,
}: HeaderBarProps) {
  const renderIcon = (action?: 'back' | 'create' | 'notifications' | 'settings') => {
    switch (action) {
      case 'back':
        return <ChevronLeft color={colors.text} size={22} />;
      case 'create':
        return <Plus color={colors.text} size={22} />;
      case 'notifications':
        return <Bell color={colors.text} size={20} />;
      case 'settings':
        return <Settings2 color={colors.text} size={20} />;
      default:
        return <View style={styles.placeholder} />;
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onLeftPress} style={styles.action}>
        {renderIcon(leftAction)}
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={onRightPress} style={styles.action}>
        {renderIcon(rightAction)}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  action: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeholder: {
    width: 20,
    height: 20,
  },
  title: {
    color: colors.text,
    ...typography.heading,
  },
});
