import Icon from '@/assets/icons'
import Header from '@/components/Header'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/contexts/AuthContext'
import { heigthPercentage } from '@/helpers/common'
import { getUserImageSrc } from '@/services/imagesService'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const EditProfile = () => {

    const {user}= useAuth()

    const [theUser, setTheUser]=  useState({
        name: '',
        phoneNumber: '',
        image: null,
        bio: '',
        address: ''
    })

    let imageSource = getUserImageSrc(user?.image)

  return (
    <ScreenWrapper bg='white'>
        <View style={styles.container}>
            <ScrollView style={{flex: 1}}>
                <Header
                    title='Edit Profile'
                    showBackButton={false}
                />

                <View style={styles.form}>
                    <View style={styles.avatarContainer}>
                        <Image source={imageSource} style={styles.avatar} />
                        <Pressable style={styles.avatarIcon}>
                            <Icon name='camera' size={20} strokeWidth={2.5} />
                        </Pressable>
                    </View>
                    <View style={{gap: 20}}>
                        <Text style={styles.formHeader}>Please fill your profile details</Text>
                        <Input
                            icon={<Icon name='user' />}
                            placeholder= 'Enter your name'
                            value={null}
                            onChangeText={value=> {}}
                        />
                        <Input
                            icon={<Icon name='call' />}
                            placeholder= 'Enter your phone number'
                            value={null}
                            onChangeText={value=> {}}
                        />
                        <Input
                            icon={<Icon name='location' />}
                            placeholder= 'Where do you live?'
                            value={null}
                            onChangeText={value=> {}}
                        />
                        <Input
                            placeholder= 'Your bio'
                            value={null}
                            onChangeText={value=> {}}
                        />
                    </View>
                </View>

                
            </ScrollView>
        </View>
    </ScreenWrapper>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 24,
    },
     
    form: {
    gap: 25,
    width: '100%',
   },

   avatarContainer: {
    position: 'relative',
    marginTop: 20,
    alignItems: 'center'
   },

   avatar: {
    width: heigthPercentage(14),
    height: heigthPercentage(14),
    alignSelf: 'center',
    alignItems: 'center',
   },

   avatarIcon: {
    marginTop: -20,
    marginRight: -20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'white',
   },

   formHeader: {
    marginBottom: 10,
    fontSize: 18,
   }
})