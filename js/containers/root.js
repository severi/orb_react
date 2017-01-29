/* @flow */

import React from "react";
import { Provider } from "react-redux";
import rootReducer from '../reducers'
import { createStore } from 'redux'
import Orb from "../components/Orb";

let store = createStore(rootReducer)

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Orb />
      </Provider>
    );
  }
}

export default Root;
