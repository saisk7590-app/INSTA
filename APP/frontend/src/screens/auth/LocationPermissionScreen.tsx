import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { MapPinned } from 'lucide-react-native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { colors, radii, spacing, typography } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'LocationPermission'>;

export function LocationPermissionScreen({ navigation }: Props) {
  const { setPermissions } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleContinue = async (ask: boolean) => {
    setLoading(true);
    try {
      let granted = false;
      if (ask) {
        const permission = await Location.requestForegroundPermissionsAsync();
        granted = permission.status === 'granted';
      }
      await setPermissions({ locationGranted: granted || !ask });
      navigation.navigate('NotificationPermission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <HeaderBar title="Location Access" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <View style={styles.hero}>
        <MapPinned size={48} color={colors.accent} />
      </View>
      <Text style={styles.title}>Power your nearby experience</Text>
      <Text style={styles.body}>
        We use location to show live activity, trending spots, and people around you. You stay in control of what is shared.
      </Text>
      <Pressable style={styles.primaryButton} onPress={() => handleContinue(true)} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryText}>Allow Location</Text>}
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => handleContinue(false)} disabled={loading}>
        <Text style={styles.secondaryText}>Not now</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    alignSelf: 'center',
    marginVertical: spacing.xl,
  },
  title: {
    color: colors.text,
    textAlign: 'center',
    ...typography.title,
  },
  body: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    textAlign: 'center',
    ...typography.body,
  },
  primaryButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: radii.pill,
    alignItems: 'center',
  },
  primaryText: {
    color: colors.background,
    ...typography.subheading,
  },
  secondaryButton: {
    marginTop: spacing.md,
    alignItems: 'center',
    paddingVertical: 16,
  },
  secondaryText: {
    color: colors.textSecondary,
    ...typography.body,
  },
});
