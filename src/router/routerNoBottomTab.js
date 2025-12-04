import ConnectWalletScreen from '../screens/ConnectWallet';

const routerNoBottomTab = [
  {
    name: 'ConnectWallet',
    component: ConnectWalletScreen,
    hasLayout: false,
    options: {
      title: 'Kết nối ví',
      headerShown: false,
      animation: 'slide_from_left',
    },
  },
];

export default routerNoBottomTab;
