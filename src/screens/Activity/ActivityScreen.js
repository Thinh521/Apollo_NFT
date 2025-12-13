import React from 'react';
import {StatusBar, Text, View} from 'react-native';

import styles from './Activity.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../theme/theme';
import Header from '../../components/Header';

const ActivityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      <Header title="Activity" showSearch={false} />
    </SafeAreaView>
  );
};

export default ActivityScreen;
