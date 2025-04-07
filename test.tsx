// src/navigation/AppNavigator.tsx

import LoginScreen from '@/screens/LoginScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  MemberCard: undefined;
};

// ...

<Stack.Screen
  name="Login"
  component={LoginScreen}
  options={{ title: 'ログイン' }}
/>
