/* @flow */

type Person =
{
  id: string,
  distance: number,
  bearing: number,
  // user_info: Object // TODO
}
type State = Array<Person>

import {
  ATTEMPT_REFRESH_NEARBY_PERSONS,
  REFRESH_NEARBY_PERSONS_SUCCESSFUL,
  REFRESH_NEARBY_PERSONS_FAILED,
  ATTEMPT_GET_USER_INFO,
  GET_USER_INFO_SUCCESSFUL,
  GET_USER_INFO_FAILED,
} from '../actions'


const personsNearby = (state: State = [], action: Object) => {
  switch (action.type) {
    case ATTEMPT_REFRESH_NEARBY_PERSONS:
      return state
    case REFRESH_NEARBY_PERSONS_SUCCESSFUL:
      console.log(action.payload)
      // As stated below. In this case the payload should not directly replace the state, but merge updates to it
      // i.e. keep the user_information
      return action.payload
    case REFRESH_NEARBY_PERSONS_FAILED:
      return state
//
    case ATTEMPT_GET_USER_INFO:
      return state
    case GET_USER_INFO_SUCCESSFUL:
      console.log("SEVERI")
      console.log(action.payload)
      // TODO, this should be probably part of the Person model,
      // and if the info is fetched it should lazily loaded to the model
      // and only fetched again if some TTL value has passed i.e. it should be cached
      return state
    case GET_USER_INFO_FAILED:
      return state
//
    default:
      return state
  }
}

export default personsNearby
