/**
 * AppNavigator.tsx
 *
 * アプリ全体のナビゲーション構成を定義するエントリーポイント。
 * - NavigationContainer でナビゲーション全体をラップ
 * - RootDrawerNavigator をルートナビゲーターとして使用
 * - SafeAreaView で画面の余白を調整
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootDrawerNavigator from './RootDrawerNavigator';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <RootDrawerNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
