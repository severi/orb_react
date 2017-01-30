/* @flow */

/*
 * action types
 */

export const ADD_PERSON = "ADD_PERSON"
export const LOGIN = "LOGIN"


/*
 * action creators
 */

let nextPersonId = 0
export const addPerson = (name : string) => {
  return {
    type: ADD_PERSON,
    id: nextPersonId++,
    name
  }
}

export const login = () => {
  return {
    type: LOGIN
  }
}
