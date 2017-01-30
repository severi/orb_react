/* @flow */

import React, { Component, PropTypes } from 'react';
import { DeviceEventEmitter } from 'react-native';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  Button
} from 'react-native';

export default class PersonsMap extends Component {

  watchID: ?number = null;

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      (position: Object) => {
        this.props.onLocationUpdated(position)
      },
      (error: Object) => {
        console.log(error)
      },
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 1});

  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.props.persons.map(person =>
            person.name
          )}
        </Text>
        <Text style={styles.userInfo}>
          Lon: {this.props.user.location.longitude}
        </Text>
        <Text style={styles.userInfo}>
          Lat: {this.props.user.location.latitude}
        </Text>
        <Text style={styles.userInfo}>
          Heading: {this.props.user.location.heading}
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
  onLocationUpdated: PropTypes.func.isRequired,
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
  userInfo: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
    color: instructionsColor,
    marginTop: 20,
  },
});
