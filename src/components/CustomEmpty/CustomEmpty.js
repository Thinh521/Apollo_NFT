import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import Images from '../../assets/images/images';
import {Button} from '../ui/Button';

const CustomEmpty = ({
  image = Images.no_data,
  title = 'Đã xảy ra lỗi',
  subtitle = 'Vui lòng thử lại sau!',
  buttonTitle,
  onPressButton,
  containerStyle,
  imageStyle,
}) => {
  return (
    <View style={[styles.emptyContainer, containerStyle]}>
      {image && (
        <FastImage
          source={image}
          style={[styles.emptyImage, imageStyle]}
          resizeMode="contain"
        />
      )}

      {title && <Text style={styles.titleText}>{title}</Text>}
      {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}

      {buttonTitle && onPressButton && (
        <View style={styles.buttonWrapper}>
          <Button.Main
            title={buttonTitle}
            onPress={onPressButton}
            style={styles.button}
          />
        </View>
      )}
    </View>
  );
};

export default CustomEmpty;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
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
    marginBottom: scale(12),
  },
  buttonWrapper: {
    marginTop: scale(8),
  },
  button: {
    width: scale(200),
    paddingHorizontal: scale(40),
  },
});
