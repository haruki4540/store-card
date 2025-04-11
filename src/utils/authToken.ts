/**
 * authToken.ts
 *
 * 認証トークン（auth_token）の保存・取得・削除を管理するユーティリティ。
 * - AsyncStorage を使って端末に保存される
 * - ログイン後のトークン保存、起動時の復元、ログアウト時の削除などに利用
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = 'auth_token';

/**
 * saveToken
 * 認証トークンを保存する。
 *
 * @param token - 保存するJWTトークン
 */
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    throw err;
  }
};

/**
 * getToken
 * 保存された認証トークンを取得する。
 *
 * @returns 保存されているトークン、または null
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (err) {
    console.error('トークンの取得に失敗しました：', err);
    return null;
  }
};

/**
 * removeToken
 * 保存されている認証トークンを削除する（ログアウト時など）。
 */
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.error('トークンの削除に失敗しました：', err);
    throw err;
  }
};
