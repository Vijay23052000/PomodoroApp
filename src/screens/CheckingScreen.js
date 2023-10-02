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
// import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
// import {Sound} from 'react-native-sound';
import { useRoute } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

let initialPomodoro = 1500;
let initialShortBreak = 300;
let initialLongBreak = 1800;
let initialCycle = 2;

const CheckingScreen = ({navigation}) => {
const route = useRoute();
const backgroundColor = route.params?.backgroundColor || '#0ca689';
  const pomodoroTimeR = route.params?.pomodoroTime || initialPomodoro;
  const breakTimeR = route.params?.breakTime || initialShortBreak;
  const longBreakTimeR = route.params?.longBreakTime || initialLongBreak;


 initialPomodoro =  route.params?.pomodoroTime ??   initialPomodoro;
 initialShortBreak = route.params?.breakTime ??  initialShortBreak;
 initialLongBreak = route.params?.longBreakTime ??  initialLongBreak;

  useEffect(() => {
    // timer();
  },[timer])
  console.log("pomodoroTime      ----------", initialPomodoro)
  console.log("BreakTime          ---------", breakTimeR)
  console.log("longBreakTime          -----", longBreakTimeR)
 
  const [timer, setTimer] = useState(initialPomodoro); // 25 minutes in seconds
  const [timerType, setTimerType] = useState('pomodoro');
  const [cycleCount, setCycleCount] = useState(initialCycle);
  const [isRunning, setIsRunning] = useState(false);

  const [Pomodoro, setPomodoro] = useState(initialPomodoro);
  const [Break, setBreak] = useState(breakTimeR);
  const [LongBreak, setLongBreak] = useState(longBreakTimeR);

  const [currentState, setCurrentState] = useState(1);
  const [value, setValue] = useState(0);


   useEffect(() => {
SplashScreen.hide();
   },[])   
  useEffect(() => {
    let interval;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      playSound();
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

  // Sound.setCategory('Playback');
  const playSound = () => {
    var Sound = require('react-native-sound');
    var sound = new Sound('sound.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          sound.getDuration() +
          'number of channels: ' +
          sound.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      sound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

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
    {
      buttonText === 'POMODORO'
        ? setTimer(initialPomodoro)
        : buttonText === 'SHORT BREAK'
        ? setTimer(initialShortBreak)
        : setTimer(initialLongBreak);
    }

    setCycleCount(0);
  };

  const toggleState = () => {
    switch (currentState) {
      case 1:
        // Increment the value
        setTimer(Break);

        break;
      case 2:
        // Decrement the value
        setTimer(LongBreak);

        break;
      case 3:
        // Multiply the value
        setTimer(Pomodoro);

        break;
      default:
        break;
    }

    setCurrentState(prevState => (prevState === 3 ? 1 : prevState + 1));
  };

  let buttonText, buttonColor;

  switch (currentState) {
    case 1:
      buttonText = 'POMODORO';
      // buttonColor = 'blue';
      break;
    case 2:
      buttonText = 'SHORT BREAK';
      // buttonColor = 'green';
      break;
    case 3:
      buttonText = 'LONG BREAK';
      // buttonColor = 'red';
      break;
    default:
      buttonText = 'Increment';
    // buttonColor = 'blue';
  }

  return (
    <View style={{backgroundColor: backgroundColor, flex: 1, alignItems: 'center',  alignContent: 'center'}}>
      <View style={styles.iconView}>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../images/icon.png')}
              style={styles.ImageView}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.outerCircle}>
        <View style={[styles.innerCircle, {backgroundColor: backgroundColor}]}>
          {isRunning ? (
            <TouchableOpacity onPress={toggleTimer}>
              <View style={[styles.innerCircleTwo, {backgroundColor: backgroundColor}]}>
                {/* <Text>Hello</Text> */}

                <View style={styles.ViewText}>
                  <Text style={styles.TextStyle}>{formatTime(timer)}</Text>
                  <Text style={styles.buttonText}>PAUSE</Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleTimer}>
              <View style={[styles.innerCircleTwo, {backgroundColor: backgroundColor}]}>
                {/* <Text>Hello</Text> */}

                <View style={styles.ViewText}>
                  <Text style={styles.TextStyle}>{formatTime(timer)}</Text>
                  <Text style={styles.buttonText}>START</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.toggleStateView}>
        {/* <Text style={styles.valueText}>Value: {value}</Text> */}
        <TouchableOpacity style={styles.button} onPress={toggleState}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../images/arrow.png')}
              style={styles.ImageView}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>
              {buttonText}{' '}
              {buttonText === 'POMODORO'
                ? initialPomodoro / 1
                : buttonText === 'SHORT BREAK'
                ? initialShortBreak / 1
                : initialLongBreak / 1}{' '}
              MIN
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <Timer />
       */}
      <View style={styles.ViewText}>
        <Text style={styles.TimerTextStyle}>{formatTime(timer)}</Text>
      </View>
      <View>
        {!isRunning ? (
          <TouchableOpacity
            style={styles.ResetButtonView}
            onPress={resetTimer}>
            <Text style={styles.resetbuttonText}>Reset</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.ResetButtonView}
            onPress={toggleTimer}
          />
        )}
      </View>

      {/* <Reset /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  MainViewContainer: {
    flex: 1,
    backgroundColor: '#3cd689',
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
    // marginTop: responsiveWidth(20.7),
  },
  button: {
    width: 200,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '10',
    // marginTop: responsiveHeight(20),
  },
  buttonText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: responsiveFontSize(1.5),
  },
  StartbuttonText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
  },
  resetbuttonText: {
    color: 'white',
    fontSize: responsiveFontSize(1.7),
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
    fontSize: responsiveFontSize(6.5),
    color: '#ffffff',
  },
  TimerTextStyle: {
    // fontSize: responsiveFontSize(1.5),
    color: '#ffffff',
  },
  ViewText: {
    marginTop: 10,
  },

  buttonReset: {
    padding: 10,
    borderRadius: 5,
    marginTop: responsiveHeight(1.2),
  },
  buttonTextStyle: {
    color: '#ffffff',
    fontSize: responsiveFontSize(1.7),
  },
  startButton: {
    // backgroundColor: '#000000',
    // marginTop: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  // ResetstartButton: {
  //   backgroundColor: '#3cd689',
  //   marginTop: 156,
  //   fontSize: 14,
  // },
  outerCircle: {
    marginTop: responsiveWidth(20.7),
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    backgroundColor: '#ffffff',
    borderRadius: 150,
  },
  innerCircle: {
    // marginTop: responsiveWidth(26.8),
    alignItems: 'center',
    justifyContent: 'center',
    width: 278,
    height: 278,
    backgroundColor: '#3cd689',
    borderRadius: 139,
  },
  innerCircleTwo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 254,
    height: 254,
    // backgroundColor: '#000000',
    borderRadius: 127,
  },
  toggleStateView: {
    marginTop: '30%',
  },
  ResetButtonView: {
    marginTop: '20%',
  }
});

export default CheckingScreen;
