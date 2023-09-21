// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { responsiveHeight } from 'react-native-responsive-dimensions'

// const DropDown = ({navigation}) => {
//   return (
//     <View style={styles.DropDownMainView}>
//     <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
// <Text style={styles.TextView}>
//   POMODORO 2 MIN
// </Text>
//     </TouchableOpacity>
//   </View>
//   )
// }

// export default DropDown

// const styles = StyleSheet.create({
//   DropDownMainView: {
//  marginTop: responsiveHeight(20),
//   },
//   TextView: {
//     color: '#fff',
//     fontSize: responsiveHeight(1.5),
//     fontWeight: '500',
//   }
// })

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

// import React, {useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';
// // import AntDesign from '@expo/vector-icons/AntDesign';

// const data = [
//   {label: 'POMODORO 25 MIN', value: '25 MIN'},
//   {label: 'SHORT BREAK 5 MIN', value: '5 MIN'},
//   {label: 'LONG BREAK 30 MIN', value: '30 MIN'},
// ];

// const DropDown = () => {
//   const [value, setValue] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);


//   return (
//     <View style={styles.container}>
//       <Dropdown
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={[
//           styles.dropdown,
//           // eslint-disable-next-line react-native/no-inline-styles
//           isFocus && {borderColor: 'blue', alignContent: 'center'},
//         ]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         iconStyle={styles.iconStyle}
//         data={data}
//         maxHeight={100}
//         labelField="label"
//         valueField="value"
//         value={value}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={item => {
//           console.log(item)
//           setValue(item.value);
//           setIsFocus(false);
//         }}
//       />
//     </View>
//   );
// };

// export default DropDown;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'GREEN',
//     padding: 16,
//   },
//   dropdown: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const DropDown = () => {
  const [currentState, setCurrentState] = useState(1);
  const [value, setValue] = useState(0);

  const toggleState = () => {
    switch (currentState) {
      case 1:
        // Increment the value
        setValue((prevValue) => prevValue + 2);
        break;
      case 2:
        // Decrement the value
        setValue((prevValue) => prevValue - 1);
        break;
      case 3:
        // Multiply the value
        setValue((prevValue) => prevValue * 2);
        break;
      default:
        break;
    }

    setCurrentState((prevState) => (prevState === 3 ? 1 : prevState + 1));
  };

  let buttonText, buttonColor;

  switch (currentState) {
    case 1:
      buttonText = 'POMODORO 5 MIN';
      // buttonColor = 'blue';
      break;
    case 2:
      buttonText = 'SHORT BREAK 2 MIN';
      // buttonColor = 'green';
      break;
    case 3:
      buttonText = 'LONG BREAK 3 MIN';
      // buttonColor = 'red';
      break;
    default:
      buttonText = 'Increment';
      // buttonColor = 'blue';
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.valueText}>Value: {value}</Text> */}
      <TouchableOpacity
        style={styles.button }
        onPress={toggleState}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../images/arrow.png')}
          style={styles.ImageView}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>{buttonText}</Text>

      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#0bc080'
  },
  button: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '10',
    marginTop: responsiveHeight(19),
    // marginBottom: 100,

    // marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(1.5),
  },
  // valueText: {
  //   fontSize: 24,
  //   marginBottom: 20,
  // },
  ImageView: {
    width: 13,
    height: 22,
    marginRight: 3,
    opacity: .8,
  },
});

export default DropDown;
