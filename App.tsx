import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './src/components/DetailsScreen';
import {Provider} from 'react-redux';
import store from './src/redux';
import Counter from './src/components/Counter';

// import HomeScreen from './components/HomeScreen';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Counter">


          <Stack.Screen
            name="Counter"
            component={Counter}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
