import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '../components/common';
import FeedStackNavigator from './FeedStackNavigator';
import ExploreStackNavigator from './ExploreStackNavigator';
import MessageStackNavigator from './MessageStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import { MainTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      id="main-tabs"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="FeedTab" component={FeedStackNavigator} />
      <Tab.Screen name="ExploreTab" component={ExploreStackNavigator} />
      <Tab.Screen name="MessagesTab" component={MessageStackNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}
