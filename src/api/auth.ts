/**
 * auth.ts
 *
 * 認証関連のAPI関数を提供するモジュール。
 * - ログイン処理（トークンとユーザー情報を取得）
 */

import Constants from "expo-constants";

/**
 * ログインAPIを実行する関数。
 *
 * @param email - ユーザーのメールアドレス
 * @param password - ユーザーのパスワード
 * @returns トークンとユーザー情報を含むレスポンス
 * @throws エラー発生時には例外をスローする
 */
export async function loginApi(
  email: string,
  password: string
): Promise<{
  token: string;
  user: {
    name: string;
    email: string;
    guestId: string;
    membershipNumber: string;
  };
}> {
  const API_URL =
    Constants.expoConfig?.extra?.apiUrl || "http://192.168.2.231:3000";

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "ログインに失敗しました");
    }

    return await response.json();
  } catch (error) {
    console.error("loginApi: 通信エラー", error);
    throw error;
  }
}
