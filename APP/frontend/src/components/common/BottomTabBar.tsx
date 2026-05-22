import React, { useEffect, useRef } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Compass, House, MessageCircleMore, UserRound } from 'lucide-react-native';
import { radii, spacing, useTheme, useThemedStyles } from '../../theme';

const tabMeta = {
  FeedTab: { icon: House, screen: 'HomeFeed' },
  ExploreTab: { icon: Compass, screen: 'Explore' },
  MessagesTab: { icon: MessageCircleMore, screen: 'MessagesList' },
  ProfileTab: { icon: UserRound, screen: 'MyProfile' },
} as const;

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, themeMode } = useTheme();
  const styles = useThemedStyles(stylesFactory);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const meta = tabMeta[route.name as keyof typeof tabMeta];
          const Icon = meta.icon;

          return (
            <TabButton
              key={route.key}
              isFocused={isFocused}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={() =>
                navigation.navigate(route.name, {
                  screen: meta.screen,
                })
              }
            >
              <Icon color={isFocused ? (themeMode === 'light' ? '#FFFFFF' : colors.background) : colors.textSecondary} size={20} />
            </TabButton>
          );
        })}
      </View>
    </View>
  );
}

function TabButton({
  children,
  isFocused,
  onPress,
  accessibilityLabel,
}: {
  children: React.ReactNode;
  isFocused: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
}) {
  const scale = useRef(new Animated.Value(isFocused ? 1 : 0.92)).current;
  const styles = useThemedStyles(stylesFactory);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isFocused ? 1 : 0.92,
      friction: 7,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [isFocused, scale]);

  return (
    <Pressable accessibilityLabel={accessibilityLabel} onPress={onPress} style={styles.buttonWrap}>
      <Animated.View style={[styles.item, isFocused && styles.itemActive, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

const stylesFactory = (colors: any, gradients: any, themeMode: string) => StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: themeMode === 'light' ? 'rgba(255,255,255,0.96)' : 'rgba(15,17,23,0.94)',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    padding: spacing.sm,
    shadowColor: colors.shadow,
    shadowOpacity: 0.28,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  buttonWrap: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: radii.lg,
  },
  itemActive: {
    backgroundColor: colors.accent,
  },
});
