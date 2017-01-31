/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

export default class AuthenticationView extends Component {

    state = {
        username: String,
        password: String
    };

  constructor(props: Object) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onLoginButtonClick(username: string, password: string){
    this.props.login(this.state.username, this.state.password)
  }


  render() {
    return (
      <View>
        <Text>
          HELLO, please login
        </Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          style={{height: 40, borderColor: 'red', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
        />
        <Button
          onPress={this.onLoginButtonClick.bind(this)}
          title="Login"
          color="#841584"
          accessibilityLabel="Login"
        />
      </View>
    );
  }
}

AuthenticationView.propTypes = {
  login: PropTypes.func.isRequired,
};

