import React from 'react'
import { View, Text, Dimensions } from 'react-native';
import commonStyles from '../Styles/Common';
import { Avatar, Header, ButtonGroup } from 'react-native-elements';
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
  }

  navigateOut(location){
    if (location === 0) {
        this.props.navigation.navigate('GraphsPage');
    } else if (location === 2){
        this.props.navigation.navigate('TablePage');
    }
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
    centerComponent={{ text: 'Upper Kotmale Hydropower Project', style: { color: '#fff' } }}
    
    />,      
    headerTransparent:true

}

  render() {
    const buttons = ['Graphs', 'Status', 'Report']
    return (
      <View style={{flex: 1}}>
        <ButtonGroup
                    onPress={this.navigateOut}
                    selectedIndex={this.state.location}
                    buttons={buttons}
                    containerStyle={{height: 25}}
          />
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute
          })}
          onIndexChange={index => this.setState({index})}
          initialLayout={{width: Dimensions.get('window').width}}
        />
      </View>
      
    )
  }
}
