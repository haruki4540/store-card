// src/contexts/AuthContext.tsx

import React, { createContext, useState, useEffect, useCallback, ReactNode, FC, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * AuthContextType
 * グローバルな認証状態として、トークン、更新関数、ローディング状態等を管理する型
 */
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  loading: boolean;
  refetchToken: () => Promise<void>;
}

// AuthContext の作成。初期値にはダミーの関数・値を設定
const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
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
  const [loading, setLoading] = useState(true);

  /**
   * refetchToken
   * AsyncStorage から認証トークンを取得し、認証状態を更新する関数
   */
  const refetchToken = useCallback(async () => {
    try {
      console.log("AuthProvider: refetchToken 呼び出し");
      const savedToken = await AsyncStorage.getItem("auth_token");
      console.log("AuthProvider: AsyncStorage からのトークン取得結果:", savedToken);
      setToken(savedToken);
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
    <AuthContext.Provider value={{ token, setToken, loading, refetchToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth フックをエクスポートし、他のコンポーネントから認証状態にアクセスできるようにする
export const useAuth = () => useContext(AuthContext);
