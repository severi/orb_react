/* @flow */

import axios from "axios"

export const ADD_PERSON = "ADD_PERSON"

let nextPersonId = 0
export const addPerson = (name : string) => {
  return {
    type: ADD_PERSON,
    id: nextPersonId++,
    name
  }
}


export const ATTEMPT_LOGIN = "ATTEMPT_LOGIN"
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL"
export const LOGIN_FAILED = "LOGIN_FAILED"

export const login = (username: string, password: string) => {
  return (dispatch: Function) =>{
    dispatch({type: ATTEMPT_LOGIN})
    axios.get("https://www.google.com")
    .then(response => {
      dispatch({type: LOGIN_SUCCESSFUL})
    })
    .catch(response => {
      dispatch({type: LOGIN_FAILED})
    })

  }
}


export const LOCATION_UPDATED = "LOCATION_UPDATED"
export const updateLocation = (longitude: number, latitude : number) => {
  return {
    type: LOCATION_UPDATED,
    longitude,
    latitude,
  }
}

export const AZIMUTH_UPDATED = "AZIMUTH_UPDATED"
export const updateAzimuth = (azimuth: number) => {
  return {
    type: AZIMUTH_UPDATED,
    azimuth
  }
}

