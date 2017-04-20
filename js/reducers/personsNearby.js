/* @flow */

type Person =
{
  id: string,
  distance: number,
  bearing: number,
  oldDistance: number,
  oldBearing: number,
  user_info: ?Object,
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


function embedExistingInfo(person, existingPersons){
  person.oldDistance = person.distance
  person.oldBearing = person.bearing
  person.user_info = null

  for (var i = 0; i < existingPersons.length; i++) {
    let existingPerson = existingPersons[i]
    if (existingPerson.id == person.id){
      person.oldDistance = existingPerson.distance
      person.oldBearing = existingPerson.bearing
    }
  }
}

// TODO: implement persons as a dictionary instead of array
function updatePersons(updated, current){
  for (var i = 0; i < updated.length; i++) {
    embedExistingInfo(updated[i], current)
  }
  return updated
}

const personsNearby = (state: State = [], action: Object) => {
  switch (action.type) {
    case ATTEMPT_REFRESH_NEARBY_PERSONS:
      return state
    case REFRESH_NEARBY_PERSONS_SUCCESSFUL:
      return updatePersons(action.payload, state)
    case REFRESH_NEARBY_PERSONS_FAILED:
      return state
    default:
      return state
  }
}

export default personsNearby
