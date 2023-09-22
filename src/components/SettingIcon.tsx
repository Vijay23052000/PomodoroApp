import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const SettingIcon = () => {
  return (
    <View style={styles.iconView}>
    <TouchableOpacity onPress={() => {} }>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../images/icon.png')}
          style={styles.ImageView}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  </View>
  )
}

export default SettingIcon;

const styles = StyleSheet.create({
    iconView: {
        width: 10,
        height: 10,
        marginLeft: 346,
        marginTop: responsiveHeight(1.8),
        opacity: .7,
      },
      ImageView: {
        width: 15,
        height: 22,
        marginRight: 8,
      },
})