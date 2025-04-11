// src/navigation/MainStackNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '@/screens/LoginScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import UserRegisterScreen from '@/screens/UserRegisterScreen';
import EmailSentScreen from '@/screens/EmailSentScreen';
import HomeScreen from '@/screens/HomeScreen'; // ホーム画面用のコンポーネントを追加
import HeaderMenu from '@/components/HeaderMenu';

/**
 * MainStackParamList
 * 
 * この型は、MainStackNavigator 内で扱うルートの名前と、それぞれのルートに渡すパラメーターの型を定義しています。
 * ここでは、BottomTabNavigator を含む主要な画面（MainTabs）、ログイン画面 (Login)、設定画面 (Settings)、
 * 新規会員登録画面 (UserRegisterScreen)、メール送信完了画面 (EmailSentScreen)、およびホーム画面 (Home) が含まれています。
 */
export type MainStackParamList = {
  MainTabs: undefined;         // BottomTabNavigator が表示されるルート。追加のパラメーターはありません。
  Login: undefined;            // ログイン画面用のルート
  Settings: undefined;         // 設定画面用のルート
  UserRegisterScreen: undefined; // 新規会員登録画面用のルート
  EmailSentScreen: undefined;    // メール送信完了画面用のルート
  Home: undefined;               // ホーム画面用のルート
};

// createNativeStackNavigator を使って、MainStackParamList に準拠したスタックナビゲーターを生成
const Stack = createNativeStackNavigator<MainStackParamList>();

/**
 * MainStackNavigator コンポーネント
 * 
 * このコンポーネントは、アプリ内の主要な画面間の遷移を管理するスタックナビゲーターです。
 * - MainTabs ルート：BottomTabNavigator を表示し、アプリ全体のタブナビゲーションを管理します。
 * - Login ルート：ユーザーがログインする画面をモーダルとして表示します。
 * - Settings ルート：アプリの設定画面を表示します。
 * - UserRegisterScreen ルート：新規会員登録画面を表示します。
 * - EmailSentScreen ルート：メール送信完了画面を表示します。
 * - Home ルート：ホーム画面を表示します。多段階の画面遷移をリセットして、直接ホームに戻る用途などに使用できます。
 */
export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      {/* MainTabs ルート：BottomTabNavigator をレンダリング */}
      <Stack.Screen 
        name="MainTabs" 
        component={BottomTabNavigator} 
        options={{
          headerRight: () => <HeaderMenu />,
          headerTitle: '店舗アプリ',
        }}
      />

      {/* Login ルート：ログイン画面をモーダル形式で表示 */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />

      {/* Settings ルート：設定画面 */}
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          title: '設定',
        }}
      />

      {/* UserRegisterScreen ルート：新規会員登録画面 */}
      <Stack.Screen 
        name="UserRegisterScreen" 
        component={UserRegisterScreen} 
        options={{
          title: '新規会員登録',
        }}
      />

      {/* EmailSentScreen ルート：メール送信完了画面 */}
      <Stack.Screen 
        name="EmailSentScreen" 
        component={EmailSentScreen} 
        options={{
          title: 'メール送信完了',
        }}
      />

      {/* Home ルート：ホーム画面
          このルートは、たとえばユーザー登録後のナビゲーションスタックをリセットし、
          ホーム画面のみを残す場合に利用できます。 */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'ホーム',
          headerLeft: () => null, // 画面上の戻るボタンを非表示にする例
        }}
      />
    </Stack.Navigator>
  );
}
