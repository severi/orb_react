/* @flow */

type Person = {
  id: number,
  distance: number,
  bearing: number,
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
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
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

  transferValueX: Animated.Value = null
  transferValueY: Animated.Value = null

  azimuthUpdateIntervall = 100
  orbSizeDividedByTwo = 25


  // persons = [
  //   {distance: 100, angle:10, message: 'Jorma täällä!', age: 55, gender: 'male', moveDir: 1, oldX: 0, oldY: 0},
  //   {distance: 15, angle:20, message: 'Irma ihan märkänä ;) Tarttis rakoon vähän täytettä..', age: 32, gender: 'female', moveDir: 0, oldX: 0, oldY: 0},
  //   {distance: 30, angle:190, message: 'Minttu täällä hei :)', age: 19, gender: 'female', moveDir: 0, oldX: 0, oldY: 0},
  //   {distance: 80, angle:350, message: 'Pussydestroyah', age: 88, gender: 'male', moveDir: 1, oldX: 0, oldY: 0},
  // ]

  constructor() {
    super()
    const {height, width} = Dimensions.get('window')
    this.origin = {
      x: width/2 - this.orbSizeDividedByTwo,
      y: height/2 - this.orbSizeDividedByTwo,
    }
    this.transferValueX = new Animated.Value(0)
    this.transferValueY = new Animated.Value(0)
  }

  radians(degrees:number) {
    return degrees * Math.PI / 180
  };

  componentDidMount() {
    this.watchAzimuth()
    this.watchCoordinates()
  }

  componentDidUpdate() {
    this.transferX()
    this.transferY()
  }

  componentWillUnmount() {
    this.unwatchCoordinates()
    this.unwatchAzimuth()
  }

  transferX () {
    this.transferValueX.setValue(0)
    Animated.timing(
      this.transferValueX,
      {
        toValue: 1,
        duration: this.azimuthUpdateIntervall,
        easing: Easing.linear
      }
    ).start()
  }

  transferY () {
    this.transferValueY.setValue(0)
    Animated.timing(
      this.transferValueY,
      {
        toValue: 1,
        duration: this.azimuthUpdateIntervall,
        easing: Easing.linear
      }
    ).start()
  }

  watchCoordinates(){
    let geolocationSettings = {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 1}
    this.watchID = navigator.geolocation.watchPosition(
      (position: Object) => {
        let token = this.props.authentication.token
        this.props.onLocationUpdated(token, position)
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

    // this.interval = setInterval(() => {
    //   this.props.onAzimuthUpdated(this.currentAzimuth)
    //   this.lastDispatchedAzimuth = this.currentAzimuth
    // }, this.azimuthUpdateIntervall)


    this.interval = setInterval(() => {
      this.refreshView()
    }, this.azimuthUpdateIntervall*100)

  }

  unwatchAzimuth(){
    navigator.geolocation.clearWatch(this.watchID)
  }

  refreshView() {
    let token = this.props.authentication.token
    this.props.onViewRefresh(token)
  }

  // _onPressButton(i) {
  //   console.log("You tapped orb " + i + ', message: ' + this.persons[i].message)
  //   Alert.alert(
  //      'Orb ' + i + ' pressed',
  //      this.persons[i].gender + ', ' + this.persons[i].age + '\n\n' + 'Message: ' + this.persons[i].message,
  //      [
  //         {text: 'Block'},
  //         {text: 'Friend'},
  //      ]
  //   )
  // }

  _onPressLogo() {
    console.log("You tapped the LOGO!");
  }

  tranformToCoordinates(person: Person) {
    const azimuth = this.props.location.azimuth
    const distanceScale = 300
    let x = this.origin.x + (this.origin.y * Math.sin(this.radians(person.bearing - azimuth))) * (person.distance/distanceScale)
    let y = this.origin.y - (this.origin.y * Math.cos(this.radians(person.bearing - azimuth))) * (person.distance/distanceScale)
    return {x,y}
  }

  render() {
    const visualizeNearbyOrbs = this.props.persons.map((person, i) =>
    {
      const {x, y} = this.tranformToCoordinates(person)
      console.log(x)
      console.log(y)
      const transformX = this.transferValueX.interpolate({
        inputRange: [0, 1],
        outputRange: [x-1, x]
      })
      const transformY = this.transferValueY.interpolate({
        inputRange: [0, 1],
        outputRange: [y-1, y]
      })
      // person.oldX = x
      // person.oldY = y
      let size = this.orbSizeDividedByTwo*2
      return (
        <Animated.View
          key={i}
          style={{
            transform: [{translateX: transformX}, {translateY: transformY}],
            position:'absolute',
            zIndex:1,
            height:size,
            width:size,
          }}
          >
          <TouchableHighlight onPress={() => this._onPressButton(i)} key={i} style={{position:'absolute'}}>
            <Image
              source={require('./img/orb.png')}
            />
          </TouchableHighlight>
        </Animated.View>
        )
    })

    return (
      <View style={styles.container}>
        {visualizeNearbyOrbs}
        <TouchableOpacity onPress={this._onPressLogo} style={{position: 'absolute', zIndex:1}}>
          <Image
            source={require('./img/orb2.png')}
          />
        </TouchableOpacity>
        <Text style={styles.userIitial}>
          S
        </Text>
      </View>
    );
  }
}

PersonsMap.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    bearing: PropTypes.number.isRequired,
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
