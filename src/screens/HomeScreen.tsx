// HomeScreen.tsx
// ホーム画面（アプリ起動時に表示されるトップページ）

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';

/**
 * HomeScreen Props の型
 * - navigation: 画面遷移用の関数群
 */
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

/**
 * HomeScreen コンポーネント
 * - トップページとして表示される画面
 * - 会員証画面への遷移ボタンを持つ
 */
export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ホーム画面</Text>
      <Button
        title="会員証を表示"
        onPress={() => navigation.navigate('MemberCard')}
      />
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
    fontSize: 24,
    marginBottom: 16,
  },
});
