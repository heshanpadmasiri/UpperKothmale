import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import commonStyles from '../Styles/Common';

export default class SignupPage extends React.Component {
  static propTypes = {

  }

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>SignUP</Text>
      </View>
    )
  }
}

