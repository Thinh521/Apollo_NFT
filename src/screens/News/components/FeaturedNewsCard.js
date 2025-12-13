import {API_BASE} from '@env';
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from '~/assets/images/images';

import {Colors, FontSizes, FontWeights, Shadows} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - scale(32);
const CARD_SPACING = scale(16);
const AUTO_SCROLL_INTERVAL = 4000;

const FeaturedNewsCarousel = ({news}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollTimer = useRef(null);

  // Filter only published news or take first 5
  const featuredNews = news?.slice(0, 5) || [];

  // Auto scroll effect
  useEffect(() => {
    if (featuredNews.length <= 1) return;

    const startAutoScroll = () => {
      autoScrollTimer.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % featuredNews.length;
          scrollViewRef.current?.scrollTo({
            x: nextIndex * (CARD_WIDTH + CARD_SPACING),
            animated: true,
          });
          return nextIndex;
        });
      }, AUTO_SCROLL_INTERVAL);
    };

    startAutoScroll();

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [featuredNews.length]);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {
      useNativeDriver: false,
      listener: event => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING));
        setCurrentIndex(index);
      },
    },
  );

  const handleScrollBegin = () => {
    // Clear auto scroll when user starts scrolling
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
  };

  const handleScrollEnd = () => {
    // Restart auto scroll after user stops scrolling
    if (featuredNews.length > 1) {
      autoScrollTimer.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % featuredNews.length;
          scrollViewRef.current?.scrollTo({
            x: nextIndex * (CARD_WIDTH + CARD_SPACING),
            animated: true,
          });
          return nextIndex;
        });
      }, AUTO_SCROLL_INTERVAL);
    }
  };

  if (!featuredNews || featuredNews.length === 0) return null;

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBegin}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={16}>
        {featuredNews.map((item, index) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + CARD_SPACING),
            index * (CARD_WIDTH + CARD_SPACING),
            (index + 1) * (CARD_WIDTH + CARD_SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.cardContainer,
                {
                  transform: [{scale}],
                  opacity,
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.card}
                onPress={() => console.log('News clicked:', item.id)}>
                <FastImage
                  source={
                    item?.thumbnail
                      ? {uri: `${API_BASE}/api/upload/${item.thumbnail}`}
                      : Images.card_1
                  }
                  style={styles.image}
                  resizeMode="cover"
                />

                {/* Gradient Overlay */}
                <View style={styles.gradientOverlay} />
                {/* Category Badge */}
                {item.category && (
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>
                      {item.category.name}
                    </Text>
                  </View>
                )}

                {/* Content */}
                <View style={styles.contentOverlay}>
                  <Text numberOfLines={2} style={styles.title}>
                    {item.title}
                  </Text>
                  <Text numberOfLines={2} style={styles.description}>
                    {item.description}
                  </Text>

                  {/* Author Info */}
                  {item.author && (
                    <View style={styles.authorContainer}>
                      <FastImage
                        source={
                          item.author.avatar
                            ? {
                                uri: `${API_BASE}/api/upload/${item.author.avatar}`,
                              }
                            : Images.card_1
                        }
                        style={styles.authorAvatar}
                      />
                      <Text style={styles.authorName}>
                        {item.author.fullName}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      {/* Pagination Dots */}
      {featuredNews.length > 1 && (
        <View style={styles.pagination}>
          {featuredNews.map((_, index) => {
            const inputRange = [
              (index - 1) * (CARD_WIDTH + CARD_SPACING),
              index * (CARD_WIDTH + CARD_SPACING),
              (index + 1) * (CARD_WIDTH + CARD_SPACING),
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });

            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity: dotOpacity,
                  },
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(24),
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
  },
  card: {
    width: '100%',
    height: scale(240),
    borderRadius: scale(20),
    overflow: 'hidden',
    backgroundColor: Colors.surfaceBackground,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'transparent',
    backgroundImage:
      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
  },
  dot: {
    width: scale(6),
    height: scale(6),
    backgroundColor: Colors.primary,
    borderRadius: scale(3),
    marginRight: scale(6),
  },
  liveText: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.5,
  },
  categoryBadge: {
    position: 'absolute',
    top: scale(16),
    right: scale(16),
    backgroundColor: 'rgba(28, 81, 254, 0.9)',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(12),
    ...Shadows.medium,
  },
  categoryText: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.semiBold,
  },
  contentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: scale(20),
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    marginBottom: scale(8),
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
    marginBottom: scale(12),
    lineHeight: scale(18),
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    marginRight: scale(8),
    borderWidth: 2,
    borderColor: Colors.white,
  },
  authorName: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(16),
    gap: scale(6),
  },
  paginationDot: {
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: Colors.primary,
  },
});

export default FeaturedNewsCarousel;
