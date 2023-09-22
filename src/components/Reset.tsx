import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';

const Reset = () => {
  return (
    <View>
    <TouchableOpacity onPress={() => {}} style={styles.button}>
      <Text style={styles.buttonText}>Reset</Text>
    </TouchableOpacity>
  </View>
  );
};

export default Reset;

const styles = StyleSheet.create({
   
      button: {
        padding: 10,
        borderRadius: 5,
        marginTop: responsiveHeight(18.2),

      },
      buttonText: {
        color: '#ffffff',
        fontSize: responsiveFontSize(1.7),
      },
});
