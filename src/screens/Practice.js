
import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, SectionList} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(12); // 25 minutes for work
  const [breakTime, setBreakTime] = useState(60); // 5 minutes for break
  const [currentTimer, setCurrentTimer] = useState('Work');
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(workTime);
  
  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
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

 
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentTimer('Work');
    setSeconds(workTime);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const funtionCall = () => {
    return ((currentTimer === 'Work') ? ((seconds/workTime)*100) : ((seconds/breakTime)*100))
  }
  return (
    <View style={styles.container}>
      <Text style={styles.timerLabel}>
        {currentTimer === 'Work' ? 'Work Time' : 'Break Time'}
      </Text>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
      <View style={styles.buttonContainer}>
        <Button title={isActive ? 'Pause' : 'Start'} onPress={toggleTimer} />
        <Button title="Reset" onPress={resetTimer} />
      </View>
      <View>
        <AnimatedCircularProgress
          size={300} 
          width={12}
          fill={funtionCall()}
          rotation={0}
          duration={500}
          tintColor="#00e0ff"
          delay={0}
          backgroundColor="#3d5875">
          {() =>
            (isActive) ? (
              <TouchableOpacity
                style={{
                  width: 280,
                  height: 280,
                  backgroundColor: '#00ff00',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 140,
                }}
                onPress={toggleTimer}>
                <Text style={{fontSize: 50, color: '#000000'}}>
                  {formatTime(seconds)}
                </Text>
                <Text style={{fontSize: 40, color: '#000000'}}>PAUSE</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={{
                  width: 280,
                  height: 280,
                  backgroundColor: '#00ff00',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 140,
                }}
                onPress={toggleTimer}>
                <Text style={{fontSize: 50, color: '#000000'}}>
                  {formatTime(seconds)}
                </Text>
                <Text style={{fontSize: 40, color: '#000000'}}>START</Text>
              </TouchableOpacity>
            )
          }
        </AnimatedCircularProgress>
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
    color: '#000000',
  },
  timer: {
    fontSize: 40,
    marginBottom: 20,
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default PomodoroTimer;
