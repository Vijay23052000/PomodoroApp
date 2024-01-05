import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [backgroundColor, setBackgroundColor] = useState('#3cd689');

  let initialPomodoroTime = 60; // 25 minutes by default for Pomodoro
  let initialShortBreakTime = 60; // 5 minutes by default for short break
  let initialLongBreakTime = 60; // 15 minutes by default for long break
  let initialCycleCountValue = 2;

  const [pomodoro, setPomodoro] = useState(initialPomodoroTime);
  const [BreakTime, setBreakTime] = useState(initialShortBreakTime);
  const [longBreak, setLongBreak] = useState(initialLongBreakTime);
  const [cycle, setCycle] = useState(initialCycleCountValue);
  const [Awake, setAwake] = useState(true);
  const [vibratee, setVibratee] = useState(true);
  const [autoStartBreak, setAutoStartBreak] = useState(false);
  const [signal, setSignal] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('pomodoroTime')
      .then(value => {
        if (value !== null) {
          setPomodoro(parseInt(value));
        }
      })
      .catch(error => {
        console.error('Error pomodoroTime', error);
      });

    AsyncStorage.getItem('shortBreakTime')
      .then(value => {
        if (value !== null) {
          setBreakTime(parseInt(value));
        }
      })
      .catch(error => {
        console.error('Error shortBreakTime: ', error);
      });

    AsyncStorage.getItem('longBreakTime')
      .then(value => {
        if (value !== null) {
          setLongBreak(parseInt(value));
        }
      })
      .catch(error => {
        console.error('Error longBreakTime: ', error);
      });

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
          setCycle(parseInt(value));
        }
      })
      .catch(error => {
        console.error('Error Cycle', error);
      });

    AsyncStorage.getItem('Awake')
      .then(value => {
        if (value !== null) {
          setAwake(JSON.parse(value));
        }
      })
      .catch(error => {
        console.error('Error Awake', error);
      });

    AsyncStorage.getItem('Vibratee')
      .then(value => {
        if (value !== null) {
          setVibratee(JSON.parse(value));
        }
      })
      .catch(error => {
        console.error('Error Vibratee', error);
      });

    AsyncStorage.getItem('AutoStartBreak')
      .then(value => {
        if (value !== null) {
          setAutoStartBreak(JSON.parse(value));
        }
      })
      .catch(error => {
        console.error('Error AutoStartBreak', error);
      });

    AsyncStorage.getItem('Signal')
      .then(value => {
        if (value !== null) {
          setSignal(JSON.parse(value));
        }
      })
      .catch(error => {
        console.error('Error Signal', error);
      });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('pomodoroTime', pomodoro.toString()).catch(error => {
      console.error('Error pomodoroTime: ', error);
    });

    AsyncStorage.setItem('shortBreakTime', BreakTime.toString()).catch(
      error => {
        console.error('Error shortBreakTime: ', error);
      },
    );

    AsyncStorage.setItem('longBreakTime', longBreak.toString()).catch(error => {
      console.error('Error longBreakTime: ', error);
    });

    AsyncStorage.setItem('backgroundColor', backgroundColor.toString()).catch(
      error => {
        console.error('Error backgroundColor: ', error);
      },
    );
    AsyncStorage.setItem('Cycle', cycle.toString()).catch(error => {
      console.error('Error Cycle: ', error);
    });
    AsyncStorage.setItem('Awake', JSON.stringify(Awake)).catch(error => {
      console.error('Error Awake: ', error);
    });
    AsyncStorage.setItem('Vibratee', JSON.stringify(vibratee)).catch(error => {
      console.error('Error Vibratee: ', error);
    });
    AsyncStorage.setItem(
      'AutoStartBreak',
      JSON.stringify(autoStartBreak),
    ).catch(error => {
      console.error('Error AutoStartBreak: ', error);
    });
    AsyncStorage.setItem('Signal', JSON.stringify(signal)).catch(error => {
      console.error('Error Signal: ', error);
    });
  }, [
    pomodoro,
    BreakTime,
    longBreak,
    backgroundColor,
    cycle,
    Awake,
    vibratee,
    autoStartBreak,
    signal,
  ]);

  const incrementPomodoro = () => {
    setPomodoro((pomodoro / 60 + 1) * 60);
  };

  const decrementPomodoro = () => {
    if (pomodoro > 60) {
      setPomodoro((pomodoro / 60 - 1) * 60);
    }
  };

  const incrementBreak = () => {
    setBreakTime((BreakTime / 60 + 1) * 60);
  };

  const decrementBreak = () => {
    if (BreakTime > 60) {
      setBreakTime((BreakTime / 60 - 1) * 60);
    }
  };
  const incrementLongBreak = () => {
    setLongBreak((longBreak / 60 + 1) * 60);
  };

  const decrementLongBreak = () => {
    if (longBreak > 60) {
      setLongBreak((longBreak / 60 - 1) * 60);
    }
  };

  const changeColor = color => {
    setBackgroundColor(color);
    navigation.setParams({backgroundColor: color}); // Pass the selected color as a navigation parameter
  };

  const incrementCycle = () => {
    setCycle(cycle + 1);
  };
  const decrementCycle = () => {
    if (cycle > 1) {
      setCycle(cycle - 1);
    }
  };

  const AwakeOn = () => {
    setAwake(true);
  };
  const AwakeOff = () => {
    setAwake(false);
  };

  const VibrateOn = () => {
    setVibratee(true);
  };
  const VibrateOff = () => {
    setVibratee(false);
  };

  const AutoStartBreakFunctionOn = () => {
    setAutoStartBreak(true);
  };
  const AutoStartBreakFunctionOff = () => {
    setAutoStartBreak(false);
  };

  const NotifiactionSound = () => {
    setSignal(true);
  };

  const AlarmSound = () => {
    setSignal(false);
  };

  const openGmail = () => {
    const email = 'hr@startupindiabuddy.com';
    const subject = 'Pomodoro timer support message';
    const body = 'How are you?';
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  const openPlayStoreURL = () => {
    const url =
      'https://play.google.com/store/apps/details?id=com.pomodrone.app&hl=en&gl=US&pli=1';

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.error('Cannot open this URL');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <ScrollView style={{backgroundColor: backgroundColor}}>
      <View style={styles.Main}>
        <View style={styles.BackButtonStyle}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={{fontSize: 23, color: '#ffffff'}}>{'<'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.DurationText}>DURATIONS</Text>
        </View>
        <View style={styles.TimerMainView}>
          <TouchableOpacity style={styles.TimerButtonView} onPress={() => {}}>
            <View style={styles.TimerView}>
              <Text style={styles.TopText}>{pomodoro / 60}</Text>
              <Text style={styles.BottomText}>POMODORO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TimerButtonView} onPress={() => {}}>
            <View style={styles.TimerView}>
              <Text style={styles.TopText}>{BreakTime / 60}</Text>
              <Text style={styles.BottomText}>BREAK</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TimerButtonView} onPress={() => {}}>
            <View style={styles.TimerView}>
              <Text style={styles.TopText}>{longBreak / 60}</Text>
              <Text style={styles.BottomText}>LONG BREAK</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.PlusMinusMainView}>
          <TouchableOpacity
            style={styles.PlusMinusTouchableView}
            onPress={incrementPomodoro}>
            <View style={styles.PlusMinusView}>
              <Text style={styles.PlusMinusText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusTouchableView}
            onPress={decrementPomodoro}>
            <View style={styles.PlusMinusView}>
              <Text style={styles.PlusMinusText}>-</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusTouchableView}
            onPress={incrementBreak}>
            <View style={styles.PlusMinusView}>
              <Text style={styles.PlusMinusText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusTouchableView}
            onPress={decrementBreak}>
            <View style={styles.PlusMinusView}>
              <Text style={styles.PlusMinusText}>-</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusTouchableView}
            onPress={incrementLongBreak}>
            <View style={styles.PlusMinusView}>
              <Text style={styles.PlusMinusText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusTouchableView}
            onPress={decrementLongBreak}>
            <View style={styles.PlusMinusView}>
              <Text style={styles.PlusMinusText}>-</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.ColorThemeStyle}>COLOR THEMES</Text>
        </View>

        <View style={styles.ColorMainView}>
          <View style={styles.ColorColomnView}>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#3cd689'}]}
              onPress={() => changeColor('#3cd689')}>
              {backgroundColor === '#3cd689' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#0ef280'}]}
              onPress={() => changeColor('#0ef280')}>
              {backgroundColor === '#0ef280' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#b6afb0'}]}
              onPress={() => changeColor('#b6bfb0')}>
              {backgroundColor === '#b6bfb0' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#68d3d9'}]}
              onPress={() => changeColor('#68d3d9')}>
              {backgroundColor === '#68d3d9' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#006357'}]}
              onPress={() => changeColor('#006357')}>
              {backgroundColor === '#006357' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.ColorColomnView}>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#0fd000'}]}
              onPress={() => changeColor('#0fd000')}>
              {backgroundColor === '#0fd000' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#aaa080'}]}
              onPress={() => changeColor('#aaa080')}>
              {backgroundColor === '#aaa080' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#bbbfb0'}]}
              onPress={() => changeColor('#bbbfb0')}>
              {backgroundColor === '#bbbfb0' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#ccc3d9'}]}
              onPress={() => changeColor('#ccc3d9')}>
              {backgroundColor === '#ccc3d9' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#ddd357'}]}
              onPress={() => changeColor('#ddd357')}>
              {backgroundColor === '#ddd357' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.ColorColomnView}>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#345daf'}]}
              onPress={() => changeColor('#345daf')}>
              {backgroundColor === '#345daf' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#0aa080'}]}
              onPress={() => changeColor('#0aa280')}>
              {backgroundColor === '#0aa280' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#099fb0'}]}
              onPress={() => changeColor('#099fb0')}>
              {backgroundColor === '#099fb0' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#0cc3d9'}]}
              onPress={() => changeColor('#0cc3d9')}>
              {backgroundColor === '#0cc3d9' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#1aa357'}]}
              onPress={() => changeColor('#1aa357')}>
              {backgroundColor === '#1aa357' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.ColorColomnView}>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#0dd000'}]}
              onPress={() => changeColor('#0dd813')}>
              {backgroundColor === '#0dd813' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#0fff80'}]}
              onPress={() => changeColor('#0fff80')}>
              {backgroundColor === '#0fff80' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#3fffb0'}]}
              onPress={() => changeColor('#3fffb0')}>
              {backgroundColor === '#3fffb0' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#8ff3d9'}]}
              onPress={() => changeColor('#8ff3d9')}>
              {backgroundColor === '#8ff3d9' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ColorButtonStyle, {backgroundColor: '#9bb357'}]}
              onPress={() => changeColor('#9bb357')}>
              {backgroundColor === '#9bb357' && (
                <Text style={styles.ColorText}>✓</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.SoundThemsStyle}>SOUND THEMS</Text>
        </View>
        <View style={styles.SoundThemsMainView}>
          <TouchableOpacity onPress={NotifiactionSound}>
            <View style={styles.NotifiactionSoundView}>
              {signal === true ? (
                <Text style={styles.NotificationTrue}>✓</Text>
              ) : (
                <Text style={styles.NotificationFalse}>✗</Text>
              )}
              <Text style={styles.NotificationBottom}>NOTIFICATION SOUND</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={AlarmSound}>
            <View style={styles.AlarmSoundView}>
              {signal === false ? (
                <Text style={styles.AlarmTure}>✓</Text>
              ) : (
                <Text style={styles.AlarmFalse}>✗</Text>
              )}
              <Text style={styles.AlarmBottom}>ALARM SOUND</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.OtherPreferanceText}>OTHER PREFERENCES</Text>
        </View>
        <View style={styles.PomodoroUnitLongBreakView}>
          <TouchableOpacity
            style={styles.PomodoroUnitlLBButton}
            onPress={() => {}}>
            <View style={styles.PomodoroUntilLBView}>
              <Text style={styles.TopTextTwo}>{cycle}</Text>
              <Text style={styles.BottomTextTwo}>
                POMODOROS UNTIL LONG BREAK
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.PlusMinusMainView}>
          <TouchableOpacity
            style={styles.PlusMinusTouchableView}
            onPress={incrementCycle}>
            <View style={styles.PlusMinusView}>
              <Text style={styles.PlusMinusText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusTouchableView}
            onPress={decrementCycle}>
            <View style={styles.PlusMinusView}>
              <Text style={styles.PlusMinusText}>-</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.SoundThemsMainView}>
          <TouchableOpacity onPress={VibrateOn}>
            <View style={styles.NotifiactionSoundView}>
              {vibratee === true ? (
                <Text style={styles.NotificationTrue}>✓</Text>
              ) : (
                <Text style={styles.NotificationFalse}>✗</Text>
              )}
              <Text style={styles.NotificationBottom}>VIBRATE ON</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={VibrateOff}>
            <View style={styles.AlarmSoundView}>
              {vibratee === false ? (
                <Text style={styles.AlarmTure}>✓</Text>
              ) : (
                <Text style={styles.AlarmFalse}>✗</Text>
              )}
              <Text style={styles.AlarmBottom}>VIBRATE OFF</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.SoundThemsMainView}>
          <TouchableOpacity onPress={AutoStartBreakFunctionOn}>
            <View style={styles.NotifiactionSoundView}>
              {autoStartBreak === true ? (
                <Text style={styles.NotificationTrue}>✓</Text>
              ) : (
                <Text style={styles.NotificationFalse}>✗</Text>
              )}
              <Text style={styles.NotificationBottom}>AUTOSTART BREAKS ON</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={AutoStartBreakFunctionOff}>
            <View style={styles.AlarmSoundView}>
              {autoStartBreak === false ? (
                <Text style={styles.AlarmTure}>✓</Text>
              ) : (
                <Text style={styles.AlarmFalse}>✗</Text>
              )}
              <Text style={styles.AlarmBottom}>AUTOSTART BREAKS OFF</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.SoundThemsMainView}>
          <TouchableOpacity onPress={AwakeOn}>
            <View style={styles.NotifiactionSoundView}>
              {Awake === true ? (
                <Text style={styles.NotificationTrue}>✓</Text>
              ) : (
                <Text style={styles.NotificationFalse}>✗</Text>
              )}
              <Text style={styles.NotificationBottom}>KEEP PHONE AWAKE ON</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={AwakeOff}>
            <View style={styles.AlarmSoundView}>
              {Awake === false ? (
                <Text style={styles.AlarmTure}>✓</Text>
              ) : (
                <Text style={styles.AlarmFalse}>✗</Text>
              )}
              <Text style={styles.AlarmBottom}>KEEP PHONE AWAKE OFF</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.TimerContainerTwo}>
          <TouchableOpacity
            style={styles.ResponseButton}
            onPress={() => navigation.navigate('Screen1')}>
            <View style={styles.ResponseView}>
              <Text style={styles.ResponseTopText}>{'?'}</Text>
              <Text style={styles.ResponseBottomText}>HOW TO USE?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ResponseButton} onPress={openGmail}>
            <View style={styles.ResponseView}>
              <Text style={styles.ResponseTopTextOne}>{'@'}</Text>
              <Text style={styles.ResponseBottomTextOne}>WRITE US</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ResponseButton}
            onPress={openPlayStoreURL}>
            <View style={styles.ResponseView}>
              <Text style={styles.ResponseTopTextTwo}>{'*'}</Text>
              <Text style={styles.ResponseBottomTextTwo}>RATE US</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  BackButtonStyle: {
    marginLeft: '4%',
    marginTop: '2.3%',
  },

  DurationText: {
    color: '#ffffff',
    fontSize: 13,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: '2%',
  },
  TimerMainView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 25,
  },
  TimerButtonView: {
    width: 115,
    height: 120,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    backgroundColor: 30,
    borderRadius: 5,
  },
  TimerView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TopText: {
    color: '#ffffff',
    fontSize: 38,
    paddingTop: 20,
    fontWeight: '300',
  },
  BottomText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 12,
    color: '#ffffff',
  },
  PlusMinusMainView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 12,
  },
  PlusMinusTouchableView: {
    width: 45,
    height: 43,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  PlusMinusView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 30,
    borderRadius: 3,
  },
  PlusMinusText: {
    fontSize: 23,
    color: '#ffffff',
    paddingTop: 3,
  },
  ColorThemeStyle: {
    color: '#ffffff',
    fontSize: 13,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '7%',
    fontWeight: '500',
  },

  ColorMainView: {
    width: 378,
    height: 300,
    backgroundColor: 30,
    marginTop: '4%',
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  ColorColomnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    marginLeft: '1.8%',
    marginRight: '1.8%',
    marginTop: '1.2%',
    marginBottom: '1.2%',
    paddingLeft: 1.3,
  },
  ColorButtonStyle: {
    borderRadius: 7,
    width: 63,
    height: 61,
    marginLeft: '1.2%',
    marginRight: '1.2%',
  },
  ColorText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 10,
  },
  SoundThemsStyle: {
    color: '#ffffff',
    fontSize: 13,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '7%',
    fontWeight: '500',
  },
  SoundThemsMainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5.5%',
  },

  NotifiactionSoundView: {
    width: 182,
    height: 115,
    backgroundColor: 30,
    marginRight: '3%',
    borderRadius: 5,
  },
  AlarmSoundView: {
    width: 182,
    height: 115,
    backgroundColor: 30,
    borderRadius: 5,
  },
  NotificationTrue: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    paddingTop: '12%',
  },
  NotificationFalse: {
    color: 'white',
    fontSize: 30,
    fontWeight: '300',
    alignSelf: 'center',
    position: 'absolute',
    paddingTop: '12%',
  },
  NotificationBottom: {
    fontSize: 13,
    paddingTop: '45%',
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: '500',
    color: '#ffffff',
  },
  AlarmTure: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    paddingTop: '12%',
  },
  AlarmFalse: {
    color: 'white',
    fontSize: 30,
    fontWeight: '300',
    alignSelf: 'center',
    position: 'absolute',
    paddingTop: '12%',
  },
  AlarmBottom: {
    fontSize: 13,
    paddingTop: '45%',
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: '500',
    color: '#ffffff',
  },
  OtherPreferanceText: {
    color: '#ffffff',
    fontSize: 13,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '7%',
    fontWeight: '500',
  },
  PomodoroUnitLongBreakView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '4%',
  },
  PomodoroUnitlLBButton: {
    width: 375,
    height: 120,
    textAlign: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 30,
    borderRadius: 3,
  },
  PomodoroUntilLBView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopTextTwo: {
    color: '#ffffff',
    fontSize: 37,
    fontWeight: '300',
    paddingBottom: 13,
  },
  BottomTextTwo: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    color: '#ffffff',
  },
  TimerContainerTwo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '5%',
  },
  ResponseButton: {
    width: 112,
    height: 105,
    backgroundColor: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  ResponseView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ResponseTopText: {
    color: '#ffffff',
    fontSize: 38,
    paddingTop: 8,
    fontWeight: '300',
  },
  ResponseBottomText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 12,
    color: '#ffffff',
  },
  ResponseTopTextOne: {
    color: '#ffffff',
    fontSize: 35,
    paddingTop: 5,
    fontWeight: '300',
  },
  ResponseBottomTextOne: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 12,
    color: '#ffffff',
  },
  ResponseTopTextTwo: {
    color: '#ffffff',
    fontSize: 45,
    paddingTop: 5,
    fontWeight: '300',
  },
  ResponseBottomTextTwo: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 42,
    color: '#ffffff',
  },
});
export default SettingScreen;
