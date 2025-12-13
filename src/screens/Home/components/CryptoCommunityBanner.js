import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Images from '~/assets/images/images';
import {Button} from '~/components/ui/Button';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default function CryptoCommunityBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={[styles.decorCircle, styles.circle1]} />
        <View style={[styles.decorCircle, styles.circle2]} />
        <View style={[styles.decorCircle, styles.circle3]} />

        <FastImage
          source={Images.BTC}
          resizeMode="contain"
          style={[styles.cryptoIcon, styles.bitcoinIcon]}
        />
        <FastImage
          source={Images.ETH}
          resizeMode="contain"
          style={[styles.cryptoIcon, styles.ethereumIcon]}
        />
        <FastImage
          source={Images.BNB}
          resizeMode="contain"
          style={[styles.cryptoIcon, styles.binanceIcon]}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Join Our Community</Text>
          <Button.Main
            title="Get Started"
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
        <View style={styles.arcContainer}>
          <View style={styles.arc} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    maxWidth: scale(850),
    height: scale(180),
    backgroundColor: '#6b2ff5',
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.2,
  },
  circle1: {
    width: scale(160),
    height: scale(160),
    backgroundColor: '#6500764D',
    top: -scale(40),
    left: scale(40),
  },
  circle2: {
    width: scale(120),
    height: scale(120),
    backgroundColor: '#8114D5',
    bottom: -scale(20),
    right: scale(400),
  },
  circle3: {
    width: scale(140),
    height: scale(140),
    backgroundColor: '#6500764D',
    top: scale(30),
    right: scale(240),
  },
  cryptoIcon: {
    position: 'absolute',
    width: scale(120),
    height: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bitcoinIcon: {
    top: scale(-14),
    right: scale(50),
  },
  ethereumIcon: {
    width: scale(60),
    height: scale(60),
    top: scale(80),
    left: scale(20),
  },
  binanceIcon: {
    top: scale(55),
    right: scale(0),
    width: scale(100),
    height: scale(100),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.black,
    color: Colors.white,
    marginBottom: scale(20),
  },
  button: {
    borderRadius: 999,
    width: scale(150),
    paddingVertical: scale(8),
    backgroundColor: Colors.background,
  },
  buttonText: {
    color: Colors.secondary,
  },
  arcContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: scale(100),
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  arc: {
    width: scale(450),
    height: scale(450),
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'absolute',
    bottom: -scale(430),
  },
});
