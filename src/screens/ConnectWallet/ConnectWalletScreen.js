import {API_BASE} from '@env';
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {showMessage} from 'react-native-flash-message';
import {
  AppKitButton,
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit-ethers-react-native';

import Images from '~/assets/images/images';
import {
  LocationLineIcon,
  NetworkLineIcon,
  ShieldUserLineIcon,
} from '~/assets/icons/icons';

import {Button} from '~/components/ui/Button';
import {
  ButtonsSkeleton,
  UserHeaderSkeleton,
} from '~/components/Skeleton/ConnectWalletSkeleton';

import {useAuthStore} from '~/stores/auth.store';
import {formatAddress} from '~/utils/formatAddress';
import {getLoginNonceApi, verifyWalletSignatureApi} from '~/api/authApi';

import {Colors} from '~/theme/theme';
import styles from './ConnectWallet.styles';

const WalletFeature = ({icon, title, description, gradientColors}) => {
  return (
    <View style={styles.featureCard}>
      <LinearGradient
        colors={gradientColors || [Colors.primary, Colors.secondary]}
        style={[styles.featureIconContainer]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Icon name={icon} size={24} color={Colors.white} />
      </LinearGradient>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
};

const ConnectWalletScreen = () => {
  const {walletProvider} = useAppKitProvider();
  const {isConnected, address, chainId, balance} = useAppKitAccount();

  const [forceDisconnected, setForceDisconnected] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const {user, setToken, setUser, clearAuth} = useAuthStore();

  const getChainName = id => {
    const chains = {
      1: 'Ethereum Mainnet',
      137: 'Polygon',
      56: 'BSC',
      42161: 'Arbitrum',
    };
    return chains[id] || `Chain ${id}`;
  };

  useEffect(() => {
    if (isConnected) {
      setForceDisconnected(false);
    }
  }, [isConnected]);

  // Handle login
  const authenticate = useCallback(async () => {
    if (!isConnected || !address) {
      showMessage({
        message: 'Please connect your wallet first',
        type: 'danger',
      });

      return;
    }
    if (!walletProvider) {
      showMessage({
        message: 'Please connect your wallet first',
        type: 'danger',
      });

      return;
    }

    setAuthenticating(true);
    try {
      const loginRes = await getLoginNonceApi(address);
      const nonce = loginRes?.data?.nonce;

      if (!nonce) {
        throw new Error('Invalid nonce');
      }

      let signature;
      if (walletProvider.signer?.signMessage) {
        signature = await walletProvider.signer.signMessage(String(nonce));
      } else if (walletProvider.request) {
        signature = await walletProvider.request({
          method: 'personal_sign',
          params: [String(nonce), address],
        });
      } else {
        throw new Error('This wallet does not support message signing');
      }

      const verifyRes = await verifyWalletSignatureApi(address, signature);

      const {user: userData, accessToken} = verifyRes.data;

      setToken(accessToken);
      setUser(userData);

      showMessage({message: 'Login successful', type: 'success'});
    } catch (err) {
      showMessage({
        message: 'Verification failed',
        type: 'danger',
      });
    } finally {
      setAuthenticating(false);
    }
  }, [address, isConnected, walletProvider]);

  // Handle logout
  const handleLogout = async () => {
    try {
      if (walletProvider?.disconnect) {
        await walletProvider.disconnect();
      }

      setForceDisconnected(true);

      clearAuth();

      showMessage({
        message: 'Wallet connection has been cleared',
        type: 'success',
      });
    } catch (err) {
      showMessage({
        message: 'Logout failed',
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.logoSection}>
            <View style={styles.logoWrapper}>
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.logoGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <ShieldUserLineIcon style={styles.shieldUserIcon} />
              </LinearGradient>
              <View style={styles.logoRing} />
              <View style={styles.logoRingOuter} />
            </View>
            <Text style={styles.title}>Login to your wallet</Text>
            <Text style={styles.subtitle}>
              Connect to any wallet to securely store your digital goods NFT &
              cryptocurrencies.
            </Text>
          </View>

          {isConnected && !forceDisconnected ? (
            <>
              <View style={styles.connectedContainer}>
                <View style={styles.connectedGradient}>
                  <Text style={styles.connectedTitle}>
                    Wallet successfully connected!
                  </Text>

                  {authenticating ? (
                    <UserHeaderSkeleton />
                  ) : (
                    <View style={styles.userHeader}>
                      <LinearGradient
                        colors={[Colors.primary, Colors.secondary]}
                        style={styles.userAvatar}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}>
                        <FastImage
                          source={
                            user?.avatar
                              ? {
                                  uri: `${API_BASE}/api/upload/${user.avatar}`,
                                }
                              : Images.avatar
                          }
                          style={styles.avatar}
                          resizeMode="cover"
                        />
                      </LinearGradient>
                      <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user?.fullName}</Text>
                        <Text style={styles.userAddress}>
                          {formatAddress(address) || 'Không có địa chỉ'}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.connectButtonContainer}>
                    <AppKitButton balance="show" />
                  </View>

                  <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                      <LocationLineIcon />
                      <Text style={styles.infoLabel}>Wallet Address</Text>
                    </View>
                    <View style={styles.addressContainer}>
                      <Text style={styles.addressText}>
                        {formatAddress(address)}
                      </Text>
                      <TouchableOpacity style={styles.copyButton}>
                        <Icon name="copy" size={18} color={Colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {balance && (
                    <View style={styles.infoCard}>
                      <View style={styles.infoHeader}>
                        <Icon
                          name="dollar-sign"
                          size={18}
                          color={Colors.primary}
                        />
                        <Text style={styles.infoLabel}>Balance</Text>
                      </View>
                      <Text style={styles.balanceAmount}>
                        {parseFloat(balance).toFixed(4)} ETH
                      </Text>
                    </View>
                  )}

                  {chainId && (
                    <View style={styles.infoCard}>
                      <View style={styles.infoHeader}>
                        <NetworkLineIcon />
                        <Text style={styles.infoLabel}>Network</Text>
                      </View>
                      <Text style={styles.chainText}>
                        {getChainName(chainId)}
                      </Text>
                    </View>
                  )}

                  {authenticating ? (
                    <ButtonsSkeleton />
                  ) : (
                    <View>
                      {!user ? (
                        <Button.Main
                          title="Verify"
                          onPress={authenticate}
                          iconLeft={
                            <Icon
                              name="shield"
                              size={20}
                              color={Colors.white}
                            />
                          }
                        />
                      ) : (
                        <Button.Main
                          title="Logout"
                          onPress={handleLogout}
                          iconLeft={
                            <Icon
                              name="log-out"
                              size={20}
                              color={Colors.white}
                            />
                          }
                          style={styles.logoutButton}
                        />
                      )}
                    </View>
                  )}
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.featuresContainer}>
                <WalletFeature
                  icon="shield"
                  title="Maximum Security"
                  description="Secure transactions with advanced blockchain encryption"
                  gradientColors={[Colors.primary, Colors.secondary]}
                />
                <WalletFeature
                  icon="zap"
                  title="Fast Transactions"
                  description="Complete your transactions in just seconds"
                  gradientColors={[Colors.accent, Colors.accentBlue]}
                />
                <WalletFeature
                  icon="globe"
                  title="Multi-Chain Support"
                  description="Supports multiple blockchain networks"
                  gradientColors={[Colors.secondary, Colors.accentPink]}
                />
              </View>

              <View style={styles.connectButtonContainer}>
                <AppKitButton />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConnectWalletScreen;
