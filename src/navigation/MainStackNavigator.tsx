// src/navigation/MainStackNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '@/screens/LoginScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import HeaderMenu from '@/components/HeaderMenu';

export type MainStackParamList = {
  MainTabs: undefined;
  Login: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={BottomTabNavigator} 
        options={{
          headerRight: () => <HeaderMenu />,
          headerTitle: '店舗アプリ',
        }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          title: '設定',
        }}
      />
    </Stack.Navigator>
  );
}
