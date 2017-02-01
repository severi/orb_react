/* @flow */
type PositionObject = {
  coords: {
    longitude: number,
    latitude: number,
  }
}

import { connect } from 'react-redux'
import PersonsMap from '../components/PersonsMap'
import { addPerson, updateLocation, updateAzimuth } from '../actions'


const mapStateToProps = (state) => {
  return {
    persons: state.personsNearby,
    location: state.location
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
      dispatch(updateLocation(longitude, latitude))
    },
    onAzimuthUpdated: (azimuth: number) => {
      dispatch(updateAzimuth(azimuth))
    },
  }
}



const VisiblePersonsMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonsMap)

export default VisiblePersonsMap
