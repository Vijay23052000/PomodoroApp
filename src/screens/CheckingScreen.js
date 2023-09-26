import {
  View,
  Image,
  // Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
// import DropDown from '../components/DropDown';
// import SettingIcon from '../components/SettingIcon';
// import ProgressBar from '../components/ProgressBar';
// import Reset from '../components/Reset';
// import Timer from '../components/Timer';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

let initialPomodoro = 15;
let initialShortBreak = 3;
let initialLongBreak = 6;
let initialCycle = 2;

const CheckingScreen = () => {
  const [timer, setTimer] = useState(initialPomodoro); // 25 minutes in seconds
  const [timerType, setTimerType] = useState('pomodoro');
  const [cycleCount, setCycleCount] = useState(initialCycle);
  const [isRunning, setIsRunning] = useState(false);

  const [currentState, setCurrentState] = useState(1);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setTimerType('break');
      toggleTimer();

      if (timerType === 'pomodoro') {
        setCycleCount(cycleCount + 1);

        if (cycleCount === initialCycle) {
          setTimerType('long break');
          setTimer(initialLongBreak); // 30 minutes in seconds
          setCycleCount(0);
        } else {
          setTimerType('short break');
          setTimer(initialShortBreak); // 5 minutes in seconds
        }
      } else {
        setTimerType('pomodoro');
        setTimer(5); // 25 minutes in seconds
      }
    }

    return () => clearInterval(interval);
  }, [timer, isRunning, timerType, cycleCount]);

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false); // Stop the timer if it's running
    } else {
      setIsRunning(true); // Start the timer if it's not running
    }
  };

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const resetTimer = () => {
    //  clearInterval(interval);
    setIsRunning(false);
    setTimerType('pomodoro');
    setTimer(initialPomodoro); // Reset the timer to the initial position
    setCycleCount(0);
  };

  const toggleState = () => {
    switch (currentState) {
      case 1:
        // Increment the value
        setValue(prevValue => prevValue + 2);
        break;
      case 2:
        // Decrement the value
        setValue(prevValue => prevValue - 1);
        break;
      case 3:
        // Multiply the value
        setValue(prevValue => prevValue * 2);
        break;
      default:
        break;
    }

    setCurrentState(prevState => (prevState === 3 ? 1 : prevState + 1));
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
    <View style={styles.MainViewContainer}>
      <View style={styles.iconView}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../images/icon.png')}
              style={styles.ImageView}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.Main}>
        <CountdownCircleTimer
          isPlaying={true}
          duration={timer}
          size={300}
          colors={['#42f5e9', '#000000']}
          colorsTime={[2, 1]}
          onComplete={() => ({shouldRepeat: true, newInitialRemainingTime: 0})}
          updateInterval={0}
          trailColor="#ffffff">
          {({}) => (
            <Text style={{color: '#ffffff', fontSize: 50}}>
              {formatTime(timer)}
            </Text>
          )}
          {/* <Text >5</Text> */}
        </CountdownCircleTimer>
      </View>

      {/* <SettingIcon /> */}
      {/* <ProgressBar /> */}
      {/* <DropDown /> */}
      <View>
        {/* <Text style={styles.valueText}>Value: {value}</Text> */}
        <TouchableOpacity style={styles.button} onPress={toggleState}>
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
      {/* <Timer />
       */}
      <View style={styles.ViewText}>
        <Text style={styles.TextStyle}>{formatTime(timer)}</Text>
      </View>

      <View>
        {isRunning ? (
          <TouchableOpacity style={styles.startButton} onPress={toggleTimer}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.startButton} onPress={toggleTimer}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        {!isRunning ? (
          <TouchableOpacity style={styles.startButton} onPress={resetTimer}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleTimer}  />
        )}
      </View>

      {/* <Reset /> */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  MainViewContainer: {
    flex: 1,
    backgroundColor: '#4c9665',
    alignItems: 'center',
  },
  iconView: {
    width: 10,
    height: 10,
    marginLeft: 346,
    marginTop: responsiveHeight(1.8),
    opacity: 0.7,
  },
  ImageView: {
    width: 15,
    height: 22,
    marginRight: 8,
  },
  Main: {
    marginTop: responsiveWidth(20.7),
  },
  button: {
    width: 200,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '10',
    marginTop: responsiveHeight(19.5),
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
    opacity: 0.8,
  },
  TextStyle: {
    fontSize: responsiveFontSize(1.5),
    color: '#ffffff',
  },
  ViewText: {
    marginTop: 10,
  },

  buttonReset: {
    padding: 10,
    borderRadius: 5,
    marginTop: responsiveHeight(15.2),
  },
  buttonTextStyle: {
    color: '#ffffff',
    fontSize: responsiveFontSize(1.7),
  },
  startButton: {
    backgroundColor: '#4c9665',
  },
});

export default CheckingScreen;
