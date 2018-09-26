import React from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import commonStyles from '../Styles/Common';
import { Tab, Tabs, TabHeading,Icon } from 'native-base'
import { Avatar, Header, Button, Text} from 'react-native-elements';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'

const FirstRoute = () => (
  <View style={{backgroundColor: '#ff4081'}}></View>
)
const SecondRoute = () => (
  <View style={{backgroundColor: '#673ab7'}}></View>
)

export default class StatusPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      location:1,
      index: 0,
      routes: [
        {key: 'first', title: 'First'},
        {key: 'second', title: 'Second'}
      ]
    };
    this.navigateOut = this.navigateOut.bind(this);
    this._goToGraphPage = this._goToGraphPage.bind(this);
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

  render() {
    const buttons = ['Graphs', 'Status', 'Report']
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
        <Image
          style={{width:325,height:200,marginVertical:5}}
          source={{uri:'https://via.placeholder.com/200x325'}}
        />
        <View style={{flexDirection:"row",justifyContent:"space-evenly", marginVertical:5}}>
            <Button buttonStyle={styles.ennabledButton}  
                titleStyle={styles.buttonText}                      
                containerStyle={styles.buttonContainer} 
                title="Station 1"                
            />
            <Button buttonStyle={styles.ennabledButton}
                titleStyle={styles.buttonText} 
                containerStyle={styles.buttonContainer}                
                title="Station 2"
            />
            <Button buttonStyle={styles.ennabledButton}
                containerStyle={styles.buttonContainer}
                titleStyle={styles.buttonText} 
                title="Station 3"
            />
            <Button buttonStyle={styles.ennabledButton}  
                titleStyle={styles.buttonText}                      
                containerStyle={styles.buttonContainer} 
                title="Station 4"                
            />            
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-evenly", marginVertical:5}}>
            <Button buttonStyle={styles.ennabledButton}  
                titleStyle={styles.buttonText}                      
                containerStyle={styles.buttonContainer} 
                title="Station 5"                
            />
            <Button buttonStyle={styles.ennabledButton}
                titleStyle={styles.buttonText} 
                containerStyle={styles.buttonContainer}                
                title="Station 6"
            />
            <Button buttonStyle={styles.ennabledButton}
                containerStyle={styles.buttonContainer}
                titleStyle={styles.buttonText} 
                title="Station 7"
            />
            <Button buttonStyle={styles.ennabledButton}  
                titleStyle={styles.buttonText}                      
                containerStyle={styles.buttonContainer} 
                title="Station 8"                
            />            
        </View>
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
        <View style={{height:150}}>
          <Tabs >
            <Tab heading={<TabHeading style={styles.tabBar}>
                          <Text style={{color: '#ffffff'}}>Station2</Text>
                        </TabHeading>}>

              <View style={{flexDirection:"row",justifyContent:"space-evenly"}} >
                <Text>WSS</Text>
                <Text>TX1USE</Text>
                <Text>Communication</Text>
              </View>
              <View style={{flexDirection:"row",justifyContent:"space-evenly"}} >
                <Text>WSS</Text>
                <Text>TX1USE</Text>
                <Text>Communication</Text>
              </View>
              <View style={{flexDirection:"row",justifyContent:"space-evenly"}} >
                <Text>WSS</Text>
                <Text>TX1USE</Text>
                <Text>Communication</Text>
              </View>
              <View style={{flexDirection:"row",justifyContent:"space-evenly"}} >
                <Text>WSS</Text>
                <Text>TX1USE</Text>
                <Text>Communication</Text>
              </View>
              <View style={{flexDirection:"row",justifyContent:"space-evenly"}} >
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
  tabBar:{    
    backgroundColor: '#D3CDBD'
  },
  line:{
    flexDirection:"row",justifyContent:"space-evenly", backgroundColor:"#e0dcd1"
  }

});