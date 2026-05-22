import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight } from 'lucide-react-native';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { settingsSections } from '../../services/profile';
import { radii, spacing, typography, useTheme, useThemedStyles } from '../../theme';
import { SettingsStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<SettingsStackParamList, 'SettingsHome'>;

export function SettingsScreen({ navigation }: Props) {
  const { logout } = useAuth();
  const { themeMode, setThemeMode, colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  const [signingOut, setSigningOut] = React.useState(false);

  const sectionsToRender = React.useMemo(() => {
    return settingsSections.map((section) => {
      return section;
    });
  }, [themeMode]);

  const handleRowPress = async (id: string) => {
    if (id === 'notifications') navigation.navigate('NotificationSettings');
    if (id === 'privacy') navigation.navigate('PrivacySecurity');
    if (id === 'saved') navigation.getParent()?.navigate('SavedPosts');
    if (id === 'logout') {
      setSigningOut(true);
      try {
        await logout();
      } finally {
        setSigningOut(false);
      }
    }
  };

  return (
    <ScreenContainer>
      <HeaderBar title="Settings" leftAction="back" onLeftPress={() => navigation.goBack()} />

      {sectionsToRender.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.card}>
            {section.title === 'Preferences' ? (
              <View style={styles.row}>
                <View style={styles.rowText}>
                  <Text style={styles.label}>Theme</Text>
                  <Text style={styles.subtitle}>{themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'}</Text>
                </View>
                <Switch
                  value={themeMode === 'dark'}
                  onValueChange={(value) => void setThemeMode(value ? 'dark' : 'light')}
                  thumbColor={themeMode === 'dark' ? colors.accent : colors.white}
                  trackColor={{ false: colors.surfaceMuted, true: 'rgba(49,208,170,0.35)' }}
                />
              </View>
            ) : null}
            {section.items.map((item) => (
              <Pressable
                key={item.id}
                style={styles.row}
                onPress={() => void handleRowPress(item.id)}
                disabled={signingOut && item.id === 'logout'}
              >
                <View style={styles.rowText}>
                  <Text style={[styles.label, item.id === 'logout' && styles.logoutLabel]}>{item.label}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
                {signingOut && item.id === 'logout' ? (
                  <ActivityIndicator color={colors.danger} />
                ) : (
                  <ChevronRight size={18} color={colors.textMuted} />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </ScreenContainer>
  );
}

const stylesFactory = (colors: any) => StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.md,
    ...typography.heading,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowText: {
    flex: 1,
    paddingRight: spacing.md,
  },
  label: {
    color: colors.text,
    ...typography.subheading,
  },
  logoutLabel: {
    color: colors.danger,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
    ...typography.caption,
  },
});
