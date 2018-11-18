import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Input, Text, Button, Header, Avatar } from 'react-native-elements';
import commonStyles from '../Styles/Common';
import ToggleSwitch from 'toggle-switch-react-native'
import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from 'react-redux';
import { getUserHash,authenticate,redirect,remember,forget } from '../States/reducer';
import { sha256 } from 'react-native-sha256';

export class LandingPage extends React.Component{



    static navigationOptions = {
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
        
        centerComponent={{ text: 'Upper Kotmale Hydropower Project', style: { color: '#fff' } }}
        
        />,      
        headerTransparent:true
    
    }

    authenticate(){
        const email = this.state.email;
        if(email !== undefined && email !== ""){
            this.props.getUserHash(email)
        }
        //this.props.navigation.navigate('GraphsPage')
    }

    showFailedAlert(){
        Alert.alert(
            'Login failed',
            'Check your email and password'            
          )
    }

    validatePassword(p_hash){
        if(this.state.password === undefined || this.state.password === ""){
            this.showFailedAlert()
        } else {
            console.log(this.state.password)
            sha256(this.state.password).then( hash => {
                console.log(hash,p_hash);
                if(hash === p_hash){
                    this.props.authenticate();
                } else {
                    this.showFailedAlert()
                }
            })
        }        
    }

    componentWillMount(){
        if(this.props.state.remember && !this.props.state.authenticated){
            this.props.navigation.navigate('GraphsPage');
            this.props.redirect();
        }
    }


    componentDidUpdate(){
        if(!this.props.state.redirect ){
            return;
        }
        if(this.props.state.redirect && this.props.state.authenticated){
            
            this.props.navigation.navigate('GraphsPage');
            this.props.redirect();
        }
        else if(this.props.state.loggedIn){
            this.validatePassword(this.props.state.userHash);
        } else if(this.props.state.userHash === null) {
            this.showFailedAlert()
        }
    }

    render(){
        return(
            <View style={commonStyles.container}>
                <Spinner
                    visible={this.props.state.loading}
                    textContent={'Loading...'}
                    textStyle={{color: '#FFF'}}
                />
                <Card  containerStyle={styles.card}>
                    <Input
                        inputContainerStyle={commonStyles.input_container}
                        containerStyle={commonStyles.input_field}
                        onChangeText={(text)=>{
                            this.setState({
                                email:text
                            });
                        }}       
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
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({
                                password:text
                            });
                        }}       
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
                            isOn={this.props.state.remember}
                            onToggle={ (isOn) => {
                                if(isOn){
                                    this.props.remember()
                                } else {
                                    this.props.forget()
                                }
                            }}
                        />
                        <Text>
                            Remember Me
                        </Text>
                    </View>
                    
                    <Button buttonStyle={styles.loginButton}
                        title="Log In"  
                        onPress={() => this.authenticate()}                      
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
        justifyContent: 'center',
        backgroundColor:'#e0dcd1'
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

  const mapStateToProps = state => {
    console.log('State:',state);
    return {
        state:state
    }
  }

  const mapDispatchToProps = {
      getUserHash,
      authenticate,
      redirect,
      remember,
      forget
  }

export default connect(mapStateToProps,mapDispatchToProps)(LandingPage);