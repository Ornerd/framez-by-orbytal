import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Icon from "@/assets/icons";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import PostCard from "@/components/PostCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { heigthPercentage, widthPercentage } from "@/helpers/common";

import CommentItem from "@/components/CommentItem";
import { createComment, fetchPostDetails } from "@/services/postService";


const PostDetails = () => {
  const { postId } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();

  const inputRef = useRef<any>(null);
  const commentRef = useRef<string>("");

  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(() => {
    if (!postId) return;

    const load = async () => {
      setLoadingPost(true);
      const res = await fetchPostDetails(String(postId));

      if (res.success && res.data) {
        setPost(res.data);
      }
      setLoadingPost(false);
    };

    load();
  }, [postId]);

    const handleSubmitComment = async () => {
        if (!commentRef.current.trim()) return;

    const payload = {
      userId: user?.id!,
      postId: post?.id!,
      text: commentRef.current,
    };

    setSubmitting(true);
    const res = await createComment(payload);
    setSubmitting(false);

    if (res.success) {
      inputRef?.current?.clear();
      commentRef.current = "";

      // refresh comments count
      const refreshed = await fetchPostDetails(String(postId));
      if (refreshed.success) setPost(refreshed.data);

    } else {
      Alert.alert("Comment", res.msg);
    }
  };

  
  if (loadingPost) {
    return (
      <View style={styles.center}>
        <Loading />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={[styles.center]}>
        <Text style={styles.notFound}>Post not found</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper bg="white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          >
            <PostCard
              item={post}
              currentUser={user}
              router={router}
              showMoreIcon={false}
            />

            {/* Comment Field */}
            <View style={styles.inputContainer}>
              <Input
                inputRef={inputRef}
                placeholder="Comment..."
                onChangeText={(value) => (commentRef.current = value)}
                containerStyle={{
                  flex: 1,
                  height: heigthPercentage(6.2),
                  borderRadius: theme.radius.xl,
                }}
              />

              {submitting ? (
                <View style={styles.loadingTwo}>
                  <Loading size="small" />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.sendIcon}
                  onPress={handleSubmitComment}
                >
                  <Icon name="send" color={theme.colors.primaryDark} />
                </TouchableOpacity>
              )}
            </View>

            <View style={{ marginVertical: 30, gap: 30}}>
                {
                    post?.comments?.map((comment)=>
                        <View key={comment?.id?.toString()}>
                            <CommentItem
                                item={comment}
                                />
                        </View>
                       
                    )
                }
                {
                    post?.comments?.length==0 && (
                        <Text style={{color: theme.colors.text, marginLeft: 5}}>
                            Be the first to comment.
                        </Text>
                    )
                }
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default PostDetails;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: widthPercentage(7),
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white'
  },
  notFound: {
    fontSize: heigthPercentage(2.5),
    color: theme.colors.text,
    fontWeight: theme.fonts.medium,
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: -10,
  },
  sendIcon: {
    position: "absolute",
    right: 10,
    padding: 10,
    borderRadius: theme.radius.xl,
    backgroundColor: 'white'
  },
  loadingTwo: {
    position: "absolute",
    right: 20,
  },
});
