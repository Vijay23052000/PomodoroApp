import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const Timer = () => {
  return (
    <View style={styles.ViewText}>
      <Text style={styles.TextStyle}>01:00</Text>
    </View>
  )
}

export default Timer

const styles = StyleSheet.create({
    TextStyle:{
        fontSize: responsiveFontSize(1.5),
        color: '#ffffff',
        
    },
    ViewText: {
        marginTop: 10,
    }
})