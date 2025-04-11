// src/screens/EmailSentScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EmailSentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  // 画面遷移時に送られたメッセージを取得
  const { message } = route.params as { message: string };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>メール送信完了</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainTabs' }],
            });
        }}
      >
        <Text style={styles.buttonText}>ホームに戻る</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
