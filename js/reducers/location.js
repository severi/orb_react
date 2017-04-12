/* @flow */
type State = {
    longitude: ?number,
    latitude: ?number,
}

import {ATTEMPT_UPDATE_LOCATION,
        UPDATE_LOCATION_SUCCESSFUL,
        UPDATE_LOCATION_FAILED} from '../actions'


const initialState = {
  longitude: undefined,
  latitude: undefined,
  azimuth: 0
}


const location = (state: State = initialState, action: Object) => {
  switch (action.type) {
    case ATTEMPT_UPDATE_LOCATION:
      return Object.assign({}, state,
      {
        longitude: action.location.longitude,
        latitude: action.location.latitude,
      })
    default:
      return state
  }
}

export default location



