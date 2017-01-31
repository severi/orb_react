/* @flow */
type PositionObject = {
  coords: {
    longitude: number,
    latitude: number,
    heading: number,
  }
}

import { connect } from 'react-redux'
import PersonsMap from '../components/PersonsMap'
import { refreshNearbyPersons, updateLocation } from '../actions'

const mapStateToProps = (state) => {
  return {
    persons: state.personsNearby,
    user: state.user,
    authentication: state.authentication
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onViewRefresh: (token: string) => {
      dispatch(refreshNearbyPersons(token))
    },
    onLocationUpdated: (position: PositionObject) => {
      let longitude= position.coords.longitude
      let latitude= position.coords.latitude
      let heading= position.coords.heading
      dispatch(updateLocation(longitude, latitude, heading))
    },
  }
}



const VisiblePersonsMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonsMap)

export default VisiblePersonsMap
