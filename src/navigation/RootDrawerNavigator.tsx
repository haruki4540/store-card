// src/navigation/RootDrawerNavigator.tsx

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStackNavigator from './MainStackNavigator';
import CustomDrawerContent from '@/components/CustomDrawerContent';

export type DrawerParamList = {
  Main: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function RootDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        drawerPosition: 'right',
        overlayColor: 'rgba(0,0,0,0.5)',
        // 幅を必要に応じて調整（ここでは全画面に近い例）
        drawerStyle: { width: '80%' },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="Main" 
        component={MainStackNavigator} 
        options={{ headerShown: false }} 
      />
    </Drawer.Navigator>
  );
}
