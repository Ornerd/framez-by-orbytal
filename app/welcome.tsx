import Button from '@/components/Button'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { heigthPercentage } from '@/helpers/common'
import React from 'react'
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'

const Welcome = () => {
  return (
    <ScreenWrapper bg= "white">
      <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
            <Image style={styles.welcomeImg} source={require('../assets/images/welcome-img.png')} />

            <View>
                <Text style= {styles.appName}>Framez</Text>
                <Text style= {styles.caption}>Safe haven for your fond memories</Text>
            </View>
            <View style={styles.cta}>
                <Button
                title='Get Started'
                />
                <View style={styles.loginInstead}>
                    <Text>Already have an account?</Text>
                    <Pressable>
                        <Text style={styles.loginCta}>Login</Text>
                    </Pressable>
                </View>
            </View>    

        </View>
        
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        paddingHorizontal: 24,
    },

    welcomeImg: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    },

    appName: {
        color: theme.colors.text,
        fontSize: heigthPercentage(8),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },

    caption: {
        color: theme.colors.text,
        fontSize: 14,
        textAlign: 'center',
    },

    cta: {
        width: '100%',
        marginTop: 80
    },

    loginInstead: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginTop: 16,
    },

    loginCta: {
        textDecorationLine: 'underline',
        fontSize: 16,
        fontWeight: theme.fonts.semiBold,
        color: theme.colors.primary
    }
})