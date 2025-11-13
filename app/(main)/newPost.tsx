import Header from '@/components/Header'
import ScreenWrapper from '@/components/ScreenWrapper'
import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'

const NewPost = () => {
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

              <ScrollView style={{flex: 1}}>
                
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
  }
})