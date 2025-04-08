// src/utils/authToken.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

// 認証トークンを保存する際のキー
const TOKEN_KEY = 'auth_token';

/**
 * saveToken
 * サーバーから受け取った認証トークンを AsyncStorage に保存する関数
 *
 * @param token - 保存するトークン文字列
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
 * AsyncStorage から認証トークンを取得する関数
 *
 * @returns Promise<string | null> - トークンが存在すれば文字列、存在しなければ null
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (err) {
    console.error('トークン取得に失敗：', err);
    return null;
  }
};

/**
 * removeToken
 * ログアウト時などに、AsyncStorage から認証トークンを削除する関数
 */
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.error('トークン削除に失敗：', err);
    throw err;
  }
};
