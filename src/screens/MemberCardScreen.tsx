// MemberCardScreen.tsx
// 会員証情報を表示する画面（仮実装）

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * MemberCardScreen コンポーネント
 * - 仮の会員証情報（名前・番号・有効期限）を表示
 * - 今後QRコード表示などを追加予定
 */
export default function MemberCardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>会員証</Text>
      <Text style={styles.label}>氏名: 山田 太郎</Text>
      <Text style={styles.label}>会員番号: 12345678</Text>
      <Text style={styles.label}>有効期限: 2026年3月31日</Text>
    </View>
  );
}

// スタイル定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
  },
});
