import Icon from '@/assets/icons'
import { theme } from '@/constants/theme'
import { heigthPercentage, widthPercentage } from '@/helpers/common'
import { getSupabaseFileUrl } from '@/services/imagesService'
import { createPostLike, removePostLike } from '@/services/postService'
import { Video } from 'expo-av'
import { Image } from 'expo-image'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RenderHtml from 'react-native-render-html'
import AvatarDp from './AvatarDp'

type PostCardProps = {
  item: any;
  currentUser: any;
  router: any;
  showMoreIcon?: boolean;
};

const PostCard = ({
  item,
  currentUser,
  router,
  showMoreIcon = true,
}: PostCardProps) => {
  const createdAt: string = moment(item?.created_at).fromNow();
  const [likes, setLikes] = useState<any[]>([]);

  useEffect(() => {
    setLikes(item?.postLikes ?? []);
  }, [item]);

  const likedPost: boolean = !!likes.find(
    (like) => like.userId === currentUser?.id
  );

  const doLike = async (): Promise<void> => {
    if (likedPost) {
      const updatedLikes = likes.filter(
        (like) => like.userId !== currentUser?.id
      );
      setLikes([...updatedLikes]);

      const res: any = await removePostLike(item?.id, currentUser?.id);

      if (!res?.success) {
        Alert.alert('Post', 'something sure went wrong!');
      }
    } else {
      const data: any = {
        userId: currentUser?.id,
        postId: item?.id,
      };

      setLikes([...likes, data]);

      const res: any = await createPostLike(data);

      if (!res?.success) {
        Alert.alert('Post', 'something sure went wrong!');
      }
    }
  };

  const videoSourceUri: string | null = getSupabaseFileUrl(item?.file);

  const openPostDetails = (): void => {
    if (!showMoreIcon) return;
    router.push({
      pathname: 'postDetails',
      params: { postId: item?.id },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <AvatarDp
            size={heigthPercentage(4.5)}
            uri={item?.user?.image}
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>{item?.user?.name}</Text>
            <Text>{createdAt}</Text>
          </View>
        </View>

        {showMoreIcon && (
          <TouchableOpacity onPress={openPostDetails}>
            <Icon name="threeDotsHorizontal" size={heigthPercentage(3.4)} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.postBody}>
          <Text>
            {item?.body && (
              <RenderHtml
                contentWidth={widthPercentage(100)}
                source={{ html: item?.body }}
              />
            )}
          </Text>
        </View>

        {item?.file && item.file.includes('postImages') && (
          <Image
            source={getSupabaseFileUrl(item.file)}
            transition={100}
            style={styles.postMedia}
            contentFit="cover"
          />
        )}

        {item?.file && item.file.includes('postVideos') && videoSourceUri && (
          <Video
            style={[styles.postMedia, { height: heigthPercentage(30) }]}
            source={{ uri: videoSourceUri }}
            useNativeControls
            resizeMode="cover"
            isLooping
          />
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={doLike}>
            <Icon
              name="heart"
              size={30}
              color={likedPost ? theme.colors.rose : theme.colors.textLight}
              fill={likedPost ? theme.colors.rose : 'transparent'}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{likes?.length}</Text>
        </View>

        <View style={styles.footerButton}>
          <TouchableOpacity onPress={openPostDetails}>
            <Icon name="comment" size={30} color={theme.colors.textLight} />
          </TouchableOpacity>

          <Text style={styles.count}>
            {item?.comments?.[0]?.count ?? 0}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 35,
    borderRadius: theme.radius.xxl * 1.1,
    padding: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  username: {
    fontWeight: theme.fonts.semiBold,
    fontSize: 16,
  },
  postMedia: {
    height: heigthPercentage(40),
    width: '100%',
    borderRadius: theme.radius.xl,
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 10,
  },
  content: {},
  postBody: {},
  footerButton: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  count: {},
});
