import Icon from '@/assets/icons'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

const Login = () => {

  const router = useRouter();

  return (
    <ScreenWrapper>
      <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <BackButton router={router}/>
            
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
            </View>

            <View style={styles.form}>
              <Input
               icon={<Icon name= 'mail' 
               placeholder='Email Address'
               onChangeText= {value=> {}}
               />}
              />
            </View>
        </View>
    </ScreenWrapper>
   
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'flex-start',
        gap: 30
    },

   welcomeText: {
    fontSize: 28,
    fontWeight: theme.fonts.bold,
    color: theme.colors.text
   },

   textContainer: {
    marginTop: 80
   },

   form: {
    gap: 25
   }
})