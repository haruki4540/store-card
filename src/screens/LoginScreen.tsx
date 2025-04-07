import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "@/navigation/AppNavigator";

/**
 * LoginScreen
 * 
 * ログイン画面
 * ユーザーはメールアドレスとパスワードを入力してログインボタンを押下
 * 現段階ではバリデーションのみ行い、HomeScreenへ遷移する
 * 
 * @returns JSX.Element
 */
export default function LoginScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('エラー', 'メールアドレスとパスワードを入力してください');
            return;
        }
        // ここにAPI承認処理が入る予定
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>メールアドレス</Text>
            <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
            />
            <Text style={styles.label}>パスワード</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder="●●●●●●"
            />

            <Button title="ログイン" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center'},
    label: { fontSize: 16, marginBottom: 5 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 15,
    },
});