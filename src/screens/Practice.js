// // import {View, Text} from 'react-native';
// // import React from 'react';
// // import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

// // const Practice = () => {
// //   return (
// //     <View>
// //       <Text style={{color: '#000000'}}>Sajid</Text>
// //       <Text style={{color: '#000000'}}>Sajid</Text>
// //       <View>
// //         <CountdownCircleTimer
// //           isPlaying={true}
// //           duration={120}
// //           colors={['#004777', '#F7B801', '#A30000', '#A30000']}
// //           colorsTime={[7, 5, 2, 0]}>
// //           {({remainingTime}) => <Text>{remainingTime}</Text>}
// //         </CountdownCircleTimer>
// //       </View>
// //     </View>
// //   );
// // };

// // export default Practice;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

// const Practice = () => {
//   const [workTime, setWorkTime] = useState(15); // 25 minutes for work
//   const [breakTime, setBreakTime] = useState( 15); // 5 minutes for break
//   const [currentTimer, setCurrentTimer] = useState('Work');
//   const [isActive, setIsActive] = useState(false);
//   const [seconds, setSeconds] = useState(workTime);
//   const [equal, setEqual] = useState(seconds);

//   useEffect(() => {
//     let interval;

//     if (isActive && seconds > 0) {
//       interval = setInterval(() => {
//         setSeconds((prevSeconds) => prevSeconds - 1);
//       }, 1000);
//     } else if (isActive && seconds === 0) {
//       clearInterval(interval);
//       toggleTimer();
//       setCurrentTimer(currentTimer === 'Work' ? 'Break' : 'Work');
//       setSeconds(currentTimer === 'Work' ? breakTime : workTime);
//     } else {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [isActive, seconds, breakTime, workTime, currentTimer]);

//   const toggleTimer = () => {
//     setIsActive(!isActive);
//   };

//   const resetTimer = () => {
//     setIsActive(false);
//     setCurrentTimer('Work');
//     setSeconds(workTime);
//   };

//   const calculateProgress = () => {
//     const totalDuration = currentTimer === 'Work' ? workTime : breakTime;
//     const remainingPercentage = ((totalDuration - seconds) / totalDuration) * 100;
//     return remainingPercentage;
//   };
//   const children = ({ remainingTime }) => {
//     const hours = Math.floor(remainingTime / 3600)
//     const minutes = Math.floor((remainingTime % 3600) / 60)
//     const seconds = remainingTime % 60
  
//     return `${hours}:${minutes}:${seconds}`
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.timerLabel}>{currentTimer === 'Work' ? 'Work Time' : 'Break Time'}</Text>
//       <Text style={styles.timer}>{seconds}</Text>
//       <View style={styles.buttonContainer}>
//         <Button title={isActive ? 'Pause' : 'Start'} onPress={toggleTimer} />
//         <Button title="Reset" onPress={resetTimer} />
//       </View>
//       <View style={styles.progressBarContainer}>
//       <CountdownCircleTimer
//           isPlaying={isActive}
//           // rotation={clockwise}
//           duration={equal}
//           colors={['#004777', '#F7B801', '#A30000', '#A30000']}
//           colorsTime={[7, 5, 2, 0]}>
//           {({remainingTime}) => <Text style={{color: '#000000', fontSize: 20}}>{seconds}</Text>}
//         </CountdownCircleTimer> 
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   timerLabel: {
//     fontSize: 24,
//     marginBottom: 10,
//   },
//   timer: {
//     fontSize: 40,
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '80%',
//   },
//   progressBarContainer: {
//     marginTop: 30,
//   },
// });

// export default Practice;


import React, { useState, useEffect } from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { View, Text, Button, StyleSheet } from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import { useCountdown } from 'react-native-countdown-circle-timer'

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState( 6); // 25 minutes for work
  const [breakTime, setBreakTime] = useState( 6); // 5 minutes for break
  const [currentTimer, setCurrentTimer] = useState('Work');
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(workTime);
  const [equal, setEqual] = useState(seconds);
  // const [timeEqual, setTimeEqual] = useState(equal)


  const {
    round,
    // rotation,
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    clockwise,
    size,
    strokeWidth,
  } = useCountdown({ isPlaying: true, duration: 7, colors: '#abc' })

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (isActive && seconds === 0) {
      clearInterval(interval);
      toggleTimer();
      setCurrentTimer(currentTimer === 'Work' ? 'Break' : 'Work');
      setSeconds(currentTimer === 'Work' ? breakTime : workTime);

    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, breakTime, workTime, currentTimer]);

  useFocusEffect(() => {
    if (isActive && seconds === 0) {
    setEqual(equal);
    }
  });

  const toggleTimer = () => {
    setIsActive(!isActive);
    setEqual(equal);

  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentTimer('Work');
    setSeconds(workTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerLabel}>{currentTimer === 'Work' ? 'Work Time' : 'Break Time'}</Text>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
      <View style={styles.buttonContainer}>
        <Button title={isActive ? 'Pause' : 'Start'} onPress={toggleTimer} />
        <Button title="Reset" onPress={resetTimer} />
      </View>
      <View>
      <CountdownCircleTimer
          isPlaying={isActive}
          rotation={clockwise}
          strokeLinecap={round}
          duration={equal}
          updateInterval={0}
          size={300}
          strokeWidth={13}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}>
          {({remainingTime}) => <Text style={{color: '#000000', fontSize: 20}}>{formatTime(seconds)}</Text>}
          {/* onComplete={() => {
      // do your stuff here
      return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
    }} */}
        </CountdownCircleTimer> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 24,
    marginBottom: 10,
  },
  timer: {
    fontSize: 40,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default PomodoroTimer;
