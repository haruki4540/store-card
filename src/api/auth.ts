import Constants from "expo-constants";

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
  const API_URL = Constants.expoConfig?.extra?.apiUrl || "https://your-api-endpoint.com";

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
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
    console.error("API通信エラー:", error);
    throw error;
  }
}
