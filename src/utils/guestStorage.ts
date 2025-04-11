/**
 * guestStorage.ts
 *
 * ゲストユーザー用の一時的な識別子（guest_id）を管理するユーティリティ。
 * - 初回起動時に一意のIDを生成して保存
 * - 登録完了時やログアウト時などに削除する
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from 'nanoid/non-secure';

const GUEST_ID_KEY = "guest_id";

/**
 * getOrCreateGuestId
 * ゲストIDを取得する。
 * - 既に保存されていればそれを返却
 * - なければ新しく生成して保存し、そのIDを返却
 *
 * @returns ゲストID（15文字のランダム文字列）
 */
export const getOrCreateGuestId = async (): Promise<string> => {
  let guestId = await AsyncStorage.getItem(GUEST_ID_KEY);
  if (!guestId) {
    guestId = nanoid(15);
    await AsyncStorage.setItem(GUEST_ID_KEY, guestId);
  }
  return guestId;
};

/**
 * deleteGuestId
 * 保存されているゲストIDを削除する。
 * - 会員登録後やログイン成功後に使用
 */
export const deleteGuestId = async (): Promise<void> => {
  await AsyncStorage.removeItem(GUEST_ID_KEY);
};
