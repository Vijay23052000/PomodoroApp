// CounterComponent.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

const CounterComponent = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Counter Value: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
};

export default CounterComponent;
