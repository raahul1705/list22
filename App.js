
import React from 'react';
import { View, Text } from 'react-native'
import RadarChart from './app/components/RadarChart';
import InsertBlob from './app/components/InsertBlob';

import defaultStyle from './app/style/Default'

const App = () => {
  return (
    <View style={defaultStyle.container}>
      <RadarChart
        data={[
          { name: 'Strength', val: 1},
          { name: 'Speed', val: 2},
          { name: 'Endurance', val: 3},
          { name: 'Build', val: 4},
          { name: 'Style', val: 5},
      	]}
      />
	   <RadarChart
        data={[
          { name: 'Strength', val: 1},
          { name: 'Speed', val: 2},
          { name: 'Endurance', val: 3},
          { name: 'Build', val: 4},
          { name: 'Style', val: 5},
      	]}
      />
	  {/* <InsertBlob style={{ flex: 1, backgroundColor: 'pink' }}/> */}
    </View>
  );
}

export default App;