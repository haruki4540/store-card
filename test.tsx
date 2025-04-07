import { loginApi } from '@/api/auth'; // 追加：ログインAPI呼び出し関数

// ログインボタン押下時の処理関数
const handleLogin = async () => {
  // 入力チェック：どちらかが空欄なら処理中断
  if (!id || !password) {
    Alert.alert('エラー', 'IDとパスワードを入力してください');
    return;
  }

  try {
    setLoading(true); // ボタン連打防止 & UIフィードバック用ローディング開始

    // API呼び出し（成功すればトークンが返却される）
    const result = await loginApi(id, password);
    console.log('ログイン成功:', result);

    // TODO: トークン保存やホーム画面への遷移をここに追加予定

  } catch (error) {
    // エラー表示（APIからのエラー or 通信エラー）
    Alert.alert('ログイン失敗', 'IDまたはパスワードが間違っています');
  } finally {
    setLoading(false); // ローディング終了
  }
};
