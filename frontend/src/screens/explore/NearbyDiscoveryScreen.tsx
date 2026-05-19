import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MapPin } from 'lucide-react-native';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { NearbyCard } from '../../components/explore';
import { nearbyBusinesses, nearbyEvents, nearbyTrending } from '../../services/location';
import { colors, radii, spacing, typography } from '../../theme';
import { ExploreStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<ExploreStackParamList, 'NearbyDiscovery'>;

const radiusOptions = ['500 m', '2 km', '5 km'];

export function NearbyDiscoveryScreen({ navigation }: Props) {
  const [radius, setRadius] = useState('2 km');

  return (
    <ScreenContainer>
      <HeaderBar
        title="Nearby"
        leftAction="back"
        onLeftPress={() => navigation.goBack()}
      />

      <Text style={styles.subtitle}>Live discovery tuned to your current neighborhood.</Text>

      <View style={styles.radiusRow}>
        {radiusOptions.map((option) => {
          const active = option === radius;

          return (
            <Pressable
              key={option}
              onPress={() => setRadius(option)}
              style={[styles.radiusChip, active && styles.radiusChipActive]}
            >
              <Text style={[styles.radiusText, active && styles.radiusTextActive]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.mapCard}>
        <MapPin size={22} color={colors.accent} />
        <View>
          <Text style={styles.mapTitle}>Map preview</Text>
          <Text style={styles.mapMeta}>82 active signals around Jubilee Hills</Text>
        </View>
      </View>

      <Section label="Trending local activity" data={nearbyTrending} />
      <Section label="Nearby events" data={nearbyEvents} />
      <Section label="Nearby businesses" data={nearbyBusinesses} />
    </ScreenContainer>
  );
}

function Section({ label, data }: { label: string; data: typeof nearbyTrending }) {
  return (
    <>
      <Text style={styles.sectionTitle}>{label}</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NearbyCard item={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    ...typography.body,
  },
  radiusRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  radiusChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
  },
  radiusChipActive: {
    backgroundColor: colors.primary,
  },
  radiusText: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  radiusTextActive: {
    color: colors.white,
  },
  mapCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  mapTitle: {
    color: colors.text,
    ...typography.subheading,
  },
  mapMeta: {
    color: colors.textSecondary,
    marginTop: 4,
    ...typography.caption,
  },
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.md,
    ...typography.heading,
  },
  list: {
    paddingBottom: spacing.lg,
  },
});
