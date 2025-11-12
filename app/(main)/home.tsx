import Button from '@/components/Button'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

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
        <View>
            <Text>Home</Text>
            <Button title='logout' onPress={doTheLogout}/>
        </View>
    </ScreenWrapper>
    
  )
}

export default Home

const styles = StyleSheet.create({})