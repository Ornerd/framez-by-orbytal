import AvatarDp from '@/components/AvatarDp'
import Header from '@/components/Header'
import RichTextEditor from '@/components/RichTextEditor'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { heigthPercentage } from '@/helpers/common'
import React, { useRef } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'

const NewPost = () => {

  const {user} = useAuth();
  const bodyRef = useRef('')

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
                    <Text style={styles.publicText}>
                        public
                    </Text>
                  </View>
                </View>

                <View style={styles.textEditor}>
                        <RichTextEditor/>
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
    gap: 20
  }, 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12',
  },
  username: {
    fontSize: 18,
    fontWeight: theme.fonts.semiBold
  },
  publicText: {

  },
  textEditor: {
    marginTop: 20
  }
})