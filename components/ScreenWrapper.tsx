import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenWrapperProps = {
  bg?: string;
  children?: ReactNode; // the question mark means 'children' can be optional
};

const ScreenWrapper = ({children, bg} : ScreenWrapperProps) => {

  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top+5 : 30
  
  const {bottom} = useSafeAreaInsets();
  const paddingBottom = bottom > 0 ? bottom+5 : 30

  return (
    <View style= {{flex: 1, paddingTop, backgroundColor: bg, paddingBottom}}>
      {
        children
      }
    </View>
  )
}

export default ScreenWrapper