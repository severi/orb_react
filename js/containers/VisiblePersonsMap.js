/* @flow */
type PositionObject = {
  coords: {
    longitude: number,
    latitude: number,
  }
}

import { connect } from 'react-redux'
import PersonsMap from '../components/PersonsMap'
import { refreshNearbyPersons, updateLocation, updateAzimuth, getUserInfo } from '../actions'


const mapStateToProps = (state) => {
  return {
    persons: state.personsNearby,
    authentication: state.authentication,
    location: state.location,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onViewRefresh: (token: string) => {
      dispatch(refreshNearbyPersons(token))
    },
    onLocationUpdated: (token: string, position: PositionObject) => {
      let longitude= position.coords.longitude
      let latitude= position.coords.latitude
      dispatch(updateLocation(token, longitude, latitude))
    },
    onAzimuthUpdated: (azimuth: number) => {
      dispatch(updateAzimuth(azimuth))
    },
    onGetUserInforButtonPressed: (token: string, id: number) => {
      dispatch(getUserInfo(token, id))
    },
  }
}



const VisiblePersonsMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonsMap)

export default VisiblePersonsMap
