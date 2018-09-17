import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Header, Avatar, Button} from 'react-native-elements';
import commonStyles from '../Styles/Common';
import {LineChart} from 'react-native-charts-wrapper';


export default class GraphsPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: [{y: 1}, {y: 2}, {y: 1}]
        }
        this.updateValues = this.updateValues.bind(this);
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

    updateValues(){
        this.setState({
            data: [{y: 2}, {y: 1}, {y: 2}]
        })
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <LineChart style={styles.chart}
                        data={{dataSets:[{label: "demo", values: this.state.data}]}}
                    />
                    <Button
                        title="Click"
                        onPress={this.updateValues}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
      },
      chart: {
        flex: 1
      }
});