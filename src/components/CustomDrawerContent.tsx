/**
 * CustomDrawerContent.tsx
 *
 * アプリのドロワーメニュー表示を担当するコンポーネント。
 * - 認証状態に応じて表示項目を切り替える（ログイン／ログアウト）
 * - 会員証情報などは専用タブで別途表示するため、このメニューでは省略
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '@/contexts/AuthContext';
import { removeToken } from '@/utils/authToken';
import { removeUser } from '@/utils/userStorage';

export default function CustomDrawerContent(props: any) {
  const { token, refetchToken } = useAuth();

  /**
   * handleLogout
   * ログアウト時に呼び出される処理。
   * トークンとユーザー情報を削除し、認証状態をリフレッシュする。
   */
  const handleLogout = async () => {
    try {
      await removeToken();
      await removeUser();
      await refetchToken();
    } catch (error) {
      console.error('CustomDrawerContent: ログアウトエラー', error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* ドロワーヘッダー */}
      <View style={styles.header}>
        <Text style={styles.title}>メニュー</Text>
      </View>

      {/* 認証状態に応じてログイン or ログアウトを表示 */}
      {token ? (
        <DrawerItem
          label="ログアウト"
          onPress={handleLogout}
          labelStyle={styles.drawerLabel}
        />
      ) : (
        <DrawerItem
          label="ログイン"
          onPress={() => props.navigation.navigate('Main', { screen: 'Login' })}
          labelStyle={styles.drawerLabel}
        />
      )}

      {/* 追加のメニュー項目がある場合はここに追加 */}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerLabel: {
    fontSize: 16,
  },
});
