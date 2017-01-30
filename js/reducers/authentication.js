/* @flow */
type State = {
  loggedIn: boolean
}

type Action = {
  type: string
}

import {
  ATTEMPT_LOGIN,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED
} from '../actions'


const initialState = {
  loggedIn: false
}


const authentication = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ATTEMPT_LOGIN:
      console.log("ATTEMPT_LOGIN")
      return state
    case LOGIN_SUCCESSFUL:
      console.log("LOGIN_SUCCESSFUL")
      return {
        loggedIn: true
      }
    case LOGIN_FAILED:
      console.log("LOGIN_FAILED")
      return {
        loggedIn: false
      }
    default:
      return state
  }
}

export default authentication
