// src/api/auth.ts

import Constants from "expo-constants";
import { TEST_USERS } from "@/constants/testUsers";

/**
 * 認証用API
 * 
 * 指定されたメールアドレスとパスワードを使用してログイン処理を行う。
 * 成功時にはトークンを返却し、失敗時は例外をスローする。
 * 
 * @param email - ユーザーのメールアドレス
 * @param password - パスワード
 * @returns Promise<{ token: string }> - 成功時のJWTトークンを含むレスポンス
 */
export async function loginApi(email: string, password: string): Promise<{ token: string }> {
  // Expo/React Native 環境で __DEV__ が true なら開発環境と判定
  const isDev = __DEV__;
  // API_URL は expoConfig の extra.apiUrl が設定されていなければデフォルトのURLを使用
  const API_URL = Constants.expoConfig?.extra?.apiUrl || "https://your-api-endpoint.com";

  // 開発環境の場合、モックデータで認証チェックを行う
  if (isDev) {
    // テストユーザー情報から、該当するユーザーを検索
    const user = TEST_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw new Error("メールアドレスまたはパスワードが正しくありません");
    }
    // 該当ユーザーが見つかった場合、モックトークンを返す
    return Promise.resolve({ token: "mock-token-for-testing" });
  }

  // 本番環境でのAPI通信
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // リクエストボディにメールアドレスとパスワードをJSON形式で送信
      body: JSON.stringify({ email, password }),
    });

    // レスポンスが正常でない場合、エラーメッセージを取得して例外をスローする
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "ログインに失敗しました");
    }

    // 正常な場合、レスポンスのJSON（トークン等）を返す
    return await response.json();
  } catch (error) {
    console.error("API通信エラー:", error);
    throw error;
  }
}
