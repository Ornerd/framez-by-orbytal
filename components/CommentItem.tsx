import Icon from '@/assets/icons'
import { theme } from '@/constants/theme'
import { heigthPercentage } from '@/helpers/common'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AvatarDp from './AvatarDp'

const CommentItem = ({item}) => {
    const createdAt = moment(item?.created_at).fromNow()
  return (
    <View style={styles.container}>
        <AvatarDp
            size={heigthPercentage(4.5)}
            uri={item?.user?.image}
            rounded={theme.radius.md}
          />
        <View style={styles.content}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={styles.nameContainer}>
                    <Text style={styles.headerText}>
                        {
                            item?.user?.name
                        }
                    </Text>
                    <Text style={[styles.text, {color: theme.colors.textLight}]}>
                        {
                            createdAt
                        }
                    </Text>
                      <TouchableOpacity style={styles.closeIcon}>
                            <Icon
                            name='delete'
                            size={25}
                            color='red' 
                            />
                        </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.text}>
                    {item?.text}
            </Text>
        </View>
    </View>
  )
}

export default CommentItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 7,
        flexDirection: 'row'
    },
    content: {
        backgroundColor: 'rgba(0,0,0,0.03)',
        flex: 1,
        gap: 5,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: theme.radius.md
    },
    highlight: {
        borderWidth: 0.2,
        backgroundColor: 'white',
        borderColor: theme.colors.dark,
    },
    nameContainer: {
        //  flexDirection: 'row',
        // alignItems: 'center',
        gap: 1
    },
    headerText: {
        fontSize: heigthPercentage(2),
        fontWeight: theme.fonts.semiBold,
        color: theme.colors.textDark
    },
    closeIcon: {
        display: 'none'
    },
    text: {
        fontSize: heigthPercentage(1.9),
        fontWeight: theme.fonts.medium,
        color: theme.colors.textDark,
        lineHeight: 24
    },
})