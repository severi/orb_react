import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Button
} from 'react-native';


export default class PersonsMap extends Component {
  constructor(props){
    super()
    console.log("moi")
    console.log(props)
    this.props = props;
  }

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
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
