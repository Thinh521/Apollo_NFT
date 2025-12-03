import React from 'react';
import {View} from 'react-native';
import {
  AppKitButton,
} from '@reown/appkit-ethers-react-native';

import styles from './Setting.styles';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <AppKitButton balance="show" />
    </View>
  );
};

export default SettingScreen;
