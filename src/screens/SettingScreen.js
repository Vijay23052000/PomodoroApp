import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [backgroundColor, setBackgroundColor] = useState('#3cd689');

  let initialPomodoroTime = 120; // 25 minutes by default for Pomodoro
  let initialShortBreakTime = 60; // 5 minutes by default for short break
  let initialLongBreakTime = 60; // 15 minutes by default for long break
  let initialCycleCountValue = 2;

  const [pomodoro, setPomodoro] = useState(initialPomodoroTime);
  const [BreakTime, setBreakTime] = useState(initialShortBreakTime);
  const [longBreak, setLongBreak] = useState(initialLongBreakTime);
  const [cycle, setCycle] = useState(initialCycleCountValue);


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
        console.log(
          'Cycle---AsyncStorage.getItem----Setting Screen',
          cycle,
        );
      })
      .catch(error => {
        console.error('Error Cycle', error);
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
  }, [pomodoro, BreakTime, longBreak, backgroundColor, cycle]);

  const incrementPomodoro = () => {
    setPomodoro((pomodoro / 60 + 1) * 60);
    console.log('after press incrementPomodoro button', pomodoro / 60);
  };

 

  const decrementPomodoro = () => {
    console.log("----->", pomodoro)
    if (pomodoro > 60) {
      setPomodoro((pomodoro / 60 - 1) * 60);
    }
  };

  const incrementBreak = () => {
    setBreakTime((BreakTime / 60 + 1) * 60);
    console.log(BreakTime);
  };

  const decrementBreak = () => {
    if (BreakTime > 0) {
      setBreakTime((BreakTime / 60 - 1) * 60);
    }
  };
  const incrementLongBreak = () => {
    setLongBreak((longBreak / 60 + 1) * 60);
    console.log(longBreak);
  };

  const decrementLongBreak = () => {
    if (longBreak > 0) {
      setLongBreak((longBreak / 60 - 1) * 60);
    }
  };

  const changeColor = color => {
    setBackgroundColor(color);
    navigation.setParams({backgroundColor: color}); // Pass the selected color as a navigation parameter
  };

  const incrementCycleCount = () => {
    setCycle(cycle + 1);
  }
  const decrementCycleCount = () => {
    if (cycle > 0) {
      setCycle(cycle - 1);
    }
  };

  return (
    <ScrollView style={{backgroundColor: backgroundColor}}>
      <View style={styles.Main}>
        <View style={styles.BackButtonStyle}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home', {
                // backgroundColor: backgroundColor,
                // pomodoroTime: pomodoro,
                // breakTime: BreakTime,
                // longBreakTime: longBreak,
                // Cycle: cycle,
              })
            }>
            <Text style={{fontSize: 22, color: '#ffffff'}}>{'<'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.DurationText}>DURATIONS</Text>
        </View>
        <View style={styles.TimerContainer}>
          <TouchableOpacity style={styles.PomodoroText} onPress={() => {}}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{pomodoro / 60}</Text>
              <Text style={styles.bottomText}>POMODORO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.PomodoroText} onPress={() => {}}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{BreakTime / 60}</Text>
              <Text style={styles.bottomText}>BREAK</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.PomodoroText} onPress={() => {}}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{longBreak / 60}</Text>
              <Text style={styles.bottomText}>LONG BREAK</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.PlusMinusView}>
          <TouchableOpacity
            style={styles.PlusMinusButtonSizeView}
            onPress={incrementPomodoro}>
            <View style={styles.PlusMinusbuttonView}>
              <Text style={styles.PlusMinuseBottomText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusButtonSizeView}
            onPress={decrementPomodoro}>
            <View style={styles.PlusMinusbuttonView}>
              <Text style={styles.PlusMinuseBottomText}>-</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusButtonSizeView}
            onPress={incrementBreak}>
            <View style={styles.PlusMinusbuttonView}>
              <Text style={styles.PlusMinuseBottomText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusButtonSizeView}
            onPress={decrementBreak}>
            <View style={styles.PlusMinusbuttonView}>
              <Text style={styles.PlusMinuseBottomText}>-</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusButtonSizeView}
            onPress={incrementLongBreak}>
            <View style={styles.PlusMinusbuttonView}>
              <Text style={styles.PlusMinuseBottomText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusButtonSizeView}
            onPress={decrementLongBreak}>
            <View style={styles.PlusMinusbuttonView}>
              <Text style={styles.PlusMinuseBottomText}>-</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.ColorThemeStyle}>COLOR THEMES</Text>
        </View>

        <View style={styles.ColorContainer}>
          <View style={styles.oneView}>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#eba000'}]}
              onPress={() => changeColor('#ebb813')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#aee080'}]}
              onPress={() => changeColor('#aef280')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#b6afb0'}]}
              onPress={() => changeColor('#b6bfb0')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#68d3d9'}]}
              onPress={() => changeColor('#68d3d9')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#006357'}]}
              onPress={() => changeColor('#006357')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
          </View>
          <View style={styles.oneView}>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#0fd000'}]}
              onPress={() => changeColor('#0fd000')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#aaa080'}]}
              onPress={() => changeColor('#aaa080')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#bbbfb0'}]}
              onPress={() => changeColor('#bbbfb0')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#ccc3d9'}]}
              onPress={() => changeColor('#ccc3d9')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#ddd357'}]}
              onPress={() => changeColor('#ddd357')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
          </View>
          <View style={styles.oneView}>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#eee000'}]}
              onPress={() => changeColor('#eee813')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#0aa080'}]}
              onPress={() => changeColor('#0aa280')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#099fb0'}]}
              onPress={() => changeColor('#099fb0')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#0cc3d9'}]}
              onPress={() => changeColor('#0cc3d9')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#1aa357'}]}
              onPress={() => changeColor('#1aa357')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
          </View>
          <View style={styles.oneView}>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#0dd000'}]}
              onPress={() => changeColor('#0dd813')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#0fff80'}]}
              onPress={() => changeColor('#0fff80')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#3fffb0'}]}
              onPress={() => changeColor('#3fffb0')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#8ff3d9'}]}
              onPress={() => changeColor('#8ff3d9')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonText, {backgroundColor: '#9bb357'}]}
              onPress={() => changeColor('#9bb357')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.SoundThemsStyle}>SOUND THEMS</Text>
        </View>
        <View style={styles.TimerContainerView}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>NOTIFICATION SOUND</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>ALARM SOUND</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.OFStyle}>OTHER PREFERENCES</Text>
        </View>
        <View style={styles.TimerContainerThree}>
          <TouchableOpacity style={styles.PomodoroTextTwo} onPress={() => {}}>
            <View style={styles.containerpomodoroTwo}>
              <Text style={styles.topTextTwo}>{cycle}</Text>
              <Text style={styles.bottomTextTwo}>
                POMODOROS UNTIL LONG BREAK
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.PomodoroTextTwo} onPress={() => {}}>
            <View style={styles.containerpomodoroTwo}>
              <Text style={styles.topTextTwo}>{BreakTime / 60}</Text>
              <Text style={styles.bottomTextTwo}>BREAK</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.PlusMinusView}>
          <TouchableOpacity
            style={styles.PlusMinusButtonSizeView}
            onPress={incrementCycleCount}>
            <View style={styles.PlusMinusbuttonView}>
              <Text style={styles.PlusMinuseBottomText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusButtonSizeView}
            onPress={decrementCycleCount}>
            <View style={styles.PlusMinusbuttonView}>
              <Text style={styles.PlusMinuseBottomText}>-</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusButtonSizeView}
            onPress={() => {}}>
            <View style={styles.PlusMinusbuttonView}>
              <Text style={styles.PlusMinuseBottomText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PlusMinusButtonSizeView}
            onPress={() => {}}>
            <View style={styles.PlusMinusbuttonView}>
              <Text style={styles.PlusMinuseBottomText}>-</Text>
            </View>
          </TouchableOpacity>
          
        </View>

        

        <View style={styles.TimerContainerView}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>VIBRATE ON</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>VIBRATE OFF</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.TimerContainerView}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>AUTOSTART BREAKS OFF</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>AUTOSTART BREAKS OFF</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.TimerContainerView}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>AUTOSTART POMODOROS ON</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>AUTOSTART POMODOROS OFF</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.TimerContainerView}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>SHOW NOTIFICATION ON</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>SHOW NOTIFICATION OFF</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.TimerContainerView}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>KEEP PHONE AWAKE ON</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.Pomodoro}>KEEP PHONE AWAKE OFF</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.TimerContainerTwo}>
          <TouchableOpacity style={styles.PomodoroText} onPress={() => {}}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{}</Text>
              <Text style={styles.bottomText}>HOW TO USE?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.PomodoroText} onPress={() => {}}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{}</Text>
              <Text style={styles.bottomText}>WRITE US</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.PomodoroText} onPress={() => {}}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{}</Text>
              <Text style={styles.bottomText}>RATE US</Text>
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
    width: responsiveWidth(2.5),
    height: responsiveHeight(3.5),
    marginLeft: responsiveFontSize(2.5),
    marginTop: responsiveFontSize(0.7),
  },
  DurationText: {
    color: '#ffffff',
    fontSize: responsiveFontSize(1.49),
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: responsiveHeight(1),
    fontWeight: '500',
  },
  TimerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(3),
    marginBottom: 4,
  },
  TimerContainerThree: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(3),
    marginBottom: 4,
  },
  TimerContainerTwo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(3),
    marginBottom: 4,
  },
  PlusMinusView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(0.5),
    marginBottom: 4,
  },
  PlusMinusViewTwo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(0.5),
    marginBottom: 4,
  },
  TimerContainerTwo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(3),
    // marginBottom: '9%',
    // marginBottom: 4,
  },
  PomodoroText: {
    width: responsiveWidth(28),
    height: responsiveHeight(14.8),
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  PomodoroTextTwo: {
    width: responsiveWidth(43),
    height: responsiveHeight(14.8),
    textAlign: 'center',
    justifyContent: 'space-evenly',
    // textAlignVertical: 'bottom',
    
  },
  PlusMinusButtonSizeView: {
    // width: '10%',
    // height: 30,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  PlusMinuseBottomText: {
    fontSize: 20,

    color: '#ffffff',
    paddingTop: 4,
  },
  PlusMinuseBottomText2: {
    fontSize: 20,

    color: '#ffffff',
    paddingTop: 10,
  },
  containerpomodoro: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 30,
    borderRadius: 3,
  },
  containerpomodoroTwo: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 30,
    borderRadius: 3,
  },

  PlusMinusbuttonView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 45,
    height: 43,
    backgroundColor: 30,
    borderRadius: 3,
  },
  PlusMinusbuttonView2: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 60,
    height: 55,
    backgroundColor: 30,
    borderRadius: 3,
    marginTop: 5,
  },
  topText: {
    color: '#ffffff',
    fontSize: responsiveFontSize(4.8),
    paddingTop: 17,
    fontWeight: '300',
  },
  bottomText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingBottom: 12,
    color: '#ffffff',
  },
  topTextTwo: {
    color: '#ffffff',
    fontSize: responsiveFontSize(4.8),
    paddingTop: 17,
    fontWeight: '300',
  },
  bottomTextTwo: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    paddingBottom: 12,
    color: '#ffffff',
  },

  topText2: {
    color: '#ffffff',
    fontSize: responsiveFontSize(4.8),
    paddingTop: 17,
    fontWeight: '300',
  },
  bottomText2: {
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 10,
    color: '#ffffff',
    alignSelf: 'center',

    width: responsiveWidth(44.5),
    height: responsiveHeight(14.2),
    borderRadius: 5,
    marginTop: responsiveHeight(2.8),
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontSize: responsiveFontSize(1.49),
    paddingBottom: 12,
    color: '#ffffff',
    backgroundColor: 30,
    marginLeft: '3%',
    marginRight: '3%',
  },

  ColorContainer: {
    width: responsiveWidth(92),
    height: responsiveHeight(37),
    // borderWidth: 0.7,
    backgroundColor: 30,
    marginTop: responsiveWidth(6),
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  oneView: {
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
  buttonText: {
    borderRadius: 7,
    width: 63,
    height: 61,
    marginLeft: '1.2%',
    marginRight: '1.2%',
  },
  ColorThemeStyle: {
    color: '#ffffff',
    fontSize: responsiveFontSize(1.49),
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: responsiveHeight(3),
    fontWeight: '500',
  },

  SoundThemsStyle: {
    color: '#ffffff',
    fontSize: responsiveFontSize(1.49),
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: responsiveHeight(3.8),
    fontWeight: '500',
  },
  TimerContainerView: {
    width: responsiveWidth(92),

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',

    alignSelf: 'center',
  },

  Pomodoro: {
    alignSelf: 'center',

    width: responsiveWidth(44.5),
    height: responsiveHeight(14.2),
    borderRadius: 5,
    marginTop: responsiveHeight(2.8),
    fontWeight: '500',
    fontSize: responsiveFontSize(1.49),

    textAlign: 'center',
    textAlignVertical: 'bottom',
    paddingBottom: 10,
    color: '#ffffff', 
    backgroundColor: 30,
    marginLeft: '3%',
    marginRight: '3%',
  },

  OFStyle: {
    color: '#ffffff',
    fontSize: responsiveFontSize(1.49),
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: responsiveHeight(3),
    fontWeight: '500',
  },
});
export default SettingScreen;
