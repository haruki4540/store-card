// src/components/HeaderMenu.tsx

import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '@/navigation/RootDrawerNavigator';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export default function HeaderMenu() {
  const navigation = useNavigation<NavigationProp>();

  // 親ドロワーに対してトグルアクションをディスパッチ
  const openDrawer = () => {
    navigation.getParent()?.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <TouchableOpacity onPress={openDrawer} style={styles.button}>
      <Text style={styles.text}>☰</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  text: {
    fontSize: 24,
  },
});
