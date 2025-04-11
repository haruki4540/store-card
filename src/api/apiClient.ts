// src/api/apiClient.ts
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiUrl || "http://192.168.2.231:3000";

/**
 * API のエラーハンドリング用例外
 */
export class ApiError extends Error {
  public status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * API呼び出し用のユーティリティ関数
 * @param endpoint エンドポイント（例: "/api/auth/login"）
 * @param method HTTPメソッド。デフォルトは "GET"。
 * @param data POSTやPUTの場合に送信するデータ
 * @returns APIから返却されたJSONレスポンス
 */
export async function apiCall(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: Record<string, unknown>
): Promise<any> {
  const url = `${API_URL}${endpoint}`;

  // 共通のヘッダー設定
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // fetch設定
  const options: RequestInit = {
    method,
    headers,
  };

  // POST/PUTの場合、bodyにJSON文字列を設定
  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      // エラーの場合はサーバー側のメッセージを含め例外をスロー
      throw new ApiError(json.message || 'APIエラーが発生しました。', response.status);
    }

    return json;
  } catch (error) {
    // エラーログの出力や再スローなど、必要に応じたエラーハンドリング
    throw error;
  }
}

/**
 * ユーザー登録用の関数
 * ユーザー情報を /api/auth/register エンドポイントへPOSTします
 */
export async function userRegister(userData: {
  name: string;
  furigana: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  password: string;
  gender: number;
  membershipNumber: string;
}): Promise<any> {
  return await apiCall('/api/auth/register', 'POST', userData);
}
