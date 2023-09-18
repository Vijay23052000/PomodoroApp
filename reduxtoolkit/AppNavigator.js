
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../components/DetailsScreen';
// import HomeScreen from './components/HomeScreen';
const Stack = createNativeStackNavigator();

function AppNavigator(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Details">
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;