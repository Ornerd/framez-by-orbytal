import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { heigthPercentage, widthPercentage } from '@/helpers/common'
import React from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'

const Welcome = () => {
  return (
    <ScreenWrapper bg= "white">
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Image style={styles.welcomeImg} source={require('../assets/images/welcome-img.png')} />
      </View>
      <View style={{gap:20}}>
        <Text style= {styles.appName}>Framez</Text>
        <Text style= {styles.caption}>Safe haven for your fond memories</Text>
      </View>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: widthPercentage(4),
    },

    welcomeImg: {
        width: widthPercentage(80),
        height: heigthPercentage(60),
        objectFit: 'contain',
        alignSelf: 'center'
    },

    appName: {
        color: theme.colors.text,
        fontSize: heigthPercentage(8),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    }
})