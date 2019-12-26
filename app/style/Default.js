import { StyleSheet } from 'react-native'

export default defaultStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343434',
        alignContent: 'center',
        justifyContent: 'center',
    },

    radarChart: {
        flex: 1, 
        aspectRatio: 1,
        alignSelf: 'center', 
        alignItems: 'center',
    },

    text3: {
        textAlign: 'center'
    },

    ratingText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },

    ratingContainer: {
        flex: 1,
        flexDirection: 'column'
    },

    roundedBlob: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft: 15,
        paddingRight: 15,
        marginHorizontal: 15,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor:'#F67280',
        borderRadius:10,
    },
})