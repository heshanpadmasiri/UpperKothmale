import React from 'react';
import { View, Text } from 'react-native';
import commonStyles from '../Styles/Common';

export default class LandingPage extends React.Component{

    static navigationOptions = {
        title: 'Landing Page'
    }

    render(){
        return(
            <View style={commonStyles.container}>
                <Text>Landing Page</Text>
            </View>
        )
        
    }

}