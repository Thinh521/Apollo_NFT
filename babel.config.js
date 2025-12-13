module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
          '~': './src',
          '~assets': './src/assets',
          '~components': './src/components',
          '~screens': './src/screens',
          '~services': './src/services',
          '~hooks': './src/hooks',
          '~store': './src/store',
          '~utils': './src/utils',
          '~configs': './src/configs',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
