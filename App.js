import React, {useEffect, useState} from 'react';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {AppKit} from '@reown/appkit-ethers-react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import './src/config/AppKitSetup';
import AppNavigator from './src/navigation';
import SplashScreen from './src/screens/Splash';
import {navigationRef} from './src/navigation/NavigationService';

const queryClient = new QueryClient();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));

      setInitialRoute('BottomTab');
    };

    init();
  }, []);

  if (!initialRoute) return <SplashScreen />;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <AppNavigator initialRouteName={initialRoute} />
            <FlashMessage position="top" />
            <AppKit />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
