import {API_BASE} from '@env';
import React, {useCallback, useRef, useState} from 'react';
import {Text, View, StatusBar, TouchableOpacity, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';

import Images from '~/assets/images/images';
import {BackIcon} from '~/assets/icons/icons';

import AnimatedHeader from '~/components/AnimatedHeader';
import CustomError from '~/components/CustomError/CustomError';

import {updateNewsViewApi} from '~/api/NewsApi';

import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './NewsDetail.styles';

const NewsDetailScreen = ({route, navigation}) => {
  const {news} = route.params || {};

  console.log('news', news);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [viewsState, setViewsState] = useState(news?.views ?? 0);

  const scrollY = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      const id = Number(news?.id);
      if (!news || isNaN(id)) {
        console.warn('[NewsDetail] skip update view - invalid id:', news?.id);
        return () => {
          cancelled = true;
        };
      }

      (async () => {
        try {
          const res = await updateNewsViewApi(id);
          if (!cancelled && res?.data?.views != null) {
            setViewsState(res.data.views);
          } else if (!cancelled) {
            setViewsState(prev => (Number(prev) || 0) + 1);
          }
        } catch (err) {
          console.warn('[NewsDetail] update view failed:', err);
        }
      })();

      return () => {
        cancelled = true;
      };
    }, [news?.id]),
  );

  if (!news) {
    return <CustomError />;
  }

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <AnimatedHeader
        scrollY={scrollY}
        title={news.title}
        leftComponent={<BackIcon />}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        {news.thumbnail && (
          <FastImage
            source={
              news?.thumbnail
                ? {uri: `${API_BASE}/api/upload/${news?.thumbnail}`}
                : Images.card_1
            }
            style={styles.thumbnail}
            resizeMode="cover"
          />
        )}

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{news.title}</Text>
          <View style={styles.authorSection}>
            <FastImage
              source={
                news?.author?.avatar
                  ? {uri: `${API_BASE}/api/upload/${news.author.avatar}`}
                  : Images.avatar
              }
              style={styles.authorAvatar}
              resizeMode="cover"
            />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>
                {news.author?.fullName || 'Unknown Author'}
              </Text>
              <Text style={styles.dateText}>
                {formatDate(news.createdAt)} • {viewsState} lượt xem
              </Text>
            </View>
            {news.category && (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{news.category.name}</Text>
              </View>
            )}
          </View>

          <View style={styles.actionBar}>
            <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
              <Icon
                name={liked ? 'heart' : 'heart-outline'}
                size={scale(24)}
                color={liked ? Colors.error : Colors.textMuted}
              />
              <Text style={styles.actionText}>
                {likeCount > 0 ? likeCount : 'Like'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon
                name="chatbubble-outline"
                size={scale(24)}
                color={Colors.textMuted}
              />
              <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon
                name="share-social-outline"
                size={scale(24)}
                color={Colors.textMuted}
              />
              <Text style={styles.actionText}>share</Text>
            </TouchableOpacity>
          </View>

          {news.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{news.description}</Text>
            </View>
          )}

          <Text style={styles.content}>{news.content}</Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Bài viết được đăng vào {formatDate(news.createdAt)}
              {news.updatedAt !== news.createdAt &&
                ` • Cập nhật lần cuối: ${formatDate(news.updatedAt)}`}
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetailScreen;
