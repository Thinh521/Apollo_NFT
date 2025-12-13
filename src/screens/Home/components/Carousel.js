import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from '~/assets/images/images';

import {isTablet, scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

const discountBanners = [
  {
    id: '1',
    image: Images.banner_1,
    title: 'Explore Top DApps',
    subtitle: 'Discover trending decentralized apps',
    buttonText: 'Explore',
  },
  {
    id: '2',
    image: Images.banner_2,
    title: 'Secure Web3 Wallet',
    subtitle: 'Connect your wallet in seconds',
    buttonText: 'Connect Now',
  },
  {
    id: '3',
    image: Images.banner_3,
    title: 'NFT Marketplace',
    subtitle: 'Buy & sell NFTs with ease',
    buttonText: 'View NFTs',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width: windowWidth} = useWindowDimensions();
  const width = Math.round(windowWidth - 32);
  const bannerHeight = useMemo(
    () => (isTablet ? (width * 5) / 16 : (width * 9) / 16),
    [],
  );
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);

  // Memoize onViewableItemsChanged
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }, []);

  // Start auto-scroll
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (flatListRef.current && discountBanners.length > 0) {
        const nextIndex = (currentIndex + 1) % discountBanners.length;
        flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
      }
    }, 5000);
  }, [currentIndex]);

  // Stop auto-scroll
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Handle dot press
  const handleDotPress = index => {
    stopAutoScroll();
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({index, animated: true});
    setTimeout(startAutoScroll, 3000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [startAutoScroll]);

  return (
    <View style={[{width}]}>
      <FlatList
        ref={flatListRef}
        data={discountBanners}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        renderItem={({item}) => (
          <View style={[styles.discountBanner, {width}]}>
            <FastImage
              source={item.image}
              style={[styles.bannerImage, {width, height: bannerHeight}]}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
            <View style={styles.bannerContent}>
              <View>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <View style={[styles.dotsContainer]}>
        {discountBanners.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotPress(index)}
            style={index === currentIndex ? styles.bigDot : styles.smallDot}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  discountBanner: {
    overflow: 'hidden',
    borderRadius: scale(12),
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: scale(12),
  },
  bannerContent: {
    position: 'absolute',
    bottom: scale(20),
    left: scale(16),
    right: scale(16),
  },
  bannerTitle: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(4),
  },
  bannerSubtitle: {
    color: '#dddddd',
    fontSize: FontSizes.small,
  },
  dotsContainer: {
    gap: scale(8),
    marginTop: scale(16),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  smallDot: {
    width: scale(8),
    height: scale(8),
    backgroundColor: '#DEDBDB',
    borderRadius: 9999,
  },
  bigDot: {
    width: scale(10),
    height: scale(10),
    backgroundColor: Colors.primary,
    borderRadius: 9999,
  },
});
