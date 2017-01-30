/* @flow */

import React, { Component } from 'react';
import {
  View
} from 'react-native';

import VisiblePersonsMap from '../containers/VisiblePersonsMap'
import UnauthenticatedPage from '../containers/UnauthenticatedPage'

export default class Orb extends Component {
  render() {
    if (this.props.authentication.loggedIn == false) {
      return (
        < UnauthenticatedPage / >
      );
    } else {
      return (
        < VisiblePersonsMap / >
      );
    }
  }
}
