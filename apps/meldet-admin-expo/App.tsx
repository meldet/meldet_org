// import 'expo-dev-client';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Context
import AetherContextManager from 'aetherspace/context/AetherContextManager';
// Screens
import DashboardScreen from 'meldet-admin/screens/DashboardScreen';
// Assets
// import * as assets from 'meldet-admin/assets.generated';

/* --- Navigation ------------------------------------------------------------------------------ */

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="/">
        <Stack.Screen
          name="/"
          navigationKey="/"
          component={DashboardScreen}
          options={{ title: 'Meldet Dashboard', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/* --- <App/> ---------------------------------------------------------------------------------- */

const App = () => {
  return (
    <AetherContextManager assets={{}} icons={{}}>
      <AppNavigator />
    </AetherContextManager>
  );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default App;
