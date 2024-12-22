import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './src/navigation/Navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/contexts/auth-context';
import Config from 'react-native-config';
import Mapbox from '@rnmapbox/maps';
import { UserProvider } from './src/contexts/user-context';

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
