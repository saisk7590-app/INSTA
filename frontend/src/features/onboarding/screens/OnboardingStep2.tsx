import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Circle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, theme, typography } from '../../../theme';

export function OnboardingStep2({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.visualContainer}>
          <View style={[styles.circle, styles.circleLarge]} />
          <View style={[styles.circle, styles.circleMedium]} />
          <View style={styles.centerPoint}>
            <MapPin size={32} color="white" fill="white" />
          </View>
          
          <Circle size={16} color="#EC4899" fill="#EC4899" style={[styles.dot, { top: 48, left: 80 }]} />
          <Circle size={16} color="#FB923C" fill="#FB923C" style={[styles.dot, { top: 80, right: 64 }]} />
          <Circle size={16} color={colors.primary} fill={colors.primary} style={[styles.dot, { bottom: 64, left: 64 }]} />
          <Circle size={16} color="#EC4899" fill="#EC4899" style={[styles.dot, { bottom: 80, right: 80 }]} />
        </View>
        
        <Text style={styles.title}>Posts from Nearby</Text>
        <Text style={styles.subtitle}>
          See content only from people and places within 500 meters of your location.
        </Text>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          <View style={styles.indicator} />
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
        </View>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding3')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'flex-end',
    padding: spacing.xxl,
  },
  skipText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  visualContainer: {
    width: 256,
    height: 256,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  circle: {
    position: 'absolute',
    borderWidth: 4,
    borderRadius: 200,
  },
  circleLarge: {
    width: 192,
    height: 192,
    borderColor: colors.primaryLight,
  },
  circleMedium: {
    width: 128,
    height: 128,
    borderColor: '#E9D5FF',
  },
  centerPoint: {
    width: 64,
    height: 64,
    backgroundColor: colors.primary,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.text,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 28,
  },
  footer: {
    padding: spacing.xxxl,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: spacing.xxl,
  },
  indicator: {
    width: 8,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
  },
  activeIndicator: {
    width: 32,
    backgroundColor: colors.primary,
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: theme.border.radius.xl,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
