// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { responsiveFontSize } from 'react-native-responsive-dimensions'

// let initialPomodoro = 5;
// let initialShortBreak = 3;
// let initialLongBreak = 6;
// let initialCycle = 2;

// const Timer = () => {
//   const [timer, setTimer] = useState(initialPomodoro); // 25 minutes in seconds
//   const [timerType, setTimerType] = useState('pomodoro');
//   const [cycleCount, setCycleCount] = useState(initialCycle);
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     let interval: string | number | NodeJS.Timeout | undefined;

//     if (isRunning && timer > 0) {
//       interval = setInterval(() => {
//         setTimer(timer - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       clearInterval(interval);
//       setTimerType('break')
//       toggleTimer();

//       if (timerType === 'pomodoro') {
//         setCycleCount(cycleCount + 1);

//         if (cycleCount === initialCycle) {
//           setTimerType('long break');
//           setTimer(initialLongBreak); // 30 minutes in seconds
//           setCycleCount(0);
//         } else {
//           setTimerType('short break');
//           setTimer(initialShortBreak); // 5 minutes in seconds
//         }
//       } else {
//         setTimerType('pomodoro');
//         setTimer(5); // 25 minutes in seconds
//       }
//     }

//     return () => clearInterval(interval);
//   }, [timer, isRunning, timerType, cycleCount]);

//  const toggleTimer = () => {
//     if (isRunning) {
//       setIsRunning(false); // Stop the timer if it's running
//     } else {
//       setIsRunning(true); // Start the timer if it's not running
//     }
//   };

//    const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = timeInSeconds % 60;
//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(seconds).padStart(2, '0');
//     return `${formattedMinutes}:${formattedSeconds}`;
//   };

//    const resetTimer = () => {
//     //  clearInterval(interval);
//     setIsRunning(false);
//     setTimerType('pomodoro');
//     setTimer(initialPomodoro); // Reset the timer to the initial position
//     setCycleCount(0);
//   };

//   return (
//     <View style={styles.ViewText}>
//       <Text style={styles.TextStyle}>{formatTime(timer)}</Text>
//     </View>
//   )
// }

// export default Timer

// const styles = StyleSheet.create({
//     TextStyle:{
//         fontSize: responsiveFontSize(1.5),
//         color: '#ffffff',
        
//     },
//     ViewText: {
//         marginTop: 10,
//     }
// })