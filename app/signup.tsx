import Icon from '@/assets/icons'
import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'

const Signup = () => {

  const router = useRouter();
  const nameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState({ name: '', email: '', password: '' })
    // ✅ Email format validator
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const onSubmit = async () => {
    let newErrors = { name: '', email: '', password: '' }

    if (!nameRef.current.trim()) {
      newErrors.name = 'Please enter your name'
    }

    if (!emailRef.current.trim()) {
      newErrors.email = 'Please enter your email address'
    }else if (!isValidEmail(emailRef.current.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!passwordRef.current.trim()) {
      newErrors.password = 'Please enter your password'
    }

    setErrors(newErrors)
  }

  return (
    <ScreenWrapper bg='white'>
      <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <BackButton router={router}/>
            
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>Get Started</Text>
            </View>

            <View style={styles.form}>
              <Input
               icon={<Icon name= 'user'/>}
               placeholder='Name'
               onChangeText= {value=> {nameRef.current = value
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
               }}
              />
              {errors.email && (<Text style={styles.errorText}>{errors.name}</Text>)}

              <Input
               icon={<Icon name= 'mail'/>}
               placeholder='Email Address'
               onChangeText= {value=> {emailRef.current = value
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
               }}
              />
              {errors.email && (<Text style={styles.errorText}>{errors.email}</Text>)}

              <Input
               icon={<Icon name= 'lock'/>}
               placeholder='Password'
               secureTextEntry
               onChangeText= {value=> {passwordRef.current = value
                if (errors.password) setErrors(prev => ({ ...prev, password: '' }))
               }}
               
              />
              {errors.password && (<Text style={styles.errorText}>{errors.password}</Text>)}

              {/* <Text>
                Forgot Password?
              </Text> */}

              <Button
              title='Signup'
              loading={loading}
              onPress={onSubmit}
              buttonStyle={styles.submitButton}
              />
            </View>

            <View style={styles.signupInstead}>
              <Text>Already have an account?</Text>
              <Pressable  onPress={()=> router.push('/login')}>
                  <Text style={styles.signupCta}>Login</Text>
              </Pressable>
            </View>
  
        </View>
    </ScreenWrapper>
   
  )
}

export default Signup

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
    gap: 25,
    width: '100%',
   },

   submitButton: {
     marginTop: 16,
   },

   signupInstead: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 5,
        marginTop: 16,
    },

    signupCta: {
        textDecorationLine: 'underline',
        fontSize: 16,
        fontWeight: theme.fonts.semiBold,
        color: theme.colors.primary
    },

    errorText: {
      color: 'red',
      marginTop: -20
    }
})