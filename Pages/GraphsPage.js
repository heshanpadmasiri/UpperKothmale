import React from 'react'
import { View, StyleSheet, Dimensions, processColor } from 'react-native';
import { Text, Header, Avatar, ButtonGroup, Slider} from 'react-native-elements';
import commonStyles from '../Styles/Common';
import {LineChart} from 'react-native-charts-wrapper';


export default class GraphsPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: [{x:0, y:1}, {x:1, y:2}, {x:2, y:3}, {x:3, y:4}, {x:4, y:5}, {x:5, y:1}, {x:6, y:1}, {x:7, y:2}, {x:8, y:3}, {x:9, y:5}, {x:10, y:6}, {x:11, y:1}],
            location:0            
        }
        this.updateValues = this.updateValues.bind(this);
        this.navigateOut = this.navigateOut.bind(this);
    }

    static navigationOptions = {
        header: props => <Header
        backgroundColor="#D3CDBD"
        rightComponent={<Avatar
            size="small"
            rounded
            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />}
        centerComponent={{ text: 'Upper Kotmale Hydropower Project', style: { color: '#fff' } }}
        
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
        const start = this.state.value * 4;
        const end = this.state.data.length - (4 - start);
        const values = this.state.data.slice(start,end);
        this.setState({
            values: values
        })
    }

    navigateOut(location){
        if (location === 1) {
            this.props.navigation.navigate('StatusPage');
        } else if (location === 2){
            this.props.navigation.navigate('TablePage');
        }
    }

    render() {
        const buttons = ['Graphs', 'Status', 'Report']
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                <ButtonGroup
                    onPress={this.navigateOut}
                    selectedIndex={this.state.location}
                    buttons={buttons}
                    textStyle={{
                        color:"9BA0A8"
                    }}
                    buttonStyle={{
                        backgroundColor:"#F1F3F6"
                    }}
                    selectedButtonStyle={{
                        backgroundColor:"#D8DCE5"
                    }}
                    containerStyle={{height: 25}}
                />
                <Slider
                    value={this.state.value}
                    onValueChange={(value) => {
                        this.setState({value});                        
                    }} 
                    onSlidingComplete={this.updateValues}
                    maximumTrackTintColor={"#b3b3b3"}
                    minimumTrackTintColor={"#b3b3b3"}
                    step={0.25}
                />
                
                <LineChart style={styles.chart}
                    data={{
                        dataSets:[
                            {label: "Station 1", 
                            values: this.state.values,
                            config:{
                                lineWidth: 4,
                                drawFilled: true,
                                color: processColor('red'),
                                fillColor: processColor('red')
                                valueTextSize: 15
                            }
                            }]
                        }}
                    chartDescription={{text: 'Test'}}
  
                />
                <LineChart style={styles.chart}
                    data={{
                        dataSets:[
                            {label: "Station 1", 
                            values: this.state.values,
                            config:{
                                lineWidth: 4,
                                drawFilled: true,
                                color: processColor('red'),
                                fillColor: processColor('red'),
                                fillAlpha: 60,
                                valueTextSize: 15
                            }
                            }]
                        }}
                    chartDescription={{text: 'Test'}}
  
                />
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3CDBD',
        padding:10
      },
      chart: {
        flex: 1
      }
});