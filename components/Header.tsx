import { theme } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BackButton from './BackButton'

type HeaderProps= {
    title: string,
    showBackButton: boolean,
    mb?: number
}

const Header = ({title, showBackButton, mb}: HeaderProps) => {

    const router = useRouter()

  return (
    <View style= {[styles.container, {marginBottom: mb}]}>
      {
        showBackButton && (
            <View style={styles.showBackButton}>
                <BackButton router={router}/>
            </View>
        )
      }

      <Text style={styles.title}>{title || ''}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 8,
        position: 'relative',
        paddingHorizontal: 24
    },

    title: {
        fontSize: 24,
        fontWeight: theme.fonts.semiBold,
        color: theme.colors.text
    },
    
    showBackButton: {
        position: 'absolute',
        left: 0
    }
})