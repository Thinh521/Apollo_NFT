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
import {getCurrentUserApi} from './src/api/userApi';
import {useAuthStore} from './src/stores/auth.store';
import {navigationRef} from './src/navigation/NavigationService';

const queryClient = new QueryClient();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const init = async () => {
      const splashDelay = new Promise(res => setTimeout(res, 3000));

      preloadAuthData();

      await splashDelay;

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

const preloadAuthData = async () => {
  const token = useAuthStore.getState().token;
  if (!token) return;

  try {
    const res = await getCurrentUserApi();
    useAuthStore.getState().setUser(res.data);

    return 'BottomTab';
  } catch (err) {
    useAuthStore.getState().clearAuth();
  }
};
