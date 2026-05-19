import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme';

type UserAvatarProps = {
  uri: string;
  size?: number;
  ringColors?: string[];
};

export function UserAvatar({
  uri,
  size = 48,
  ringColors = ['#7C5CFF', '#31D0AA'],
}: UserAvatarProps) {
  return (
    <LinearGradient
      colors={ringColors as [string, string]}
      style={[styles.ring, { width: size + 6, height: size + 6, borderRadius: (size + 6) / 2 }]}
    >
      <View style={[styles.inner, { borderRadius: size / 2 }]}>
        <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    padding: 2,
    backgroundColor: colors.background,
  },
});
