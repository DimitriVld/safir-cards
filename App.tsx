import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
enableScreens();

import HomeScreen from './screens/HomeScreen';
import ListCardsScreen from './screens/ListCardsScreen';
import CardScreen from './screens/CardScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="ListCardsScreen"
          component={ListCardsScreen}
          options={{title: 'List card'}}
        />
        <Stack.Screen
          name="CardScreen"
          component={CardScreen}
          options={{title: 'card'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;