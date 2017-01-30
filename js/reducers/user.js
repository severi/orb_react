/* @flow */
type State = {
  location: {
    longitude: ?number,
    latitude: ?number,
    heading: ?number,
  }
}

import {LOCATION_UPDATED} from '../actions'


const initialState = {
  location: {
    longitude: undefined,
    latitude: undefined,
    heading: undefined,
  }
}


const user = (state: State = initialState, action: Object) => {
  switch (action.type) {
    case LOCATION_UPDATED:
      return Object.assign({}, state, {
        location: {
          longitude: action.longitude,
          latitude: action.latitude,
          heading: action.latitude,
        }
      })
    default:
      return state
  }
}

export default user
