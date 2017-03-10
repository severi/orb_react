/* @flow */

type Person =
{
  id: string,
  distance: number,
  bearing: number,
}
type State = Array<Person>

import {
  ATTEMPT_REFRESH_NEARBY_PERSONS,
  REFRESH_NEARBY_PERSONS_SUCCESSFUL,
  REFRESH_NEARBY_PERSONS_FAILED
} from '../actions'


const personsNearby = (state: State = [], action: Object) => {
  switch (action.type) {
    case ATTEMPT_REFRESH_NEARBY_PERSONS:
      return state
    case REFRESH_NEARBY_PERSONS_SUCCESSFUL:
      console.log(action.payload)
      return action.payload
    case REFRESH_NEARBY_PERSONS_FAILED:
      return state
    default:
      return state
  }
}

export default personsNearby
