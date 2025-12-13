import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routerNoBottomTab from '../router/routerNoBottomTab';
import {Colors} from '../theme/theme';

const Stack = createNativeStackNavigator();

export default function NoBottomTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.black,
        headerTitleStyle: {
          color: Colors.black,
        },
      }}>
      {routerNoBottomTab.map(({name, component, options}) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
}
