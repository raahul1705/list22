import { StyleSheet } from 'react-native'


// Color Pallete Def
color1 = '#343434'
color2 = '#E6B31E'
accent1 = '#FCFAF1'
accent2 = '#CACACA'

// Font Def
font_primary = 'SquareFont'

export default defaultStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color1, 
        justifyContent: 'center',
        alignItems: 'center',   // centers horizontal
        // useless alignContent: 'center',
    },

    radarChart: {
        // flex: 1,
        // backgroundColor: 'red',
        // flexDirection: 'column', 
        // width: '100%',
        // aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text3: {
        textAlign: 'center'
    },

    ratingButton: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: color2,
    },

    ratingText: {
        color: color1,
        fontFamily: font_primary,
        fontSize: 20
    }
})