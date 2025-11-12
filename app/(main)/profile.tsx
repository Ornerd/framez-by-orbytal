import BackButton from '@/components/BackButton'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Profile = () => {

    const {user, setAuth} = useAuth();
    const router = useRouter()

  return (
    <ScreenWrapper>
      <View>
        <View>
            <BackButton
            router={router}
            />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({})