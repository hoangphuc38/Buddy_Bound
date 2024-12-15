import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './src/navigation/Navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/contexts/auth-context';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
