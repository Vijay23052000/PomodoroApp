import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/DetailsScreen';
import {Provider} from 'react-redux';
import store from './src/redux';
// import Counter from './src/components/Counter';
import HomeScreen from './src/screens/HomeScreen';
import SettingScreen from './src/screens/SettingScreen';
import DropDown from './src/components/DropDown';
import SettingIcon from './src/components/SettingIcon';
import ProgressBar from './src/components/ProgressBar';
import Timer from './src/components/Timer';
import Reset from './src/components/Reset';

// import HomeScreen from './components/HomeScreen';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Setting">
          {/* <Stack.Screen
            name="Counter"
            component={Counter}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="DropDown"
            component={DropDown}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProgressBar"
            component={ProgressBar}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="SettingIcon"
            component={SettingIcon}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Timer"
            component={Timer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Reset"
            component={Reset}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
