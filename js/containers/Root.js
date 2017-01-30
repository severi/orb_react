/* @flow */

import React from "react";
import { Provider } from "react-redux";
import rootReducer from '../reducers'
import { createStore } from 'redux'
import App from "../containers/App";

let store = createStore(rootReducer)

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
