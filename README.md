# Store Card Mobile App

Store Card Mobile App は、Expo と React Native を用いて開発された スマートフォン向けの実用アプリです。
ユーザーの登録やログインなどの認証機能を始め、会員証QRコード表示や、店舗検索、クーポン表示など、ストアアプリに必要な基本機能を描いています。

---

## 目次
- 本アプリの目的
- 技術スタック
- ディレクトリ構成
- 機能概要
- コーディングルール
- 環境構築
- 実行方法
- 添加方法 (機能を増やす際)
- デバッグ・トラブルシュート

---

### 本アプリの目的
- 店舗ユーザーの会員登録
- QRコードを用いた会員証表示
- 店舗検索やお気に入り登録
- 給付クーポン表示

---

## 技術スタック

- **React Native + Expo**: スマホアプリ開発用のフレームワーク
- **TypeScript**: 型セーフな開発
- **React Navigation**: Stack, BottomTab, Drawer のネスト管理
- **AsyncStorage**: トークンやユーザー情報の保存
- **SafeAreaProvider**: レイアウト管理
- **nanoid**: guestId (仮ユーザーID)の発行

---

## ディレクトリ構成

```
/src
  /components         組み込み用 UI パーツ
  /contexts           AuthContext (認証情報を共有)
  /navigation         各ナビゲーションの構築
  /screens            一覧の画面コンポーネント
  /utils              AsyncStorage のラッパー/トークン関連
  /api                API通信の共通処理
App.tsx               全体ラップ
App.js                Expo用エントリーポイント
```

---

## 機能概要

### 1. 認証機能
- **LoginScreen**
  - メールアドレスとパスワードを入力
  - loginApi を呼び出し、トークンを取得
  - AsyncStorage と AuthContext に保存

- **AuthContext.tsx**
  - 起動時に AsyncStorage から情報を復元
  - トークン, user, loading を Context で共有

- **guestId**
  - 未ログインユーザーの場合、自動生成


### 2. ナビゲーション
- **RootDrawerNavigator**
  - 右側スライドの Drawer
  - CustomDrawerContent でメニュー切り替え

- **MainStackNavigator**
  - Login, Settings, Home, UserRegisterScreen, EmailSentScreen
  - headerRight に HeaderMenu を追加

- **BottomTabNavigator**
  - HomeTab, CouponTab, MemberCardTab, StoreInfoTab, NewsTab
  - MaterialIcons を使用


### 3. ダミー画面

- HomeScreen.tsx: 簡易なようこそメッセージ
- MemberCardScreen.tsx: 会員証QR表示
- StoreScreen.tsx: 店舗検索とお気に入り切り替え
- EmailSentScreen.tsx: メール確認給付メッセージ
- UserRegisterScreen.tsx: 必須項目入力フォーム + 登録API

---

## コーディングルール

- このプロジェクトでは、**第三者でもわかりやすい読みやすいコード**を目指しています

### 言文等
- TypeScript を使用 (型定義や補完性を保証)
- 文本は **「~する」言語で統一**
- はじめにファイル範囲について **doc comment で概要を説明**
- 部分注釈もすべて「// この処理は...」として分かりやすく表示


### 呼び出し方法
- Navigation は必ず型指定
  - `useNavigation<NativeStackNavigationProp<MainStackParamList>>()`
- `useRoute()` も型指定必須
- 入力値は useState で管理
- API呼び出しは `apiCall` を使用

---

## 環境構築

### 前提
- Node.js
- npm / yarn
- Expo CLI:
```bash
npm install -g expo-cli
# または
yarn global add expo-cli
```

### インストール
```bash
git clone https://github.com/your-user/store-card-mobile-app.git
cd store-card-mobile-app
npm install
# または
yarn install
```

---

## 実行方法

```bash
expo start
```
上記で localhost:19000 が立ち上がります。
Expo Go アプリでスマホで試したり、iOS/Android エミュレータで開発が可能です。

---

## 機能追加手順

新しい画面(タブ/スタック)や機能を追加するには、以下の手順に従う

### 1. 画面追加
- `/screens` 配下に .tsx ファイルを作成
- `MainStackNavigator.tsx` または `BottomTabNavigator.tsx` に route 追加

### 2. API連携
- `/api` 配下に apiCall を使ったメソッドを追加
- `/screens/YourScreen.tsx` で呼び出し

### 3. 情報保存
- AsyncStorage の操作は `/utils/authToken.ts` または `/utils/userStorage.ts` を使用

---

## デバッグ/トラブルシュート

- TypeScriptで型エラー:
  - tsconfig.json の `paths` 設定の確認
  - VSCode キャッシュクリア & リロード

- AsyncStorage が保存されない:
  - Expoの機能制限やパーミッションチェック

- navigate でパラメータが通らない:
  - MainStackParamList の型に対した props を見直す