/**
 * EmailSentScreen.tsx
 *
 * 確認メールの送信完了をユーザーに伝える画面。
 * - ユーザー登録後などに表示される
 * - 表示するメッセージは前の画面から受け取る
 * - 「ホームに戻る」ボタンを押すと、MainTabsに遷移する
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '@/navigation/MainStackNavigator';

// ナビゲーションとルートの型定義
type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'EmailSentScreen'>;
type EmailSentScreenRouteProp = RouteProp<MainStackParamList, 'EmailSentScreen'>;

export default function EmailSentScreen() {
  // ナビゲーション機能とルートパラメータを取得
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EmailSentScreenRouteProp>();

  // 前の画面から受け取ったメッセージを表示する
  const { message } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>メール送信完了</Text>
      <Text style={styles.message}>{message}</Text>

      {/* ホームに戻るボタン */}
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

// スタイル定義
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
