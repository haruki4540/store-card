/**
 * LoginScreen.tsx
 *
 * ログイン処理を行う画面。
 * ユーザーがメールアドレスとパスワードを入力し、
 * サーバー（Rails API）にログインリクエストを送信する。
 *
 * 主な処理の流れ：
 * - 入力内容のバリデーションを行う
 * - ログインAPIを呼び出す
 * - 成功時はトークンとユーザー情報を保存し、グローバル状態に反映する
 * - 失敗時はエラーメッセージを表示する
 * - ログイン完了後はメイン画面（MainTabs）に遷移する
 */

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "@/navigation/MainStackNavigator";
import { loginApi } from "@/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteGuestId } from '@/utils/guestStorage';

export default function LoginScreen() {
  // ナビゲーション機能を使うための準備
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  // 入力内容を保持するための状態管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 認証コンテキストからグローバル更新関数を取得する
  const { setToken, setUser } = useAuth();

  // 入力内容のバリデーションを行う
  const isValidEmail = email.includes('@') && email.includes('.');
  const isValidPassword = password.length >= 6;
  const isFormValid = isValidEmail && isValidPassword;

  /**
   * handleLogin
   *
   * ログインボタンを押したときに呼び出される処理。
   * バリデーション後、ログインAPIを実行し、
   * 正常であればトークンとユーザー情報を保存する。
   */
  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert("エラー", "正しい形式のメールアドレスとパスワード（6文字以上）を入力してください");
      return;
    }

    try {
      setLoading(true);

      // APIを使ってログイン処理を行う
      const result = await loginApi(email, password);

      // ローカルストレージにトークンを保存する
      await AsyncStorage.setItem('auth_token', result.token);
      setToken(result.token);

      // ユーザー情報をアプリ用の形式に整形する
      const userData = {
        name: result.user.name,
        email: result.user.email,
        guestId: result.user.guestId,
        membershipNumber: result.user.membershipNumber,
      };

      // ユーザー情報を保存する
      await AsyncStorage.setItem('user_info', JSON.stringify(userData));
      await deleteGuestId(); // ゲストIDを削除する（会員に切り替わるため）
      setUser(userData);     // コンテキストにユーザー情報を反映する

      // メイン画面に遷移する（履歴をリセット）
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });

      Alert.alert("ログイン成功", "ようこそ！");
    } catch (error) {
      Alert.alert("ログイン失敗", "メールアドレスまたはパスワードが正しくありません");
      console.error("LoginScreen: ログインエラー", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* メールアドレスを入力するエリア */}
      <Text style={styles.label}>メールアドレス</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
      />
      {!isValidEmail && email.length > 0 && (
        <Text style={styles.error}>メールアドレスの形式が正しくありません</Text>
      )}

      {/* パスワードを入力するエリア */}
      <Text style={styles.label}>パスワード</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="●●●●●●"
      />
      {!isValidPassword && password.length > 0 && (
        <Text style={styles.error}>パスワードは6文字以上で入力してください</Text>
      )}

      {/* ログインボタン */}
      <Button
        title={loading ? "ログイン中..." : "ログイン"}
        onPress={handleLogin}
        disabled={!isFormValid || loading}
      />
    </View>
  );
}

// 画面全体のスタイル定義
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
});
