import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import ProgressBar from 'react-native-progress/Bar';

const HomeScreen = ({navigation}) => {
  const initialPomodoroTime = 1; // 25 minutes by default for Pomodoro
  const initialShortBreakTime = 2; // 5 minutes by default for short break
  const initialLongBreakTime = 900; // 15 minutes by default for long break

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
          if (timer === 0 && (timerType === 'Pomodoro')||(timerType === 'Break')) {
            switchToBreak();
          }
        } else {
          setTimer(timer - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [timer, isRunning, timerType]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false); // Stop the timer
    clearInterval(timerInterval); // Clear the interval
    setTimerType('Pomodoro');
    setTimer(initialPomodoroTime); // Reset to the initial Pomodoro time
  };

  const switchToBreak = () => {
    // setTimerType('Break');
    // Set the timer duration based on the current timer type
    if (timerType === 'Pomodoro') {
      setTimer(initialShortBreakTime);
      setTimerType('Break');
       // Switch to short break
    } 
     else if(timerType === 'Break'){
        setTimer(initialPomodoroTime);
      setTimerType('Pomodoro');
      }
    
  };

  const setTimerDuration = (time) => {
    setTimer(time);
    // resetTimer();
  };

  return (
    <ScrollView style={styles.main}>
      <Text style={styles.TextStyle}>Pomodoro</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <TouchableOpacity
              style={[
                styles.innerCircle2,
                isRunning ? styles.pauseButton : null,
              ]}
              onPress={toggleTimer}>
              <View style={styles.innerCircle2}>
                <Text style={styles.timerText}>
                  {`${Math.floor(timer / 60)
                    .toString()
                    .padStart(2, '0')}:${(timer % 60)
                    .toString()
                    .padStart(2, '0')}`}
                </Text>
                <Text style={styles.buttonText}>
                  {isRunning ? 'Pause' : 'Start'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        // style={styles.resetView}
        onPress={() => navigation.navigate('Details')}>
        <Text style={styles.resetStyle}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        <Text style={styles.settingIcon}>
          <Icon name="setting" size={40} color="green" />
        </Text>
      </TouchableOpacity>
      <View style={styles.container}>

        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setTimerDuration(initialPomodoroTime)}>
            <Text style={styles.buttonText}>Pomodoro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setTimerDuration(initialShortBreakTime)}>
            <Text style={styles.buttonText}>Short Break</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setTimerDuration(initialLongBreakTime)}>
            <Text style={styles.buttonText}>Long Break</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'orange',

  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    marginTop: 20,
  },
  outerCircle: {
    width: 300, // Adjust the width and height as needed
    height: 300, // Adjust the width and height as needed
    borderRadius: 150, // Half of the width and height to create a circular shape
    backgroundColor: 'red', // Change the background color to your desired color
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 270, // Adjust the width and height as needed
    height: 270, // Adjust the width and height as needed
    borderRadius: 185, // Half of the width and height to create a circular shape
    backgroundColor: 'blue', // Change the background color to your desired color
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle2: {
    width: 250, // Adjust the width and height as needed
    height: 250, // Adjust the width and height as needed
    borderRadius: 175, // Half of the width and height to create a circular shape
    backgroundColor: 'red', // Change the background color to your desired color
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'blue', // Change the text color to your desired color
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  settingIcon: {
    textAlign: 'center',
    paddingTop: '10%',
  },

  resetStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 150,
    width: 90,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    color: '#ffffff',
    borderColor: '#eba000',
  },
  TextStyle: {
    fontSize: 35,
    fontWeight: '700',
    color: 'white',

    textAlign: 'center',
    paddingVertical: '8%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 60,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  pauseButton: {
    backgroundColor: 'orange', // Change color for pause
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  adjustmentButton: {
    backgroundColor: 'green',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
 
  
});

export default HomeScreen;
