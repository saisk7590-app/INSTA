import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SendHorizontal, SmilePlus } from 'lucide-react-native';
import { radii, spacing, typography, useTheme, useThemedStyles } from '../../theme';

type Props = {
  placeholder?: string;
  onSubmit?: (text: string) => void;
};

export function CommentInput({ placeholder = 'Add a comment...', onSubmit }: Props) {
  const [value, setValue] = useState('');
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);

  const handleSend = () => {
    if (value.trim() && onSubmit) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <View style={styles.wrap}>
      <Pressable style={styles.iconButton}>
        <SmilePlus size={18} color={colors.textSecondary} />
      </Pressable>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />
      <Pressable 
        onPress={handleSend}
        style={[styles.sendButton, !value.trim() && styles.sendButtonDisabled]} 
        disabled={!value.trim()}
      >
        <SendHorizontal size={16} color={colors.background} />
      </Pressable>
    </View>
  );
}

const stylesFactory = (colors: any, gradients: any, themeMode: string) => StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: themeMode === 'light' ? 'rgba(255,255,255,0.98)' : 'rgba(15,17,23,0.98)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    ...typography.body,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  sendButtonDisabled: {
    opacity: 0.45,
  },
});
