/* @flow */
type State = {
  loggedIn: boolean
}

type Action = {
  type: string
}

import { LOGIN } from '../actions'


const initialState = {
  loggedIn: false
}


const authentication = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN:
      return {
        loggedIn: true
      }
    default:
      return state
  }
}

export default authentication
