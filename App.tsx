/**
 * App.tsx
 *
 * アプリのルートコンポーネント。
 * - SafeAreaProvider：デバイスの安全領域（ノッチ・ステータスバー等）に対応
 * - AuthProvider：認証状態（ログイントークンやユーザー情報）をアプリ全体に提供
 * - AppNavigator：画面遷移のルート設定（ドロワー、スタック、タブなど）
 */

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-get-random-values';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
