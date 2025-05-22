/**
 * @format
 */

// 55ad1571e537ba370825873a7d25a66c Client thirdweb
// BfB1rlJZlvGaik6rVsS69Sm9bJ3J7Bj7AiBtPEIfjbiS1RVH4-uFVwkchpIeu9jiEpv5oIduNf40nK3tW7jxGw security key
import {Platform} from 'react-native';
if (Platform.OS !== 'web') {
  import('@thirdweb-dev/react-native-adapter');
}

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
