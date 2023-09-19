// import {Button, Text} from 'react-native';
// import React from 'react';
// import {decrement, increment, setCustomValue} from '../redux/counter';
// import {useReduxDispatch, useReduxSelector} from '../redux';
// import { updateToTwentyFiveMinutes, updateToOneHour, resetTimer } from '../redux/timer';

// const Counter = (): React.ReactElement => {
//   //  using useReduxSelector it will take current state and update it to new state
//   const value = useReduxSelector(state => state.counter);

//   const timerValue = useReduxSelector(state => state.timer);

//   // useReduxDispath for dispatching actions
//   const dispatch = useReduxDispatch();

//   return (
//     <>
//       <Text>{value}</Text>
//       <Button title="increment" onPress={() => dispatch(increment(1))}>
//         +1
//       </Button>
//       <Button title="decrement" onPress={() => dispatch(decrement(1))}>
//         -1
//       </Button>
//       <Button
//         title="SetCustomTime"
//         onPress={() => dispatch(setCustomValue(30 * 60))}>
//         -1
//       </Button>

//       <Button
//         title="updateToTwentyFiveMinutes"
//         onPress={() => dispatch(updateToTwentyFiveMinutes(1))}>
//         +1
//       </Button>
//       <Button
//         title="updateToOneHour"
//         onPress={() => dispatch(updateToOneHour(1))}>
//         -1
//       </Button>
//       <Button title="resetTimer" onPress={() => dispatch(resetTimer(30 * 60))}>
//         -1
//       </Button>
//       <Text>{timerValue}</Text>
//     </>
//   );
// };

// export default Counter;

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
// import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  {label: 'POMODORO 25 MIN', value: '25 MIN'},
  {label: 'SHORT BREAK 5 MIN', value: '5 MIN'},
  {label: 'LONG BREAK 30 MIN', value: '30 MIN'},
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  return (
    <View style={styles.container}>
      <Dropdown
        // eslint-disable-next-line react-native/no-inline-styles
        style={[
          styles.dropdown,
          // eslint-disable-next-line react-native/no-inline-styles
          isFocus && {borderColor: 'blue', alignContent: 'center'},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          console.log(item)
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'GREEN',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
