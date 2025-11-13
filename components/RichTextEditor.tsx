import React from 'react'
import { StyleSheet, View } from 'react-native'
import { actions, RichToolbar } from 'react-native-pell-rich-editor'

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
        selectedIconTint="#2095F2"
        iconTint="#000000"
        style={styles.richBar}
        flatContainerStyle={styles.listStyle}
        editor={editorRef}
        disabled={false}
        />
    </View>
  )
}

export default RichTextEditor

const styles = StyleSheet.create({
    richBar: {

    }
})