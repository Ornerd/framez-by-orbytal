import AvatarDp from '@/components/AvatarDp'
import Header from '@/components/Header'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { heigthPercentage } from '@/helpers/common'
import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'

const NewPost = () => {

  const {user} = useAuth();

  return (
    <ScreenWrapper bg='white'> 
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        
          <View style={styles.container}>
              <Header
                  title='Add new post'
                  showBackButton={true}
              />

              <ScrollView style={{flex: 1, gap: 20}}>

                <View style={styles.header}>
                  <AvatarDp
                  uri={user?.image}
                  size={heigthPercentage(6.5)}
                  rounded={theme.radius.xl}
                  />
                  <View style={{gap:2}}>
                    <Text style={styles.username}>
                        {
                          user && user.name
                        }
                    </Text>
                  </View>
                </View>

              </ScrollView>
          </View>
        
      </KeyboardAvoidingView>
    </ScreenWrapper>
  )
}

export default NewPost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  }, 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12'
  }
})