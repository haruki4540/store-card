// src/screens/HomeScreen.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// removeToken を使用してトークン削除（ログアウト処理用）
import { removeToken } from '@/utils/authToken';
// AuthContext 経由の useAuth フックをインポートして認証状態にアクセス
import { useAuth } from '@/contexts/AuthContext';

/**
 * HomeScreen
 * ログイン後に表示されるホーム画面。
 * ログアウトボタンを押すとトークンが削除され、認証状態が更新される。
 */
export default function HomeScreen() {
  const { refetchToken } = useAuth();

  /**
   * handleLogout
   * ログアウト処理：AsyncStorage からトークンを削除し、認証状態を再取得する
   */
  const handleLogout = async () => {
    await removeToken();       // 認証トークンを削除
    await refetchToken();      // 認証状態を再評価
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ホーム画面</Text>
      <Button
        title="ログアウト"
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
