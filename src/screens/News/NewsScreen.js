import {showMessage} from 'react-native-flash-message';
import React, {useCallback, useState, useMemo} from 'react';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '~/components/Header';
import NewsTabs from './components/NewsTabs';
import {Button} from '~/components/ui/Button';
import NewsList from '~/components/News/NewsList';
import CustomError from '~/components/CustomError/CustomError';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';
import FeaturedNewsCarousel from './components/FeaturedNewsCard';

import {useNews} from '~/hook/useNews';
import {useCategories} from '~/hook/useCategories';

import {deleteNewsApi} from '~/api/NewsApi';

import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './News.styles';

const NewsScreen = () => {
  const navigation = useNavigation();
  const {address} = useAppKitAccount();
  const {bottom} = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('all');

  const {
    newsData,
    isLoading: isNewsLoading,
    error: isNewsError,
    refetch: isNewsRefetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNews();

  const {categoryList} = useCategories('news');

  useFocusEffect(
    useCallback(() => {
      isNewsRefetch();
    }, []),
  );

  // Filter news based on active tab
  const filteredNews = useMemo(() => {
    if (!newsData) return [];

    if (activeTab === 'all') {
      return newsData;
    }

    return newsData.filter(news => news.categoryId === activeTab);
  }, [newsData, activeTab]);

  const handleDeleteNews = newsId => {
    Alert.alert('Delete News', 'Are you sure you want to delete this news?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteNewsApi(newsId);
            isNewsRefetch();

            showMessage({
              message: 'Tin tức đã được xóa thành công',
              type: 'success',
            });
          } catch (err) {
            Alert.alert('Error', err?.message || 'Delete failed');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      <Header title="News" showSearch={false} />

      {isNewsLoading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.emptyText}>Loading News...</Text>
        </View>
      ) : isNewsError ? (
        <CustomError onRetry={isNewsRefetch} />
      ) : !newsData || newsData.length === 0 ? (
        <CustomEmpty />
      ) : (
        <FlatList
          data={[1]}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContainer,
            {paddingBottom: bottom + scale(100)},
          ]}
          renderItem={() => (
            <>
              {/* Featured News Carousel */}
              <FeaturedNewsCarousel news={newsData} />

              <View>
                <Button.Main
                  title="Add News"
                  onPress={() => {
                    navigation.navigate('NoBottomTab', {
                      screen: 'CreateUpdateNews',
                    });
                  }}
                />
              </View>

              {/* Category Tabs */}
              <NewsTabs
                categories={categoryList}
                activeTab={activeTab}
                onChange={setActiveTab}
              />

              {/* Filtered News List */}
              <NewsList
                news={filteredNews}
                address={address}
                onDelete={handleDeleteNews}
              />

              {/* Empty State */}
              {filteredNews.length === 0 && (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    No news available in this category
                  </Text>
                </View>
              )}
            </>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default NewsScreen;
