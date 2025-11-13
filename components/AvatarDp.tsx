import { theme } from '@/constants/theme'
import { heigthPercentage } from '@/helpers/common'
import { getUserImageSrc } from '@/services/imagesService'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet } from 'react-native'

const AvatarDp = ({ uri,
    size= heigthPercentage(4.5),
    rounded= theme.radius.md,
    style={}
}:{uri: any, size: number, rounded: number, style?: any}) => { 

  return (
    <Image 
        source={getUserImageSrc(uri)}
        transition={100}
        style={[styles.avatar, {height: size, width: size, borderRadius: rounded}, style]}
    />
  )
}

export default AvatarDp

const styles = StyleSheet.create({
    avatar: {
        borderColor: theme.colors.darkLight,
        borderWidth: 1
    }
})