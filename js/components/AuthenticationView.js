/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

export default class AuthenticationView extends Component {
  render() {
    return (
      <View>
        <Text>
          HELLO, please login
        </Text>
        <Button
          onPress={this.props.onLoginButtonClick}
          title="Login"
          color="#841584"
          accessibilityLabel="Login"
        />
      </View>
    );
  }
}

AuthenticationView.propTypes = {
  onLoginButtonClick: PropTypes.func.isRequired,
};

