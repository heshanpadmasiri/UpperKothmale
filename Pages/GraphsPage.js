import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Header, Avatar, Button, Slider} from 'react-native-elements';
import commonStyles from '../Styles/Common';
import {LineChart} from 'react-native-charts-wrapper';


export default class GraphsPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: [{y: 1}, {y: 2}, {y: 3}, {y: 4}, {y: 5}, {y: 1}, {y: 1}, {y: 2}, {y: 3}, {y: 5}, {y: 6}, {y: 1}]
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

    componentWillMount(){
        const end = this.state.data.length - 4;
        const values = this.state.data.slice(0,end);
        this.setState({
            values: values
        })
    }

    updateValues(){
        console.log('tt')
        const start = this.state.value * 4;
        const end = this.state.data.length - (4 - start);
        const values = this.state.data.slice(start,end);
        this.setState({
            values: values
        })
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                <Slider
                    value={this.state.value}
                    onValueChange={(value) => {
                        this.setState({value});                        
                    }} 
                    onSlidingComplete={this.updateValues}
                    maximumTrackTintColor={"#b3b3b3"}
                    minimumTrackTintColor={"#b3b3b3"}
                    step={0.25}/>
                <Text>Value: {this.state.value}</Text>
                    <LineChart style={styles.chart}
                        data={{dataSets:[{label: "demo", values: this.state.values}]}}
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