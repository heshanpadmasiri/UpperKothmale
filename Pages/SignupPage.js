import React from 'react'
import { View, StyleSheet, Picker } from 'react-native';
import { Text, Header, Avatar, Input, ButtonGroup, CheckBox } from 'react-native-elements';
import commonStyles from '../Styles/Common';

export default class SignupPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            genderSelect: true
        }
        this.updateGender = this.updateGender.bind(this);
    }

    updateGender(){
        const newGender = ! this.state.genderSelect;
        this.setState({
            genderSelect: newGender
        })
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
        centerComponent={<Text>Signup</Text>}
        
        />,      
        headerTransparent:true

    }

    render() {
        const genders = ['Male', 'Female']
        return (
            <View style={commonStyles.container}>
                <Input
                    inputContainerStyle={commonStyles.input_container}
                    containerStyle={commonStyles.input_field}
                    placeholder='First Name'                        
                />
                <Input
                    inputContainerStyle={commonStyles.input_container}
                    containerStyle={commonStyles.input_field}
                    placeholder='Middle Name'                        
                />
                <Input
                    inputContainerStyle={commonStyles.input_container}
                    containerStyle={commonStyles.input_field}
                    placeholder='Surname'                        
                />
                <Input
                    inputContainerStyle={commonStyles.input_container}
                    containerStyle={commonStyles.input_field}
                    placeholder='Email'                        
                />
                <Input
                    inputContainerStyle={commonStyles.input_container}
                    containerStyle={commonStyles.input_field}
                    placeholder='NIC'                        
                />
                <Input
                    inputContainerStyle={commonStyles.input_container}
                    containerStyle={commonStyles.input_field}
                    placeholder='ID number'                        
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
                    selectedValue={this.state.language}
                    style={styles.picker}    
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Designation_1" value="java" />
                    <Picker.Item label="Designation_2" value="js" />
                </Picker>
                <Picker
                    selectedValue={this.state.language}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Station_1" value="java" />
                    <Picker.Item label="Station_2" value="js" />
                </Picker>
                </View>
                
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
        width:125
    },
    toggleButton:{
        backgroundColor:'#F5FCFF',
        borderColor: '#F5FCFF'
    }
});