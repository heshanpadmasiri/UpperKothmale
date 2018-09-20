import React from 'react'
import { View , Text } from 'react-native';
import commonStyles from '../Styles/Common';
import { Avatar, Header, ButtonGroup } from 'react-native-elements';
import { Segment, Button, Container, Content } from 'native-base';


export default class StatusPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      location:1
    }
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
        <Container>    
          <Segment>
            <Button first>
              <Text>Test</Text>
            </Button>
            <Button>
              <Text>T2</Text>
            </Button>
            <Button last>
              <Text>T3</Text>
            </Button>
          </Segment>    
          <Content padder>

          </Content>
        </Container>
      </View>
      
    )
  }
}
