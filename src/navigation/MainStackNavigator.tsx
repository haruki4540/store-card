/**
 * MainStackNavigator.tsx
 *
 * アプリ内の画面遷移（スタックナビゲーション）を管理する。
 * - タブナビゲーション(MainTabs)
 * - 認証画面(Login)
 * - 設定画面(Settings)
 * - 会員登録画面(UserRegisterScreen)
 * - メール送信完了画面(EmailSentScreen)
 * - ホーム画面(Home)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '@/screens/LoginScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import UserRegisterScreen from '@/screens/UserRegisterScreen';
import EmailSentScreen from '@/screens/EmailSentScreen';
import HomeScreen from '@/screens/HomeScreen';
import HeaderMenu from '@/components/HeaderMenu';

// スタックナビゲーションで扱うルートとそのパラメーターの型を定義
export type MainStackParamList = {
  MainTabs: undefined;
  Login: undefined;
  Settings: undefined;
  UserRegisterScreen: undefined;
  EmailSentScreen: { message: string };
  Home: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      {/* ホーム画面＋下部タブナビゲーション */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{
          headerTitle: '店舗アプリ',
          headerRight: () => <HeaderMenu />,
        }}
      />

      {/* ログイン画面（モーダル表示） */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />

      {/* 設定画面 */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '設定',
        }}
      />

      {/* 新規会員登録画面 */}
      <Stack.Screen
        name="UserRegisterScreen"
        component={UserRegisterScreen}
        options={{
          title: '新規会員登録',
        }}
      />

      {/* メール送信完了画面（確認メール送信後に遷移） */}
      <Stack.Screen
        name="EmailSentScreen"
        component={EmailSentScreen}
        options={{
          title: 'メール送信完了',
        }}
      />

      {/* ホーム画面（リセット遷移時に使用） */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'ホーム',
          headerLeft: () => null, // 戻るボタンを非表示にする
        }}
      />
    </Stack.Navigator>
  );
}
