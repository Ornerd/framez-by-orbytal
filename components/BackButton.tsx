import { theme } from '@/constants/theme'
import { Pressable, StyleSheet } from 'react-native'
import Icon from '../assets/icons'

type BackButtonProps = {
    size?: number,
    router: any
}

const BackButton =({size= 26, router}: BackButtonProps) => {
  return (
    <Pressable onPress={()=> router.back()} style= {styles.button}> 
      <Icon name='arrowLeft' size={size} strokeWidth={2.5} color={theme.colors.text} />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  button : {
    alignSelf: 'flex-start',
    padding: 5,
    backgroundColor: theme.colors.gray,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center'
  }
})