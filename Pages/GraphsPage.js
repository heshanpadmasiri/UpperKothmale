import React from 'react'
import { View, StyleSheet, Dimensions, processColor, FlatList, Alert } from 'react-native';
import { Text, Header, Avatar, CheckBox, Button} from 'react-native-elements';
import  Slider  from 'react-native-slider';
import Spinner from 'react-native-loading-spinner-overlay';

import commonStyles from '../Styles/Common';
import {LineChart} from 'react-native-charts-wrapper';
import { connect } from 'react-redux';
import { 
            getRainFall,
            getRainFallMonthly, 
            getRainFallHourly,
            getWaterLevel,
            getWaterLevelMonthly,
            getWaterLevelHourly,
            forget
        } from '../States/reducer';
import { Graph } from 'graphlib';
import ToggleSwitch from 'toggle-switch-react-native';

export class GraphsPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            live:false,
            location:0,
            stationTypeName:'Rainfall',  
            stationType:1,
            timeFrame:2,
            value:0,
            loading:true,
            marker: {
                enabled: true,
                digits: 2,
                backgroundTint: processColor('teal'),
                markerColor: processColor('#F0C0FF8C'),
                textColor: processColor('white'),
              }    
        }
        this.updateValues = this.updateValues.bind(this);
        this.navigateOut = this.navigateOut.bind(this);
        this._goToStatusPage = this._goToStatusPage.bind(this);
    }

    static navigationOptions = (navigation) => {
        return{
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
                source={{uri: "https://banner2.kisspng.com/20180828/sxw/kisspng-clip-art-computer-icons-user-download-chamber-of-d-talonpaw-svg-png-icon-free-download-175238-on-5b84c95a116717.2809616615354289540713.jpg"}}
                onPress={() => {
                    Alert.alert(
                        'Log out',
                        "Are you sure you wan't to log out",
                        [                       
                            {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                            {text: 'OK', onPress: () => {
                                navigation.navigation.navigate('LandingPage')
                            }},
                        ],
                        { cancelable: false }
                    )
                }}
                activeOpacity={0.7}
            />}
            centerComponent={{ text: 'Upper Kotmale Hydropower Project', style: { color: '#fff',fontFamily:'OpenSans'  } }}
            
            />,      
            headerTransparent:true
        }
        }
        


    switchStationType(){
        const newStationType = (this.state.stationType + 1) % 2;
        let newStationTypeName = 'Water Level'
        if (newStationType == 1){
            newStationTypeName = 'Rainfall';
            if(this.state.timeFrame == 0){
                this.props.getRainFallMonthly();
            } else if(this.state.timeFrame == 1){
                this.props.getRainFallHourly();                
            } else {
                this.props.getRainFall();
            }
        } else {
            if(this.state.timeFrame == 0){
                this.props.getWaterLevelMonthly();
            } else if(this.state.timeFrame == 1){
                this.props.getWaterLevelHourly();                
            } else {
                this.props.getWaterLevel();
            }
        } 
        
        let temp = {
            stationTypeName: newStationTypeName,
            stationType:newStationType
        };
        this.setState(temp);
    }

    componentWillMount(){
        this.updateValues()
    }

    componentDidMount(){
        this.props.getRainFall();
    }

    updateValues(){
        values = []
        for (let i = 0; i < this.props.stations.length; i++) {
            const ref = this.props.rainFallData[i];
            const dataElement = ref.value;
            const start = Math.round(this.state.value * 4);
            const end = start + 6;
            const temp = dataElement.slice(start,end);
            if(temp.length < 1){
                return;
            }
            values.push({
                key: ref.key,
                value: temp,
                name:ref.name
            }); 
        }
        console.log('updateValues:' ,values)
        this.setState({
            values:values
        })
    }

    _goToStatusPage(){
        this.props.navigation.navigate('StatusPage');
    }

    _gotToReportPage(){
        this.props.navigation.navigate('TablePage');
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
                <Spinner
                    visible={this.props.state.loading}
                    textContent={'Loading...'}
                    textStyle={{color: '#FFF'}}
                />
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
                        onPress={() => {
                            this._gotToReportPage();
                        }

                        }
                    />
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                    <CheckBox
                        center
                        title='Day'
                        textStyle={styles.buttonText}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.timeFrame === 2}
                        onPress={()=>{
                            if(this.state.stationType === 1){
                                this.props.getRainFall();
                            } else {
                                this.props.getWaterLevel();
                            }
                            this.setState({
                                timeFrame:2,
                                live:false
                            });
                        }}
                        containerStyle={styles.toggleButton}
                    />
                    <CheckBox
                        center
                        title='Month'
                        textStyle={styles.buttonText}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.timeFrame === 0}
                        onPress={()=>{
                            if(this.state.stationType === 1){                                
                                this.props.getRainFallMonthly();
                            } else {
                                this.props.getWaterLevelMonthly();
                            }
                            this.setState({
                                timeFrame:0,
                                live:false
                            });
                        }}
                        containerStyle={styles.toggleButton}
                    />
                    <CheckBox
                        center
                        title='Hour'
                        textStyle={styles.buttonText}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.timeFrame === 1}
                        onPress={()=>{
                            if (this.state.stationType === 1){
                                this.props.getRainFallHourly();
                            } else {
                                this.props.getWaterLevelHourly();
                            }                            
                            this.setState({
                                timeFrame:1,
                                live:false
                            });
                        }}
                        containerStyle={styles.toggleButton}
                    />
                   
                </View>

                <View style={styles.switchStationModeContainer}>
                        <ToggleSwitch
                            isOn={this.state.stationType == 1}
                            onToggle={ (isOn) => {
                                this.switchStationType()
                                this.setState({
                                    live:false
                                })
                            }}
                        />
                        <Text>
                            {this.state.stationTypeName}
                        </Text>
                    </View>

                <Slider
                    value={this.state.value}
                    onValueChange={(value) => {
                        this.setState({value}); 
                        this.setState({
                            live:true
                        })  
                        this.updateValues();                     
                    }} 
                    thumbImage={
                        require('../assets/imgs/slider_grip.png')
                    }
                    thumbStyle={{width: 130,
                        height: 40,
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.5,
                        shadowRadius: 1,
                    }}
                    thumbTintColor={'#D3CDBD'}
                    maximumTrackTintColor={"#b3b3b3"}
                    minimumTrackTintColor={"#b3b3b3"}
                    step={0.25}
                />
                
                {(this.props.state.loading === false && this.props.state.failed === false && this.state.live === false)?(
                    <FlatList 

                    data={this.props.values}
                    extraData={this.state}
                    renderItem={({item}) => (
                        
                        <LineChart style={styles.chart}
                            xAxis={{
                                    granularityEnabled: true,
                                    granularity: 1,
                                }}
                            data={{
                                dataSets:[
                                    {label:item.name, 
                                    values: item.value,
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
                    />):(
                    <FlatList 
                    data={this.state.values}
                    extraData={this.state}
                    renderItem={({item}) => (
                        <LineChart style={styles.chart}   
                            xAxis={{
                                    granularityEnabled: true,
                                    granularity: 1,
                                }}                      
                            data={{
                                dataSets:[
                                    {label:item.name, 
                                    values: item.value,
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
                            chartDescription={{text: ''}}
        
                        />          
                    )}
                    />
                )}
                          
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
    },
    switchStationModeContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }

});

const mapSateToProps = state => {
    const rainfallRecord = state.rainfall;
    station_ids = Object.keys(rainfallRecord);
    var rainFallData = [];
    for (let i = 0; i < station_ids.length; i++) {
        const id = station_ids[i];
        var rainfalls = rainfallRecord[id].rainfall;
        var name = rainfallRecord[id].station_name;
        var record = []
        for (let index = 0; index < rainfalls.length; index++) {
            const data = rainfalls[index];
            //record.push(Math.max(data.rfd_crfValue,0));
            if (data.y !== undefined){
                
                record.push(data);
            }
        }
        record = record.sort(function(a, b) {
            var x = a['x']; var y = b['x'];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
        rainFallData.push({
            key:id,
            value:record,
            name:name
        });
    }
    console.log('rainFallData:',rainFallData)
    var values = []
    for (let i = 0; i < station_ids.length; i++) {
        const ref = rainFallData[i];
        const dataElement = ref.value;
        const start = 0;
        const end =6;
        if (end < 0){
            end = dataElement.length
        }
        const temp = dataElement.slice(start,end);
            
        console.log('temp:',temp)
        values.push({
            key: ref.key,
            value: temp,
            name:ref.name
        }); 
    }
    return {
        rainFallData:rainFallData,
        stations:station_ids,
        state:state,
        values:values
    };
};

const mapDispatchToProps = {
    getRainFall,
    getRainFallMonthly,
    getRainFallHourly,
    getWaterLevel,
    getWaterLevelMonthly,
    getWaterLevelHourly,
    forget
};

export default connect(mapSateToProps, mapDispatchToProps)(GraphsPage);