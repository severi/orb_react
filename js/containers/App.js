/* @flow */

import { connect } from 'react-redux'
import MainPage from '../components/MainPage'

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
)(MainPage)

export default App
