import React from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import ProductCard from './ProductCard';

const ProductSlider = ({
  products,
  onEditPress,
  selectMode = false,
  selectedIds = [],
  onSelectToggle,
}) => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            layout="slider"
            selectMode={selectMode}
            isSelected={selectedIds.includes(item.id)}
            onSelectToggle={onSelectToggle}
            onPress={() =>
              navigation.navigate('NoBottomTab', {
                screen: 'ProductDetail',
                params: {
                  product: item,
                },
              })
            }
            onEditPress={
              onEditPress === false
                ? false
                : () =>
                    navigation.navigate('NoBottomTab', {
                      screen: 'CreateUpdateNFT',
                      params: {product: item},
                    })
            }
          />
        )}
        keyExtractor={(item, index) => `slider-${item.id ?? 'noid'}-${index}`}
      />
    </View>
  );
};

export default ProductSlider;
