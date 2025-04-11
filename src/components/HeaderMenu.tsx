/**
 * HeaderMenu.tsx
 *
 * 画面右上に表示されるメニューアイコン（ハンバーガーボタン）。
 * - 押下すると親のドロワーナビゲーターを開閉する
 */

import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '@/navigation/RootDrawerNavigator';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export default function HeaderMenu() {
  const navigation = useNavigation<NavigationProp>();

  /**
   * openDrawer
   * 親ナビゲーターのドロワーをトグル（開閉）する。
   */
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
    fontSize: 32,
  },
});
