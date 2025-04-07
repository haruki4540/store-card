// AppNavigator.tsx
// React Navigation によるスタックナビゲーション設定ファイル
// アプリ内の画面遷移（ホーム → 会員証）を管理する

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 各画面コンポーネントをインポート
import HomeScreen from '../screens/HomeScreen';
import MemberCardScreen from '../screens/MemberCardScreen';

// 画面ごとのパラメータ型を定義（現時点ではパラメータ無し）
// この型はナビゲーション時の型安全性を保証するために使用
export type RootStackParamList = {
  Home: undefined;
  MemberCard: undefined;
};

// 型付きのスタックナビゲーターを作成
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AppNavigator コンポーネント
 * 
 * アプリ全体の画面遷移構成を提供する。
 * - `Home`: ホーム画面（初期表示）
 * - `MemberCard`: 会員証表示用の画面（QRコードなど）
 * 
 * @returns React要素（Stack.Navigator）
 */
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* ホーム画面：アプリ起動時に表示されるトップ画面 */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'ホーム' }} 
      />

      {/* 会員証画面：QRコードなどを表示する画面 */}
      <Stack.Screen 
        name="MemberCard" 
        component={MemberCardScreen} 
        options={{ title: '会員証' }} 
      />
    </Stack.Navigator>
  );
}
