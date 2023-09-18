import {Button, Text} from 'react-native';
import React from 'react';
import {
  decrement,
  increment,
  setCustomValue,
} from '../redux/counter';
import {useReduxDispatch, useReduxSelector} from '../redux';

const Counter = (): React.ReactElement => {
  //  using useReduxSelector it will take current state and update it to new state
  const value = useReduxSelector(state => state.counter);

  // useReduxDispath for dispatching actions
  const dispatch = useReduxDispatch();

  return (
    <>
      <Text>{value}</Text>
      <Button title="increment" onPress={() => dispatch(increment(1))}>
        +1
      </Button>
      <Button title="decrement" onPress={() => dispatch(decrement(1))}>
        -1
      </Button>
      <Button
        title="SetCustomTime"
        onPress={() => dispatch(setCustomValue(30 * 60))}>
        -1
      </Button>
    </>
  );
};

export default Counter;
