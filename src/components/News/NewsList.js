import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {scale} from '~/utils/scaling';
import NewsCard from './NewsCard';

const NewsList = ({news, address, onDelete}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={news}
      renderItem={({item}) => (
        <NewsCard
          news={item}
          address={address}
          layout="list"
          onPress={() =>
            navigation.navigate('NoBottomTab', {
              screen: 'NewsDetail',
              params: {
                news: item,
              },
            })
          }
          onPressEdit={news => {
            navigation.navigate('NoBottomTab', {
              screen: 'CreateUpdateNews',
              params: {news},
            });
          }}
          onPressDelete={id => onDelete(id)}
        />
      )}
      keyExtractor={(item, index) => `list-${item.id ?? 'noid'}-${index}`}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: scale(20),
  },
});

export default NewsList;
