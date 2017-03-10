/* @flow */
type State = {
    longitude: ?number,
    latitude: ?number,
    azimuth: ?number,
}

import {ATTEMPT_UPDATE_LOCATION,
        UPDATE_LOCATION_SUCCESSFUL,
        UPDATE_LOCATION_FAILED,
        AZIMUTH_UPDATED} from '../actions'


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
    case AZIMUTH_UPDATED:
      return Object.assign({}, state,
      {
        azimuth: action.azimuth,
      })
    default:
      return state
  }
}

export default location



