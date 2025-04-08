// src/navigation/AppNavigator.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootDrawerNavigator from "./RootDrawerNavigator";
import { SafeAreaView, StyleSheet } from "react-native";

/**
 * AppNavigator
 * NavigationContainer で RootDrawerNavigator をラップする。
 */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <RootDrawerNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
