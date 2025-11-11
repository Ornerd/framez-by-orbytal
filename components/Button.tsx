import { theme } from '@/constants/theme'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Loading from './Loading'

type ButtonProps = {
    buttonStyle?: object,
    textStyle?: object,
    title:string,
    onPress?: ()=> void,
    loading?: boolean
}

const Button = ({buttonStyle, textStyle, title, onPress, loading}: ButtonProps) => {

  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, {backgroundColor: 'white'}]}>
        <Loading size='large' color={theme.colors.primary}/>
      </View>
    )
  }

  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle]}> 
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: theme.radius.xs
    },

    buttonText: {
        fontSize: 20,
        color: 'white',
        lineHeight: 30        
    }
})