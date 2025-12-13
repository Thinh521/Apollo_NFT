import {API_BASE} from '@env';
import React, {useState, useCallback} from 'react';
import {
  StatusBar,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/core';
import {showMessage} from 'react-native-flash-message';
import {useInfiniteQuery} from '@tanstack/react-query';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import Images from '~/assets/images/images';
import {EthFillIcon} from '~/assets/icons/icons';

import Header from '~/components/Header';
import {Button} from '~/components/ui/Button';
import CustomError from '~/components/CustomError/CustomError';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';
import CreatorTabSkeleton from '~/components/Skeleton/CreatorTabSkeleton';
import CreatorCardSkeleton from '~/components/Skeleton/CreatorCardSkeleton';

import {getAllArtistsApi} from '~/api/creatorApi';

import {scale} from '~/utils/scaling';
import {formatEth} from '~/utils/price';
import {formatNumber} from '~/utils/number';

import {Colors} from '~/theme/theme';
import styles from './Activity.styles';

const TIME_RANGES = [
  {label: '24h', value: '24h'},
  {label: '7d', value: '7d'},
  {label: '30d', value: '30d'},
  {label: 'All Time', value: undefined},
];

const ActivityScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const [activeTimeRange, setActiveTimeRange] = useState(undefined);
  const [followingStates, setFollowingStates] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['artists', activeTimeRange],
    queryFn: ({pageParam = 1}) =>
      getAllArtistsApi({
        timeRange: activeTimeRange,
        sortBy: 'all',
        page: pageParam,
        limit: 20,
      }),
    getNextPageParam: (lastPage, pages) => {
      return pages.length < lastPage.totalPages ? pages.length + 1 : undefined;
    },
  });

  const artistsData = data?.pages.flatMap(page => page.data) || [];

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [activeTimeRange]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleFollow = async (artistId, isFollowing) => {
    try {
      setFollowingStates(prev => ({
        ...prev,
        [artistId]: !isFollowing,
      }));

      showMessage({
        message: isFollowing ? 'Unfollowed' : 'Followed successfully',
        type: 'success',
      });
    } catch (err) {
      setFollowingStates(prev => ({
        ...prev,
        [artistId]: isFollowing,
      }));

      showMessage({
        message: err?.message || 'Action failed',
        type: 'danger',
      });
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.tabsContainer}>
        {TIME_RANGES.map(range => {
          const isActive = activeTimeRange === range.value;
          return (
            <TouchableOpacity
              key={range.value || 'alltime'}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTimeRange(range.value)}
              activeOpacity={0.8}>
              {isActive ? (
                <LinearGradient
                  colors={[Colors.gradientStart, Colors.gradientEnd]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.tabGradient}>
                  <Text style={styles.tabTextActive}>{range.label}</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.tabText}>{range.label}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderCreatorCard = ({item, index}) => {
    const isFollowing = followingStates[item.id] ?? false;
    const rank = index + 1;
    const isTopThree = rank <= 3;

    return (
      <View style={styles.card}>
        <View style={styles.rankBadge}>
          {isTopThree ? (
            <View style={styles.crownContainer}>
              <Icon
                name="crown"
                size={scale(20)}
                color={
                  rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : '#CD7F32'
                }
              />
            </View>
          ) : (
            <Text style={styles.rankNumber}>#{rank}</Text>
          )}
        </View>
        <View style={styles.creatorSection}>
          <FastImage
            source={
              item.avatar
                ? {uri: `${API_BASE}/api/upload/${item.avatar}`}
                : Images.avatar
            }
            style={[styles.avatarLarge, isTopThree && styles.avatarTopThree]}
          />

          <View style={styles.creatorDetails}>
            <Text style={styles.creatorNameLarge} numberOfLines={1}>
              {item.fullName || item.userName}
            </Text>
            <Text style={styles.creatorUsernameLarge} numberOfLines={1}>
              @{item.userName}
            </Text>
          </View>
        </View>
        <View style={styles.volumeSection}>
          <View style={styles.volumeIconContainer}>
            <EthFillIcon />
          </View>
          <View style={styles.volumeTextContainer}>
            <Text style={styles.volumeValue}>
              {formatEth(item.totalVolume)}
            </Text>
            <Text style={styles.volumeLabel}>ETH</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Icon
              name="package-variant"
              size={scale(16)}
              color={Colors.textMuted}
            />
            <Text style={styles.statLabel}>NFTs Sold</Text>
            <Text style={styles.statValue}>{item.nftsSold || 0}</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Icon
              name="account-group"
              size={scale(16)}
              color={Colors.textMuted}
            />
            <Text style={styles.statLabel}>Followers</Text>
            <Text style={styles.statValue}>
              {formatNumber(item.followerCount)}
            </Text>
          </View>
        </View>
        {isFollowing ? (
          <Button.Main
            title="Followed"
            iconLeft={
              <Icon
                name="check"
                size={scale(16)}
                color={Colors.white}
                onPress={() => handleFollow(item.id, isFollowing)}
              />
            }
          />
        ) : (
          <Button.Main
            title="Follow"
            onPress={() => handleFollow(item.id, isFollowing)}
            iconLeft={
              <Icon name="plus" size={scale(16)} color={Colors.white} />
            }
          />
        )}
      </View>
    );
  };

  const renderFooter = () =>
    isFetchingNextPage ? (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    ) : null;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        backgroundColor={Colors.background}
        barStyle="dark-content"
        translucent={false}
      />
      <Header title="Activity" showSearch={false} />

      {!isLoading ? (
        <View style={{padding: scale(16)}}>
          <CreatorTabSkeleton itemCount={4} />
          <CreatorCardSkeleton itemCount={2} />
        </View>
      ) : isError ? (
        <CustomError onRetry={refetch} />
      ) : !artistsData || artistsData.length === 0 ? (
        <CustomEmpty />
      ) : (
        <FlatList
          data={artistsData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCreatorCard}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          contentContainerStyle={{
            paddingBottom: bottom + scale(100),
            paddingHorizontal: scale(16),
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.white}
              colors={[Colors.primary]}
            />
          }
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ActivityScreen;
