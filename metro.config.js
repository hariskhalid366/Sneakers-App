const {mergeConfig, getDefaultConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

// Retrieve the default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const {assetExts, sourceExts} = defaultConfig.resolver;

const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },

  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    unstable_enablePackageExports: true,
    unstable_conditionNames: [
      'react-native',
      'browser',
      'import',
      'require',
      'default',
    ],
  },
};

// Merge default and custom configurations
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// Export the final configuration with NativeWind integration
module.exports = withNativeWind(mergedConfig, {input: './global.css'});
