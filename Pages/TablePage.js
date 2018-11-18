import React from 'react'
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Header, Avatar, CheckBox, Button} from 'react-native-elements';
import { Table, Row, Rows } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { getStationReport } from '../States/reducer'
export class TablePage extends React.Component {

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

  constructor(props){
    super(props);
    this.state = {
        headings:[
          "station id",
          "last packet recieved",
          "station flag"
        ],
        data:[
          ['1', '2', '3', '4'],
          ['a', 'b', 'c', 'd'],
          ['1', '2', '3', '456\n789'],
          ['a', 'b', 'c', 'd']
        ]
    }    
  }

  componentWillMount(){
    this.props.getStationReport();
  }

  _goToGraphPage(){
    this.props.navigation.navigate('GraphsPage');
  }

  _goToStatusPage(){
    this.props.navigation.navigate('StatusPage');
  }

  render() {
    return (
      <View style={{flex: 1}}>
          <View style={styles.container}>
          <Spinner
              visible={this.props.state.loading}
              textContent={'Loading...'}
              textStyle={{color: '#FFF'}}
          />
          <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
              <Button buttonStyle={styles.ennabledButton}  
                  titleStyle={styles.buttonText}                      
                  containerStyle={styles.buttonContainer} 
                  title="Graphs"
                  onPress={()=>{
                    this._goToGraphPage()
                  }}
              />
              <Button buttonStyle={styles.ennabledButton}
                  titleStyle={styles.buttonText} 
                  containerStyle={styles.buttonContainer}
                  onPress={() => {
                      this._goToStatusPage()
                  }}
                  title="Status"
              />
              <Button buttonStyle={styles.dissableButton}  
                  titleStyle={styles.buttonText}                      
                  containerStyle={styles.buttonContainer} 
                  title="Report"
              />
          </View>
          {this.props.ready? (
            <View style={{padding:20}}>
              <ScrollView>
                <Table borderStyle={{borderWidth: 2, marginVertical:15,borderColor:'#D8DCE5'}}>
                  <Row data={this.state.headings} style={styles.head} textStyle={styles.text}/>
                  <Rows data={this.props.state.stationReport} textStyle={styles.text}/>


                </Table>
              </ScrollView>              
            </View>
          ):(
            <View></View>
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
  text:{
    fontFamily:'OpenSans'
  },
  head: { 
    height: 40, 
    backgroundColor: '#D8DCE5'
  }
});


const mapStateToProps = state => {
  console.log('state',state)
  const ready = state.loading === false && state.failed === false && state.stationReport.length > 0;
  console.log(state.stationReport)
  return{
    state:state,
    ready:ready
  }
}

const mapDispatchToProps={
  getStationReport
}

export default connect(mapStateToProps,mapDispatchToProps)(TablePage);