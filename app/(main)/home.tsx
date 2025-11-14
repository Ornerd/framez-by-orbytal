import Icon from '@/assets/icons'
import AvatarDp from '@/components/AvatarDp'
import Loading from '@/components/Loading'
import PostCard from '@/components/PostCard'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { heigthPercentage } from '@/helpers/common'
import { fetchPosts } from '@/services/postService'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'


var limit=0;
const Home = () => {

    const {user, setAuth} = useAuth();
    const router = useRouter()

    const [posts, setPosts] = useState([])

    useEffect(()=> {
        getPosts()
    }, [])

    const getPosts = async () => {
        //call the api
        limit = limit + 10
        let res = await fetchPosts();
        if (res.success){
            setPosts(res.data)
        }
    }

    // const doTheLogout = async ()=> {
    //    setAuth(null)
    //    const {error} = await supabase.auth.signOut()
    //    error && Alert.alert('Error signing out')
    // }

  return (
    <ScreenWrapper bg="white">
        <View style={styles.container}>
            <View style={styles.topMenu}>
                <Text style={styles.appName}>Framez</Text>
                <View style={styles.icons}>
                    <Pressable onPress={()=> router.push('/(main)/notifications')}>
                        <Icon
                        name='heart'
                        size={32}
                        strokeWidth={1}
                        />
                    </Pressable>

                    <Pressable onPress={()=>router.push('/(main)/newPost')}>
                        <Icon
                        name='plus'
                        size={32}
                        strokeWidth={1}
                        />
                    </Pressable>

                    <Pressable onPress={()=>router.push('/(main)/profile')}>
                        <AvatarDp 
                        uri={user?.image}
                        size= {heigthPercentage(5.3)}
                        rounded={50}
                        style={{borderWidth: 2}}
                        />
                    </Pressable>
                </View>
            </View>
            
            {/* the posts */}
            <FlatList
            data={posts} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listStyle} 
            keyExtractor={item=> item.id.toString()}
            renderItem={({item})=> <PostCard
                item={item}
                currentUser={user}
                router={router}
                />
            } 
            ListFooterComponent={(
                <View style={{marginVertical: posts.length === 0 ? 200: 30}}>
                    <Loading/>
                </View>
            )}         
            />
        </View>
    </ScreenWrapper>
    
  )
}

export default Home

const styles = StyleSheet.create({
     container: {
        flex: 1,
        paddingHorizontal: 24
    },

    topMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },

    appName: {
        fontSize: 26,
        fontWeight: theme.fonts.bold,
        color: theme.colors.primary
    },

    icons: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'

    }, 

    listStyle: {
        paddingTop: 40,
        // paddingHorizontal: 24
    }
})