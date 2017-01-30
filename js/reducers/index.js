/* @flow */

import { combineReducers } from 'redux'
import personsNearby from './personsNearby'
import authentication from './authentication'
import user from './user'

const rootReducer = combineReducers({
  personsNearby,
  authentication,
  user
})

export default rootReducer
