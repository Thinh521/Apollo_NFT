import React, {useCallback, useState} from 'react';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '~/components/Header';
import ProductList from '~/components/Product/ProductList';
import ProductSlider from '~/components/Product/ProductSlider';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';
import CustomError from '~/components/CustomError/CustomError';
import ProductCardSkeleton from '~/components/Skeleton/ProductCardSkeleton';
import ProductSliderSkeleton from '~/components/Skeleton/ProductSliderSkeleton';

import {useProducts} from '~/hook/useProducts';

import {commonStyles} from '~/styles/common';
import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './MarketPlace.styles';

const MarketPlaceScreen = () => {
  const navigation = useNavigation();
  const {address} = useAppKitAccount();
  const {bottom} = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);

  const {
    allProducts,
    buyNowProducts,
    auctionProducts,
    isLoading,
    error,
    refetch,
  } = useProducts(address);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.background}
        barStyle="light-content"
        translucent={false}
      />

      <Header title="Discover NFTs" showSearch={true} />

      <FlatList
        data={[1]}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {paddingBottom: bottom + scale(140), marginTop: scale(26)},
        ]}
        renderItem={() => (
          <View>
            {/* Live Auction Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Live Auction</Text>
                  <Text style={styles.sectionSubtitle}>
                    Bid on trending NFTs
                  </Text>
                </View>
                <TouchableOpacity
                  style={commonStyles.viewMoreButton}
                  onPress={() => navigation.navigate('AllProducts')}>
                  <Text style={commonStyles.viewMoreText}>View all</Text>
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <ProductSliderSkeleton itemCount={2} />
              ) : error ? (
                <CustomError onRetry={refetch} />
              ) : !auctionProducts || auctionProducts.length === 0 ? (
                <CustomEmpty type="noProduct" />
              ) : (
                <ProductSlider products={auctionProducts} onEditPress={false} />
              )}
            </View>

            <View style={styles.divider} />

            {/* Market Place Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Market Place</Text>
                  <Text style={styles.sectionSubtitle}>
                    {buyNowProducts?.length || 0} items available
                  </Text>
                </View>
                <TouchableOpacity
                  style={commonStyles.viewMoreButton}
                  onPress={() => navigation.navigate('AllProducts')}>
                  <Text style={commonStyles.viewMoreText}>View all</Text>
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <ProductCardSkeleton layout="grid" itemCount={4} />
              ) : error ? (
                <CustomError onRetry={refetch} />
              ) : !buyNowProducts || buyNowProducts.length === 0 ? (
                <CustomEmpty type="noProduct" />
              ) : (
                <ProductList products={buyNowProducts} onEditPress={false} />
              )}
            </View>

            <View style={styles.divider} />

            {/* Recommended Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Recommended</Text>
                  <Text style={styles.sectionSubtitle}>Curated for you</Text>
                </View>
                <TouchableOpacity
                  style={commonStyles.viewMoreButton}
                  onPress={() => navigation.navigate('AllProducts')}>
                  <Text style={commonStyles.viewMoreText}>View all</Text>
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <ProductSliderSkeleton itemCount={2} />
              ) : error ? (
                <CustomError onRetry={refetch} />
              ) : !allProducts || allProducts.length === 0 ? (
                <CustomEmpty type="noProduct" />
              ) : (
                <ProductSlider products={allProducts} onEditPress={false} />
              )}
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      />
    </SafeAreaView>
  );
};

export default MarketPlaceScreen;
