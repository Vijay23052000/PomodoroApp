// // import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// // import React from 'react';
// // // import {responsiveWidth} from 'react-native-responsive-dimensions';
// // import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
// // import {responsiveWidth} from 'react-native-responsive-dimensions';

// // const ProgressBar = () => {
// //   return (
// //     <View style={styles.Main}>
// //       <CountdownCircleTimer
// //         isPlaying={true}
// //         duration={8}
// //         size={300}
// //         colors={['#42f5e9', '#000000']}
// //         colorsTime={[2, 1]}
// //         onComplete={() => ({shouldRepeat: true, newInitialRemainingTime: 0})}
// //         updateInterval={0}
// //         trailColor="#ffffff">
// //         {({remainingTime}) => (
// //           <Text style={{color: '#ffffff', fontSize: 40}}>{remainingTime}</Text>
// //         )}
// //         {/* <Text >5</Text> */}
// //       </CountdownCircleTimer>
// //     </View>
// //   );
// // };

// // export default ProgressBar;

// // const styles = StyleSheet.create({
// //   Main: {
// //     marginTop: responsiveWidth(20.7),
// //   },
// //   // outerCircle: {
// //   //   marginTop: responsiveWidth(20.7),
// //   //   alignItems: 'center',
// //   //   justifyContent: 'center',
// //   //   width: 300,
// //   //   height: 300,
// //   //   backgroundColor: '#ffffff',
// //   //   borderRadius: 150,
// //   // },
// //   // innerCircle: {
// //   //   // marginTop: responsiveWidth(26.8),
// //   //   alignItems: 'center',
// //   //   justifyContent: 'center',
// //   //   width: 278,
// //   //   height: 278,
// //   //   backgroundColor: '#0bc080',
// //   //   borderRadius: 139,
// //   // },
// //   // innerCircleTwo: {
// //   //   alignItems: 'center',
// //   //   justifyContent: 'center',
// //   //   width: 254,
// //   //   height: 254,
// //   //   backgroundColor: '#0bc080',
// //   //   borderRadius: 127,
// //   //   marginTop: 180,
// //   // },
// // });


// import React from 'react';
// import {responsiveWidth} from 'react-native-responsive-dimensions';
// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';


// const ProgressBar = ({navigation}) => {
// const ProgressBar = () => {
//   return (
//     <View style={styles.outerCircle}>
//       <View style={styles.innerCircle}>
//         <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
//         <TouchableOpacity onPress={() => {}}>
//           <View style={styles.innerCircleTwo}>
//             {/* <Text>Hello</Text> */}
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// export default ProgressBar;
// const styles = StyleSheet.create({
//   outerCircle: {
//     marginTop: responsiveWidth(20.7),
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 300,
//     height: 300,
//     backgroundColor: '#ffffff',
//     borderRadius: 150,
//   },
//   innerCircle: {
//     // marginTop: responsiveWidth(26.8),
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 278,
//     height: 278,
//     backgroundColor: '#0bc080',
//     borderRadius: 139,
//   },
//   innerCircleTwo: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 254,
//     height: 254,
//     backgroundColor: '#0bc080',
//     borderRadius: 127,
//   },
// });