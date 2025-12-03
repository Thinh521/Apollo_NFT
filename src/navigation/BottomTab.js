import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getRouterBottomTab} from '../router/routerBottomTab';
import CustomTabBar from '../components/CustomNavigation/CustomTabBar';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const routerBottomTab = getRouterBottomTab();

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
