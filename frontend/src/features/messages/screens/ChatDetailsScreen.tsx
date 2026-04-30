import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  BellOff,
  CircleAlert,
  ShieldBan,
  ChevronRight,
} from 'lucide-react-native';
import { RootStackParamList } from '../../../navigation/types';
import { colors, spacing, theme, typography } from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatDetails'>;

const actionItems = [
  { id: 'mute', label: 'Mute notifications', icon: BellOff, type: 'normal' },
  { id: 'block', label: 'Block user', icon: ShieldBan, type: 'danger' },
  { id: 'report', label: 'Report user', icon: CircleAlert, type: 'danger' },
] as const;

export function ChatDetailsScreen({ navigation, route }: Props) {
  const conversation = route.params?.conversation;
  const [isMuted, setIsMuted] = useState(false);

  if (!conversation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={22} color={colors.text} />
          </Pressable>

          <Text style={styles.headerTitle}>Chat Details</Text>

          <View style={{ width: 40 }} />
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Conversation unavailable</Text>
          <Text style={styles.emptySubtitle}>
            Reopen this chat from the messages list.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔙 HEADER */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color={colors.text} />
        </Pressable>

        <Text style={styles.headerTitle}>Chat Details</Text>

        <View style={{ width: 40 }} />
      </View>

      {/* 👤 PROFILE CARD */}
      <View style={styles.profileCard}>
        <Image source={{ uri: conversation.avatar }} style={styles.avatar} />

        <Text style={styles.name}>{conversation.name}</Text>

        <Text style={styles.status}>🟢 Active nearby</Text>

        <Text style={styles.meta}>{conversation.distance} away</Text>
        <Text style={styles.meta}>{conversation.area}</Text>
      </View>

      {/* ⚙️ ACTION LIST */}
      <View style={styles.listCard}>
        {actionItems.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === actionItems.length - 1;
          const isDanger = item.type === 'danger';

          return (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.row,
                !isLast && styles.rowBorder,
                pressed && { backgroundColor: colors.surface },
              ]}
            >
              {/* LEFT */}
              <View style={styles.rowLeft}>
                <View style={styles.iconWrap}>
                  <Icon
                    size={18}
                    color={isDanger ? colors.error : colors.text}
                  />
                </View>

                <Text
                  style={[
                    styles.rowLabel,
                    isDanger && { color: colors.error },
                  ]}
                >
                  {item.label}
                </Text>
              </View>

              {/* RIGHT */}
              {item.id === 'mute' ? (
                <Switch
                  value={isMuted}
                  onValueChange={setIsMuted}
                  trackColor={{
                    false: colors.border,
                    true: colors.primary,
                  }}
                  thumbColor={colors.white}
                />
              ) : (
                <ChevronRight
                  size={18}
                  color={colors.textSecondary}
                />
              )}
            </Pressable>
          );
        })}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.text,
  },

  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: theme.border.radius.lg,
    padding: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.md,
  },

  name: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },

  status: {
    fontSize: typography.sizes.sm,
    color: colors.success,
    marginBottom: spacing.xs,
  },

  meta: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },

  listCard: {
    backgroundColor: colors.white,
    borderRadius: theme.border.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },

  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  rowLabel: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  emptySubtitle: {
    marginTop: spacing.sm,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
