import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const ProgressBar = ({navigation}) => {
  return (
    <View style={styles.outerCircle}>
      <View style={styles.innerCircle}>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <View style={styles.innerCircleTwo}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  outerCircle: {
    marginTop: responsiveWidth(20.2),
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    backgroundColor: '#ffffff',
    borderRadius: 150,
  },
  innerCircle: {
    // marginTop: responsiveWidth(26.8),
    alignItems: 'center',
    justifyContent: 'center',
    width: 278,
    height: 278,
    backgroundColor: '#0bc080',
    borderRadius: 139,
  },
  innerCircleTwo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 252,
    height: 252,
    backgroundColor: '#0bc080',
    borderRadius: 126,
  },
});
