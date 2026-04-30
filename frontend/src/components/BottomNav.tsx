import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Search, MessageCircle, User } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

type BottomNavTab = 'HomeFeed' | 'Search' | 'Messages' | 'Profile';

type BottomNavProps<RouteName extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, RouteName>;
  activeTab: BottomNavTab;
};

export function BottomNav<RouteName extends keyof RootStackParamList>({
  navigation,
  activeTab,
}: BottomNavProps<RouteName>) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeFeed')}
        style={styles.navItem}
        activeOpacity={0.85}
      >
        <Home
          size={24}
          color={activeTab === 'HomeFeed' ? colors.primary : colors.textSecondary}
          strokeWidth={activeTab === 'HomeFeed' ? 2.5 : 2}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        style={styles.navItem}
        activeOpacity={0.85}
      >
        <Search
          size={24}
          color={activeTab === 'Search' ? colors.primary : colors.textSecondary}
          strokeWidth={activeTab === 'Search' ? 2.5 : 2}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Messages')}
        style={styles.navItem}
        activeOpacity={0.85}
      >
        <MessageCircle
          size={24}
          color={activeTab === 'Messages' ? colors.primary : colors.textSecondary}
          strokeWidth={activeTab === 'Messages' ? 2.5 : 2}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.navItem}
        activeOpacity={0.85}
      >
        <User
          size={24}
          color={activeTab === 'Profile' ? colors.primary : colors.textSecondary}
          strokeWidth={activeTab === 'Profile' ? 2.5 : 2}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navItem: {
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
