import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { NotificationItem } from '../../components/feed';
import { notificationGroups } from '../../services/feed';
import { colors, spacing, typography } from '../../theme';
import { FeedStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<FeedStackParamList, 'Notifications'>;

export function NotificationsScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <HeaderBar
        title="Notifications"
        leftAction="back"
        onLeftPress={() => navigation.goBack()}
      />

      {notificationGroups.map((group) => (
        <View key={group.title} style={styles.group}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          {group.items.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </View>
      ))}
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
