import { TextStyle } from "react-native";

export const theme = {
    colors: {
        primary: '#00C26F',
        primaryDark: '#00AC62',
        dark: '#3E3E3E',
        darkLight: '#E1E1E1',
        gray: '#E3E3E3',

        text: '#494949',
        textLight: '#7C7C7C',
        textDark: '#1D1D1D',

        rose: '#EF4444',
        roseLight: '#F87171'
    },

    fonts: {
        medium : '500'  as TextStyle['fontWeight'],
        semiBold: '600' as TextStyle['fontWeight'],
        bold: '700' as TextStyle['fontWeight'],
        extraBold: '800' as TextStyle['fontWeight']
    },

    radius: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
        xxl: 22,
    }

}