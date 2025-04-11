/**
 * MemberCardScreen.tsx
 *
 * 会員証を表示する画面。
 * - 会員の場合は「会員番号」をQRコードとして表示
 * - ゲストの場合は「ゲストID」や「メールアドレス」などをQRコード化
 * - ゲストには「新規会員登録」ボタンを表示
 * 
 * ユーザー情報はグローバル（Context）から取得し、
 * 状況に応じて表示内容を切り替える。
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '@/navigation/MainStackNavigator';

export default function MemberCardScreen() {
  // 型付きナビゲーションを取得
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  // Contextからユーザー情報を取得
  const { user } = useAuth();

  // QRコードの内容を保持
  const [qrValue, setQrValue] = useState<string>('');

  // 会員かどうかを判定（会員番号があるかどうか）
  const isLoggedIn = !!(user && user.membershipNumber);

  // QRコードに表示する値を決定
  useEffect(() => {
    if (user) {
      if (user.membershipNumber) {
        setQrValue(user.membershipNumber);
      } else if (user.guestId) {
        setQrValue(user.guestId);
      } else if (user.email) {
        setQrValue(user.email);
      } else {
        setQrValue('NO VALUE');
      }
    }
  }, [user]);

  // 表示するユーザー名
  const displayName = isLoggedIn
    ? user?.name ?? 'No Name'
    : 'Guest';

  // ゲスト時の表示ラベル（空 or "Guest"）
  const memberShipStatus = isLoggedIn ? '' : 'Guest';

  return (
    <View style={styles.container}>
      {/* ユーザー名とステータスの表示エリア */}
      <View style={styles.headerContainer}>
        <Text style={styles.userName}>{displayName}</Text>
        {!!memberShipStatus && (
          <Text style={styles.memberShipStatus}>{memberShipStatus}</Text>
        )}
      </View>

      {/* QRコードとその下の識別子を表示 */}
      <View style={styles.qrContainer}>
        {qrValue ? (
          <>
            <QRCode value={qrValue} size={200} />
            <Text style={styles.qrText}>{qrValue}</Text>
          </>
        ) : (
          <Text style={styles.info}>QRコードの生成中...</Text>
        )}
      </View>

      {/* ゲストユーザーにのみ表示する会員登録ボタン */}
      {!isLoggedIn && (
        <TouchableOpacity
          style={styles.userRegisterButton}
          onPress={() => navigation.navigate('UserRegisterScreen')}
        >
          <Text style={styles.userRegisterButtonText}>新規会員登録</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// スタイル定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  memberShipStatus: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  qrContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrText: {
    marginTop: 8,
    fontSize: 12,
    color: '#333',
  },
  userRegisterButton: {
    marginBottom: 40,
    alignSelf: 'center',
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  userRegisterButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});
