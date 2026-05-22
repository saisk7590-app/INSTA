import React from 'react';
import { Animated, ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, useTheme } from '../../theme';
import { useEntranceAnimation } from '../../hooks/useEntranceAnimation';

type ScreenContainerProps = ScrollViewProps & {
  children: React.ReactNode;
  withScroll?: boolean;
};

export function ScreenContainer({
  children,
  withScroll = true,
  contentContainerStyle,
  ...rest
}: ScreenContainerProps) {
  const animation = useEntranceAnimation();
  const { gradients } = useTheme();

  const content = (
    <Animated.View style={[styles.content, animation, contentContainerStyle]}>
      {children}
    </Animated.View>
  );

  return (
    <LinearGradient colors={gradients.screen} style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        {withScroll ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            {...rest}
          >
            {content}
          </ScrollView>
        ) : (
          <View style={styles.flex}>{content}</View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
});
