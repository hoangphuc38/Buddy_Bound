import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import Navigator from './src/navigation/Navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigator />
    </GestureHandlerRootView>

  );
};

export default App;