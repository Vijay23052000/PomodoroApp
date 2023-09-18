import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  // Switch,
} from 'react-native';
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

console.log("initialPomodoroTime---->",initialPomodoroTime)
  let secondtominute = 60;

  const minPomodoro = (initialPomodoroTime/secondtominute);
  const minBreak = (initialShortBreakTime/secondtominute);
  const minLongBreak = (initialLongBreakTime/secondtominute);
  console.log("minPomodoro----------->",minPomodoro)


  const [pomodoro, setPomodoro] = useState(minPomodoro)
  const [Break, setBreak] = useState(minBreak)
  const [longBreak, setLongBreak] = useState(minLongBreak)

console.log("pomodoro---------->",pomodoro)


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
          }
          else if(timer === 0 &&  timerType === 'Break'){
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

    setTimer(pomodoro*60);
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
      <Text style={styles.TextStyle}>
                  {(timerType === 'Pomodoro') ? 'Keep Work Hard!' : 'Take Break'}
                </Text>
     
      <View style={styles.buttonContainer}>
        <View style={[styles.outerCircle, {backgroundColor: bgColor}]}>
          <View style={styles.innerCircle}>
            <View style={[styles.innerCircle2, {backgroundColor: bgColor}]}>
              <TouchableOpacity
              style={[styles.innerCircle2, {backgroundColor: bgColor}, isRunning ? styles.pauseButton : null,]}
                // style={[
                //   styles.innerCircle2,
                //   isRunning ? styles.pauseButton : null,
                // ]}
                onPress={toggleTimer}>
                <Text style={styles.timerText}>
                  {`${Math.floor(timer / 60)
                    .toString()
                    .padStart(2, '0')}:${(timer % 60)
                    .toString()
                    .padStart(2, '0')}`}
                </Text>
                <Text style={styles.buttonTexttime}>
                  {isRunning ? 'Pause' : 'Start'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      
      {/* <Text>(timerType==='Pomodoro') </Text> */}
      <View style={{width: 40, height: 40, marginLeft: 20, marginTop: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{fontSize: 28}}>{'<'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.TextViewSoundDURATIONS}>
        <Text style={styles.TextSound}>DURATIONS</Text>
      </View>
      <View style={styles.TimerContainer}>
        <TouchableOpacity
          style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
          onPress={() => setTimerDuration(initialPomodoroTime)}>
          <View style={styles.containerpomodoro}>
            <Text style={styles.topText}>{pomodoro}</Text>
            <Text style={styles.bottomText}>Pomodoro</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
          onPress={() => setTimerDuration(initialShortBreakTime)}>
          <View style={styles.containerpomodoro}>
            <Text style={styles.topText}>{Break}</Text>
            <Text style={styles.bottomText}>Break</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
          onPress={() => setTimerDuration(initialLongBreakTime)}>
          <View style={styles.containerpomodoro}>
            <Text style={styles.topText}>{longBreak}</Text>
            <Text style={styles.bottomText}>Long Break</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.PlusMinusecontainer}>
        <View style={styles.PlusMinuseView}>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={incrementMinutes}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.minusButton}
            onPress={decrementMinutes}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.PlusMinuseView}>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={incrementMinutes}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.minusButton}
            onPress={decrementMinutes}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.PlusMinuseView}>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={incrementMinutes}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.minusButton}
            onPress={decrementMinutes}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.TextViewSound}>
        <Text style={styles.TextSound}>COLOR THEMES</Text>
      </View>

      <View style={styles.ColorContainer}>
        <View style={styles.oneView}>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#eba000'}]}
            onPress={() => changeColor('#ebb813')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#aee080'}]}
            onPress={() => changeColor('#aef280')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#b6afb0'}]}
            onPress={() => changeColor('#b6bfb0')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#68d3d9'}]}
            onPress={() => changeColor('#68d3d9')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#283357'}]}
            onPress={() => changeColor('#283357')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.oneView}>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#FF0000')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#00FF00')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#0000FF')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#0000FF')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#0000FF')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.oneView}>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#FF0000')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#00FF00')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#0000FF')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#0000FF')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#0000FF')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.oneView}>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#FF0000')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#00FF00')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#0000FF')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#0000FF')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonText, {backgroundColor: '#ebb813'}]}
            onPress={() => changeColor('#0000FF')}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.TextViewSound}>
        <Text style={styles.TextSound}>SOUND THEMS</Text>
      </View>
      <View style={styles.TimerCon}>
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
      <View style={styles.TextViewSound}>
        <Text style={styles.TextSound}>OTHER PREFERENCES</Text>
      </View>
      <View style={styles.TimerCon}>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>POMODORO UNIT LONG BREAK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>DAILY GOAL</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.TextViewSound}>
        <Text style={styles.TextSound}>VIBRATE</Text>
      </View>
      <View style={styles.TimerCon}>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>OFF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>ON</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.TextViewSound}>
        <Text style={styles.TextSound}>AUTOSTART BREAKS</Text>
      </View>
      <View style={styles.TimerCon}>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>OFF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>ON</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.TextViewSound}>
        <Text style={styles.TextSound}>AUTOSTART POMODOROS</Text>
      </View>
      <View style={styles.TimerCon}>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>OFF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>ON</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.TextViewSound}>
        <Text style={styles.TextSound}>SHOW NOTIFICATION</Text>
      </View>
      <View style={styles.TimerCon}>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>OFF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>ON</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.TextViewSound}>
        <Text style={styles.TextSound}>KEEP PHONE AWAKE</Text>
      </View>
      <View style={styles.TimerCon}>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>OFF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.Pomodoro}>ON</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.TimerContainer}>
        <TouchableOpacity
          style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.PomodoroText}>POMODORO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.PomodoroText}>BREAK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.PomodoroText, {backgroundColor: 'bgColor'}]}
          onPress={() => changeColor('#ebb813')}>
          <Text style={styles.PomodoroText}>LONG BREAK</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    borderRadius: 3,
    width: 62,
    height: 62,
    marginLeft: '1%',
    marginRight: '1%',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'space-between',
    textAlignVertical: 'center',
  },
  oneView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '1%',
    marginBottom: '1%',
    paddingLeft: 1,
  },
  ColorContainer: {
    borderWidth: 0.3,
    borderRadius: 4,
    // marginTop: '2%',
    paddingBottom: '1%',
    paddingTop: '1%',
    marginLeft: '6%',
    marginRight: '6%',
  },
  PomodoroText: {
    // fontSize: 8,
    width: 100,
    height: 105,
    borderWidth: 0.2,
    borderRadius: 3,
    // borderWidth: 0.3,
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    paddingBottom: 10,
    color: '#ffffff',
  },
  TimerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 4,
  },
  Pomodoro: {
    // fontSize: 4,
    width: 170,
    height: 111,
    borderWidth: 1,
    borderRadius: 5,
    borderWidth: 0.3,
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    paddingBottom: 10,
    color: '#ffffff',
    // backgroundColor:'red'
  },
  TimerCon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: '3%',
    marginRight: '3%',
    // marginTop: 10,
  },
  TextViewSound: {
    marginTop: 25,
    marginBottom: 12,
  },
  TextSound: {
    color: '#ffffff',
    fontSize: 12,
    justifyContent: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 18,
  },
  TextViewSoundDURATIONS: {
    marginTop: 15, 
  },
  container: {
    flex: 1,
    backgroundColor: '#eba000',
    // backgroundColor: bgColor,
  },

  TextStyle: {
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
    //  justifyContent: 'center',
    //  alignContent: 'center',
    textAlign: 'center',
    paddingVertical: '8%',
  },
  // buttonText: {
  //   color: '#dddddd', // Change this to your desired text color
  //   fontSize: 18,
  //   height: 90,
  //   width: 90,
  // },
  BtnView: {
    height: 90,
    width: 90,
    color: '#000000',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '12%',
  },
  button: {
    width: 300, // Adjust the width and height to make it as large as you want
    height: 300,
    borderRadius: 150, // Set half of the width or height to make it circular
    backgroundColor: '#eba000', // Customize the background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  // buttonText: {
  //   color: 'white', // Customize the text color
  //   fontSize: 20, // Customize the text size
  //   width: 270, // Adjust the width and height to make it as large as you want
  //   height: 270,
  //   borderRadius: 135, // Set half of the width or height to make it circular
  //   backgroundColor: '#eba000',
  // },
  settingIcon: {
    textAlign: 'center',
    paddingTop: '10%',
  },
  // iconContainer: {
  //   backgroundColor: 'blue', // Customize the background color of the touchable area
  //   borderRadius: 50, // Set the border radius to make it circular
  //   padding: 10, // Adjust padding as needed
  // },
  // icon: {
  //   color: 'white', // Customize the icon color
  //   fontSize: 30, // Customize the icon size
  // },
  resetStyle: {
    fontSize: 20,
    textAlign: 'center',
    // paddingTop: 1,
    marginTop: 150,
    width: 90,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    color: '#ffffff',
    borderColor: '#eba000',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularButton: {
    width: 330, // Adjust the width and height as needed to make it circular
    height: 330, // Adjust the width and height as needed to make it circular
    borderRadius: 215, // Half of the width and height to create a circular shape
    backgroundColor: 'blue', // Change the background color to your desired color
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  buttonTexttime: {
    color: 'white', // Change the text color to your desired color
    fontSize: 18,
    fontWeight: 'bold',
    fontSize: 28,
    // fontWeight: 'bold',
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: '700',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'orange',
    marginTop: 20,
  },
  outerCircle: {
    width: 300, // Adjust the width and height as needed
    height: 300, // Adjust the width and height as needed
    borderRadius: 150, // Half of the width and height to create a circular shape
    // backgroundColor: 'red', // Change the background color to your desired color
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 270, // Adjust the width and height as needed
    height: 270, // Adjust the width and height as needed
    borderRadius: 185, // Half of the width and height to create a circular shape
    backgroundColor: "#ffffff", // Change the background color to your desired color
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle2: {
    width: 250, // Adjust the width and height as needed
    height: 250, // Adjust the width and height as needed
    borderRadius: 225, // Half of the width and height to create a circular shape
    // backgroundColor: 'black', // Change the background color to your desired color
    alignItems: 'center',
    justifyContent: 'center',
  },

  timerText: {
    fontSize: 60,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  PlusMinusecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PlusMinuseView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 14,
    marginRight: 14,
  },

  plusButton: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 5,
    // marginHorizontal: 10,
  },
  minusButton: {
    backgroundColor: 'lightcoral',
    paddingHorizontal: 20,
    paddingVertical: 12,
    // paddingTop: 9,
    borderRadius: 5,
    // marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  containerpomodoro: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 105,
    height: 85,
  },
  topText: {
    color: 'white',
    fontSize: 40,
    
    // textAlignVertical: 'bottom',
    // width: 100,
    // height: 105,
    paddingRight: 9,

  },
  bottomText: {
    //  fontSize: 8,
    // width: 100,
    // height: 105,
    // borderWidth: 0.2,
    // borderRadius: 3,
    // borderWidth: 0.3,
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    paddingBottom: 1,
    // paddingTop: 40,
    color: '#ffffff',
  },
});
export default DetailsScreen;
