import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  InterestSelectionScreen,
  LocationPermissionScreen,
  LoginScreen,
  NotificationPermissionScreen,
  OnboardingScreen,
  OTPVerificationScreen,
  SignupScreen,
  SplashScreen,
  UsernameSetupScreen,
} from '../screens/auth';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  LocationPermission: undefined;
  NotificationPermission: undefined;
  Login: undefined;
  Signup: undefined;
  OTPVerification: undefined;
  UsernameSetup: undefined;
  InterestSelection: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator({
  initialRouteName = 'Splash',
}: {
  initialRouteName?: keyof AuthStackParamList;
}) {
  return (
    <Stack.Navigator id="auth-stack" initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
      <Stack.Screen name="NotificationPermission" component={NotificationPermissionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="UsernameSetup" component={UsernameSetupScreen} />
      <Stack.Screen name="InterestSelection" component={InterestSelectionScreen} />
    </Stack.Navigator>
  );
}
