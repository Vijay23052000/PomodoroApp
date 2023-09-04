import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SettingScreen from './src/screens/SettingScreen';
import Screen1 from './src/components/Screen1';
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
