import SettingScreen from '../screens/Setting';
import ConnectWalletScreen from '../screens/ConnectWallet';
import CreateUpdateNFTScreen from '../screens/CreateUpdateNFT';
import ProductDetailScreen from '../screens/ProductDetail';
import UpdateProfileScreen from '../screens/UpdateProfile';
import SellProductScreen from '../screens/SellProduct';
import LoginRequiredScreen from '../screens/LoginRequired';
import CreateUpdateNewsScreen from '../screens/News/CreateUpdateNews';
import NewsDetailScreen from '../screens/News/NewsDetail';

const routerNoBottomTab = [
  {
    name: 'ConnectWallet',
    component: ConnectWalletScreen,
    hasLayout: false,
    options: {
      title: 'Connect Wallet',
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'UpdateProfile',
    component: UpdateProfileScreen,
    hasLayout: false,
    options: {
      title: 'Update Profile',
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'CreateUpdateNFT',
    component: CreateUpdateNFTScreen,
    hasLayout: false,
    options: {
      title: 'Product NFT',
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'CreateUpdateNews',
    component: CreateUpdateNewsScreen,
    hasLayout: false,
    options: {
      title: 'News',
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'ProductDetail',
    component: ProductDetailScreen,
    hasLayout: false,
    options: {
      title: 'Product Detail',
      headerShown: false,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'Setting',
    component: SettingScreen,
    hasLayout: false,
    options: {
      title: 'Setting',
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'SellProduct',
    component: SellProductScreen,
    hasLayout: false,
    options: {
      title: 'Sell Product',
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'LoginRequired',
    component: LoginRequiredScreen,
    hasLayout: false,
    options: {
      title: 'Login Required',
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'NewsDetail',
    component: NewsDetailScreen,
    hasLayout: false,
    options: {
      title: 'News detail',
      headerShown: false,
      headerTitleAlign: 'center',
    },
  },
];

export default routerNoBottomTab;
