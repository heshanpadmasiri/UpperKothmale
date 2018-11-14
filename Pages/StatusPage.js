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
      stationStatus:[]
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
    const buttons = ['Station 1', 'Station 2', 'Station 3','Station 4']
    const secondRow = ['Station 5', 'Station 6', 'Station 7','Station 8']
    const popupVisible = this.state.popupVisible;
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
            />
            
            <Button buttonStyle={styles.ennabledButton}  
                titleStyle={styles.buttonText}                      
                containerStyle={styles.buttonContainer} 
                title="Status"                
            />            
        </View>
        <ButtonGroup
          onPress={(index)=>{
            this.setState({popupVisible:!this.state.popupVisible})
          }}
          selectedIndexes={this.state.selectedIndexs}
          buttons={buttons}
          selectMultiple={true}
          selectedButtonStyle={styles.ButtonGroupSelected}
          containerStyle={styles.buttonGroupContainer}
        />
        <ButtonGroup
          onPress={(index)=>{
            this.setState({popupVisible:!this.state.popupVisible})
          }}
          selectedIndexes={this.state.selectedIndexs}
          buttons={secondRow}
          selectMultiple={true}
          selectedButtonStyle={styles.ButtonGroupSelected}
          containerStyle={styles.buttonGroupContainer}
        />
        <FlatList
          data={this.state.data}
          extraData={this.state}
          renderItem={({item}) => (
            <View style={{height:145}}>
          <Tabs >
            <Tab heading={<TabHeading style={styles.tabBar}>
                          <Text style={{color: '#ffffff'}}>Station1</Text>
                        </TabHeading>}>

              <View style={styles.line} >
                <Text>WSS</Text>
                <Text>TX1USE</Text>
                <Text>Communication</Text>
              </View>
              <View style={styles.line} >
                <Text>WSS</Text>
                <Text>TX1USE</Text>
                <Text>Communication</Text>
              </View>
              <View style={styles.line} >
                <Text>WSS</Text>
                <Text>TX1USE</Text>
                <Text>Communication</Text>
              </View>
              <View style={styles.line} >
                <Text>WSS</Text>
                <Text>TX1USE</Text>
                <Text>Communication</Text>
              </View>
              <View style={styles.line} >
                <Text>WSS</Text>
                <Text>TX1USE</Text>
                <Text>Communication</Text>
              </View>
            </Tab>
            <Tab 
                heading={<TabHeading style={styles.tabBar}>
                          <Text style={{color: '#ffffff'}}>Notifications</Text>
                        </TabHeading>}>
                
            </Tab>
            <Tab heading={<TabHeading style={styles.tabBar}>
                          <Text style={{color: '#ffffff'}}>Information</Text>
                        </TabHeading>}>
                
            </Tab>
            <Tab heading={<TabHeading style={styles.tabBar}>
                          <Text style={{color: '#ffffff'}}>Gauge type</Text>
                        </TabHeading>}>
                
            </Tab>
          </Tabs>
        </View>
        
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
  return {
    success:true
  }
}

const mapDispatchToProps = {
  getStationStatus
}

export default connect(mapStateToProps,mapDispatchToProps)(StatusPage);