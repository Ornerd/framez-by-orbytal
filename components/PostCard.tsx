import Icon from '@/assets/icons'
import { theme } from '@/constants/theme'
import { heigthPercentage, widthPercentage } from '@/helpers/common'
import { getSupabaseFileUrl } from '@/services/imagesService'
import { Video } from 'expo-av'
import { Image } from 'expo-image'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RenderHtml from 'react-native-render-html'
import AvatarDp from './AvatarDp'

type PostCardProps = {
    item: any,
    currentUser: any,
    router: any
}

const PostCard = ({item, currentUser, router}: PostCardProps) => {
    const createdAt = moment(item?.created_at).fromNow()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
            <AvatarDp
                size= {heigthPercentage(4.5)}
                uri={item?.user?.image}
                rounded={theme.radius.md}
            />
            <View style={{gap: 2}}>
                <Text style={styles.username}>{item?.user?.name}</Text>
                <Text>{createdAt}</Text>
            </View>
        </View>

            <TouchableOpacity>
                <Icon
                name='threeDotsHorizontal'
                size={heigthPercentage(3.4)}
                />
            </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.postBody}>
            <Text>{
            item?.body && (
                <RenderHtml
                contentWidth={widthPercentage(100)}
                    source={{html: item?.body}}
                />

            )
            }</Text>
        </View>
        {
            item?.file && item?.file.includes('postImages') && (
                <Image
                source={getSupabaseFileUrl(item?.file)}
                transition={100}
                style={styles.postMedia}
                contentFit='cover'
                />

            )
        }
        {/* if filei s avideo */}
        {
            item?.file && item?.file?.includes('postVideos') && (
                <Video
                style={[styles.postMedia, {height: heigthPercentage(30)}]}
                />
            )
        }

      </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
    container: {
        gap: 10,
        marginBottom: 15,
        borderRadius: theme.radius.xxl*1.1,
        padding: 10,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: theme.colors.gray
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userInfo: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center'
    },
    username: {
        fontWeight: theme.fonts.semiBold,
        fontSize: 16
    },
    postMedia: {
        height: heigthPercentage(40),
        width: "100%",
        borderRadius: theme.radius.xl,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    content: {

    },
    postBody: {

    },
    footerButton: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    }
})