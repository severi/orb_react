import { connect } from 'react-redux'
import PersonsMap from '../components/PersonsMap'
import { addPerson } from '../actions'

const mapStateToProps = (state) => {
  return {
    persons: state.personsNearby
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: () => {
      let name = "Sakke"
      dispatch(addPerson(name))
    }
  }
}



const VisiblePersonsMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonsMap)

export default VisiblePersonsMap
