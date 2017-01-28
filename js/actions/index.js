/*
 * action types
 */

export const ADD_PERSON = 'ADD_PERSON'

/*
 * action creators
 */

let nextPersonId = 0
export const addPerson = (name) => {
  return {
    type: 'ADD_PERSON',
    id: nextPersonId++,
    name
  }
}
