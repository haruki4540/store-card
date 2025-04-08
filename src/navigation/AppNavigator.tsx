// src/navigation/AppNavigator.tsx
// React Navigation によるスタックナビゲーション設定ファイル
// アプリ内の画面遷移（ホーム → 会員証）を管理する
// ログイン状態によってルートを切り替える（認証ガード）

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// 各画面コンポーネントをインポート
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '@/screens/HomeScreen';
import MemberCardScreen from '@/screens/MemberCardScreen';

// グローバルな認証状態管理用のフックを AuthContext からインポート
import { useAuth } from '@/contexts/AuthContext';

// ナビゲーションパラメータの型定義
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  MemberCard: undefined;
};

// Stack ナビゲーターインスタンス
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * 認証済みユーザー用のナビゲーター
 * Home, MemberCard 画面を含む
 */
function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ホーム'}} />
      <Stack.Screen name="MemberCard" component={MemberCardScreen} options={{ title: '会員証' }} />
    </Stack.Navigator>
  );
}

/**
 * 未認証ユーザー用のナビゲーター
 * Login 画面のみ含む
 */
function UnauthenticatedStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'ログイン' }} />
      </Stack.Navigator>
    );
}

/**
 * AppNavigator コンポーネント
 * 
 * ログイン状態に応じて表示するスタックナビゲーターを切り替える。
 * - トークンが存在すれば認証済みナビゲーターを表示
 * - トークンが無ければログイン画面へ
 * 
 * @returns React要素（Stack.Navigator）
 */
export default function AppNavigator() {
  const { token, loading } = useAuth();

  // トークンのチェック中はローディングスピナーを表示
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}
