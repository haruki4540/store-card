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
  // Expo/React Native 環境であれば __DEV__ によって開発環境が判定される
  const isDev = __DEV__;
  // API_URL の設定。expoConfig の extra に apiUrl が設定されていなければデフォルトのURLを使用する
  const API_URL = Constants.expoConfig?.extra?.apiUrl || "https://your-api-endpoint.com";

  // 開発環境の場合はモックデータで認証チェックを行う
  if (isDev) {
    // TEST_USERS 配列から該当するユーザーを検索
    const user = TEST_USERS.find(
      (u) => u.email === email && u.password === password
    );
    // 該当ユーザーが見つからなければエラーをスロー
    if (!user) {
      throw new Error("メールアドレスまたはパスワードが正しくありません");
    }
    // 見つかった場合はモックのトークンを返す
    return Promise.resolve({ token: "mock-token-for-testing" });
  }

  // 本番環境でのAPI通信を行う
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // リクエストボディにメールアドレスとパスワードをJSONで送信
      body: JSON.stringify({ email, password }),
    });

    // HTTPステータスが OK でない場合、エラーデータを取得しエラーをスローする
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "ログインに失敗しました");
    }

    // 正常時はレスポンスのJSONを返却する（トークンを含む）
    return await response.json();
  } catch (error) {
    console.error("API通信エラー:", error);
    throw error;
  }
}
