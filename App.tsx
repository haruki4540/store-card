// App.tsx
// アプリのエントリーポイント。React Navigation を含む構成の起点。

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * アプリのルートコンポーネント
 * - NavigationContainer でナビゲーション全体を包む
 * - AppNavigator が画面の構造を定義
 */
export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
