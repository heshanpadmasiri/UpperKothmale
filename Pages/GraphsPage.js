import React from 'react'
import { View, StyleSheet, Picker } from 'react-native';
import { Text, Header, Avatar, Input, Button, CheckBox } from 'react-native-elements';
import commonStyles from '../Styles/Common';

export default class GraphsPage extends React.Component {

    constructor(props){
        super(props);
        
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
        centerComponent={<Text>Graphs</Text>}
        
        />,      
        headerTransparent:true

    }

    render() {
        return (
            <View style={commonStyles.container}>
                <Text>Graph page</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toggleButtonContainer:{
        flexDirection:'row'
    },
    picker:{
        height:50,
        width:150
    },
    toggleButton:{
        backgroundColor:'#F5FCFF',
        borderColor: '#F5FCFF'
    }
});