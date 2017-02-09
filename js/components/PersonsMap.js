/* @flow */

import React, { Component, PropTypes } from 'react';
import { DeviceEventEmitter } from 'react-native';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Button,
  NativeModules,
  Dimensions,
} from 'react-native';

type AzimuthEvent = {
  newAzimuth: Number
};

export default class PersonsMap extends Component {

  watchID: ?number = null
  currentAzimuth: number = 0
  lastDispatchedAzimuth: ?number = undefined
  interval: ?number = undefined

  persons = [
    {distance: 100, angle:10,},
    // {distance: 2, angle:20,},
    // {distance: 30, angle:190,},
    // {distance: 4, angle:350,},
  ]

  componentDidMount() {
    this.watchAzimuth()
    this.watchCoordinates()
  }

  componentWillUnmount() {
    this.unwatchCoordinates()
    this.unwatchAzimuth()
  }

  watchCoordinates(){
    let geolocationSettings = {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 1}
    this.watchID = navigator.geolocation.watchPosition(
      (position: Object) => {
        this.props.onLocationUpdated(position)
      },
      (error: Object) => {
        console.log(error)
      }, geolocationSettings)
  }
  unwatchCoordinates(){
    NativeModules.CompassAndroid.stopTracking()
    if (this.interval){
      clearInterval(this.interval)
    }
  }

  watchAzimuth(){
    NativeModules.CompassAndroid.startTracking();
    DeviceEventEmitter.addListener('azimuthChanged', e => {
      this.currentAzimuth = e.newAzimuth
    });

    this.interval = setInterval(() => {
      let current = Math.round(this.currentAzimuth)
      if (this.lastDispatchedAzimuth == undefined ||
          this.lastDispatchedAzimuth != current)
      {
        this.props.onAzimuthUpdated(current)
        this.lastDispatchedAzimuth = current
      }
    }, 100)
  }
  unwatchAzimuth(){
    navigator.geolocation.clearWatch(this.watchID)
  }


  refreshView() {
    let token = this.props.authentication.token
    this.props.onViewRefresh(token)
  }

  render() {

// orbi.view.setTranslationX(leveys + (leveys * (float) Math.sin(Math.toRadians(orbi.getBearing() - currentDegree))) * (orbDistance / 150));
// orbi.view.setTranslationY(korkeus - (korkeus * (float) Math.cos(Math.toRadians(orbi.getBearing() - currentDegree))) * (orbDistance / 150));

    let {height, width} = Dimensions.get('window');
    let origin = {
      x: width/2,
      y: height/2,
    }

    var azimuth = this.props.location.azimuth
    if (azimuth == undefined)
      azimuth = 0

    let persons = this.persons.map(person =>
    {
      let x = origin.x + origin.x * Math.cos(person.angle-azimuth)*person.distance/150
      let y = origin.y - origin.y * Math.sin(person.angle-azimuth)*person.distance/150
      return (
        <Image
          source={require('./img/orb.png')}
          style={[styles.pointer, {'position':'absolute', transform: [{ translate: [x,y]}]}]}
        />
        )
    })

    return (
      <View style={styles.container}>
        {persons}
      </View>
    );
  }
}

PersonsMap.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    lastupdate: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  })),
  onViewRefresh: PropTypes.func.isRequired,
  onLocationUpdated: PropTypes.func.isRequired,
  onAzimuthUpdated: PropTypes.func.isRequired,
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
  pointer: {
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
