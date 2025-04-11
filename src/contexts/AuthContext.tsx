/**
 * AuthContext.tsx
 *
 * アプリ全体で「認証状態（トークンとユーザー情報）」を共有するための仕組み。
 * - ログイン時のユーザー情報やトークンを Context 経由で管理
 * - ゲスト利用者にも仮の guestId を発行して一貫した識別が可能
 * - アプリ起動時に保存済みの情報を復元し、状態を再設定する
 */

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  FC,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrCreateGuestId } from '@/utils/guestStorage';

/**
 * 認証状態を表す Context の型定義
 */
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  refetchToken: () => Promise<void>;
}

/**
 * アプリで管理するユーザー情報の構造
 */
interface User {
  name?: string;
  email?: string;
  guestId?: string;
  membershipNumber?: string;
  phoneNumber?: string;
}

// 初期状態（ダミー関数を含む）
const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
  loading: true,
  refetchToken: async () => {},
});

/**
 * AuthProvider コンポーネント
 *
 * このプロバイダーでアプリ全体を囲むことで、
 * 任意のコンポーネントから認証情報へアクセスできる。
 */
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * refetchToken
   * - ローカルストレージからトークンとユーザー情報を取得
   * - なければゲストIDを生成して保存する
   */
  const refetchToken = useCallback(async () => {
    try {
      const savedToken = await AsyncStorage.getItem('auth_token');
      setToken(savedToken);

      const savedUser = await AsyncStorage.getItem('user_info');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } else {
        const guestId = await getOrCreateGuestId();
        const guestData: User = { guestId };
        setUser(guestData);
        await AsyncStorage.setItem('user_info', JSON.stringify(guestData));
      }
    } catch (err) {
      console.error('AuthProvider: トークン取得エラー', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初回マウント時にトークン・ユーザー情報を読み込む
  useEffect(() => {
    refetchToken();
  }, [refetchToken]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, loading, refetchToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth
 * 任意のコンポーネントから AuthContext にアクセスするためのカスタムフック
 */
export const useAuth = () => useContext(AuthContext);
