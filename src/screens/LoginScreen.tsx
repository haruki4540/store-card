// src/screens/LoginScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "@/navigation/MainStackNavigator";
import { loginApi } from "@/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUpTests } from "react-native-reanimated";
import { deleteGuestId } from '@/utils/guestStorage';

/**
 * LoginScreen
 * ユーザーがログインするための画面。認証成功時にトークンを保存しグローバル認証状態を更新する。
 */
export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuth();
  const { setUser } = useAuth();

  const isValidEmail = email.includes('@') && email.includes('.');
  const isValidPassword = password.length >= 6;
  const isFormValid = isValidEmail && isValidPassword;

  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert("エラー", "正しい形式のメールアドレスとパスワード（6文字以上）を入力してください");
      return;
    }
    try {
      setLoading(true);
      const result = await loginApi(email, password);

      // 保存時に現在のタイムスタンプを追加
      const timestamp = new Date().toISOString();

      // トークンとユーザー情報（タイムスタンプ付き）を保存する
      await AsyncStorage.setItem('auth_token', result.token);
      setToken(result.token);

      const userData = {
        name: result.user.name,
        email: result.user.email,
        guestId: result.user.guestId,
        membershipNumber: result.user.membership_number,
        uniqueCode: result.user.unique_code,
        lastUpdated: timestamp,
      };
      
      await AsyncStorage.setItem('user_info', JSON.stringify(userData));
      await deleteGuestId();
      setUser(userData);

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
      <Button title={loading ? "ログイン中..." : "ログイン"} onPress={handleLogin} disabled={!isFormValid || loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10, marginBottom: 5 },
  error: { color: "red", marginBottom: 10, fontSize: 12 },
});
