import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  // Switch,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const [bgColor, setBgColor] = useState('#3cd689');
  const [isEnabled, setIsEnabled] = useState(false);

  // const secondsToMinutes = seconds => {
  //   return seconds / 60;
  // };
  let initialPomodoroTime = 180; // 25 minutes by default for Pomodoro
  let initialShortBreakTime = 240; // 5 minutes by default for short break
  let initialLongBreakTime = 360; // 15 minutes by default for long break
  
  const secondsToMinutes = seconds => {
    return seconds / 60;
  };

  // const [pomodoro, setPomodoro] = useState(
  //   secondsToMinutes(initialPomodoroTime),
  // );
  // const [BreakTime, setBreakTime] = useState(minBreak);
  // const [longBreak, setLongBreak] = useState(minLongBreak);
  const [pomodoro, setPomodoro] = useState(secondsToMinutes(initialPomodoroTime))
  const [BreakTime, setBreakTime] = useState(secondsToMinutes(initialShortBreakTime))
  const [longBreak, setLongBreak] = useState(secondsToMinutes(initialLongBreakTime));
  // console.log('pomodoro-------vijay--->', pomodoro);

  const [timer, setTimer] = useState(pomodoro);
  // const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('Pomodoro');
  console.log('check timer value --------->',timer)
  console.log('check pomodoro value --------->',pomodoro)
  console.log('check BreakTime value --------->',BreakTime)
  console.log('check LongBreak value --------->',longBreak)



  const incrementPomodoro = () => {
    setPomodoro(pomodoro + 1);
    console.log(pomodoro)

    // setTimer(pomodoro * 60);
  };

  const decrementPomodoro = () => {
    if (pomodoro > 0) {
      setPomodoro(pomodoro - 1);
      // setTimer(pomodoro);
    }
  };

  const incrementBreak = () => {
    setBreakTime(BreakTime + 1);
    console.log(BreakTime)

    // setTimer(pomodoro * 60);
  };

  const decrementBreak = () => {
    if (BreakTime > 0) {
      setBreakTime(BreakTime - 1);
      // setTimer(pomodoro);
    }
  };
  const incrementLongBreak = () => {
    setLongBreak(longBreak + 1);
    console.log(longBreak)

    // setTimer(pomodoro * 60);
  };

  const decrementLongBreak = () => {
    if (longBreak > 0) {
      setLongBreak(longBreak - 1);
      // setTimer(pomodoro);
    }
  };

  // const toggleTimer = () => {
  //   setIsRunning(!isRunning);
  // };

  // const resetTimer = () => {
  //   setIsRunning(false); // Stop the timer
  //   // clearInterval(timerInterval); // Clear the interval
  //   setTimerType('Pomodoro');
  //   setTimer(initialPomodoroTime); // Reset to the initial Pomodoro time
  // };

 

 

  // const setTimerDuration = time => {
  //   // resetTimer();
  //   setTimer(time);
  // };

  // const toggleSwitch = () => {
  //   setIsEnabled(previousState => !previousState);
  // };

  const changeColor = color => {
    setBgColor(color);
    navigation.setParams({bgColor: color}); // Pass the selected color as a navigation parameter
  };
  // Sound.setCategory('Playback');

  

  return (
    <ScrollView style={{backgroundColor: bgColor}}>
      {/* <Text>(timerType==='Pomodoro') </Text> */}
      <View style={styles.Main}>
        <View style={styles.BackButtonStyle}>
          <TouchableOpacity onPress={() => navigation.navigate('Checking' , {backgroundColor: bgColor, pomodoroTime: pomodoro, breakTime: BreakTime, longBreakTime: longBreak})}>
            <Text style={{fontSize: 22, color: '#ffffff'}}>{'<'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.DurationText}>DURATIONS</Text>
        </View>
        <View style={styles.TimerContainer}>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{pomodoro}</Text>
              <Text style={styles.bottomText}>POMODORO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{BreakTime}</Text>
              <Text style={styles.bottomText}>BREAK</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{longBreak}</Text>
              <Text style={styles.bottomText}>LONG BREAK</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.PlusMinusView}>
        <TouchableOpacity
            style={[styles.PlusMinusButtonSizeView, {backgroundColor: 'bgColor'}]}
            onPress={incrementPomodoro}>
            <View style={styles.PlusMinusbuttonView}>
              
              <Text style={styles.PlusMinuseBottomText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PlusMinusButtonSizeView, {backgroundColor: 'bgColor'}]}
            onPress={decrementPomodoro}>
            <View style={styles.PlusMinusbuttonView}>
              
              <Text style={styles.PlusMinuseBottomText}>-</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PlusMinusButtonSizeView, {backgroundColor: 'bgColor'}]}
            onPress={incrementBreak}>
            <View style={styles.PlusMinusbuttonView}>
              
              <Text style={styles.PlusMinuseBottomText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PlusMinusButtonSizeView, {backgroundColor: 'bgColor'}]}
            onPress={decrementBreak}>
            <View style={styles.PlusMinusbuttonView}>
              
              <Text style={styles.PlusMinuseBottomText}>-</Text>
            </View>
          </TouchableOpacity><TouchableOpacity
            style={[styles.PlusMinusButtonSizeView, {backgroundColor: 'bgColor'}]}
            onPress={incrementLongBreak}>
            <View style={styles.PlusMinusbuttonView}>
              
              <Text style={styles.PlusMinuseBottomText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PlusMinusButtonSizeView, {backgroundColor: 'bgColor'}]}
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
              style={[styles.buttonText, {backgroundColor: '#283357'}]}
              onPress={() => changeColor('#283357')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
          </View>
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
              style={[styles.buttonText, {backgroundColor: '#283357'}]}
              onPress={() => changeColor('#283357')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
          </View>
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
              style={[styles.buttonText, {backgroundColor: '#283357'}]}
              onPress={() => changeColor('#283357')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
          </View>
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
              style={[styles.buttonText, {backgroundColor: '#283357'}]}
              onPress={() => changeColor('#283357')}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.SoundThemsStyle}>SOUND THEMS</Text>
        </View>
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>NOTIFICATION SOUND</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>ALARM SOUND</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.OFStyle}>OTHER PREFERENCES</Text>
        </View>
        
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>NOTIFICATION SOUND</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>ALARM SOUND</Text>
          </TouchableOpacity>
        </View>
       
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>VIBRATE ON</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>VIBRATE OFF</Text>
          </TouchableOpacity>
        </View>
       
        
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>AUTOSTART BREAKS OFF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>AUTOSTART BREAKS OFF</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>AUTOSTART POMODOROS ON</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>AUTOSTART POMODOROS OFF</Text>
          </TouchableOpacity>
        </View>
     
        
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>SHOW NOTIFICATION ON</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>SHOW NOTIFICATION OFF</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>KEEP PHONE AWAKE ON</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <Text style={styles.Pomodoro}>KEEP PHONE AWAKE OFF</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.TimerContainerTwo}>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{}</Text>
              <Text style={styles.bottomText}>HOW TO USE?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{}</Text>
              <Text style={styles.bottomText}>WRITE US</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => {}}>
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
  PlusMinusView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(0.5),
    marginBottom: 4,
  },
  TimerContainerTwo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(3),
    marginBottom: '9%',
    // marginBottom: 4,
  },
  PomodoroText: {
    width: responsiveWidth(28),
    height: responsiveHeight(14.8),
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  PlusMinusButtonSizeView: {
    // width: '10%',
    // height: 30,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  PlusMinuseBottomText: {
    fontSize: 20,
    // textAlign: 'center',
    // paddingBottom: 10,
    color: '#ffffff',
    paddingTop: 4,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // textAlign: 'center'
  },
  containerpomodoro: {
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
  topText: {
    color: '#ffffff',
    fontSize: responsiveFontSize(4.8),
    paddingTop: 17,
    fontWeight: '300',
  },
  bottomText: {
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 10,
    color: '#ffffff',
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
    height: responsiveHeight(12.9),
    borderRadius: 5,
    marginTop: responsiveHeight(2.8),
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontSize: responsiveFontSize(1.49),
    paddingBottom: 10,
    color: '#ffffff',
    backgroundColor: 30,
    marginLeft: '3%',
    marginRight: '3%',
  },
  
  OFStyle:{
    color: '#ffffff',
    fontSize: responsiveFontSize(1.49),
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: responsiveHeight(3),
    fontWeight: '500',
  },

 
});
export default DetailsScreen;
