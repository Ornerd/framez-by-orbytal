import { theme } from '@/constants/theme'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'

const RichTextEditor = ({editorRef, onChange}) => {
  return (
    <View style={{minHeight: 285}}>
      <RichToolbar
        actions={[
          actions.setBold, 
          actions.setItalic,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.setStrikethrough,
          actions.heading1,
          actions.heading4,
          actions.blockquote,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.undo,
          actions.redo,
        ]}
        iconMap={{
            [actions.heading4]: ({tintColor}) => <Text style={{color:tintColor}}>H4</Text>
        }}
        selectedIconTint={theme.colors.primary}
        iconTint={theme.colors.primaryDark}
        style={styles.richBar}
        flatContainerStyle={styles.listStyle}
        editor={editorRef}
        disabled={false}
        />

        <RichEditor
        ref={editorRef}
        containerStyle={styles.rich}
        editorStyle={styles.contentStyle}
        placeholder="What's going on in your mind?"
        onChange={onChange}
        />
    </View>
  )
}

export default RichTextEditor

const styles = StyleSheet.create({
    richBar: {
        borderTopRightRadius: theme.radius.xl, 
        borderTopLeftRadius: theme.radius.xl, 
        backgroundColor: theme.colors.gray
    },
    rich: {
        minHeight: 250,
        flex: 1,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: theme.colors.gray,
        borderBottomRightRadius: theme.radius.xl,
        borderBottomLeftRadius: theme.radius.xl,
        padding: 7
    }, 

    contentStyle : {
        color: theme.colors.textDark,
    },

    listStyle: {
        paddingHorizontal: 20,
    }
})