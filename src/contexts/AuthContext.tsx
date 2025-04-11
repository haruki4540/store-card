// src/contexts/AuthContext.tsx

import React, { createContext, useState, useEffect, useCallback, ReactNode, FC, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { getOrCreateGuestId } from "@/utils/guestStorage";

/**
 * AuthContextType
 * グローバルな認証状態として、トークン、更新関数、ローディング状態等を管理する型
 */
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  refetchToken: () => Promise<void>;
}
// 会員の場合のユーザ情報、またはゲストの場合の情報
interface User {
  name?: string;
  email?: string;
  guestId?: string;
  lastUpdated: number;
  membershipNumber?: string; // 会員番号、必要になったら使う
  uniqueCode?: string;       // QRコード用識別子
  phoneNumber?: string;      // 二段階認証用電話番号
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  couponBalance?: number;
}


// AuthContext の作成。初期値にはダミーの関数・値を設定
const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
  loading: true,
  refetchToken: async () => {},
});

/**
 * AuthProviderProps
 * AuthProvider コンポーネントが受け取る props の型定義（children を含む）
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider
 * アプリ全体で認証状態を共有するためのプロバイダー
 */
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * refetchToken
   * AsyncStorage から認証トークンを取得し、認証状態を更新する関数
   */
  const refetchToken = useCallback(async () => {
    try {
      const savedToken = await AsyncStorage.getItem("auth_token");
      setToken(savedToken);

      const savedUser = await AsyncStorage.getItem("user_info");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } else {
        const guestId = await getOrCreateGuestId();
        const guesData: User = { guestId, lastUpdated: new Date().getTime() };
        console.log(guesData);
        setUser(guesData);
        await AsyncStorage.setItem("user_info", JSON.stringify(guesData));
      }
    } catch (err) {
      console.error("AuthProvider: トークン取得エラー：", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // コンポーネントのマウント時にトークンを一度取得する
  useEffect(() => {
    refetchToken();
  }, [refetchToken]);

  return (
    // AuthContext.Provider で、トークン、setToken、loading、refetchToken をコンテキストとして提供する
    <AuthContext.Provider value={{ token, setToken, user, setUser, loading, refetchToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth フックをエクスポートし、他のコンポーネントから認証状態にアクセスできるようにする
export const useAuth = () => useContext(AuthContext);
