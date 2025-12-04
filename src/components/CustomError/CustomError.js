import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import Images from '../../assets/images/images';
import {Button} from '../ui/Button';

const CustomError = ({
  image = Images.no_data,
  title = 'Đã xảy ra lỗi',
  subtitle = 'Vui lòng thử lại sau!',
  buttonText,
  onRetry,
  containerStyle,
  imageStyle,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onRetry) {
      onRetry();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.errorContainer, containerStyle]}>
      <FastImage
        source={image}
        style={[styles.errorImage, imageStyle]}
        resizeMode="contain"
      />

      <Text style={styles.titleText}>{title}</Text>
      {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}

      <Button.Main
        title={buttonText || (onRetry ? 'Thử lại' : 'Quay lại')}
        onPress={handlePress}
        style={styles.retryButton}
      />
    </View>
  );
};

export default CustomError;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorImage: {
    width: scale(120),
    height: scale(120),
    marginBottom: scale(10),
  },
  titleText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    marginBottom: scale(4),
  },
  subtitleText: {
    textAlign: 'center',
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    marginBottom: scale(16),
  },
  retryButton: {
    width: scale(200),
    paddingHorizontal: scale(40),
  },
});
