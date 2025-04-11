import Constants from "expo-constants";
import { apiCall } from "@/api/apiClient";

/**
 * 認証用API
 * 
 * 指定されたメールアドレスとパスワードを使用してログイン処理を行い、
 * 成功時にはバックエンド（Rails API）から取得したトークンを返却します。
 * 失敗時は例外をスローします。
 * 
 * @param email - ユーザーのメールアドレス
 * @param password - パスワード
 * @returns Promise<{ token: string }> - 成功時のJWTトークンを含むレスポンス
 */
export async function loginApi(email: string, password: string): Promise<{ token: string; user: { name: string; email: string } }> {
  // expoConfig の extra.apiUrl が設定されていなければ、デフォルトはローカルホストを指定
  const API_URL = Constants.expoConfig?.extra?.apiUrl || "http://192.168.2.231:3000";

  try {
    // API エンドポイントは、Rails 側で設定した namespaced なルート /api/auth/login を指定
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // メールアドレスとパスワードを JSON ボディとして送信
      body: JSON.stringify({ email, password }),
    });

    // レスポンスが正常でない場合、エラーメッセージを取得して例外をスローする
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "ログインに失敗しました");
    }

    // 正常な場合、レスポンスのJSON（例：トークン等）を返す
    return await response.json();
  } catch (error) {
    console.error("API通信エラー:", error);
    throw error;
  }
}
