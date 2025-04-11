/**
 * userStorage.ts
 *
 * ユーザー情報（ログイン済みの会員データなど）を
 * 永続ストレージ（AsyncStorage）に保存・取得・削除するユーティリティ。
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user_info';

/**
 * saveUser
 * ユーザー情報を保存する。
 *
 * @param user - 保存するユーザーオブジェクト
 */
export const saveUser = async (user: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    throw err;
  }
};

/**
 * getUser
 * 保存されているユーザー情報を取得する。
 *
 * @returns ユーザーオブジェクト、または存在しない場合は null
 */
export const getUser = async (): Promise<any | null> => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error('ユーザー情報取得に失敗：', err);
    return null;
  }
};

/**
 * removeUser
 * 保存されているユーザー情報を削除する。
 *
 * ログアウトやアカウント切り替え時などに使用。
 */
export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (err) {
    console.error('ユーザー情報削除に失敗：', err);
    throw err;
  }
};
