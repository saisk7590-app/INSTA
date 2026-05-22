import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { NotificationItem } from '../../components/feed';
import { getNotifications, NotificationGroup } from '../../services/notificationService';
import { colors, spacing, typography } from '../../theme';
import { FeedStackParamList } from '../../types/navigation';
import { useAuth } from '../../hooks/useAuth';

type Props = NativeStackScreenProps<FeedStackParamList, 'Notifications'>;

export function NotificationsScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [groups, setGroups] = useState<NotificationGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotifications = async () => {
    if (!user?.id) return;
    const data = await getNotifications(user.id);
    setGroups(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadNotifications();
  }, [user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    loadNotifications();
  };

  return (
    <ScreenContainer
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />}
    >
      <HeaderBar
        title="Notifications"
        leftAction="back"
        onLeftPress={() => navigation.goBack()}
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: 40 }} />
      ) : groups.length === 0 ? (
        <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 40 }}>
          No notifications yet.
        </Text>
      ) : (
        groups.map((group) => (
          <View key={group.title} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            {group.items.map((item) => (
              <NotificationItem key={item.id} item={item} />
            ))}
          </View>
        ))
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: spacing.lg,
  },
  groupTitle: {
    color: colors.text,
    marginBottom: spacing.md,
    ...typography.heading,
  },
});
