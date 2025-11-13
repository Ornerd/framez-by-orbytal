import Icon from '@/assets/icons'
import AvatarDp from '@/components/AvatarDp'
import Button from '@/components/Button'
import Header from '@/components/Header'
import RichTextEditor from '@/components/RichTextEditor'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { heigthPercentage } from '@/helpers/common'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const NewPost = () => {

  const {user} = useAuth();
  const bodyRef = useRef('');
  const editorRef = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(file)


  const onPick = async(isImage)=> {
    let mediaConfig ={
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    }
    if(!isImage) {
      mediaConfig = {
        mediaTypes: ['videos'],
        allowsEditing: true,
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    if(!result.canceled) {
      setFile(result.assets[0])
    }

  }

  const isLocalFile = (file) => {
    if(!file) return null
    if(typeof file == 'object') return true

    return false
  }

  const getFileType = (file) => {
    if(!file) return null
    if(isLocalFile(file)) {
      return file.type
    }

    //a small check for remote file
  }

  const doSubmit = async () => {

  }

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
                        <RichTextEditor
                        editorRef={editorRef}
                        onChange={body => bodyRef.current = body}
                        />
                </View>

                {
                  file && (
                    <View style={styles.file}>
                      {
                        getFileType(file) == 'video'? (
                            <></>
                        ): (
                            <></>
                        )
                      }
                    </View>
                  )
                }
                <View style={styles.media}>
                        <Text style={styles.addImageText}>Insert:</Text>
                        <View style={styles.mediaIcons}>
                          <TouchableOpacity onPress={()=>onPick(true)}>
                            <Icon
                              name='image'
                              size={30}
                              color={theme.colors.dark}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>onPick(false)}>
                            <Icon
                              name='video'
                              size={33}
                              color={theme.colors.dark}
                            />
                          </TouchableOpacity>
                        </View>
                </View>

              </ScrollView>

              <Button
              buttonStyle={{paddingVertical: 10}}
              title='Post'
              loading={loading}
              onPress={doSubmit}
              />
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
  },
  media: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderColor: theme.colors.gray,
     marginTop: 20,
  },
  mediaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  addImageText: {

  },
  file: {
    height: heigthPercentage(30),
    width: '100%',
    overflow: 'hidden',
    borderRadius: theme.radius.xl,
  }
})