import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user_info';

/**
 * saveUser
 * サーバーから受け取ったユーザー情報を保存する
 */
export const saveUser = async (user: any) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    throw err;
  }
};

/**
 * getUser
 * 保存されたユーザー情報を取得する
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
 * ログアウト時にユーザー情報を削除する
 */
export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (err) {
    console.error('ユーザー情報削除に失敗：', err);
    throw err;
  }
};

