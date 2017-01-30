/* @flow */

import { combineReducers } from 'redux'
import personsNearby from './personsNearby'
import authentication from './authentication'

const rootReducer = combineReducers({
  personsNearby,
  authentication
})

export default rootReducer
