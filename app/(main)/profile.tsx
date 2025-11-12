import Icon from '@/assets/icons'
import AvatarDp from '@/components/AvatarDp'
import Header from '@/components/Header'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { heigthPercentage, widthPercentage } from '@/helpers/common'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {

    const {user, setAuth} = useAuth();
    const router = useRouter()

    const logoutUser = async ()=> {
      setAuth(null)
        const {error} = await supabase.auth.signOut()
        error && Alert.alert('Error signing out')
    }
    
    const doTheLogout = async ()=> {
      Alert.alert('Confirm', 'Do you really want to leave?', [
        {
          text: 'No way',
          onPress: ()=> console.log('modal cancel'),
          style: 'cancel'
        },
        {
          text: 'Yeah',
          onPress: ()=> logoutUser(),
          style: 'destructive'
        }
      ])
    }

  return (
    <ScreenWrapper bg='white'>
        <UserHeader
            user={user}
            router={router}
            doTheLogout={doTheLogout}
        />
    </ScreenWrapper>
  )
}

const UserHeader = ({user, router, doTheLogout}) => {
    return (
      <View style={{flex:1, backgroundColor:'white', paddingHorizontal: 24, position: 'relative'}}>
        <Header title="Profile" showBackButton={true}/>
        <TouchableOpacity style={styles.logoutButton} onPress={doTheLogout}>
          <Icon 
          name='logout' 
          color={theme.colors.rose} 
          />
        </TouchableOpacity>

        <View style={styles.container}>

            <View style={{gap: 5}}>
              <View style={styles.avatarWrapper}>
                  <AvatarDp
                  uri={user?.image}
                  size={heigthPercentage(12)}
                  rounded={theme.radius.xxl} 
                />
                <Pressable style={styles.editIcon} onPress={()=> router.push('/(main)/editProfile')}>
                  <Icon name='edit' size={24}/>
                </Pressable>
              </View>

              <View style={{alignItems: 'center', gap: 4}}>
                  <Text style={styles.userName}>
                    {user && user.user_metadata?.name}
                  </Text>
                  <Text style={styles.infoText}>
                    {user && user.user_metadata?.address}
                  </Text>
              </View>

              <View style={{gap:10, alignSelf: 'flex-start'}}>
                <View style={styles.info}>
                  <Icon
                  name='mail'
                  size={20}
                  color={theme.colors.textLight}
                  />
                  <Text style={styles.infoText}>
                    {user && user.email}
                  </Text>
                </View>
                 <View style={styles.info}>
                  <Icon
                  name='call'
                  size={20}
                  color={theme.colors.textLight}
                  />
                  <Text style={styles.infoText}>
                    {user && user.user_metadata?.phoneNumber}
                  </Text>
                </View>
              </View>
            </View>

        </View>
      </View>
    )
}

export default Profile

const styles = StyleSheet.create({
  logoutButton: {
    position: 'absolute',
    right: 0,
    marginRight: 24,
    marginTop: 24,
  },

  container: {
    flex: 1,
    marginTop: 30
  },

  avatarWrapper: {
    height: heigthPercentage(12),
    width: widthPercentage(12),
    alignSelf: 'center',
    marginLeft: 0,
    alignItems: 'center',
  }, 
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -30,
    padding: 7,
    borderRadius: 50,
    backgroundColor: 'white',
  },

  userName: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: theme.fonts.semiBold,
  },

  info: {
    flexDirection: 'row',
    gap: 5
  },

  infoText: {
    color: theme.colors.text,
    fontSize: 14,
  }
})