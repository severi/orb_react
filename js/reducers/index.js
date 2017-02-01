/* @flow */

import { combineReducers } from 'redux'
import personsNearby from './personsNearby'
import authentication from './authentication'
import location from './location'

const rootReducer = combineReducers({
  personsNearby,
  authentication,
  location
})

export default rootReducer
