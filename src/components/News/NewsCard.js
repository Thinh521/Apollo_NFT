import {API_BASE} from '@env';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from '~/assets/images/images';
import {
  CheckIcon,
  CommentLineIcon,
  LikeLineIcon,
  MoreLineIcon,
  ShareLineIcon,
} from '~/assets/icons/icons';

import {scale} from '~/utils/scaling';
import {formatDateTime} from '~/utils/dateUtils';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

const NewsCard = ({
  news,
  layout = 'list',
  onPress,
  onPressEdit,
  onPressDelete,
  address,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const isSlider = layout === 'slider';

  const isOwner = () => {
    if (!address || !news?.author?.addressWallet) return false;
    return news.author.addressWallet.toLowerCase() === address.toLowerCase();
  };

  const showMoreButton = isOwner();

  return (
    <TouchableOpacity
      style={[styles.card, isSlider && styles.cardSlider]}
      activeOpacity={0.9}
      onPress={onPress}>
      <View style={styles.imageContainer}>
        <FastImage
          source={
            news?.thumbnail
              ? {uri: `${API_BASE}/api/upload/${news?.thumbnail}`}
              : Images.card_1
          }
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{news?.category?.name || 'News'}</Text>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={2}>
              {news?.title}
            </Text>

            {showMoreButton && (
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => setMenuVisible(v => !v)}>
                <MoreLineIcon style={styles.moreIcon} />
              </TouchableOpacity>
            )}

            {menuVisible && (
              <View style={styles.menuBox}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    onPressEdit?.(news);
                  }}>
                  <Text style={styles.menuText}>Sửa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    onPressDelete?.(news.id);
                  }}>
                  <Text style={[styles.menuText, {color: 'red'}]}>Xóa</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.box}>
            <View style={styles.authorRow}>
              <View style={styles.avatarWrapper}>
                <FastImage
                  source={
                    news?.author?.avatar
                      ? {uri: `${API_BASE}/api/upload/${news.author.avatar}`}
                      : Images.avatar
                  }
                  style={styles.avatar}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.authorText}>
                <Text style={styles.authorName} numberOfLines={1}>
                  {news?.author?.fullName || 'Unknown'}
                </Text>
              </View>

              <View style={styles.verified}>
                <CheckIcon style={styles.verifiedIcon} />
              </View>
            </View>

            <Text style={styles.metaText}>{news?.views ?? 0} Views</Text>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {news?.description}
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.actionContainer}>
            <View style={styles.actionItem}>
              <LikeLineIcon style={styles.icon} />
              <Text style={styles.actionText}>96</Text>
            </View>
            <View style={styles.actionItem}>
              <CommentLineIcon style={styles.icon} />
              <Text style={styles.actionText}>{news?.comments ?? 0}</Text>
            </View>
            <View style={styles.actionItem}>
              <ShareLineIcon style={styles.icon} />
              <Text style={styles.actionText}>96</Text>
            </View>
          </View>

          <View style={styles.actionMeta}>
            <Text style={styles.metaText}>
              {formatDateTime(news?.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: scale(14),
    borderRadius: scale(12),
    borderColor: Colors.border,
    backgroundColor: Colors.deepBackground,
  },
  cardSlider: {
    width: scale(290),
    marginRight: scale(14),
  },
  imageContainer: {
    width: '100%',
    height: scale(180),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: scale(14),
    left: scale(14),
    backgroundColor: Colors.primary,
    borderRadius: scale(6),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
  },
  badgeText: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.bold,
  },
  main: {
    padding: scale(14),
  },
  content: {
    paddingBottom: scale(8),
    marginBottom: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerRow: {
    marginBottom: scale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  moreButton: {
    marginTop: scale(6),
    padding: scale(6),
    borderRadius: 999,
    backgroundColor: Colors.mutedBackground,
  },
  moreIcon: {
    width: scale(18),
    height: scale(18),
  },
  menuBox: {
    position: 'absolute',
    top: 44,
    right: 0,
    backgroundColor: Colors.deepBackground,
    borderRadius: scale(8),
    paddingVertical: scale(6),
    width: scale(120),
    borderWidth: 1,
    borderColor: Colors.border,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(14),
  },
  menuText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  title: {
    flex: 1,
    lineHeight: 22,
    color: Colors.textPrimary,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginRight: scale(12),
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(8),
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: scale(20),
    height: scale(20),
    borderRadius: 999,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  authorText: {
    marginLeft: scale(8),
  },
  authorName: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
  },
  verified: {
    marginLeft: scale(6),
    backgroundColor: Colors.primary,
    width: scale(12),
    height: scale(12),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedIcon: {
    width: scale(8),
    height: scale(8),
  },
  description: {
    lineHeight: 20,
    color: Colors.textMuted,
    fontSize: FontSizes.small,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionContainer: {
    flexDirection: 'row',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(16),
  },
  icon: {
    width: scale(18),
    height: scale(18),
    color: Colors.textMuted,
  },
  actionText: {
    marginLeft: scale(6),
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.bold,
  },
  actionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: FontSizes.xsmall,
    color: Colors.textMuted,
  },
  dot: {
    width: scale(3),
    height: scale(3),
    backgroundColor: Colors.textMuted,
    borderRadius: 3,
    marginHorizontal: scale(6),
  },
});

export default React.memo(NewsCard);
