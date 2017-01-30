/* @flow */

import { connect } from 'react-redux'
import Orb from '../components/Orb'

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}



const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Orb)

export default App
