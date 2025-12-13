import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {scale} from '~/utils/scaling';
import {Colors} from '~/theme/theme';

const {width} = Dimensions.get('window');

const NewsCardSkeleton = ({itemCount = 4, layout = 'list'}) => {
  const isSlider = layout === 'slider';
  const cardWidth = isSlider ? scale(290) : width - scale(28);

  return (
    <SkeletonPlaceholder
      speed={1200}
      backgroundColor={Colors.mutedBackground}
      highlightColor={Colors.border}
      borderRadius={8}>
      <SkeletonPlaceholder.Item flexDirection={isSlider ? 'row' : 'column'}>
        {Array.from({length: itemCount}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width={cardWidth}
            marginRight={isSlider ? scale(14) : 0}
            marginBottom={isSlider ? 0 : scale(14)}
            borderRadius={scale(12)}
            overflow="hidden"
            borderWidth={1}
            borderColor={Colors.border}>
            <SkeletonPlaceholder.Item
              width="100%"
              height={scale(180)}
              borderRadius={0}
            />
            <SkeletonPlaceholder.Item padding={scale(14)}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={scale(10)}>
                <SkeletonPlaceholder.Item width="75%" height={scale(18)} />
                <SkeletonPlaceholder.Item
                  width={scale(22)}
                  height={scale(22)}
                  borderRadius={999}
                />
              </SkeletonPlaceholder.Item>

              <SkeletonPlaceholder.Item
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={scale(10)}>
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  alignItems="center">
                  <SkeletonPlaceholder.Item
                    width={scale(20)}
                    height={scale(20)}
                    borderRadius={999}
                  />
                  <SkeletonPlaceholder.Item
                    width={scale(80)}
                    height={scale(12)}
                    marginLeft={scale(8)}
                  />
                  <SkeletonPlaceholder.Item
                    width={scale(12)}
                    height={scale(12)}
                    borderRadius={999}
                    marginLeft={scale(6)}
                  />
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item
                  width={scale(40)}
                  height={scale(12)}
                />
              </SkeletonPlaceholder.Item>

              <SkeletonPlaceholder.Item
                width="100%"
                height={scale(14)}
                marginBottom={scale(6)}
              />
              <SkeletonPlaceholder.Item width="80%" height={scale(14)} />
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item
              paddingHorizontal={scale(14)}
              paddingBottom={scale(14)}
              flexDirection="row"
              justifyContent="space-between">
              <SkeletonPlaceholder.Item flexDirection="row">
                <SkeletonPlaceholder.Item
                  width={scale(18)}
                  height={scale(18)}
                  marginRight={scale(8)}
                />
                <SkeletonPlaceholder.Item
                  width={scale(18)}
                  height={scale(18)}
                  marginRight={scale(8)}
                />
                <SkeletonPlaceholder.Item
                  width={scale(18)}
                  height={scale(18)}
                />
              </SkeletonPlaceholder.Item>

              <SkeletonPlaceholder.Item width={scale(60)} height={scale(12)} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default NewsCardSkeleton;
