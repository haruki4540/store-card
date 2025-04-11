// src/utils/guestStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from 'nanoid/non-secure';

const GUEST_ID_KEY = "guest_id";

/**
 * ゲストIDの取得。
 *
 * 既に存在すればその値を返し、存在しなければ新しく生成して保存します。
 *
 * ゲストIDはnanoid(15)を用いて生成します。
 * 
 * ※衝突確率について:
 *  15桁のnanoidで使用するアルファベットが64文字の場合、組み合わせは
 *      64^15 ≈ 1.24 × 10^27 通り
 *  任意の2つのIDが一致する確率は約 1/(1.24×10^27) であり、
 *  ゲストIDとして生成する場合、重複が起こる可能性は極めて低いと考えられます。
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
 * ゲストIDの削除。
 *
 * 会員登録が完了した際などに、AsyncStorage に保存されているゲストIDを削除するための関数です。
 */
export const deleteGuestId = async (): Promise<void> => {
  await AsyncStorage.removeItem(GUEST_ID_KEY);
};