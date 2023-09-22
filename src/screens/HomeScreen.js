import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import DropDown from '../components/DropDown';
import SettingIcon from '../components/SettingIcon';
import ProgressBar from '../components/ProgressBar';
import Reset from '../components/Reset';
import Timer from '../components/Timer';

const HomeScreen = () => {
  return (
    <View style={styles.MainViewContainer}>
     <SettingIcon />
     <ProgressBar />
      <DropDown />
      <Timer />
      <Reset />
    </View>
  );
};

const styles = StyleSheet.create({
  MainViewContainer: {
    flex: 1,
    backgroundColor: '#0bc080',
    alignItems: 'center',
  },
 
  
});

export default HomeScreen;
