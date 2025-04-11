// src/api/apiClient.ts

const API_URL = "https://api.example.com"; // ご利用の API のベースURLに合わせて変更

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
 * 汎用の API 呼び出し関数
 * @param endpoint エンドポイント（例: "/api/auth/login"）
 * @param options fetch のオプション（method, body など）
 * @returns レスポンスの JSON データ（レスポンス型はジェネリクスで指定可能）
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // ヘッダーなどをマージ
  const config: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.message || "APIエラーが発生しました。", response.status);
  }

  return data;
}

/**
 * 個別の API 呼び出し例（ログイン）
 * @param email メールアドレス
 * @param password パスワード
 * @returns API レスポンスデータ（例：JWT トークン等）
 */
export async function login(email: string, password: string) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// 他の API エンドポイントも同様に関数を定義することで、集約できる
// 例：ユーザー登録
export async function register(userData: {
  name: string;
  furigana: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  password: string;
  gender: string | null;
}) {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}
