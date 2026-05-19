import React from 'react';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { useAuth } from '../hooks/useAuth';

export default function AppNavigator() {
  const { isAuthenticated, onboardingCompleted, authEntry } = useAuth();

  return isAuthenticated && onboardingCompleted ? (
    <MainTabNavigator />
  ) : (
    <AuthNavigator key={authEntry} initialRouteName={authEntry} />
  );
}
