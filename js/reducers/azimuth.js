/* @flow */
type State = {
  azimuth: ?number
}

import {AZIMUTH_UPDATED} from '../actions'


const initialState = {
  azimuth: undefined,
}


const azimuth = (state: State = initialState, action: Object) => {
  switch (action.type) {
    case AZIMUTH_UPDATED:
      return Object.assign({}, state, {
        azimuth: action.azimuth,
      })
    default:
      return state
  }
}

export default azimuth