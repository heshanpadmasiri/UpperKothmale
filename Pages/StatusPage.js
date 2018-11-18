import React from 'react'
import { View, StyleSheet, ImageBackground, Image, FlatList,Alert } from 'react-native';
import commonStyles from '../Styles/Common';
import { Tab, Tabs, TabHeading } from 'native-base'
import { Avatar, Header, Button, Text, ButtonGroup, Overlay} from 'react-native-elements';

import { connect } from 'react-redux';
import { getStationStatus } from '../States/reducer';

import Spinner from 'react-native-loading-spinner-overlay';

const FirstRoute = () => (
  <View style={{backgroundColor: '#ff4081'}}></View>
)
const SecondRoute = () => (
  <View style={{backgroundColor: '#673ab7'}}></View>
)

export class StatusPage extends React.Component {

  constructor(props){
    super(props);
    var popupVisible = Array(32).fill(false)
    var selectedIndex = Array(8);
    for (let i = 0; i < selectedIndex.length; i++) {
      selectedIndex[i] = [];      
    }
    console.log(selectedIndex)
    this.state = {
      data:[true,true,true],
      popupVisible:popupVisible,
      selectedIndexs:[],
      location:1,
      index: 0,
      routes: [
        {key: 'first', title: 'First'},
        {key: 'second', title: 'Second'}
      ],
      ready:false,
      popupType:0,
      stationCordinates:[
        {x:30,y:20},
        {x:32,y:20},
        {x:30,y:20},
        {x:35,y:20},
        {x:30,y:20},
        {x:40,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20},
        {x:30,y:20}
      ]
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
            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
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

  createPopUps(i){    
    console.log('x',this.props)
    var stationData = this.props.stations;
    return(
      <View style={styles.popUp}>
        <View style={{backgroundColor:'#ff6633', alignItems:'center'}}>
          <Text>{stationData[i].station_name}</Text>
        </View>
        {this.state.popupType === 0?(
          <View>
            <View style={{
              flexDirection:'row',
              justifyContent:'space-evenly'
            }}>
              <Text>Water Level</Text>
              <Text>{stationData[i].waterLevel}</Text>
            </View>
            <View style={{
              flexDirection:'row',
              justifyContent:'space-evenly'
            }}>
              <Text>Rain Fall</Text>
              <Text>{stationData[i].rainfall}</Text>
            </View>
          </View>)
          :(
          <View>
            <View style={{
              flexDirection:'row',
              justifyContent:'space-evenly'
            }}>
              <Text>Water Level</Text>
              <Text>{stationData[i].waterLevelStatus}</Text>
            </View>
            <View style={{
              flexDirection:'row',
              justifyContent:'space-evenly'
            }}>
              <Text>Rain Fall</Text>
              <Text>{stationData[i].rainFallStauts}</Text>
            </View>
          </View>)}
        
      </View>
    )
  }

  setPopupStatus(index,item){
    console.log('rx',index,item)
    var stationName;
    if (index.length === 0){
      stationName = item[0]
    } else {
      stationName = item[index[0]]
    }
    var i;
    var row;
    console.log(this.props.stations);
    for (let index = 0; index < this.props.stations.length; index++) {
      const station = this.props.stations[index];
      if(station.station_name === stationName){
        i = index;
        row = index/4;
        break;
      }
    }
    console.log(i,stationName,row)
    var popupVisible = this.state.popupVisible;
    popupVisible[i] = !popupVisible[i];
    
    this.setState({
      popupVisible:popupVisible
    });
    console.log(this.state.popupVisible)
  } 

  render() {
    const ready = this.props.ready;
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Spinner
            visible={this.props.loading}
            textContent={'Loading...'}
            textStyle={{color: '#FFF'}}
          />
          <Overlay
            isVisible={this.props.failed}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor="red"
            width="auto"
            height="auto"
          >
            <Text>Server connection Error!</Text>
            <Button
              titleStyle={styles.buttonText}
              containerStyle={styles.buttonContainer}
              title="Re-try"
              onPress={() => {
                this.props.getStationStatus();
              }}
            />
          </Overlay>

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
          style={{width:325,height:200,marginVertical:5,left:9}}
          source={require('../assets/imgs/map.jpg')}
        >
          {(ready && this.state.popupVisible[0]) ? (
            this.createPopUps(0)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[1]) ? (
            this.createPopUps(1)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[2]) ? (
            this.createPopUps(2)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[3]) ? (
            this.createPopUps(3)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[4]) ? (
            this.createPopUps(4)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[5]) ? (
            this.createPopUps(5)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[6]) ? (
            this.createPopUps(6)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[7]) ? (
            this.createPopUps(7)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[8]) ? (
            this.createPopUps(8)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[9]) ? (
            this.createPopUps(9)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[10]) ? (
            this.createPopUps(10)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[11]) ? (
            this.createPopUps(11)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[12]) ? (
            this.createPopUps(12)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[13]) ? (
            this.createPopUps(13)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[14]) ? (
            this.createPopUps(14)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[15]) ? (
            this.createPopUps(15)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[16]) ? (
            this.createPopUps(16)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[17]) ? (
            this.createPopUps(17)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[18]) ? (
            this.createPopUps(18)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[19]) ? (
            this.createPopUps(19)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[20]) ? (
            this.createPopUps(20)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[21]) ? (
            this.createPopUps(21)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[22]) ? (
            this.createPopUps(22)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[23]) ? (
            this.createPopUps(23)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[24]) ? (
            this.createPopUps(24)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[25]) ? (
            this.createPopUps(25)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[26]) ? (
            this.createPopUps(26)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[27]) ? (
            this.createPopUps(27)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[28]) ? (
            this.createPopUps(28)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[29]) ? (
            this.createPopUps(29)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[30]) ? (
            this.createPopUps(30)
          ):(<View></View>)}
          {(ready && this.state.popupVisible[31]) ? (
            this.createPopUps(31)
          ):(<View></View>)}
        </ImageBackground>

        <View style={{flexDirection:"row",justifyContent:"space-evenly", marginVertical:5}}>
            <Button buttonStyle={styles.ennabledButton}  
                titleStyle={styles.buttonText}                      
                containerStyle={styles.buttonContainer} 
                title="Data"  
                onPress={ () => {
                    this.setState({
                      popupType:0
                    });
                  }
                }              
            />
            
            <Button buttonStyle={styles.ennabledButton}  
                titleStyle={styles.buttonText}                      
                containerStyle={styles.buttonContainer} 
                title="Status"    
                onPress={ () => {
                    this.setState({
                      popupType:1
                    });
                  }
                }             
            />            
        </View>
        { ready ? (
          <FlatList
          data={this.props.stationsNames}
          extraData={this.state}
          keyExtractor={(item, index) => index}

          renderItem={({item}) => {
            return (<ButtonGroup
              onPress={(index)=>{
                console.log('button pressed:',item,index)
                this.setPopupStatus(index,item)
              }}
              buttons={item}
              selectMultiple={true}
              selectedButtonStyle={styles.ButtonGroupSelected}
              containerStyle={styles.buttonGroupContainer}
            />)

          }}/>
          
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
                return (
                
                <View style={{height:125, backgroundColor:'#D3CDBD',color:'#D3CDBD'}}>
                  <Tabs 
                    style={styles.tabs}
                    tabBarUnderlineStyle={{
                      backgroundColor: '#D3CDBD'
                    }}
                  >
                    <Tab heading={<TabHeading style={styles.tabBar}>
                                  <Text style={{color: '#ffffff',backgroundColor:'#D3CDBD'}}>{station.item.station_name}</Text>
                                </TabHeading>}>

                      <View style={styles.line} >
                        <Text>Activate Statues:                     {station.item.activateStatues}</Text>
                      </View>
                      <View style={styles.line} >
                        <Text>Rainfall Status:                        {station.item.rainFallStauts}</Text>
                      </View>
                      <View style={styles.line} >
                        <Text>WaterLevel pressure Status:{station.item.waterLevelPressureStatus}</Text>
                      </View>
                      <View style={styles.line} >
                        <Text>WaterLevel Status:                 {station.item.waterLevelStatus}</Text>
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
  tabs:{
    backgroundColor:'#D3CDBD',
    color: '#D3CDBD'
  },
  tabBar:{    
    backgroundColor: '#D3CDBD',
    color:'#D3CDBD',
    height:50
  },
  line:{
    flexDirection:"row",
    justifyContent:"flex-start", 
    backgroundColor:"#e0dcd1",
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
    width:150,
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
  
  const ready = (state.loading === false) &&  (state.failed === false) && stations.length > 0;
  return {
    stations:stations,
    stationsNames: station_names,
    ready:ready,
    loading:state.loading,
    failed:state.failed
  }
}

const mapDispatchToProps = {
  getStationStatus
}

export default connect(mapStateToProps,mapDispatchToProps)(StatusPage);