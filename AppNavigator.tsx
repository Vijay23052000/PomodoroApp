import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './src/screens/HomeScreen';
// import SettingScreen from './src/screens/SettingScreen';
import CheckingScreen from './src/screens/CheckingScreen';
import DetailsScreen from './src/screens/DetailsScreen';
// import PracticeScreen from './src/components/PracticeScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Checking">
      {/* <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/> */}
      {/* <Stack.Screen name="Setting" component={SettingScreen} options={{headerShown: false}}/> */}
      <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Checking" component={CheckingScreen} options={{headerShown: false}}/>
      {/* <Stack.Screen name="Practice" component={PracticeScreen} options={{headerShown: false}}/> */}


    </Stack.Navigator>
  );
}

export default AppNavigator;
