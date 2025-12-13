import {API_BASE} from '@env';
import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from '~/assets/images/images';
import {EditIcon} from '~/assets/icons/icons';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const {width} = Dimensions.get('window');

const CollectionCard = ({item, onPress, onEditPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {onEditPress !== false && (
        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <EditIcon />
        </TouchableOpacity>
      )}
      <FastImage
        source={
          item?.image
            ? {
                uri: `${API_BASE}/api/upload/${item?.image}`,
              }
            : Images.card_1
        }
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>

      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width - scale(46)) / 2,
    marginRight: scale(12),
    backgroundColor: Colors.deepBackground,
    borderRadius: scale(12),
    padding: scale(10),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editButton: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: scale(6),
    borderTopRightRadius: scale(8),
    borderBottomLeftRadius: scale(8),
  },
  image: {
    width: '100%',
    height: scale(130),
    borderRadius: scale(6),
  },
  name: {
    color: Colors.texxPrimary,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.extraBold,
    marginTop: scale(10),
  },
  description: {
    color: Colors.textMuted,
    fontSize: FontSizes.small,
    marginTop: scale(4),
    lineHeight: 20,
  },
});

export default CollectionCard;
