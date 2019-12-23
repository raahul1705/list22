
import React from 'react';
import { View, Text } from 'react-native'
import RadarChart from './app/components/RadarChart';
import Rating from './app/components/Rating';

import defaultStyle from './app/style/Default'

const App = () => {
  return (
    <View style={defaultStyle.container}>
      <RadarChart style={defaultStyle.radarChart}
        data={[
          { name: 'Strength', val: 1},
          { name: 'Speed', val: 2},
          { name: 'Endurance', val: 3},
          { name: 'Build', val: 4},
          { name: 'Style', val: 5},
      ]}
      />
      <Rating  rating={22}/>
    </View>
  );
}

export default App;