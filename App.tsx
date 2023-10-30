/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import PickUpScreen from './screens/PickUpScreen';
import DestinationScreen from './screens/DestinationScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import LoginScreen from './screens/LoginScreen';
import SearchDriverScreen from './screens/SearchDriverScreen';

function App(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PickUpScreen"
          component={PickUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DestinationScreen"
          component={DestinationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ConfirmationScreen"
          component={ConfirmationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchDriverScreen"
          component={SearchDriverScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
