module.exports = {
  presets: [
    [
      'babel-preset-expo',
      {
        unstable_transformImportMeta: true,
      },
    ],
    'nativewind/babel',
  ],
  plugins: [
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-export-namespace-from',
  ],
};
