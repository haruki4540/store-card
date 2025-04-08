// src/screens/MemberCardScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

/**
 * MemberCardScreen
 * 会員証画面。ログイン済みの場合に会員証情報を表示し、未ログインの場合はログインを促す。
 */
export default function MemberCardScreen() {
  const { token } = useAuth();

  return (
    <View style={styles.container}>
      {token ? (
        <>
          <Text style={styles.title}>会員証</Text>
          <Text style={styles.info}>[会員証の詳細情報]</Text>
        </>
      ) : (
        <Text style={styles.message}>ログインしてください。会員証情報は表示されません。</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 20 },
  info: { fontSize: 18, textAlign: 'center' },
  message: { fontSize: 16, textAlign: 'center' },
});
