import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type PostCardProps = {
    item: any,
    currentUser: any,
    router: any
}

const PostCard = ({item, currentUser, router}: PostCardProps) => {
  return (
    <View>
      <Text>PostCard</Text>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({})