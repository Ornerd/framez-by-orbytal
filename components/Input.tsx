import { theme } from '@/constants/theme'
import React from 'react'
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native'

const Input = (props: TextInputProps & {icon?: React.ReactNode, inputRef?: React.RefObject<TextInput>, additionalStyles?: ViewStyle}) => {
  return (
    <View style={[styles.container, props.additionalStyles && props.additionalStyles]}>
        {
            props.icon && props.icon
        }
      <TextInput
      style = {{flex:1, width: 200, backgroundColor: 'yellow'}}
      placeholder='email please'
      placeholderTextColor={theme.colors.textLight}
      ref={props.inputRef && props.inputRef}
      {...props}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.textLight,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,    
  }
})