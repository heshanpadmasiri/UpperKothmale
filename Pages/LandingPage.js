import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Input } from 'react-native-elements';
import commonStyles from '../Styles/Common';

export default class LandingPage extends React.Component{

    static navigationOptions = {
        title: '',        
        headerTransparent:true
    }

    render(){
        return(
            <View style={commonStyles.container}>
                <Card  containerStyle={styles.card}>
                <Input
                        containerStyle={commonStyles.input_field}
                        placeholder='Email'
                        leftIcon={
                            <Icon
                            name='envelope'
                            size={24}
                            color='black'
                            />
                        }
                    />
                    <Input
                        containerStyle={commonStyles.input_field}
                        placeholder='Password'
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            color='black'
                            />
                        }
                    />
                    
                </Card>
            </View>
        )        
    }
}

const styles = StyleSheet.create({
    card: {
        height:450,
        width:300,
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContent: {
        
    }
  });