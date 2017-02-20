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

  azimuthUpdateIntervall = 50

  persons = [
    {distance: 100, angle:10, message: 'Jorma täällä!', age: 55, gender: 'male', oldX: 0, oldY: 0},
    {distance: 15, angle:20, message: 'Irma ihan märkänä ;) Tarttis rakoon vähän täytettä..', age: 32, gender: 'female', oldX: 0, oldY: 0},
    {distance: 30, angle:190, message: 'Minttu täällä hei :)', age: 19, gender: 'female', oldX: 0, oldY: 0},
    {distance: 80, angle:350, message: 'Pussydestroyah', age: 88, gender: 'male', oldX: 0, oldY: 0},
  ]

  constructor() {
    super()
    const orbSizeDividedByTwo = 25
    const {height, width} = Dimensions.get('window')
    this.origin = {
      x: width/2 - orbSizeDividedByTwo,
      y: height/2 - orbSizeDividedByTwo,
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
        duration: 200,
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
        duration: 200,
        easing: Easing.linear
      }
    ).start()
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
    }, this.azimuthUpdateIntervall)
  }
  unwatchAzimuth(){
    navigator.geolocation.clearWatch(this.watchID)
  }


  refreshView() {
    let token = this.props.authentication.token
    this.props.onViewRefresh(token)
  }

  _onPressButton(i) {
    console.log("You tapped orb " + i + ', message: ' + this.persons[i].message)
    Alert.alert(
       'Orb ' + i + ' pressed',
       this.persons[i].gender + ', ' + this.persons[i].age + '\n\n' + 'Message: ' + this.persons[i].message,
       [
          {text: 'Block'},
          {text: 'Friend'},
       ]
    )
  }

  _onPressLogo() {
    console.log("You tapped the LOGO!");
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
      const transformX = this.transferValueX.interpolate({
        inputRange: [0, 1],
        outputRange: [person.oldX, x]
      })
      const transformY = this.transferValueY.interpolate({
        inputRange: [0, 1],
        outputRange: [person.oldY, y]
      })
      person.oldX = x
      person.oldY = y
      return (
        <Animated.Image
          style={{
            transform: [{translateX: transformX}, {translateY: transformY}],
            position:'absolute',
            zIndex:1}}
          key={i}
          source={require('./img/orb.png')}
          >
          <TouchableHighlight onPress={() => this._onPressButton(i)} key={i} style={{position:'absolute', zIndex:1}}>
            <Image
              source={require('./img/orb.png')}
            />
          </TouchableHighlight>
        </Animated.Image>
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
