import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import * as Progress from 'react-native-progress';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const PracticeScreen = () => {
  return (
    <View style={styles.container}>
 <CountdownCircleTimer
    isPlaying={true}
    duration={10}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
    onComplete={() => ({shouldRepeat: true, delay: 0,})}
    updateInterval={1}
    
  >
    
    {({ remainingTime }) => <Text style={{color: '#fff', fontSize: 40}}>{remainingTime}</Text>}
  </CountdownCircleTimer>
    </View>
    
   
  )
}

export default PracticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  }
   
})