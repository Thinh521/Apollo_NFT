import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {FlatList, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '~/components/Header';
import Carousel from './components/Carousel';
import NewsSlider from '~/components/News/NewsSlider';
import ProductList from '~/components/Product/ProductList';
import CustomError from '~/components/CustomError/CustomError';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';
import CryptoCommunityBanner from './components/CryptoCommunityBanner';
import CollectionSlider from '~/components/Collection/CollectionSlider';
import ProductCardSkeleton from '~/components/Skeleton/ProductCardSkeleton';
import CollectionCardSkeleton from '~/components/Skeleton/CollectionCardSkeleton';

import {useNews} from '~/hook/useNews';
import {useProducts} from '~/hook/useProducts';
import {useProductCollections} from '~/hook/useCollections';

import {commonStyles} from '~/styles/common';
import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './Home.styles';
import NewsCardSkeleton from '../../components/Skeleton/NewsCardSkeleton';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {bottom} = useSafeAreaInsets();

  const {
    collectionData,
    isLoading: isCollectionLoading,
    error: isCollectionError,
    refetch: isCollectionRefetch,
  } = useProductCollections();

  const {
    newsData,
    isLoading: isNewsLoading,
    error: isNewsError,
    refetch: isNewsRefetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNews();

  const {
    allProducts,
    isLoading: isProductsLoading,
    error: isProductsError,
    refetch: isProductsRefetch,
    fetchNextPage: productsFetchNextPage,
    hasNextPage: productsHasNextPage,
    isFetchingNextPage: productsIsFetchingNextPage,
  } = useProducts();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      <Header title="Netfly" />

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
            <View style={styles.section}>
              <Carousel />
            </View>

            <View style={styles.section}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Collections</Text>
                <TouchableOpacity
                  style={commonStyles.viewMoreButton}
                  onPress={() =>
                    navigation.navigate('NoBottomTab', {
                      screen: 'AllCollections',
                    })
                  }>
                  <Text style={commonStyles.viewMoreText}>View all</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.collectionsContainer}>
                {isCollectionLoading ? (
                  <CollectionCardSkeleton itemCount={2} />
                ) : isCollectionError ? (
                  <CustomError onRetry={isCollectionRefetch} />
                ) : !collectionData || collectionData.length === 0 ? (
                  <CustomEmpty />
                ) : (
                  <CollectionSlider data={collectionData} onEditPress={false} />
                )}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>News</Text>
                <TouchableOpacity
                  style={commonStyles.viewMoreButton}
                  onPress={() =>
                    navigation.navigate('NoBottomTab', {
                      screen: 'AllNews',
                    })
                  }>
                  <Text style={commonStyles.viewMoreText}>View all</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.newsContainer}>
                {isNewsLoading ? (
                  <NewsCardSkeleton itemCount={2} layout="slider" />
                ) : isNewsError ? (
                  <CustomError onRetry={isNewsRefetch} />
                ) : !newsData || newsData.length === 0 ? (
                  <CustomEmpty />
                ) : (
                  <NewsSlider news={newsData} />
                )}
              </View>
            </View>

            <View style={styles.section}>
              <CryptoCommunityBanner />
            </View>

            <View style={styles.section}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Products</Text>
                <TouchableOpacity
                  style={commonStyles.viewMoreButton}
                  onPress={() =>
                    navigation.navigate('NoBottomTab', {
                      screen: 'AllProducts',
                    })
                  }>
                  <Text style={commonStyles.viewMoreText}>View all</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.productsContainer}>
                {isProductsLoading ? (
                  <ProductCardSkeleton layout="grid" itemCount={4} />
                ) : isProductsError ? (
                  <CustomError onRetry={isProductsRefetch} />
                ) : !allProducts || allProducts.length === 0 ? (
                  <CustomEmpty type="noProduct" />
                ) : (
                  <ProductList products={allProducts} onEditPress={false} />
                )}
              </View>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
