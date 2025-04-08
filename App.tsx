// App.tsx

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * App コンポーネント
 * SafeAreaProvider と AuthProvider により全体の安全領域およびグローバル認証状態を提供する
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
