import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/AppNavigator";
import { loginApi } from "@/api/auth";

/**
 * LoginScreen
 * 
 * ユーザーがメールアドレスとパスワードを入力してログインする画面。
 * バリデーションを行い、ログイン成功後にHome画面へ遷移する。
 */
export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * ログインボタン押下時の処理
   * 入力バリデーション後、認証APIを呼び出し、成功すればHome画面へ遷移
   */
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("エラー", "メールアドレスとパスワードを入力してください");
      return;
    }

    try {
      setLoading(true);

      // 認証API呼び出し
      const result = await loginApi(email, password);
      console.log("ログイン成功:", result);

      // TODO: トークン保存処理（例：SecureStore）などを追加予定

      // ホーム画面へ遷移
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("ログイン失敗", error.message || "ログイン処理中にエラーが発生しました");
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
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
      />
      <Text style={styles.label}>パスワード</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="●●●●●●"
      />

      <Button title={loading ? "ログイン中..." : "ログイン"} onPress={handleLogin} disabled={loading} />
    </View>
  );
}

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
    marginBottom: 15,
  },
});
