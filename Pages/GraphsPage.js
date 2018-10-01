import React from 'react'
import { View, StyleSheet, Dimensions, processColor, FlatList } from 'react-native';
import { Text, Header, Avatar, CheckBox, Slider, Button} from 'react-native-elements';
import commonStyles from '../Styles/Common';
import {LineChart} from 'react-native-charts-wrapper';


export default class GraphsPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: [[{x:0, y:1}, {x:1, y:2}, {x:2, y:3}, {x:3, y:4}, {x:4, y:5}, {x:5, y:1}, {x:6, y:1}, {x:7, y:2}, {x:8, y:3}, {x:9, y:5}, {x:10, y:6}, {x:11, y:1}]],
            location:0            
        }
        this.updateValues = this.updateValues.bind(this);
        this.navigateOut = this.navigateOut.bind(this);
        this._goToStatusPage = this._goToStatusPage.bind(this);
    }

    static navigationOptions = {
        header: props => <Header
        backgroundColor="#D3CDBD"
        leftComponent={<Avatar
            size="small"
            rounded
            source={require('../assets/imgs/ceb_logo.jpeg')}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />

        }
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
        values = []
        for (let i = 0; i < this.state.data.length; i++) {
            const dataElement = this.state.data[i];
            const end = dataElement.length - 4;
            const temp = dataElement.slice(0,end);
            values.push(temp)
        }
        console.log(values)
        this.setState({
            values: values
        })
    }

    updateValues(){
        console.log('tx')

        values = []
        for (let i = 0; i < this.state.data.length; i++) {
            const dataElement = this.state.data[i];
            const start = Math.round(this.state.value * 4);

            const end = dataElement.length - (4 - start);
            const temp = dataElement.slice(start,end);
            if(temp.length < 1){
                return;
            }
            values.push(temp);
            
        }
        
        this.setState({
            values: values
        });
        console.log(this.state)
    }

    _goToStatusPage(){
        this.props.navigation.navigate('StatusPage');
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
                <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                    <Button buttonStyle={styles.dissableButton}  
                        titleStyle={styles.buttonText}                      
                        containerStyle={styles.buttonContainer} 
                        title="Graphs"
                    />
                    <Button buttonStyle={styles.ennabledButton}
                        titleStyle={styles.buttonText} 
                        containerStyle={styles.buttonContainer}
                        onPress={() => {
                            this._goToStatusPage()
                        }}
                        title="Status"
                    />
                    <Button buttonStyle={styles.ennabledButton}
                        containerStyle={styles.buttonContainer}
                        titleStyle={styles.buttonText} 
                        title="Report"
                    />
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                    <CheckBox
                        center
                        title='Month'
                        textStyle={styles.buttonText}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.genderSelect}
                        onPress={this.updateGender}
                        containerStyle={styles.toggleButton}
                    />
                    <CheckBox
                        center
                        title='Year'
                        textStyle={styles.buttonText}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.genderSelect}
                        onPress={this.updateGender}
                        containerStyle={styles.toggleButton}
                    />
                    <CheckBox
                        center
                        title='Day'
                        textStyle={styles.buttonText}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.genderSelect}
                        onPress={this.updateGender}
                        containerStyle={styles.toggleButton}
                    />
                </View>

                <Slider
                    value={this.state.value}
                    onValueChange={(value) => {
                        this.setState({value});   
                        this.updateValues();                     
                    }} 
                    
                    maximumTrackTintColor={"#b3b3b3"}
                    minimumTrackTintColor={"#b3b3b3"}
                    step={0.25}
                />
                <FlatList 
                    data={this.state.values}
                    extraData={this.state}
                    renderItem={({item}) => (
                        <LineChart style={styles.chart}
                            data={{
                                dataSets:[
                                    {label: "Station 1", 
                                    values: item,
                                    config:{
                                        lineWidth: 2,
                                        drawFilled: true,
                                        color: processColor('red'),
                                        fillColor: processColor('red'),
                                        valueTextSize: 10,
                                        drawCircles: true,
                                        circleColor: processColor('yellow'),
                                        drawCircleHole: false
                                    }
                                    }]
                                }}
                            chartDescription={{text: 'Test'}}
        
                        />          
                    )}
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
        width: Dimensions.get.width,
        height: 350
    },
    buttonText:{
        color: '#9BA0A8'
    },
    buttonContainer:{
        backgroundColor: '#D3CDBD'
    },
    ennabledButton: {
        backgroundColor:'#F1F3F6',
        borderRadius:10
    },
    dissableButton: {
        backgroundColor:'#D8DCE5',
        borderRadius:10
    },
    toggleButton:{
        backgroundColor:'#D3CDBD',
        borderColor: '#D3CDBD'
    }

});