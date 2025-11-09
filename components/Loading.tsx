import { theme } from '@/constants/theme'
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

type LoadingProps = {
    size?: "large",
    color?: string,

}

const Loading = ({size, color = theme.colors.primary}: LoadingProps) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})