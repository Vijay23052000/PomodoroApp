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
import Icon from 'react-native-vector-icons/AntDesign';
// import CircularProgress from 'react-native-circular-progress-indicator';
// import {Sound} from 'react-native-sound';

const DetailsScreen = ({navigation}) => {
  const [bgColor, setBgColor] = useState('#3cd689');
  const [isEnabled, setIsEnabled] = useState(false);

  // const secondsToMinutes = seconds => {
  //   return seconds / 60;
  // };
  let initialPomodoroTime = 120; // 25 minutes by default for Pomodoro
  let initialShortBreakTime = 180; // 5 minutes by default for short break
  let initialLongBreakTime = 120; // 15 minutes by default for long break

  console.log('initialPomodoroTime---->', initialPomodoroTime);
  let secondtominute = 60;

  const minPomodoro = initialPomodoroTime / secondtominute;
  const minBreak = initialShortBreakTime / secondtominute;
  const minLongBreak = initialLongBreakTime / secondtominute;
  console.log('minPomodoro----------->', minPomodoro);

  const secondsToMinutes = seconds => {
    return seconds / 60;
  };

  const [pomodoro, setPomodoro] = useState(
    secondsToMinutes(initialPomodoroTime),
  );
  const [Break, setBreak] = useState(minBreak);
  const [longBreak, setLongBreak] = useState(minLongBreak);

  console.log('pomodoro-------vijay--->', pomodoro);

  const [timer, setTimer] = useState(initialPomodoroTime);
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('Pomodoro');

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        if (timer <= 0) {
          clearInterval(timerInterval);
          // Handle timer completion (e.g., play a sound)
          setIsRunning(false);

          // Automatically switch to the break time
          if (timer === 0 && timerType === 'Pomodoro') {
            switchToBreak();
            playSound();
          } else if (timer === 0 && timerType === 'Break') {
            switchToPomodoro();
            playSound();
          }
        } else {
          setTimer(timer - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [timer, isRunning, timerType]);

  const incrementMinutes = () => {
    setPomodoro(pomodoro + 1);

    setTimer(pomodoro * 60);
  };

  const decrementMinutes = () => {
    if (pomodoro > 0) {
      setPomodoro(pomodoro - 1);
      setTimer(pomodoro);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false); // Stop the timer
    // clearInterval(timerInterval); // Clear the interval
    setTimerType('Pomodoro');
    setTimer(initialPomodoroTime); // Reset to the initial Pomodoro time
  };

  const switchToBreak = () => {
    if (timerType === 'Pomodoro') {
      setTimer(initialShortBreakTime);
      setTimerType('Break');
    }
  };

  const switchToPomodoro = () => {
    if (timerType === 'Break') {
      setTimer(initialPomodoroTime);
      setTimerType('Pomodoro');
    }
  };

  const setTimerDuration = time => {
    // resetTimer();
    setTimer(time);
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const changeColor = color => {
    setBgColor(color);
    navigation.setParams({bgColor: color}); // Pass the selected color as a navigation parameter
  };
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

  return (
    <ScrollView style={{backgroundColor: bgColor}}>
      {/* <Text>(timerType==='Pomodoro') </Text> */}
      <View style={styles.Main}>
        <View style={styles.BackButtonStyle}>
          <TouchableOpacity onPress={() => navigation.navigate('Checking' , {backgroundColor: bgColor})}>
            <Text style={{fontSize: 22, color: '#ffffff'}}>{'<'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.DurationText}>DURATIONS</Text>
        </View>
        <View style={styles.TimerContainer}>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => setTimerDuration(initialPomodoroTime)}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{pomodoro}</Text>
              <Text style={styles.bottomText}>POMODORO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => setTimerDuration(initialShortBreakTime)}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{Break}</Text>
              <Text style={styles.bottomText}>BREAK</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => setTimerDuration(initialLongBreakTime)}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{longBreak}</Text>
              <Text style={styles.bottomText}>LONG BREAK</Text>
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
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>NOTIFICATION SOUND</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>ALARM SOUND</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.OFStyle}>OTHER PREFERENCES</Text>
        </View>
        
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>NOTIFICATION SOUND</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>ALARM SOUND</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.OFStyle}>VIBRATE</Text>
        </View>
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>NOTIFICATION SOUND</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>ALARM SOUND</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.OFStyle}>AUTOSTART BREAKS</Text>
        </View>
        
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>NOTIFICATION SOUND</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>ALARM SOUND</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.OFStyle}>AUTOSTART POMODOROS</Text>
        </View>
        
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>NOTIFICATION SOUND</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>ALARM SOUND</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.OFStyle}>SHOW NOTIFICATION</Text>
        </View>
        
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>NOTIFICATION SOUND</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>ALARM SOUND</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.OFStyle}>KEEP PHONE AWAKE</Text>
        </View>
       
        <View style={styles.TimerContainerView}>
          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>NOTIFICATION SOUND</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{backgroundColor: 'bgColor'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.Pomodoro}>ALARM SOUND</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.TimerContainer}>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => setTimerDuration(initialPomodoroTime)}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{pomodoro}</Text>
              <Text style={styles.bottomText}>POMODORO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => setTimerDuration(initialShortBreakTime)}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{Break}</Text>
              <Text style={styles.bottomText}>BREAK</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
            onPress={() => setTimerDuration(initialLongBreakTime)}>
            <View style={styles.containerpomodoro}>
              <Text style={styles.topText}>{longBreak}</Text>
              <Text style={styles.bottomText}>LONG BREAK</Text>
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
    width: responsiveWidth(2),
    height: responsiveHeight(3),
    marginLeft: responsiveFontSize(2.5),
    marginTop: responsiveFontSize(0.4),
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
  PomodoroText: {
    width: responsiveWidth(28),
    height: responsiveHeight(14.8),
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  containerpomodoro: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',

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
