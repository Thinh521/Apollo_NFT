import React from 'react';
import {FlatList, TouchableOpacity, Text, View, StyleSheet} from 'react-native';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const NewsTabs = ({categories = [], activeTab, onChange}) => {
  const tabs = [{id: 'all', name: 'All'}, ...categories];

  const renderItem = ({item}) => {
    const isActive = item.id === activeTab;

    return (
      <TouchableOpacity
        style={[styles.tab, isActive && styles.tabActive]}
        onPress={() => onChange(item.id)}
        activeOpacity={0.7}>
        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(16),
    marginBottom: scale(20),
  },
  tab: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    backgroundColor: Colors.grayLight,
    marginRight: scale(10),
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSizes.medium,
    color: Colors.textMuted,
    fontWeight: FontWeights.medium,
  },
  tabTextActive: {
    color: Colors.white,
    fontWeight: FontWeights.bold,
  },
});

export default NewsTabs;
