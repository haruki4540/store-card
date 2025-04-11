/**
 * apiClient.ts
 *
 * アプリ全体で使用する API 通信ユーティリティを提供するモジュール。
 * - 共通の API 呼び出し処理（fetch ラッパー）
 * - サーバー側からのエラーをカスタム例外として扱う
 * - 特定エンドポイント用の関数（例：ユーザー登録）もここに記載
 */

import Constants from "expo-constants";

// APIのベースURLを取得（環境変数 or デフォルト）
const API_URL =
  Constants.expoConfig?.extra?.apiUrl || "http://192.168.2.231:3000";

/**
 * ApiError
 * サーバーから返されたエラー情報を扱うためのカスタム例外クラス。
 */
export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * apiCall
 * 共通の API 呼び出し関数。
 *
 * @param endpoint - 呼び出す API のエンドポイント（例：/api/users）
 * @param method - HTTPメソッド（GET, POST など）
 * @param data - POST/PUT 時に送信するデータ（省略可）
 * @returns API の JSON レスポンス
 * @throws サーバーエラー時は ApiError をスロー
 */
export async function apiCall(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: Record<string, unknown>
): Promise<any> {
  const url = `${API_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      throw new ApiError(json.message || 'APIエラーが発生しました。', response.status);
    }

    return json;
  } catch (error) {
    console.error('apiCall: 通信エラー', error);
    throw error;
  }
}

/**
 * userRegister
 * ユーザー登録用の API を呼び出す。
 *
 * @param userData - 登録時に送信するユーザー情報
 * @returns サーバーからのレスポンス
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
