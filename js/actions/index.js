/* @flow */

import axios from "axios"

export const ATTEMPT_REFRESH_NEARBY_PERSONS = "ATTEMPT_REFRESH_NEARBY_PERSONS"
export const REFRESH_NEARBY_PERSONS_SUCCESSFUL = "REFRESH_NEARBY_PERSONS_SUCCESSFUL"
export const REFRESH_NEARBY_PERSONS_FAILED = "REFRESH_NEARBY_PERSONS_FAILED"

const getConfig = (token: ?string) => {
  let config = {
      baseURL: 'http://10.0.0.191:8080',
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

    axios.get("/user/location/nearby", getConfig(token))
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


export const ATTEMPT_GET_USER_INFO = "ATTEMPT_GET_USER_INFO"
export const GET_USER_INFO_SUCCESSFUL = "GET_USER_INFO_SUCCESSFUL"
export const GET_USER_INFO_FAILED = "GET_USER_INFO_FAILED"

export const getUserInfo = (token: string, id: number) => {
  return (dispatch: Function) =>{
    dispatch({type: ATTEMPT_GET_USER_INFO})


    let config = {
      params: {
//        id : id // TODO: get this working instead of hardcoding below
        _id: "58e48d3c249764002b1e3f49"
      },
      ...getConfig(token)
    }

    console.log(config)
    axios.get('/user/user_information/', config)
    .then(function (response) {
      dispatch({type: GET_USER_INFO_SUCCESSFUL,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({type: GET_USER_INFO_FAILED,
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
      email: username,
      password: password
    }
    axios.post("/user/login", data, getConfig())

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


export const ATTEMPT_UPDATE_LOCATION = "ATTEMPT_UPDATE_LOCATION"
export const UPDATE_LOCATION_SUCCESSFUL = "UPDATE_LOCATION_SUCCESSFUL"
export const UPDATE_LOCATION_FAILED = "UPDATE_LOCATION_FAILED"
export const updateLocation = (token: string, longitude: number, latitude : number) => {
  return (dispatch: Function) =>{
    dispatch({type: ATTEMPT_UPDATE_LOCATION, location: {longitude, latitude}})
    let data = {
      longitude: longitude,
      latitude: latitude
    }
    axios.post("/user/location/", data, getConfig(token))

    .then(response => {
      dispatch({type: UPDATE_LOCATION_SUCCESSFUL})
    })
    .catch(error => {
      dispatch({type: UPDATE_LOCATION_FAILED,
        error
      })
    })

  }

}

export const AZIMUTH_UPDATED = "AZIMUTH_UPDATED"
export const updateAzimuth = (azimuth: number) => {
  return {
    type: AZIMUTH_UPDATED,
    azimuth
  }
}

