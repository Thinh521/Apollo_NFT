import React from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import NewsCard from './NewsCard';

const NewsSlider = ({news}) => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={news}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <NewsCard
            news={item}
            layout="slider"
            onPress={() =>
              navigation.navigate('NoBottomTab', {
                screen: 'NewsDetail',
                params: {
                  news: item,
                },
              })
            }
          />
        )}
        keyExtractor={(item, index) => `slider-${item.id ?? 'noid'}-${index}`}
      />
    </View>
  );
};

export default NewsSlider;
