import Header from '@/components/Header'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Profile = () => {

    const {user, setAuth} = useAuth();
    const router = useRouter()

  return (
    <ScreenWrapper bg='white'>
        <UserHeader
            user={user}
            router={router}
        />
    </ScreenWrapper>
  )
}

const UserHeader = ({user, router}) => {
    return (
      <View style={{flex:1, backgroundColor:'white', paddingHorizontal: 24}}>
        <Header title="Profile" showBackButton={true}/>
      </View>
    )
}

export default Profile

const styles = StyleSheet.create({})