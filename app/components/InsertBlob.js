import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import defaultStyle from '../style/Default'

export default class InsertBlob extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <View style={defaultStyle.ratingContainer}>
                <TouchableOpacity style={defaultStyle.roundedBlob}>
                    <View style={flexStyle.leftText}>
                        <Text>52</Text>
                    </View>
                    <View style={flexStyle.rigtText}>
                        <Text>New</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const flexStyle = StyleSheet.create({
    leftText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'green'
    },
    rigtText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'purple'
    }
});

