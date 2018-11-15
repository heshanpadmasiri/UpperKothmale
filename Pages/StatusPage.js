import React from 'react'
import { View, StyleSheet, ImageBackground, Image, FlatList } from 'react-native';
import commonStyles from '../Styles/Common';
import { Tab, Tabs, TabHeading, Card } from 'native-base'
import { Avatar, Header, Button, Text, ButtonGroup} from 'react-native-elements';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'

import { connect } from 'react-redux';
import { getStationStatus } from '../States/reducer'

const FirstRoute = () => (
  <View style={{backgroundColor: '#ff4081'}}></View>
)
const SecondRoute = () => (
  <View style={{backgroundColor: '#673ab7'}}></View>
)

export class StatusPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data:[true,true,true],
      popupVisible:false,
      selectedIndexs:[0],
      location:1,
      index: 0,
      routes: [
        {key: 'first', title: 'First'},
        {key: 'second', title: 'Second'}
      ],
      stations:[],
      ready:false,
      stationsNames:[]
    };
    this.navigateOut = this.navigateOut.bind(this);
    this._goToGraphPage = this._goToGraphPage.bind(this);
  }

  componentWillMount(){
    console.log('t')
    this.props.getStationStatus();
  }

  navigateOut(location){
    if (location === 0) {
        this.props.navigation.navigate('GraphsPage');
    } else if (location === 2){
        this.props.navigation.navigate('TablePage');
    }
  }

  _goToGraphPage(){
    this.props.navigation.navigate('GraphsPage');
  }

  static navigationOptions = {
    header: props => <Header
    backgroundCoslor="#D3CDBD"
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
    centerComponent={{ text: 'Upper Kotmale Hydropower Project', style: { color: '#fff',
    fontFamily:'OpenSans' } }}
    
    />,      
    headerTransparent:true
}

  

  render() {
    const buttons = this.state.stationsNames[0]
    const secondRow = ['Station 5', 'Station 6', 'Station 7','Station 8']
    const popupVisible = this.state.popupVisible;
    const ready = this.props.ready;
    
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <Button buttonStyle={styles.ennabledButton}  
                titleStyle={styles.buttonText}                      
                containerStyle={styles.buttonContainer} 
                title="Graphs"
                onPress={() => {
                  this._goToGraphPage()
              }}
            />
            <Button buttonStyle={styles.dissableButton}
                titleStyle={styles.buttonText} 
                containerStyle={styles.buttonContainer}                
                title="Status"
            />
            <Button buttonStyle={styles.ennabledButton}
                containerStyle={styles.buttonContainer}
                titleStyle={styles.buttonText} 
                title="Report"
            />
        </View>
        <ImageBackground
          style={{width:325,height:200,marginVertical:5}}
          source={{uri:'https://via.placeholder.com/200x325'}}
        >
          {popupVisible ? (
            <View style={styles.popUp}>
              <View style={{backgroundColor:'#ff6633', alignItems:'center'}}>
                <Text>Station 1</Text>
              </View>
              <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly'
              }}>
                <Text>Water Level</Text>
                <Text>12</Text>
              </View>
              <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly'
              }}>
                <Text>Flow Volume</Text>
                <Text>12</Text>
              </View>
              
            </View>
          ):(<View></View>)}
          
        </ImageBackground>

        <View style={{flexDirection:"row",justifyContent:"space-evenly", marginVertical:5}}>
            <Button buttonStyle={styles.ennabledButton}  
                titleStyle={styles.buttonText}                      
                containerStyle={styles.buttonContainer} 
                title="Data"  
                onPress={ () => {
                  console.log('state',this.state)
                  console.log('props', this.props)
                }
                }              
            />
            
            <Button buttonStyle={styles.ennabledButton}  
                titleStyle={styles.buttonText}                      
                containerStyle={styles.buttonContainer} 
                title="Status"                
            />            
        </View>
        { ready ? (
          <FlatList
          data={this.props.stationsNames}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <ButtonGroup
              onPress={(index)=>{
                this.setState({popupVisible:!this.state.popupVisible})
              }}
              selectedIndexes={this.state.selectedIndexs}
              buttons={item}
              selectMultiple={true}
              selectedButtonStyle={styles.ButtonGroupSelected}
              containerStyle={styles.buttonGroupContainer}
            />
          )}/>
          
        ) : <View></View>
        }
        {
          ready ? (
            <FlatList
              data={this.props.stations}
              extraData={this.props}
              keyExtractor={(item, index) => index}
              // todo: find what is the value of station at this point
              renderItem={(station) => {
                console.log(station)
                return (
                
                <View style={{height:145}}>
                <Tabs >
                  <Tab heading={<TabHeading style={styles.tabBar}>
                                <Text style={{color: '#ffffff'}}>{station.item.station_name}</Text>
                              </TabHeading>}>

                    <View style={styles.line} >
                      <Text>Activate Statues:</Text>
                      <Text>{station.item.activateStatues}</Text>
                    </View>
                    <View style={styles.line} >
                      <Text>Rainfall Status</Text>
                      <Text>{station.item.rainFallStauts}</Text>
                    </View>
                    <View style={styles.line} >
                      <Text>WaterLevel Status</Text>
                      <Text>{station.item.waterLevelPressureStatus}</Text>
                    </View>
                    <View style={styles.line} >
                      <Text>WaterLevel Status</Text>
                      <Text>{station.item.waterLevelStatus}</Text>
                    </View>
                  </Tab>
                </Tabs>
                </View>
              )}}
            />
          ) : <View></View>
        }       
        
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
  },
  buttonText:{
      color: '#9BA0A8',
      fontFamily:'OpenSans'
  },
  buttonContainer:{
      backgroundColor: '#D3CDBD'
  },
  ennabledButton: {
      backgroundColor:'#F1F3F6',
      borderRadius:10,
      width:80
  },
  dissableButton: {
      backgroundColor:'#D8DCE5',
      borderRadius:10,
      width:80
  },
  toggleButton:{
      backgroundColor:'#D3CDBD',
      borderColor: '#D3CDBD'
  },
  tabBar:{    
    backgroundColor: '#D3CDBD'
  },
  line:{
    flexDirection:"row",justifyContent:"space-evenly", backgroundColor:"#e0dcd1",
    fontFamily:'OpenSans'
  },
  buttonGroupContainer:{
    backgroundColor:'#F1F3F6',
    borderRadius:10
  },
  ButtonGroupSelected:{
    backgroundColor:'#D8DCE5',
  },
  popUp:{
    borderRadius:10,
    backgroundColor:'#992600',
    position:'absolute', 
    top:20, 
    left:30, 
    right:0, 
    bottom:0,
    justifyContent:'space-evenly',
    alignItems:'stretch', 
    width:120,
    height:95}
});

const mapStateToProps = state => {
  console.log('mapStateToProps:',state)
  const stations =state.stationStatus;
  for (let i = 0; i < stations.length; i++) {
    const station = stations[i];
    station.activateStatues = station.activateStatues? "Active":"Inactive";
    station.rainFallStauts = station.rainFallStauts? "Active" : "Inactive";
    station.waterLevelPressureStatus = station.waterLevelPressureStatus? "Active" : "Inactive";
    station.waterLevelStatus = station.waterLevelStatus? "Active" : "Inactive";
  }
  var station_names = [];
  for (let i = 0; i < 32; i += 4) {
    const _stations = stations.slice(i,i+4);
    var temp = []
    for (let i = 0; i < _stations.length; i++) {
      const element = _stations[i];
      temp.push(element.station_name)
    }  
    station_names.push(temp)
  }
  console.log('stationNames:',station_names)
  console.log(state.loading,state.failed)
  const ready = (state.loading === false) &&  (state.failed === false)
  return {
    stations:stations,
    stationsNames: station_names,

    ready:ready
  }
}

const mapDispatchToProps = {
  getStationStatus
}

export default connect(mapStateToProps,mapDispatchToProps)(StatusPage);