import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {scale} from '~/utils/scaling';
import {Colors} from '~/theme/theme';

// Avatar + User Info
export const UserHeaderSkeleton = () => (
  <SkeletonPlaceholder speed={1200} borderRadius={8}>
    <SkeletonPlaceholder.Item
      flexDirection="row"
      alignItems="center"
      marginBottom={scale(24)}
      borderWidth={1}
      borderColor={Colors.border}
      padding={scale(16)}
      borderRadius={12}>
      <SkeletonPlaceholder.Item
        width={scale(58)}
        height={scale(58)}
        borderRadius={scale(999)}
      />
      <SkeletonPlaceholder.Item flex={1} marginLeft={scale(12)}>
        <SkeletonPlaceholder.Item
          width="60%"
          height={scale(18)}
          marginBottom={scale(10)}
        />
        <SkeletonPlaceholder.Item width="40%" height={scale(16)} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

// Buttons
export const ButtonsSkeleton = () => (
  <SkeletonPlaceholder speed={1200} borderRadius={8}>
    <SkeletonPlaceholder.Item
      width="100%"
      height={scale(48)}
      borderRadius={scale(10)}
    />
  </SkeletonPlaceholder>
);
