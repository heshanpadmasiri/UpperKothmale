import React from 'react'
import { View, StyleSheet, Picker, ScrollView,Alert } from 'react-native';
import { Text, Header, Avatar, Input, Button, CheckBox, Overlay } from 'react-native-elements';
import commonStyles from '../Styles/Common';

import { getStationNames,createUser } from '../States/reducer'
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { sha256 } from 'react-native-sha256';

export class SignupPage extends React.Component {

    constructor(props){
        super(props);        
        const stations = ['Station 1','Station 2'];
        const designations = ['Designation 1', 'Designation 2']
        this.state = {           
            stations:stations,
            designations:designations,
            firstName:'',
            middleName:'',
            surName:'',
            email:'',
            idNumber:'',
            station:"",
            designation:"",
            password:"",
            genderSelect: true,
            passwordMissMatch:false,
            validInput:false,
            repeatPassword:'',
            inputError:false
        }
        this.updateGender = this.updateGender.bind(this);
    }

    updateGender(){
        const newGender = ! this.state.genderSelect;
        this.setState({
            genderSelect: newGender
        })
    }

    componentWillMount(){
        this.props.getStationNames();
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateInput(){
        return this.state.firstName !== "" && this.state.password !== "" && this.state.password === this.state.repeatPassword && this.validateEmail(this.state.email) && !this.passwordMissMatch;
        
    }

    validatePassword(){
        return this.state.password === this.state.repeatPassword
    }

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
        centerComponent={{ text: 'Upper Kotmale Hydropower Project', style: { color: '#fff',fontFamily:'OpenSans'  } }}        
        />,      
        headerTransparent:true
    }

    showAlert(message){
        Alert.alert(
            'Input Error',
            message            
          )
    }


    submit(){
        if(this.validatePassword()){
            if(this.validateInput()){
                const firstName = this.state.firstName;
                const middleName = this.state.middleName;
                const surName = this.state.surName;
                const email = this.state.email;
                const id = this.state.idNumber;
                var station = this.state.station;
                var designation = this.state.designation;
                if (station === ""){
                    station = this.props.state.stationNames[0]
                } 
                if(designation === ""){
                    designation = this.state.designations[0]
                }
                
                const gender = this.state.genderSelect? "Female":"Male"
                sha256(this.state.password).then( hash => {
                    console.log(hash);
                    const password = hash;
                    this.props.createUser(firstName,middleName,surName,email,id,station,designation,gender,password);
                })
                
            } else {
                this.showAlert("Check you inputs!")
            }
        } else {
           this.showAlert("Passwords don't match")
        }
        
    }

    render() {
        const genders = ['Male', 'Female'];
        return (
            <ScrollView>
                {this.props.userCreated?(<Text>Account Create Successfull!</Text>):(<View></View>)}
                <Spinner
                    visible={this.props.loading}
                    textContent={'Loading...'}
                    textStyle={{color: '#FFF'}}
                />
                <Overlay
                    isVisible={this.props.failed}
                    windowBackgroundColor="rgba(255, 255, 255, .5)"
                    overlayBackgroundColor="red"
                    width="auto"
                    height="auto"
                >
                    <Text>Server connection Error!</Text>
                    <Button
                    titleStyle={styles.buttonText}
                    containerStyle={styles.buttonContainer}
                    title="Re-try"
                    onPress={() => {
                        this.props.getStationNames();
                    }}
                />
                </Overlay>
                
                {this.props.ready ?(<View style={commonStyles.container}>
                    <Input
                        inputContainerStyle={commonStyles.input_container}
                        containerStyle={commonStyles.input_field}
                        placeholder='First Name'      
                        onChangeText={(text)=>{
                            this.setState({
                                firstName:text
                            });
                        }}                  
                    />
                    <Input
                        inputContainerStyle={commonStyles.input_container}
                        containerStyle={commonStyles.input_field}
                        placeholder='Middle Name'
                        onChangeText={(text)=>{
                            this.setState({
                                middleName:text
                            });
                        }}      
                    />
                    <Input
                        inputContainerStyle={commonStyles.input_container}
                        containerStyle={commonStyles.input_field}
                        placeholder='Surname'  
                        onChangeText={(text)=>{
                            this.setState({
                                surName:text
                            });
                        }}                            
                    />
                    <Input
                        inputContainerStyle={commonStyles.input_container}
                        containerStyle={commonStyles.input_field}
                        placeholder='Email'  
                        onChangeText={(text)=>{
                            this.setState({
                                email:text
                            });
                        }}                            
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
                    />
                    <Input
                        inputContainerStyle={commonStyles.input_container}
                        containerStyle={commonStyles.input_field}
                        placeholder='Confirm Password'  
                        secureTextEntry={true}                        
                        onChangeText={(text)=>{
                            this.setState({
                                repeatPassword:text
                            });
                        }}                            
                    />
                    <Input
                        inputContainerStyle={commonStyles.input_container}
                        containerStyle={commonStyles.input_field}
                        placeholder='ID number'
                        onChangeText={(text)=>{
                            this.setState({
                                idNumber:text
                            });
                        }}                              
                    />
                    <View style={styles.toggleButtonContainer}>
                        <CheckBox
                            center
                            title='Male'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={!this.state.genderSelect}
                            onPress={this.updateGender}
                            containerStyle={styles.toggleButton}
                        />
                        <CheckBox
                            center
                            title='Female'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.genderSelect}
                            onPress={this.updateGender}
                            containerStyle={styles.toggleButton}
                        />
                    </View>
                    <View style={styles.toggleButtonContainer}>
                    <Picker
                        selectedValue={this.state.station}
                        style={styles.picker}    
                        prompt="Select station"
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({station: itemValue})}}>                        
                        {this.props.state.stationNames.map((item, index) => {
                            return (< Picker.Item label={item} value={item} key={index} />);
                            })} 
                    </Picker>
                    <Picker
                        selectedValue={this.state.station}
                        style={styles.picker}    
                        prompt="Select designation"
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({designation: itemValue})}}>
                        {this.state.designations.map((item, index) => {
                            return (< Picker.Item label={item} value={item} key={index} />);
                            })}   
                    </Picker>
                    </View>
                    <Button                     
                        title="Submit"                        
                        buttonStyle={styles.button}
                        onPress={()=>{
                            this.submit();

                        }}
                    />
                </View>):(<View></View>)}
            </ScrollView>
            
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
        backgroundColor:'#D3CDBD',
        borderColor: '#D3CDBD'
    },
    button:{        
        marginVertical:15,
        backgroundColor:'#A4361A',
        borderRadius:10,
        marginHorizontal:70
    }
});

const mapStateToProps = state => {
    console.log('mapStateToProps:',state)
    const ready = state.loading === false && state.failed === false
    return {
        state:state,
        ready:ready
    }
}

const mapDispatchToProps = {
    getStationNames,
    createUser
}

export default connect(mapStateToProps,mapDispatchToProps)(SignupPage);