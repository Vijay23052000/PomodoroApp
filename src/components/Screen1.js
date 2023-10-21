import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';
const Screen1 = () => {
  const images = [
    require('../images/image1.jpg'),
    require('../images/image2.jpg'),
    require('../images/image3.jpg'),
    require('../images/image4.jpg'),
    require('../images/image5.jpg'),
    require('../images/image6.jpg'),
  ];
  return (
    <View style={{marginTop: 20}}>
      <SliderBox
        images={images}
        sliderBoxHeight={790}
        dotColor="red"
        inactiveDotColor="black"
        dotStyle={{height: 9, width: 9, borderRadius: 50}}
        imageLoadingColor="black"
        // autoPlay={true}
        // autoplayInterval={1000}
        // circleLoop={true}
        // onCurrentImagePressed={(index) => alert(index+1)}
        // firstItem={0}
      />
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({});
