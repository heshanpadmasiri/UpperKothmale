import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Input, Text, Button, Header, Avatar } from 'react-native-elements';
import commonStyles from '../Styles/Common';
import ToggleSwitch from 'toggle-switch-react-native'

export default class LandingPage extends React.Component{

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
        title: '',        
        headerTransparent:true

    }

    render(){
        return(
            <View style={commonStyles.container}>
                <Card  containerStyle={styles.card}>
                    <Input
                        inputContainerStyle={commonStyles.input_container}
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
                        inputContainerStyle={commonStyles.input_container}
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
                    <View style={styles.rememberMeContainer}>
                        <ToggleSwitch
                            isOn={false}
                            onToggle={ (isOn) => {
                                console.log(isOn)
                            }}
                        />
                        <Text>
                            Remember Me
                        </Text>
                    </View>
                    
                    <Button buttonStyle={styles.loginButton}
                        title="Log In"                        
                    />
                    
                </Card>
                <Button buttonStyle={styles.loginButton}
                    icon={{
                        name: 'people',
                        size: 15,
                        color: 'white'
                      }}
                    title="Sign up"
                    onPress={() => this.props.navigation.navigate('SignupPage')}
                    />
            </View>
        )        
    }
}

const styles = StyleSheet.create({
    card: {
        height:300,
        width:300,
        borderRadius:10,
        justifyContent: 'center'
    },
    rememberMeContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    loginButton:{        
        marginVertical:15,
        backgroundColor:'#A4361A',
        borderRadius:10,
        marginHorizontal:70
    }
  });