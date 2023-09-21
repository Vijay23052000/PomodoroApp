import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const SettingIcon = ({navigation}) => {
  return (
    <View style={styles.iconView}>
    <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
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

export default SettingIcon

const styles = StyleSheet.create({
    iconView: {
        width: 10,
        height: 10,
        marginLeft: 340,
        marginTop: responsiveHeight(2),
        opacity: .7,
      },
      ImageView: {
        width: 17.5,
        height: 22,
        marginRight: 8,
      },
})