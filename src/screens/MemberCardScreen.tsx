// src/screens/MemberCardScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';

export default function MemberCardScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  // 会員番号やゲストIDなど、QRコードの値を保持する
  const [qrValue, setQrValue] = useState<string>('');

  console.log(user);

  // ログインしているかどうか判別するために利用
  // （例：membershipNumber があれば「正式会員」とみなす、などアプリごとに調整可能）
  const isLoggedIn = !!(user && user.membershipNumber);

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

  // ログイン時は空文字、未ログイン時は「Guest」にしています
  const memberShipStatus = isLoggedIn
    ? '' 
    : 'Guest';

  return (
    <View style={styles.container}>
      {/* 画面上部のヘッダー（ユーザー名、ステータス） */}
      <View style={styles.headerContainer}>
        {/* 左上にユーザー名 or Guest */}
        <Text style={styles.userName}>{displayName}</Text>
        {/* ゴールドエリート部相当：未ログイン時のみ Guest と表示（今は空文字との切替）*/}
        {!!memberShipStatus && (
          <Text style={styles.memberShipStatus}>{memberShipStatus}</Text>
        )}
      </View>

      {/* 中央に QR コードと小さめの会員番号 */}
      <View style={styles.qrContainer}>
        {qrValue ? (
          <>
            <QRCode 
              value={qrValue} 
              size={200}  // お好みで大きさ調整
            />
            {/* 会員番号を小さく表示したい場合はフォントサイズを小さめに */}
            <Text style={styles.qrText}>{qrValue}</Text>
          </>
        ) : (
          <Text style={styles.info}>QRコードの生成中...</Text>
        )}
      </View>

      {/* 会員登録ボタン：ログイン済みの場合は非表示の例 */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    // 上部余白や横の余白はお好みで
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
  // 会員番号のテキストをかなり小さく表示
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
