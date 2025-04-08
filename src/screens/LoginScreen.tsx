// src/screens/LoginScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
// useNavigation を使ってナビゲーション操作を行う（必要なら使用）
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/AppNavigator";
// 認証API 呼び出し用の関数
import { loginApi } from "@/api/auth";
// AuthContext 経由の useAuth をインポートして、グローバルな認証状態を更新する
import { useAuth } from "@/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * LoginScreen
 * ユーザーがメールアドレスとパスワードを入力してログインする画面。
 * 入力値のバリデーションを行い、認証成功時にトークンを保存しグローバル認証状態を更新する。
 */
export default function LoginScreen() {
  // navigation は、必要に応じて直接画面遷移する際に使用
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // メールアドレス、パスワード、ローディング状態をそれぞれ管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // AuthContext から refetchToken と setToken を取得（グローバル認証状態更新用）
  const { setToken } = useAuth();

  // 入力値のバリデーションチェック
  const isValidEmail = email.includes('@') && email.includes('.');
  const isValidPassword = password.length >= 6;
  const isFormValid = isValidEmail && isValidPassword;

  /**
   * handleLogin
   * ログインボタン押下時の処理：
   * - 入力値をバリデーション
   * - 認証API を呼び出し、成功したらトークンを AsyncStorage に保存
   * - setToken を直接呼び出して、グローバル認証状態を更新する
   * ※ ここでは、refetchToken の重複呼び出しを避けるために setToken のみを使用
   */
  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert("エラー", "正しい形式のメールアドレスとパスワード（6文字以上）を入力してください");
      return;
    }

    try {
      setLoading(true);

      // 認証API を呼び出す
      const result = await loginApi(email, password);
      console.log("LoginScreen: loginApi 結果", result);

      // 取得したトークンを AsyncStorage に保存する
      await AsyncStorage.setItem('auth_token', result.token);
      console.log("LoginScreen: AsyncStorage にトークン保存完了", result.token);

      // グローバル認証状態を更新するため、setToken を直接呼び出す
      setToken(result.token);
      // ※ refetchToken() を使うと、再度 AsyncStorage を参照してしまいタイミングの問題で null になる可能性があるため使用しない

      // 認証状態が更新されれば、AppNavigator 側で自動的に Home 画面が表示されるはずです
    } catch (error) {
      Alert.alert("ログイン失敗", "メールアドレスまたはパスワードが正しくありません");
      console.error("LoginScreen: ログインエラー", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
      {/* 入力値が不正な場合にエラーメッセージを表示 */}
      {!isValidEmail && email.length > 0 && (
        <Text style={styles.error}>メールアドレスの形式が正しくありません</Text>
      )}

      <Text style={styles.label}>パスワード</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="●●●●●●"
      />
      {/* パスワードが短い場合にエラーメッセージを表示 */}
      {!isValidPassword && password.length > 0 && (
        <Text style={styles.error}>パスワードは6文字以上で入力してください</Text>
      )}

      <Button
        title={loading ? "ログイン中..." : "ログイン"}
        onPress={handleLogin}
        disabled={!isFormValid || loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  label: { fontSize: 16, marginBottom: 5 },
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
