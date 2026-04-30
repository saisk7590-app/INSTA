import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing } from '../../../theme';

type NearbyActivity = {
  id: string;
  avatar: string;
  name: string;
  action: string;
  distance: string;
  previewImage?: string;
};

const nearbyActivities: NearbyActivity[] = [
  {
    id: 'activity-1',
    avatar: 'https://i.pravatar.cc/120?img=12',
    name: 'Raj',
    action: 'liked your post',
    distance: '0.8 km away',
    previewImage:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'activity-2',
    avatar: 'https://i.pravatar.cc/120?img=21',
    name: 'Anita',
    action: 'commented: "Nice place!"',
    distance: '1.2 km away',
    previewImage:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'activity-3',
    avatar: 'https://i.pravatar.cc/120?img=33',
    name: 'Local Buzz',
    action: '12 people viewed your post',
    distance: '2.0 km away',
  },
  {
    id: 'activity-4',
    avatar: 'https://i.pravatar.cc/120?img=45',
    name: 'Meera',
    action: 'shared your update with nearby foodies',
    distance: '1.5 km away',
    previewImage:
      'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=300&q=80',
  },
];

const renderActivity: ListRenderItem<NearbyActivity> = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContent}>
        <Text style={styles.activityText}>
          <Text style={styles.name}>{item.name}</Text> {item.action}
        </Text>
        <Text style={styles.distance}>{item.distance}</Text>
      </View>
      {item.previewImage ? (
        <Image source={{ uri: item.previewImage }} style={styles.previewImage} />
      ) : null}
    </View>
  </View>
);

export function NearbyTab() {
  return (
    <FlatList
      data={nearbyActivities}
      renderItem={renderActivity}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: 14,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing.md,
  },
  textContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  activityText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    color: colors.text,
  },
  name: {
    fontWeight: '700',
    color: colors.text,
  },
  distance: {
    marginTop: spacing.xs,
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  previewImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
});
