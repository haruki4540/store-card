/**
 * RootDrawerNavigator.tsx
 *
 * アプリ全体のドロワーナビゲーションを定義する。
 * - ドロワーは右からスライドで表示される
 * - メインのナビゲーション構成(MainStackNavigator)を内包する
 * - カスタムドロワー(CustomDrawerContent)を表示する
 */

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStackNavigator from './MainStackNavigator';
import CustomDrawerContent from '@/components/CustomDrawerContent';

// ドロワーナビゲーションで使用するルートの型定義
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
        drawerStyle: { width: '80%' }, // ドロワー幅は画面の80%に設定
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* メインナビゲーション（BottomTab + Stack構成） */}
      <Drawer.Screen
        name="Main"
        component={MainStackNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
