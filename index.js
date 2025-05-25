/**
 * @format
 */

import {AppRegistry} from 'react-native';
import '@walletconnect/react-native-compat';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
