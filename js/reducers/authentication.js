/* @flow */
type State = {
  loggedIn: boolean,
  token: ?string
}

import {
  ATTEMPT_LOGIN,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED
} from '../actions'


const initialState = {
  loggedIn: false,
  token: undefined,
}


const authentication = (state: State = initialState, action: Object) => {
  switch (action.type) {
    case ATTEMPT_LOGIN:
      return state
    case LOGIN_SUCCESSFUL:
      return {
        loggedIn: true,
        token: action.payload.token
      }
    case LOGIN_FAILED:
      return {
        loggedIn: false,
        token: undefined
      }
    default:
      return state
  }
}

export default authentication
