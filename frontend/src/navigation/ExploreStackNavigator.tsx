import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ExploreScreen,
  NearbyDiscoveryScreen,
  SearchResultsScreen,
  SearchScreen,
} from '../screens/explore';
import { PublicUserProfileScreen } from '../screens/profile';
import { ExploreStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<ExploreStackParamList>();

const stackOptions = {
  headerShown: false,
  animation: 'slide_from_right' as const,
};

export default function ExploreStackNavigator() {
  return (
    <Stack.Navigator id="explore-stack" screenOptions={stackOptions}>
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="NearbyDiscovery" component={NearbyDiscoveryScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="PublicProfile" component={PublicUserProfileScreen} />
    </Stack.Navigator>
  );
}
