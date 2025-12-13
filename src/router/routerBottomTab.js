import {TouchableOpacity} from 'react-native';
import {
  ActivityFillIcon,
  ActivityLineIcon,
  HomeFillIcon,
  HomeLineIcon,
  NewsFillIcon,
  NewsLineIcon,
  ProductFillIcon,
  ProductLineIcon,
  ProfileFillIcon,
  ProfileLineIcon,
  SettingLineIcon,
} from '../assets/icons/icons';
import ActivityScreen from '../screens/Activity';

import {Colors} from '../theme/theme';

import HomeScreen from '../screens/Home';
import NewsScreen from '../screens/News';
import ProfileScreen from '../screens/Profile';
import MarketPlaceScreen from '../screens/MarketPlace';

export const getRouterBottomTab = navigation => [
  {
    name: 'Home',
    component: HomeScreen,
    label: 'Home',
    iconLine: HomeLineIcon,
    iconFill: HomeFillIcon,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: false,
    },
  },
  {
    name: 'Activity',
    component: ActivityScreen,
    label: 'Activity',
    iconLine: ActivityLineIcon,
    iconFill: ActivityFillIcon,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: false,
    },
  },
  {
    name: 'MarketPlace',
    component: MarketPlaceScreen,
    label: 'Market Place',
    iconLine: ProductLineIcon,
    iconFill: ProductFillIcon,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: true,
    },
  },
  {
    name: 'News',
    component: NewsScreen,
    label: 'News',
    iconLine: NewsLineIcon,
    iconFill: NewsFillIcon,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: true,
    },
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    label: 'Setting',
    iconLine: ProfileLineIcon,
    iconFill: ProfileFillIcon,
    hasLayout: true,
    options: {
      headerShown: true,
      headerTitle: 'My Profile',
      requiresAuth: true,

      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 16}}
          onPress={() =>
            navigation.navigate('NoBottomTab', {
              screen: 'Setting',
            })
          }>
          <SettingLineIcon style={{color: Colors.black}} />
        </TouchableOpacity>
      ),
    },
  },
];
