import {API_BASE} from '@env';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from '~/assets/images/images';
import {EditIcon, PlusIcon, CheckIcon, RightIcon} from '~/assets/icons/icons';

import {Button} from '~/components/ui/Button';
import ProductList from '~/components/Product/ProductList';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';

import {scale} from '~/utils/scaling';
import {formatAddress} from '~/utils/formatAddress';

import {useAuthStore} from '~/stores/auth.store';

import {Colors} from '~/theme/theme';
import styles from './Profile.styles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {address} = useAppKitAccount();

  const user = useAuthStore(state => state.user);
  const token = useAuthStore.getState().token;

  console.log('token', token);

  const [activeTab, setActiveTab] = useState('product_nft');
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile =
    user?.addressWallet?.toLowerCase() === address?.toLowerCase();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <FlatList
        data={[1]}
        style={styles.container}
        contentContainerStyle={{paddingBottom: scale(120)}}
        keyExtractor={() => 'profile-section'}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View>
            {/* Background Header */}
            <View style={styles.backgroundContainer}>
              <FastImage
                source={{uri: `${API_BASE}/api/upload/${user?.background}`}}
                style={styles.backgroundImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.profileSection}>
              {/* Avatar with Edit Badge */}
              <View style={styles.avatarContainer}>
                <FastImage
                  source={
                    user?.avatar
                      ? {uri: `${API_BASE}/api/upload/${user.avatar}`}
                      : Images.avatar
                  }
                  style={styles.avatar}
                  resizeMode="cover"
                />
                {user && (
                  <TouchableOpacity
                    style={styles.verifiedBadge}
                    onPress={() => {
                      navigation.navigate('NoBottomTab', {
                        screen: 'UpdateProfile',
                        params: {
                          user: user,
                        },
                      });
                    }}
                    activeOpacity={0.7}>
                    <EditIcon />
                  </TouchableOpacity>
                )}
              </View>

              {/* Name & Username */}
              <View style={styles.nameSection}>
                <View style={styles.nameCheck}>
                  <Text style={styles.displayName}>
                    {user?.fullName || 'No name'}
                  </Text>
                  <View style={styles.checkBadge}>
                    <CheckIcon style={styles.checkIcon} />
                  </View>
                </View>
                <Text style={styles.username}>
                  @{user?.userName || 'username'}
                </Text>
              </View>

              {/* Bio */}
              <Text style={styles.bio}>{user?.bio || 'No bio available'}</Text>

              {/* Wallet & Join Date */}
              <View style={styles.metaInfo}>
                <View style={styles.metaItem}>
                  <Icon name="credit-card" size={16} color={Colors.primary} />
                  <Text style={styles.metaText}>
                    {formatAddress(user?.addressWallet) || 'No wallet'}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="calendar" size={16} color={Colors.primary} />
                  <Text style={styles.metaText}>
                    Joined {user?.createdAt || 'N/A'}
                  </Text>
                </View>
              </View>

              {/* Social Links */}
              <View style={styles.socialLinks}>
                <Button.Icon
                  style={styles.socialButton}
                  icon={
                    <MaterialIcon
                      name="twitter"
                      size={scale(22)}
                      color={Colors.primary}
                    />
                  }
                />
                <Button.Icon
                  style={styles.socialButton}
                  icon={
                    <MaterialIcon
                      name="instagram"
                      size={scale(22)}
                      color={Colors.secondary}
                    />
                  }
                />
                <Button.Icon
                  style={styles.socialButton}
                  icon={
                    <MaterialIcon
                      name="web"
                      size={scale(22)}
                      color={Colors.accent}
                    />
                  }
                />
              </View>

              {/* Action Buttons */}
              {user && (
                <View style={styles.actionButtons}>
                  <Button.Main
                    title={isFollowing ? 'Following' : 'Follow'}
                    iconLeft={
                      <Icon
                        name={isFollowing ? 'user-check' : 'user-plus'}
                        size={scale(18)}
                        color={isFollowing ? Colors.primary : Colors.white}
                      />
                    }
                    style={[
                      styles.followButton,
                      isFollowing && styles.followingButton,
                    ]}
                    textStyle={[
                      styles.followButtonText,
                      isFollowing && styles.followingButtonText,
                    ]}
                  />
                  <Button.Main
                    title="Message"
                    iconLeft={
                      <Icon
                        name="message-circle"
                        size={scale(18)}
                        color={Colors.textPrimary}
                      />
                    }
                    style={styles.messageButton}
                    textStyle={styles.messageButtonText}
                  />
                </View>
              )}

              {/* Stats */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {user?.followCount || '0'}
                  </Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {user?.followingCount || '0'}
                  </Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {user?.ownedProducts?.length || '0'}
                  </Text>
                  <Text style={styles.statLabel}>Products</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{user?.likeCount || '0'}</Text>
                  <Text style={styles.statLabel}>Likes</Text>
                </View>
              </View>

              {/* Tabs */}
              <View style={styles.tabsContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{paddingHorizontal: scale(4)}}>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === 'product_nft' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('product_nft')}
                    activeOpacity={0.7}>
                    <MaterialIcon
                      name="image-multiple"
                      size={20}
                      color={
                        activeTab === 'product_nft'
                          ? Colors.white
                          : Colors.textMuted
                      }
                    />
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === 'product_nft' && styles.activeTabText,
                      ]}>
                      Product NFT
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === 'collection' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('collection')}
                    activeOpacity={0.7}>
                    <MaterialIcon
                      name="folder-multiple"
                      size={20}
                      color={
                        activeTab === 'collection'
                          ? Colors.white
                          : Colors.textMuted
                      }
                    />
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === 'collection' && styles.activeTabText,
                      ]}>
                      Collection
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === 'sold_products' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('sold_products')}
                    activeOpacity={0.7}>
                    <MaterialIcon
                      name="shopping-outline"
                      size={20}
                      color={
                        activeTab === 'sold_products'
                          ? Colors.white
                          : Colors.textMuted
                      }
                    />
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === 'sold_products' && styles.activeTabText,
                      ]}>
                      Sold Products
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              {/* Section Headers */}
              {activeTab === 'product_nft' && (
                <View>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.title}>PRODUCT NFT</Text>
                    <Button.Icon
                      icon={<PlusIcon />}
                      onPress={() => {
                        navigation.navigate('NoBottomTab', {
                          screen: 'CreateUpdateNFT',
                        });
                      }}
                      style={{width: scale(36), height: scale(36)}}
                    />
                  </View>

                  {!user?.ownedProducts || user?.ownedProducts.length === 0 ? (
                    <CustomEmpty type="noProduct" />
                  ) : (
                    <ProductList
                      products={user?.ownedProducts}
                      onEditPress={isOwnProfile ? undefined : false}
                    />
                  )}
                </View>
              )}

              {activeTab === 'collection' && (
                <View style={styles.sectionHeader}>
                  <Text style={styles.title}>COLLECTION</Text>
                  <Button.Icon
                    icon={<PlusIcon />}
                    onPress={() => {
                      navigation.navigate('NoBottomTab', {
                        screen: 'ProductCollectionManager',
                      });
                    }}
                    style={{width: scale(36), height: scale(36)}}
                  />
                </View>
              )}

              {activeTab === 'sold_products' && (
                <View style={styles.sectionHeader}>
                  <Text style={styles.title}>SOLD PRODUCTS</Text>
                  <Button.Icon
                    icon={<RightIcon />}
                    onPress={() => {
                      navigation.navigate('NoBottomTab', {
                        screen: 'ProductCollectionManager',
                      });
                    }}
                    style={{width: scale(36), height: scale(36)}}
                  />
                </View>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
