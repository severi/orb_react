/* @flow */

import axios from "axios"

export const ATTEMPT_REFRESH_NEARBY_PERSONS = "ATTEMPT_REFRESH_NEARBY_PERSONS"
export const REFRESH_NEARBY_PERSONS_SUCCESSFUL = "REFRESH_NEARBY_PERSONS_SUCCESSFUL"
export const REFRESH_NEARBY_PERSONS_FAILED = "REFRESH_NEARBY_PERSONS_FAILED"



const getConfig = (token: ?string) => {
  let config = {
      baseURL: 'http://10.0.0.4:8080',
      headers: {}
    }
  if (token) {
    config.headers = {
      'Authorization': 'Bearer '+token
    }
  }
  return config
}

export const refreshNearbyPersons = (token: string) => {
  return (dispatch: Function) =>{
    dispatch({type: ATTEMPT_REFRESH_NEARBY_PERSONS})

    axios.get("/api/users", getConfig(token))
    .then(response => {
      dispatch({type: REFRESH_NEARBY_PERSONS_SUCCESSFUL,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({type: REFRESH_NEARBY_PERSONS_FAILED,
        error
      })
    })

  }
}


export const ATTEMPT_LOGIN = "ATTEMPT_LOGIN"
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL"
export const LOGIN_FAILED = "LOGIN_FAILED"

export const login = (username: string, password: string) => {
  return (dispatch: Function) =>{
    dispatch({type: ATTEMPT_LOGIN})

    let data = {
      name: username,
      password: password
    }
    axios.post("/auth", data, getConfig())

    .then(response => {
      dispatch({type: LOGIN_SUCCESSFUL,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({type: LOGIN_FAILED,
        error
      })
    })

  }
}


export const LOCATION_UPDATED = "LOCATION_UPDATED"
export const updateLocation = (longitude: number, latitude : number, heading: number) => {
  return {
    type: LOCATION_UPDATED,
    longitude,
    latitude,
    heading,
  }
}

