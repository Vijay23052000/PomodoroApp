import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const DropDown = ({navigation}) => {
  return (
    <View style={styles.DropDownMainView}>
    <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
<Text style={styles.TextView}>
  POMODORO 2 MIN
</Text>
    </TouchableOpacity>
  </View>
  )
}

export default DropDown

const styles = StyleSheet.create({
  DropDownMainView: {
 marginTop: responsiveHeight(20),
  },
  TextView: {
    color: '#fff',
    fontSize: responsiveHeight(1.5),
    fontWeight: '500',
  }
})