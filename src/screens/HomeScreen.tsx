/**
 * HomeScreen.tsx
 *
 * ホーム画面を表示する画面。
 * - ユーザーがアプリを起動した直後や、メイン画面に戻る際に表示される
 * - ウェルカムメッセージなど、全体の入口となる役割を持つ
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ホーム画面</Text>
      <Text style={styles.message}>
        ようこそ！ここから各種情報をご覧いただけます。
      </Text>
    </View>
  );
}

// スタイル定義
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});
