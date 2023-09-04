import {FlatList, Image, StyleSheet, View, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

const Screen1 = () => {
  const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto Scroll

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 6000);

    return () => clearInterval(interval);
  });

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });
  // Data for carousel
  const carouselData = [
    {
      id: '01',
      image: require('../images/image1.jpg'),
    },
    {
      id: '02',
      image: require('../images/image2.jpg'),
    },
    {
      id: '03',
      image: require('../images/image3.jpg'),
    },
    {
      id: '04',
      image: require('../images/image4.jpg'),
    },
    {
      id: '05',
      image: require('../images/image5.jpg'),
    },
    {
      id: '06',
      image: require('../images/image6.jpg'),
    },
  ];

  //  Display Images // UI
  const renderItem = ({item, index}) => {
    return (
      <View style={{marginTop: 15}}>
        <Image source={item.image} style={{height: 750, width: screenWidth}} />
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = event => {
    // Get the scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;
    console.log({scrollPosition});
    // Get the index of current active item

    const index = scrollPosition / screenWidth;

    console.log({index});
    // Update the index

    setActiveIndex(index);
  };

  // Render Dot Indicators
  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => {
      // if the active index === index

      if (activeIndex === index) {
        return (
          <View
            style={{
              backgroundColor: 'green',
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: 'red',
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}></View>
        );
      }
    });
  };

  return (
    <View>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 15,
        }}>
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({});
