/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as encoding from 'text-encoding';
import websocket from 'websocket';

Object.assign(global, { WebSocket: websocket.w3cwebsocket });

AppRegistry.registerComponent(appName, () => App);
