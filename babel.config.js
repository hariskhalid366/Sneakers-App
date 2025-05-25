module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'module:@react-native/babel-preset',
      // ['babel-preset-expo', {unstable_transformImportMeta: true}],
      'nativewind/babel',
    ],
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-export-namespace-from',
    ],
  };
};
