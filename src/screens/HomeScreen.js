import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

let initialPomodoro = 600;
let initialShortBreak = 120;
let initialLongBreak = 180;
let initialCycle = 2;

const HomeScreen = ({navigation}) => {
  const [pomodoro, setPomodoro] = useState(initialPomodoro);
  const [BreakTime, setBreakTime] = useState(initialShortBreak);
  const [longBreak, setLongBreak] = useState(initialLongBreak);
  const [cycleCount, setCycleCount] = useState(1);
  const [cycle, setCycle] = useState(initialCycle);
  console.log(cycle,cycleCount)
  const [backgroundColor, setBackgroundColor] = useState('#3cd689');

  const [num, setNum] = useState(true);

  const callFuntion = () => {
    AsyncStorage.getItem('backgroundColor')
      .then(value => {
        if (value !== null) {
          setBackgroundColor(value);
        }
      })
      .catch(error => {
        console.error('Error backgroundColor', error);
      });

      AsyncStorage.getItem('Cycle')
      .then(value => {
        if (value !== null) {
          setCycle(value);
        }
      })
      .catch(error => {
        console.error('Error backgroundColor', error);
      });
      

    if (currentState === 1) {
      AsyncStorage.getItem('pomodoroTime')
        .then(value => {
          if (value !== null) {
            setPomodoro(parseInt(value));
            setTimer(parseInt(value));
            setNum(!!false);
          }
        })
        .catch(error => {
          console.error('Error pomodoroTime', error);
        });
      AsyncStorage.getItem('shortBreakTime')
        .then(value => {
          if (value !== null) {
            setBreakTime(parseInt(value));
            // setTimer(parseInt(value))
            setNum(!!false);
          }
        })
        .catch(error => {
          console.error('Error shortBreakTime', error);
        });

      AsyncStorage.getItem('longBreakTime')
        .then(value => {
          if (value !== null) {
            setLongBreak(parseInt(value));
            // setTimer(parseInt(value))
            setNum(!!false);
          }
        })
        .catch(error => {
          console.error('Error longBreakTime', error);
        });
    } else if (currentState === 2) {
      AsyncStorage.getItem('pomodoroTime')
        .then(value => {
          if (value !== null) {
            setPomodoro(parseInt(value));
            // setTimer(parseInt(value))
            setNum(!!false);
          }
        })
        .catch(error => {
          console.error('Error pomodoroTime', error);
        });
      AsyncStorage.getItem('shortBreakTime')
        .then(value => {
          if (value !== null) {
            setBreakTime(parseInt(value));
            setTimer(parseInt(value));
            setNum(!!false);
          }
        })
        .catch(error => {
          console.error('Error shortBreakTime', error);
        });

      AsyncStorage.getItem('longBreakTime')
        .then(value => {
          if (value !== null) {
            setLongBreak(parseInt(value));
            // setTimer(parseInt(value))
            setNum(!!false);
          }
        })
        .catch(error => {
          console.error('Error longBreakTime', error);
        });
    } else if (currentState === 3) {
      AsyncStorage.getItem('pomodoroTime')
        .then(value => {
          if (value !== null) {
            setPomodoro(parseInt(value));
            // setTimer(parseInt(value))
            setNum(!!false);
          }
        })
        .catch(error => {
          console.error('Error pomodoroTime', error);
        });
      AsyncStorage.getItem('shortBreakTime')
        .then(value => {
          if (value !== null) {
            setBreakTime(parseInt(value));
            // setTimer(parseInt(value))
            setNum(!!false);
          }
        })
        .catch(error => {
          console.error('Error shortBreakTime', error);
        });

      AsyncStorage.getItem('longBreakTime')
        .then(value => {
          if (value !== null) {
            setLongBreak(parseInt(value));
            setTimer(parseInt(value));
            setNum(!!false);
          }
        })
        .catch(error => {
          console.error('Error longBreakTime', error);
        });
    }
  };

  useFocusEffect(() => {
    if (num == !!true) {
      callFuntion();
    }
  });

  const [currentState, setCurrentState] = useState(1);

  const [timer, setTimer] = useState(pomodoro); // 25 minutes in seconds
  const [timerType, setTimerType] = useState('POMODORO');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    let interval;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      playSound();
      setTimerType('SHORT BREAK');
      toggleState();

      toggleTimer();

      if (timerType === 'POMODORO') {
        setCycleCount(cycleCount + 1);

        if (cycleCount === cycle) {
          setTimerType('LONG BREAK');
          setCurrentState(3);
          setTimer(longBreak); // 30 minutes in seconds
          setCycleCount(1);
        } else {
          setTimerType('SHORT BREAK');
          setCurrentState(2);
          setTimer(BreakTime); // 5 minutes in seconds
        }
      } else {
        setTimerType('POMODORO');
        setCurrentState(1);
        setTimer(pomodoro); // 25 minutes in seconds
      }
    }

    return () => clearInterval(interval);
  }, [timer, isRunning, timerType, cycleCount, cycle]);

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
      // setNum(true)
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
    setIsRunning(false);
    {
      buttonText === 'POMODORO'
        ? setTimer(pomodoro)
        : buttonText === 'SHORT BREAK'
        ? setTimer(BreakTime)
        : setTimer(longBreak);
    }

    setCycleCount(1);
  };

  const toggleState = () => {
    switch (currentState) {
      case 1:
        setTimer(BreakTime);
        setTimerType('SHORT BREAK');
        break;
      case 2:
        setTimer(longBreak);
        setTimerType('LONG BREAK');
        break;
      case 3:
        setTimer(pomodoro);
        setTimerType('POMODORO');
        break;
      default:
        break;
    }
    setCurrentState(prevState => (prevState === 3 ? 1 : prevState + 1));
  };

  switch (currentState) {
    case 1:
      buttonText = 'POMODORO';
      break;
    case 2:
      buttonText = 'SHORT BREAK';
      break;
    case 3:
      buttonText = 'LONG BREAK';
      break;
    default:
      buttonText = 'Increment';
  }

  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <View>
        {!isRunning ? (
          <View style={styles.iconView}>
            <TouchableOpacity
              onPress={() => {
                setNum(!!true), navigation.navigate('Setting');
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../images/icon.png')}
                  style={styles.ImageView}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.iconView}>
            <Text></Text>
          </View>
        )}
      </View>
      <View>
        <Text style={styles.buttonText}>{timerType}</Text>
      </View>

      <View style={styles.outerCircle}>
        <View style={[styles.innerCircle, {backgroundColor: backgroundColor}]}>
          {isRunning ? (
            <TouchableOpacity onPress={toggleTimer}>
              <View
                style={[
                  styles.innerCircleTwo,
                  {backgroundColor: backgroundColor},
                ]}>
                <View style={styles.ViewText}>
                  <Text style={styles.TextStyle}>{formatTime(timer)}</Text>
                  <Text style={styles.buttonText}>PAUSE</Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleTimer}>
              <View
                style={[
                  styles.innerCircleTwo,
                  {backgroundColor: backgroundColor},
                ]}>
                <View style={styles.ViewText}>
                  <Text style={styles.TextStyle}>{formatTime(timer)}</Text>
                  <Text style={styles.buttonText}>START</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View>
        {!isRunning ? (
          <View style={styles.toggleStateView}>
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
                    ? pomodoro / 60
                    : buttonText === 'SHORT BREAK'
                    ? BreakTime / 60
                    : longBreak / 60}{' '}
                  MIN
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.toggleStateView}>
            <Text style={styles.buttonText}>{timerType}</Text>
          </View>
        )}
      </View>

      <View>
        {!isRunning ? (
          <Text style={styles.TimerTextStyle}></Text>
        ) : (
          <View style={styles.ViewText}>
            <Text style={styles.TimerTextStyle}>{formatTime(timer)}</Text>
          </View>
        )}
      </View>
      <View>
        {!isRunning ? (
          <TouchableOpacity style={styles.ResetButtonView} onPress={resetTimer}>
            <Text style={styles.resetbuttonText}>Reset</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.ResetButtonView}
            onPress={toggleTimer}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainViewContainer: {
    flex: 1,
    backgroundColor: '#3cd689',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  iconView: {
    marginLeft: '88%',
    marginTop: '3%',
  },
  ImageView: {
    marginRight: 8,
  },
  button: {
    width: 200,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '10',
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

  ImageView: {
    width: 13,
    height: 22,
    marginRight: 3,
    opacity: 0.8,
  },
  TextStyle: {
    fontSize: responsiveFontSize(7.5),
    color: '#ffffff',
  },
  TimerTextStyle: {
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
    justifyContent: 'center',
    alignContent: 'center',
  },

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
    borderRadius: 127,
  },
  toggleStateView: {
    marginTop: '30%',
  },
  ResetButtonView: {
    marginTop: '20%',
  },
});

export default HomeScreen;
