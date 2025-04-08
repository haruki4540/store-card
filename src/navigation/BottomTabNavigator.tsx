// src/navigation/BottomTabNavigator.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "@/screens/HomeScreen";
import MemberCardScreen from "@/screens/MemberCardScreen";

// ダミーのクーポン画面
const CouponScreen = () => (
  <React.Fragment>
    <MaterialIcons name="local-offer" size={50} />
  </React.Fragment>
);

// ダミーの店舗案内画面
const StoreInfoScreen = () => (
  <React.Fragment>
    <MaterialIcons name="store" size={50} />
  </React.Fragment>
);

// ダミーのニュース画面
const NewsScreen = () => (
  <React.Fragment>
    <MaterialIcons name="article" size={50} />
  </React.Fragment>
);

export type BottomTabParamList = {
  HomeTab: undefined;
  CouponTab: undefined;
  MemberCardTab: undefined;
  StoreInfoTab: undefined;
  NewsTab: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = "help-outline";
          switch (route.name) {
            case "HomeTab":
              iconName = "home";
              break;
            case "CouponTab":
              iconName = "local-offer";
              break;
            case "MemberCardTab":
              iconName = "card-membership";
              break;
            case "StoreInfoTab":
              iconName = "store";
              break;
            case "NewsTab":
              iconName = "article";
              break;
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f00",
        tabBarInactiveTintColor: "#888",
        // タブバーの下余白と高さを調整（レスポンシブに対応させる場合は他手法も検討）
        tabBarStyle: { paddingBottom: 10, height: 60 },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: "ホーム" }}
      />
      <Tab.Screen
        name="CouponTab"
        component={CouponScreen}
        options={{ title: "クーポン" }}
      />
      <Tab.Screen
        name="MemberCardTab"
        component={MemberCardScreen}
        options={{ title: "会員証" }}
      />
      <Tab.Screen
        name="StoreInfoTab"
        component={StoreInfoScreen}
        options={{ title: "店舗案内" }}
      />
      <Tab.Screen
        name="NewsTab"
        component={NewsScreen}
        options={{ title: "ニュース" }}
      />
    </Tab.Navigator>
  );
}
