/**
 * StoreScreen.tsx
 *
 * 店舗情報を表示する画面。
 * - 「店舗検索」と「お気に入り店舗」をタブで切り替える
 * - タブに応じて表示内容を変更する
 * - 実装例として都道府県のリストを仮表示している
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const StoreScreen: React.FC = () => {
  // タブの状態を管理する（'search' または 'favorites'）
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search');

  return (
    <SafeAreaView style={styles.container}>
      {/* タブ切り替えエリア */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'search' && styles.activeTab]}
          onPress={() => setActiveTab('search')}
        >
          <Text style={styles.tabText}>店舗検索</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'favorites' && styles.activeTab]}
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={styles.tabText}>お気に入り店舗</Text>
        </TouchableOpacity>
      </View>

      {/* コンテンツ表示エリア */}
      {activeTab === 'search' ? (
        // 「店舗検索」タブの内容を表示する
        <ScrollView style={styles.content}>
          {/* 仮の都道府県リストを表示する例 */}
          <TouchableOpacity style={styles.listItem}><Text style={styles.listText}>北海道</Text></TouchableOpacity>
          <TouchableOpacity style={styles.listItem}><Text style={styles.listText}>宮城県</Text></TouchableOpacity>
          <TouchableOpacity style={styles.listItem}><Text style={styles.listText}>埼玉県</Text></TouchableOpacity>
          <TouchableOpacity style={styles.listItem}><Text style={styles.listText}>東京都</Text></TouchableOpacity>
          <TouchableOpacity style={styles.listItem}><Text style={styles.listText}>神奈川県</Text></TouchableOpacity>
          <TouchableOpacity style={styles.listItem}><Text style={styles.listText}>大阪府</Text></TouchableOpacity>
        </ScrollView>
      ) : (
        // 「お気に入り店舗」タブの内容を表示する
        <View style={styles.content}>
          <Text style={styles.favText}>あなたのお気に入り店舗一覧</Text>
          {/* 実際には FlatList などで店舗データを表示する */}
        </View>
      )}
    </SafeAreaView>
  );
};

export default StoreScreen;

// スタイル定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // タブ切り替え部分
  tabContainer: {
    flexDirection: 'row',
    height: 48,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF9900',
  },
  tabText: {
    fontSize: 16,
  },

  // コンテンツエリア
  content: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listText: {
    fontSize: 16,
  },
  favText: {
    fontSize: 16,
    marginBottom: 8,
  },

  // 画面下部のタブバー（未使用だが定義済み）
  bottomTab: {
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  bottomTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabText: {
    fontSize: 12,
    color: '#333',
  },

  // 中央のボタン（例：ロゴなどに使用）
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF9900',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -15,
  },
  centerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
