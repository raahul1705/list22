
import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native'
import RadarChart from './app/components/RadarChart';
import InsertBlob from './app/components/InsertBlob';

import defaultStyle from './app/style/Default'

const App = () => {
  return (
	<View style={defaultStyle.container}>
		<RadarChart style={defaultStyle.radarChart}/>
		<TouchableOpacity style={defaultStyle.ratingButton}>
			<Text style={defaultStyle.ratingText}>Rating: 22</Text>
		</TouchableOpacity>
		
	</View>
  );
}

export default App;