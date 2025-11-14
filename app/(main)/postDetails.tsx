import Icon from '@/assets/icons'
import Input from '@/components/Input'
import Loading from '@/components/Loading'
import PostCard from '@/components/PostCard'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { heigthPercentage, widthPercentage } from '@/helpers/common'
import { createComment, fetchPostDetails } from '@/services/postService'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const PostDetails = () => {
    const {postId} = useLocalSearchParams();
    const {user} = useAuth()
    const router = useRouter()
    const [startLoading, setStartLoading] = useState(true)
    const inputRef= useRef(null)
    const commentRef= useRef('')
    const [loading, setLoading] = useState(false)

    const [post, setPost] = useState(null)

    useEffect(()=> {
        getPostDetails();
    })

    const getPostDetails = async () => {
        let res = await fetchPostDetails(postId)
        if(res.success) setPost(res.data)
        setStartLoading(false)
    }

    const newComment = async () => {
        if(!commentRef.current) return null;
        let data = {
            userId: user?.id,
            postId: post?.id,
            text: commentRef.current
        }

        //create comment
        setLoading(true);
        let res = await createComment(data)
        setLoading(false)
        if(res.success){
            //send notification later
            inputRef?.current?.clear();
            commentRef.current ="";
        }else {
            Alert.alert('comment', res.msg)
        }
    }

    if(startLoading) {
        return (
            <View style={styles.center}>
                <Loading/>
            </View>
        )
    }

  return (
    <ScreenWrapper bg='white'>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
                    <PostCard
                    item={post}
                    currentUser={user}
                    router={router}
                    showMoreIcon={false}
                    />

                    {/* comment area */}
                    <View style={styles.inputContainer}>
                        <Input
                        inputRef={inputRef}
                        placeholder='comment...'
                        onChangeText={value=> commentRef.current = value}
                        containerStyle={{flex: 1, height: heigthPercentage(6.2), borderRadius: theme.radius.xl}}
                        />
                        {
                            loading? (
                                <View style={styles.loadingTwo}>
                                    <Loading size='small'/>
                                </View>
                            ): (
                                <TouchableOpacity style={styles.sendIcon} onPress={newComment}>
                                    <Icon
                                    name='send'
                                    color={theme.colors.primaryDark}
                                    />
                                </TouchableOpacity>
                            )
                        }

                        
                    </View>
                </ScrollView>
                <Text>PostDetails</Text>
            </View>
        </KeyboardAvoidingView>
    </ScreenWrapper>
    
  )
}

export default PostDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: widthPercentage(7)
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notFound: {
        fontSize: heigthPercentage(2.5),
        color: theme.colors.text,
        fontWeight: theme.fonts.medium
    },
    loading: {
        height: heigthPercentage(5.8),
        width: heigthPercentage(5.8),
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{scale: 1.3}]
    },
    list: {
        paddingHorizontal: 24,
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    sendIcon: {
        position: 'absolute',
        right: 20,
    },
    loadingTwo: {
        position: 'absolute',
        right: 20,
    }
})