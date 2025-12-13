import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {scale} from '~/utils/scaling';
import {Colors} from '~/theme/theme';

const CreatorCardSkeleton = ({itemCount = 4}) => {
  return (
    <SkeletonPlaceholder speed={1200} borderRadius={scale(8)}>
      <View>
        {Array.from({length: itemCount}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            marginBottom={scale(16)}
            padding={scale(16)}
            borderRadius={scale(12)}
            borderWidth={1}
            borderColor={Colors.border}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={scale(56)}
                height={scale(56)}
                borderRadius={scale(999)}
              />
              <SkeletonPlaceholder.Item marginLeft={scale(12)} flex={1}>
                <SkeletonPlaceholder.Item
                  width="70%"
                  height={scale(16)}
                  marginBottom={scale(6)}
                />
                <SkeletonPlaceholder.Item width="45%" height={scale(14)} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              marginTop={scale(16)}
              flexDirection="row"
              alignItems="center">
              <SkeletonPlaceholder.Item width={scale(18)} height={scale(18)} />
              <SkeletonPlaceholder.Item
                marginLeft={scale(8)}
                width={scale(80)}
                height={scale(16)}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              marginTop={scale(16)}
              flexDirection="row"
              justifyContent="space-between">
              <SkeletonPlaceholder.Item width="40%" height={scale(12)} />
              <SkeletonPlaceholder.Item width="40%" height={scale(12)} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              marginTop={scale(16)}
              width="100%"
              height={scale(40)}
              borderRadius={scale(12)}
            />
          </SkeletonPlaceholder.Item>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default CreatorCardSkeleton;
