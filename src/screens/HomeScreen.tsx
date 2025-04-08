// src/screens/HomeScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * HomeScreen
 * 中央にウェルカムメッセージを表示するホーム画面
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ホーム画面</Text>
      <Text style={styles.message}>ようこそ！ここから各種情報をご覧いただけます。</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  message: { fontSize: 16, textAlign: 'center' },
});
