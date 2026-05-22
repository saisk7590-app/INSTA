import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { lightColors, darkColors, ThemeColors } from './colors';

export type ThemeMode = 'light' | 'dark';

export const lightGradients = {
  screen: ['#F5F7FB', '#E2E8F0'] as const,
  card: ['rgba(124,92,255,0.08)', 'rgba(49,208,170,0.04)'] as const,
  accent: ['#7C5CFF', '#31D0AA'] as const,
  highlight: ['#FF6B8A', '#7C5CFF'] as const,
};

export const darkGradients = {
  screen: ['#0B0E15', '#050608'] as const,
  card: ['rgba(124,92,255,0.18)', 'rgba(49,208,170,0.08)'] as const,
  accent: ['#7C5CFF', '#31D0AA'] as const,
  highlight: ['#FF6B8A', '#7C5CFF'] as const,
};

export type ThemeGradients = {
  screen: readonly [string, string];
  card: readonly [string, string];
  accent: readonly [string, string];
  highlight: readonly [string, string];
};

type ThemeContextType = {
  themeMode: ThemeMode;
  colors: ThemeColors;
  gradients: ThemeGradients;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  navigationTheme: Theme;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
const THEME_STORAGE_KEY = 'hyperlocal.themeMode';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark'); // Default to dark

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
          setThemeMode(stored);
        }
      } catch (error) {
        console.error('Failed to load theme mode:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextMode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode);
    } catch (error) {
      console.error('Failed to save theme mode:', error);
    }
  };

  const setThemeModePersisted = async (mode: ThemeMode) => {
    setThemeMode(mode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Failed to save theme mode:', error);
    }
  };

  const colors = useMemo(() => (themeMode === 'light' ? lightColors : darkColors), [themeMode]);
  const gradients = useMemo(() => (themeMode === 'light' ? lightGradients : darkGradients), [themeMode]);

  const navigationTheme = useMemo<Theme>(() => {
    const base = themeMode === 'light' ? DefaultTheme : DarkTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.backgroundElevated,
        text: colors.text,
        border: colors.border,
        notification: colors.danger,
      },
    };
  }, [themeMode, colors]);

  const value = useMemo(
    () => ({
      themeMode,
      colors,
      gradients,
      toggleTheme,
      setThemeMode: setThemeModePersisted,
      navigationTheme,
    }),
    [themeMode, colors, gradients, navigationTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemedStyles<T>(
  styleFactory: (colors: ThemeColors, gradients: ThemeGradients, themeMode: ThemeMode) => T
): T {
  const { colors, gradients, themeMode } = useTheme();
  return useMemo(() => styleFactory(colors, gradients, themeMode), [colors, gradients, themeMode]);
}
