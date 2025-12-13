import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {scale} from '~/utils/scaling';

const CreatorTabSkeleton = ({itemCount = 4}) => {
  return (
    <SkeletonPlaceholder speed={1200} borderRadius={scale(8)}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: scale(16),
        }}>
        {Array.from({length: itemCount}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width={scale(74)}
            height={scale(44)}
            borderRadius={scale(9999)}
            marginRight={scale(12)}
          />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default CreatorTabSkeleton;
