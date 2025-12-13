import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {getRouterBottomTab} from '../router/routerBottomTab';
import CustomTabBar from '../components/CustomNavigation/CustomTabBar';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const navigation = useNavigation();
  const routerBottomTab = getRouterBottomTab(navigation);

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      {routerBottomTab.map(
        ({
          name,
          component,
          label,
          iconLine,
          iconFill,
          isCenterButton = false,
          options = {},
        }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{
              ...options,
              tabBarLabel: label || '',
              tabBarIconLine: iconLine,
              tabBarIconFill: iconFill,
              isCenterButton,
            }}
          />
        ),
      )}
    </Tab.Navigator>
  );
};

export default BottomTab;
