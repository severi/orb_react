/* @flow */

type Person = {
  distance: number,
  angle: number,
}

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

  origin: Object = {
      x: undefined,
      y: undefined,
  }



  persons = [
    {distance: 100, angle:10,},
    {distance: 15, angle:20,},
    {distance: 30, angle:190,},
    {distance: 80, angle:350,},
  ]

  constructor() {
    super()
    const orbSizeDividedByTwo = 25
    const {height, width} = Dimensions.get('window')
    this.origin = {
      x: width/2 - orbSizeDividedByTwo,
      y: height/2 - orbSizeDividedByTwo,
    }
  }

  radians(degrees:number) {
    return degrees * Math.PI / 180
  };

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
    }, 10)
  }
  unwatchAzimuth(){
    navigator.geolocation.clearWatch(this.watchID)
  }


  refreshView() {
    let token = this.props.authentication.token
    this.props.onViewRefresh(token)
  }

  tranformToCoordinates(person: Person) {
    const azimuth = this.props.location.azimuth
    let x = this.origin.x + (this.origin.y * Math.sin(this.radians(person.angle - azimuth))) * (person.distance/150)
    let y = this.origin.y - (this.origin.y * Math.cos(this.radians(person.angle - azimuth))) * (person.distance/150)
    return {x,y}
  }


  render() {
    const visualizeNearbyOrbs = this.persons.map((person, i) =>
    {
      const {x, y} = this.tranformToCoordinates(person)
      return (
        <Image key={i}
          source={require('./img/orb.png')}
          style={[styles.pointer, {'position':'absolute', transform: [{ translate: [x,y]}]}]}
        />
      )
    })

    return (
      <View style={styles.container}>
        {visualizeNearbyOrbs}
        <Image
          source={require('./img/orb2.png')}
        />
        <Text style={styles.userIitial}>
          S
        </Text>
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


let containerBackground = "#000000";
let instructionsColor = "#333333";
let userColor = "#00FFFF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
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
  userIitial: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: userColor,
    fontSize: 50,
  },
});
