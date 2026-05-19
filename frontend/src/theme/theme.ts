import { DarkTheme, Theme } from '@react-navigation/native';

export const colors = {
  background: '#06070A',
  backgroundElevated: '#0F1117',
  surface: '#141824',
  surfaceAlt: '#1A1F2E',
  surfaceMuted: '#202638',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
  text: '#F5F7FB',
  textSecondary: '#A4ADC0',
  textMuted: '#6B7386',
  primary: '#7C5CFF',
  primarySoft: '#9C8BFF',
  accent: '#31D0AA',
  danger: '#FF6B8A',
  warning: '#FFB84D',
  overlay: 'rgba(5, 7, 10, 0.78)',
  white: '#FFFFFF',
  shadow: '#000000',
};

export const gradients = {
  screen: ['#0B0E15', '#050608'] as const,
  card: ['rgba(124,92,255,0.18)', 'rgba(49,208,170,0.08)'] as const,
  accent: ['#7C5CFF', '#31D0AA'] as const,
  highlight: ['#FF6B8A', '#7C5CFF'] as const,
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const radii = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  pill: 999,
};

export const typography = {
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700' as const,
  },
  heading: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
  },
  subheading: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500' as const,
  },
};

export const shadows = {
  card: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.26,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
};

export const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.backgroundElevated,
    text: colors.text,
    border: colors.border,
    notification: colors.danger,
  },
};
