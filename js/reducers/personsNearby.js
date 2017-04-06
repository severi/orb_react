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
      if (existingPerson.user_info != null)
        person.user_info = {...existingPerson.user_info}
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
      console.log(action.payload)
      // As stated below. In this case the payload should not directly replace the state, but merge updates to it
      // i.e. keep the user_information
      let newState = updatePersons(action.payload, state)
      return newState
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
