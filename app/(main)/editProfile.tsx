import Icon from '@/assets/icons'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/contexts/AuthContext'
import { heigthPercentage } from '@/helpers/common'
import { getUserImageSrc, uploadFile } from '@/services/imagesService'
import { updateUser } from '@/services/userService'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const EditProfile = () => {

    const router = useRouter()

    const {user: currentUser, setUserData}= useAuth();
    const [loading, setLoading] = useState(false)

    const [user, setUser]=  useState({
        name: '',
        phoneNumber: '',
        image: null,
        bio: '',
        address: ''
    })

    const pickImage = async ()=> {
          // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        });


        if (!result.canceled) {
        setUser({...user, image:result.assets[0]});
        }
    }

    useEffect(()=> {
        if(currentUser) {
            setUser({
                name: currentUser.name || '',
                phoneNumber: currentUser.phoneNumber || '',
                image: currentUser.image || null,
                address: currentUser.address || '',
                bio: currentUser.bio || ''
            })
        }
    }, [currentUser])

    const doSubmit = async () => {
        let userData = {...user}
        let {name, phoneNumber, address, image, bio} = userData
        if(!name || !phoneNumber || !address || !bio || !image) {
            Alert.alert('Profile', 'Please fill all the fields')
            return
        }
        setLoading(true);

        if(typeof image=='object') {
            let imageRes = await uploadFile('profiles', image?.uri, true)
            if(imageRes.success) {
                userData.image = imageRes.data;
            }
            else userData.image = null;
        }

        try {
        const res = await updateUser(currentUser?.id, userData);

        if (res?.success) {
            setUserData({ ...currentUser, ...userData});
            router.back();
            } else {
            Alert.alert('Profile', 'Failed to update profile. Please try again.');
            console.log('Update error:', res);
            }
        } catch (err) {
            Alert.alert('Profile', 'Something went wrong.');
            console.error('UpdateUser error:', err);
        } finally {
            setLoading(false);
        }
    }

     let imageSource = user.image && typeof user.image =='object'? user.image.uri : getUserImageSrc(user.image)

  return (
    <ScreenWrapper bg='white'>
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView style={{flex: 1}}>
                <Header
                    title='Edit Profile'
                    showBackButton={false}
                />

                <View style={styles.form}>
                    <View style={styles.avatarContainer}>
                        <Image source={imageSource} style={styles.avatar} />
                        <Pressable style={styles.avatarIcon} onPress={pickImage}>
                            <Icon name='camera' size={20} strokeWidth={2.5} />
                        </Pressable>
                    </View>
                    <View style={{gap: 20}}>
                        <Text style={styles.formHeader}>Please fill your profile details</Text>
                        <Input
                            icon={<Icon name='user' />}
                            placeholder= 'Enter your name'
                            value={user?.name}
                            onChangeText={value=> setUser({...user, name: value})}
                        />
                        <Input
                            icon={<Icon name='call' />}
                            placeholder= 'Enter your phone number'
                            keyboardType="phone-pad"
                            value={user?.phoneNumber}
                             onChangeText={value=> setUser({...user, phoneNumber: value})}
                        />
                        <Input
                            icon={<Icon name='location' />}
                            placeholder= 'Where do you live?'
                            value={user?.address}
                             onChangeText={value=> setUser({...user, address: value})}
                        />
                        <Input
                            placeholder= 'Your bio'
                            multiline={true}
                            additionalStyles={styles.bio}
                            value={user?.bio}
                             onChangeText={value=> setUser({...user, bio: value})}
                        />

                        <Button
                            title="Update"
                            loading={loading}
                            onPress={doSubmit}
                        />
                    </View>
                </View>

                
                </ScrollView>
            </KeyboardAvoidingView>
            
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
    borderRadius: 12
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
   }, 

   bio: {
    height: heigthPercentage(15),
    alignItems: 'flex-start'
   }
}) 