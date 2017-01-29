/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Button
} from 'react-native';

export default class PersonsMap extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.props.persons.map(person =>
            person.name
          )}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R son your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu

        </Text>

        <Button
          onPress={this.props.onButtonClick}
          title="Add Person"
          color="#841584"
          accessibilityLabel="Add Person"
        />
      </View>
    );
  }
}

PersonsMap.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  onButtonClick: PropTypes.func.isRequired,
};


let containerBackground = "#F5FCFF";
let instructionsColor = "#333333";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: containerBackground,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: instructionsColor,
    marginBottom: 5,
  },
});
