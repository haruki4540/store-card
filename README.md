# Store Card Mobile App

Store Card Mobile App は、Expo/React Native を用いて構築されたスマホ向けアプリです。  
このアプリは、ユーザー認証、会員証情報の表示、下段タブナビゲーション、およびドロワーメニュー（右側からスライドして表示）を備えています。

## 目次
- 特徴
- 技術スタック
- ディレクトリ構成
- 機能概要
  - 認証機能と状態管理
  - ナビゲーション構成
  - レスポンシブな UI
- セットアップ & インストール
- 実行方法
- 開発の流れ
- トラブルシュート
- 今後の展望

## 特徴
- **認証機能**  
  ユーザーがログインすると、JWT などの認証トークンを取得し、AsyncStorage と AuthContext でグローバルに管理します。
- **ナビゲーション**  
  ・**Drawer Navigator**  
    右側からスライドして表示されるドロワーメニュー。認証状態に応じ「ログイン」または「ログアウト」ボタンが表示される。  
  ・**Stack Navigator**  
    ドロワー内で MainTabs（下段タブ）、Login、Settings を管理。  
  ・**Bottom Tab Navigator**  
    下段に「ホーム」「クーポン」「会員証」「店舗案内」「ニュース」のタブを表示。  
- **レスポンシブ UI**  
  SafeAreaProvider と Flexbox レイアウトにより、各端末で適切に表示されます。

## 技術スタック
- React Native / Expo
- React Navigation (Drawer, Stack, Tab)
- TypeScript
- AsyncStorage
- react-native-safe-area-context
- @expo/vector-icons

## ディレクトリ構成例
```
/src
  /components
    HeaderMenu.tsx
    CustomDrawerContent.tsx
  /contexts
    AuthContext.tsx
  /navigation
    AppNavigator.tsx
    MainStackNavigator.tsx
    RootDrawerNavigator.tsx
    BottomTabNavigator.tsx
  /screens
    HomeScreen.tsx
    LoginScreen.tsx
    MemberCardScreen.tsx
    SettingsScreen.tsx
  /utils
    authToken.ts
  /constants
    testUsers.ts
App.tsx
```

## 機能概要

### 認証機能と状態管理
1. **ログイン処理の流れ:**
   - LoginScreen でメールアドレスとパスワードを入力（バリデーションあり）。
   - 正常なら `loginApi` を呼び出し、認証トークンを取得。
   - 取得したトークンは AsyncStorage に保存され、AuthContext の `setToken` でグローバルに状態更新。
   - 各画面は AuthContext を使って認証状態を監視し、UI を切り替える。

2. **AuthContext の仕組み:**
   - AuthContext で token, loading, setToken, refetchToken を管理。
   - プロジェクト全体で状態を共有し、変更があると各画面が再レンダリング。

### ナビゲーション構成
- **Drawer Navigator (RootDrawerNavigator):**  
  右側からスライドし、CustomDrawerContent により認証状態に応じた「ログイン」または「ログアウト」ボタンが表示される。
- **Stack Navigator (MainStackNavigator):**  
  Drawer 内にあり、MainTabs（BottomTabNavigator）、Login、Settings を管理。Header に HeaderMenu を配置。
- **Bottom Tab Navigator (BottomTabNavigator):**  
  下段に「ホーム」「クーポン」「会員証」「店舗案内」「ニュース」のタブを表示。

### レスポンシブな UI
- SafeAreaProvider/SafeAreaView により、各端末の安全領域に対応。
- Flexbox レイアウトで各画面の余白やパディングを調整。

## セットアップ & インストール

### 前提条件
- Node.js と npm (または yarn)
- Expo CLI (`npm install -g expo-cli` または `yarn global add expo-cli`)

### インストール
```bash
git clone https://your-repo-url.git
cd your-project-folder
npm install
# または yarn install
```

## 実行方法

Expo を利用して、以下のコマンドで起動します。
```bash
expo start
```
Expo Go アプリから QR コードで実機テストが可能です。

## 開発の流れ

1. **認証機能実装:**  
   LoginScreen で API 呼び出し、トークン保存、AuthContext によるグローバル状態更新を実装。
2. **ナビゲーション実装:**  
   DrawerNavigator, MainStackNavigator, BottomTabNavigator を組み合わせ、各画面とモーダル（Login, Settings）を管理。
3. **UI/レスポンシブ設計:**  
   SafeAreaProvider と Flexbox を利用し、各端末で見やすいレイアウトに調整。
4. **デバッグ & テスト:**  
   コンソールログ、Expo のデバッガー、実機テストなどで機能を確認。

## トラブルシュート

- **型エラーやパスのエラー:**  
  tsconfig.json の paths 設定を確認し、必要に応じてキャッシュクリアまたはエディタの再起動を行う。
- **ナビゲーションの不具合:**  
  ネストされたナビゲーションの型定義や navigate() の呼び出し方を再確認する。
- **認証状態が更新されない:**  
  LoginScreen の API 呼び出し、AsyncStorage 保存、setToken() の処理とログ出力を確認する。

## 今後の展望

- バックエンド API の連携
- UI/UX のさらなる改善（外部 UI ライブラリの導入）
- 自動テストと CI/CD の構築

---

以上が、フロントエンド実装の技術的な詳細を盛り込んだ README サンプルです。  
この内容を Notion や README.md としてコピー＆ペーストすれば、プロジェクトメンバーや新規参加者にとって分かりやすい技術ドキュメントとなります。
