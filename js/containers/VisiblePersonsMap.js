/* @flow */
type PositionObject = {
  coords: {
    longitude: number,
    latitude: number,
    heading: number,
  }
};

type AzimuthObject = {
  newAzimuth: number
};

import { connect } from 'react-redux'
import PersonsMap from '../components/PersonsMap'
import { addPerson, updateLocation, updateAzimuth } from '../actions'


const mapStateToProps = (state) => {
  return {
    persons: state.personsNearby,
    user: state.user,
    azimuth: state.azimuth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: () => {
      let name = "Sakke"
      dispatch(addPerson(name))
    },
    onLocationUpdated: (position: PositionObject) => {
      let longitude= position.coords.longitude
      let latitude= position.coords.latitude
      let heading= position.coords.heading
      dispatch(updateLocation(longitude, latitude, heading))
    },
    onAzimuthUpdated: (azimuth: AzimuthObject) => {
      let a= azimuth.newAzimuth
      dispatch(updateAzimuth(a))
    },
  }
}



const VisiblePersonsMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonsMap)

export default VisiblePersonsMap
