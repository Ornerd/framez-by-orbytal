import Icon from '@/assets/icons'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'

const Home = () => {

    const {setAuth} = useAuth();
    const router = useRouter()

    const doTheLogout = async ()=> {
       setAuth(null)
       const {error} = await supabase.auth.signOut()
       error && Alert.alert('Error signing out')
    }

  return (
    <ScreenWrapper>
        <View style={styles.container}>
            <View style={styles.topMenu}>
                <Text style={styles.appName}>Framez</Text>
                <View style={styles.icons}>
                    <Pressable onPress={()=> router.push('/(main)/notifications')}>
                        <Icon
                        name='heart'
                        size={32}
                        strokeWidth={1}
                        />
                    </Pressable>

                    <Pressable onPress={()=>router.push('/(main)/newPost')}>
                        <Icon
                        name='plus'
                        size={32}
                        strokeWidth={1}
                        />
                    </Pressable>

                    <Pressable onPress={()=>router.push('/(main)/profile')}>
                        <Icon
                        name='user'
                        size={32}
                        strokeWidth={1}
                        />
                    </Pressable>
                </View>
            </View>
            
        </View>
    </ScreenWrapper>
    
  )
}

export default Home

const styles = StyleSheet.create({
     container: {
        flex: 1,
        paddingHorizontal: 24
    },

    topMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },

    appName: {
        fontSize: 26,
        fontWeight: theme.fonts.bold,
        color: theme.colors.primary
    },

    icons: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'

    }
})