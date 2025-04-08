// src/utils/authToken.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = 'auth_token';

/**
 * saveToken
 * サーバーから受け取った認証トークンを保存する
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
 * 保存された認証トークンを取得する
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
 * ログアウト時に認証トークンを削除する
 */
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.error('トークン削除に失敗：', err);
    throw err;
  }
};
