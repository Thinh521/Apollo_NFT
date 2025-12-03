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
} from '../assets/icons/icons';
import ActivityScreen from '../screens/Activity';

import HomeScreen from '../screens/Home';
import NewsScreen from '../screens/News';
import ProductScreen from '../screens/Product';
import ProfileScreen from '../screens/Profile';

export const getRouterBottomTab = () => [
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
    name: 'Product',
    component: ProductScreen,
    label: 'Product',
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
    label: 'Setting',
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
      headerShown: false,
      requiresAuth: true,
    },
  },
];
