// src/components/CustomDrawerContent.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '@/contexts/AuthContext';
import { removeToken } from '@/utils/authToken';
import { removeUser } from '@/utils/userStorage';

/**
 * CustomDrawerContent コンポーネント
 * ドロワーメニュー内に認証状態に応じたメニュー項目を表示する。
 * ログインしていないときは「ログイン」ボタンのみ、ログイン済みの場合は「ログアウト」ボタンを表示する。
 * 会員証情報は下段タブの「会員証」ページ内で表示する。
 */
export default function CustomDrawerContent(props: any) {
  const { token, refetchToken } = useAuth();

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await removeToken();
      await removeUser();
      await refetchToken();
      
      // 必要に応じてメッセージ表示など
    } catch (error) {
      console.error("ログアウトエラー", error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.title}>メニュー</Text>
      </View>
      {token ? (
        // ログイン済みの場合はログアウトボタンのみ表示
        <DrawerItem 
          label="ログアウト" 
          onPress={handleLogout} 
          labelStyle={styles.drawerLabel}
        />
      ) : (
        // 未ログインの場合はログインボタンのみ表示
        <DrawerItem 
        label="ログイン" 
        onPress={() => props.navigation.navigate('Main', { screen: 'Login' })} 
        labelStyle={styles.drawerLabel}
        />
      )}
      {/* ここに共通メニュー項目を追加することも可能 */}
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
