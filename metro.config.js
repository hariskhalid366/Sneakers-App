const {mergeConfig, getDefaultConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

// Get default config for your project root
const defaultConfig = getDefaultConfig(__dirname);

// const {assetExts, sourceExts} = defaultConfig.resolver;

// Custom configuration
// const customConfig = {
//   transformer: {
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     assetExts: assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...sourceExts, 'svg'],
//   },

// };
defaultConfig.resolver.unstable_enablePackageExports = true;
defaultConfig.resolver.unstable_conditionNames = [
  'react-native',
  'browser',
  'require',
];

// Merge base config and custom tweaks
const mergedConfig = mergeConfig(defaultConfig);

// Export with NativeWind applied
module.exports = withNativeWind(mergedConfig, {
  input: './global.css',
});
