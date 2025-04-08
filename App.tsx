// App.tsx

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
// AuthProvider をインポートし、アプリ全体の認証状態管理に使用する
import { AuthProvider } from './src/contexts/AuthContext';

/**
 * App コンポーネント
 *
 * アプリ全体の最上位コンポーネント。AuthProvider でラップすることで、
 * グローバルな認証状態が全コンポーネントで共有される。
 *
 * @returns React.ReactElement
 */
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
