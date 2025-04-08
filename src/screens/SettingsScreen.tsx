// src/screens/SettingsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * SettingsScreen
 * 設定画面。各種設定項目を表示する。
 */
export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>設定画面</Text>
      <Text style={styles.info}>ここに各種設定項目を配置します。</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 20 },
  info: { fontSize: 16, textAlign: 'center' },
});
