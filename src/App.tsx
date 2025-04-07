// App.tsx
// アプリのエントリーポイント。
// React Navigation の NavigationContainer でナビゲーション全体をラップする。

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

/**
 * App コンポーネント
 *
 * アプリ全体の最上位コンポーネント。
 * - React Navigation のコンテキストを提供する。
 * - AppNavigator によって画面構成を切り替える。
 *
 * @returns React.ReactElement
 */
export default function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
