// src/screens/UserRegisterScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { userRegister } from '@/api/apiClient';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { deleteGuestId } from '@/utils/guestStorage';

/**
 * UserRegisterScreen コンポーネント
 * 会員登録フォーム画面を提供する。
 * 氏名、ふりがな、生年月日、電話番号、性別、メールアドレス、パスワードなどを入力可能。
 * 生年月日は DateTimePicker を使用し、Expo Go での実行にも対応。
 */
export default function UserRegisterScreen() {
  // 各フォーム入力値の状態管理
  const [name, setName] = useState('');
  const [furigana, setFurigana] = useState('');
  const [birthDate, setBirthDate] = useState<Date>(new Date(1990, 0, 1));
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<number  | null>(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth();
  const membershipNumber = user.guestId
  

  /**
   * 確認ボタン押下時の処理。
   * 必須入力項目の簡易チェックを行い、未入力があればアラート表示。
   */
// src/screens/UserRegisterScreen.tsx の handleConfirm を以下のように更新

const handleConfirm = async () => {
    // 必須項目のチェック
    if (!name || !furigana || !phoneNumber || !email || !password) {
      Alert.alert('エラー', '必須項目を入力してください。');
      return;
    }
    // メールアドレス（確認用）とパスワード（確認用）の整合性チェック
    if (email !== confirmEmail) {
      Alert.alert('エラー', 'メールアドレスが一致しません。');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('エラー', 'パスワードが一致しません。');
      return;
    }
    // パスワードの最低文字数（例：8文字以上）のチェック（必要に応じて）
    if (password.length < 8) {
      Alert.alert('エラー', 'パスワードは8文字以上で入力してください。');
      return;
    }
  
    // ユーザー情報を1つのオブジェクトにまとめる（生年月日は ISO 文字列へ変換）
    const payload = {
      user: {
        name,
        furigana,
        birthDate: birthDate.toISOString(),
        phoneNumber,
        email,
        password,
        gender,
        membershipNumber
      }
    };
  
    try {
      await userRegister(payload);
      await deleteGuestId();
      navigation.navigate('EmailSentScreen', { message: '確認メールを送信しました。\nメールをご確認ください。' });
    } catch (error) {
      Alert.alert('エラー', error.message || '登録に失敗しました。');
      console.error('UserRegisterScreen: ユーザー登録エラー', error);
    }
  };

  /**
   * 生年月日を "YYYY年 M月 D日" 形式にフォーマットして返す関数
   */
  const formatBirthDate = (date: Date) => {
    if (!date) return '';
    return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`;
  };

  return (
    <View style={styles.container}>
      {/* ヘッダーエリア */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>新規会員登録</Text>
      </View>

      {/* ステップバー表示 */}
      <View style={styles.stepContainer}>
        <View style={[styles.stepItem, styles.activeStep]}>
          <Text style={styles.stepItemText}>お客様情報</Text>
        </View>
        <View style={styles.stepItem}>
          <Text style={styles.stepItemText}>メール送信</Text>
        </View>
        <View style={styles.stepItem}>
          <Text style={styles.stepItemText}>登録完了</Text>
        </View>
      </View>

      {/* 入力フォームエリア */}
      <ScrollView style={styles.formContainer}>
        {/* 氏名入力 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>氏名 <Text style={styles.required}>必須</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="例）鈴木　太郎"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* ふりがな入力 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>ふりがな <Text style={styles.required}>必須</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="例）すずき　たろう"
            value={furigana}
            onChangeText={setFurigana}
          />
        </View>

        {/* 生年月日：DateTimePickerを使用 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>
            生年月日（バースデークーポンが届きます） <Text style={styles.optional}>※変更不可</Text>
          </Text>
          <TouchableOpacity
            style={[styles.input, { justifyContent: 'center' }]}
            onPress={() => setOpenDatePicker(true)}
          >
            <Text>{formatBirthDate(birthDate)}</Text>
          </TouchableOpacity>
          {openDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) setBirthDate(selectedDate);
                setOpenDatePicker(false);
              }}
            />
          )}
        </View>

        {/* 電話番号入力 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>電話番号 <Text style={styles.required}>必須</Text></Text>
          <Text style={styles.note}>ハイフン「-」なしで入力</Text>
          <TextInput
            style={styles.input}
            placeholder="例）09012345678"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* 性別選択 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>性別 <Text style={styles.required}>必須</Text></Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 1 && styles.genderButtonSelected, // 女性の場合
              ]}
              onPress={() => setGender(1)}
            >
              <Text style={styles.genderButtonText}>女性</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 2 && styles.genderButtonSelected, // 男性の場合
              ]}
              onPress={() => setGender(2)}
            >
              <Text style={styles.genderButtonText}>男性</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 3 && styles.genderButtonSelected, // 未選択の場合
              ]}
              onPress={() => setGender(3)}
            >
              <Text style={styles.genderButtonText}>未選択</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* メールアドレス入力 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>メールアドレス <Text style={styles.required}>必須</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="例）sample@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* メール確認用 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>メールアドレス（確認用） <Text style={styles.required}>必須</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="確認のため再度ご入力ください"
            keyboardType="email-address"
            autoCapitalize="none"
            value={confirmEmail}
            onChangeText={setConfirmEmail}
          />
          <Text style={styles.note}>
          </Text>
        </View>

        {/* パスワード入力 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>パスワード <Text style={styles.required}>必須</Text></Text>
          <Text style={styles.note}>※半角英数8文字以上</Text>
          <TextInput
            style={styles.input}
            placeholder="パスワードを入力"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* パスワード（確認用） */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>パスワード（確認用） <Text style={styles.required}>必須</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="再度パスワードを入力"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* 確認ボタン */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>確認</Text>
        </TouchableOpacity>

        {/* ホームに戻るボタン */}
        <TouchableOpacity style={styles.backHomeButton} onPress={() => navigation.goBack() }>
          <Text style={styles.backHomeButtonText}>ホームに戻る</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/**
 * スタイル定義
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
    padding: 4,
  },
  stepItemText: {
    fontSize: 14,
    color: '#666',
  },
  activeStep: {
    borderBottomWidth: 2,
    borderBottomColor: '#007aff',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  required: {
    color: '#ff0000',
  },
  optional: {
    color: '#666',
    fontSize: 12,
  },
  note: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  genderButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  genderButtonSelected: {
    backgroundColor: '#007aff',
  },
  genderButtonText: {
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#007aff',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  policyText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  backHomeButton: {
    borderColor: '#007aff',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  backHomeButtonText: {
    color: '#007aff',
    fontSize: 16,
  },
});
