import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './src/navigation/Navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/contexts/auth-context';
import Config from 'react-native-config';
import Mapbox from '@rnmapbox/maps';
import { UserProvider } from './src/contexts/user-context';
import { PermissionsAndroid } from 'react-native';

Mapbox.setAccessToken(Config.MAPBOX_PB_TOKEN || 'pk.eyJ1IjoicGh1bGUyMzMzIiwiYSI6ImNtMHpna2l1azA1dDIya3B1bXRzMm5jcXMifQ.PPE8QVyyUoOSOXfwSg33hA');
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <UserProvider>
          <Navigator />
        </UserProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
