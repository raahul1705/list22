import React from 'react';
import { View, Text } from 'react-native';
import defaultStyle from '../style/Default'

export default class Rating extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <View style={defaultStyle.ratingContainer}>
                <Text style={defaultStyle.text3}>
                    Current Rating:
                </Text>
                <Text style={defaultStyle.ratingText}>
                    { this.props.rating }
                </Text>
            </View>
        );
    }
}

