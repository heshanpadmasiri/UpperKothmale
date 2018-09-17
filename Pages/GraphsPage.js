import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Header, Avatar } from 'react-native-elements';
import commonStyles from '../Styles/Common';
import { LineChart } from "react-native-chart-kit";

export default class GraphsPage extends React.Component {

    constructor(props){
        super(props);
        
    }

    static navigationOptions = {
        header: props => <Header
        rightComponent={<Avatar
            size="small"
            rounded
            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />}
        centerComponent={<Text>Graphs</Text>}
        
        />,      
        headerTransparent:true

    }

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <View style={commonStyles.container}>
                <Text>
    Bezier Line Chart
  </Text>
  <LineChart
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    graph:{
        width:Dimensions.get('window').width-50,
        height:200
    }
});