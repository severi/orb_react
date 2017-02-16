/* @flow */
type State = {
    longitude: ?number,
    latitude: ?number,
    azimuth: ?number,
}

import {LOCATION_UPDATED, AZIMUTH_UPDATED} from '../actions'


const initialState = {
  longitude: undefined,
  latitude: undefined,
  azimuth: 0
}


const location = (state: State = initialState, action: Object) => {
  switch (action.type) {
    case LOCATION_UPDATED:
      return Object.assign({}, state,
      {
        longitude: action.longitude,
        latitude: action.latitude,
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



