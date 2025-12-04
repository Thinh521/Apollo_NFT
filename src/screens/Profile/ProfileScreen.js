import React from 'react';
import {View} from 'react-native';

import styles from './Profile.styles';
import {Button} from '../../components/ui/Button';
import {useNavigation} from '@react-navigation/core';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button.Main
        title="Connect wallet"
        style={{width: 200}}
        onPress={() => {
          navigation.navigate('NoBottomTab', {
            screen: 'ConnectWallet',
          });
        }}
      />
    </View>
  );
};

export default ProfileScreen;
