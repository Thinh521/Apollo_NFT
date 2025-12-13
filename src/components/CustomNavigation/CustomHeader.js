import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';

import {ChevronLeft} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors, FontWeights, FontSizes} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const CustomHeader = ({title, navigation, rightComponent}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top + scale(8)}]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}>
        <View style={styles.backButtonInner}>
          <ChevronLeft color={Colors.white} size={scale(22)} />
        </View>
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {rightComponent && (
        <View style={styles.rightComponent}>{rightComponent}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scale(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
    backgroundColor: Colors.headerBackground,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.25,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  backButton: {
    position: 'absolute',
    left: scale(16),
  },
  backButtonInner: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(999),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: FontSizes.large,
    color: Colors.white,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  rightComponent: {
    position: 'absolute',
    right: scale(16),
  },
});

export default CustomHeader;
