/* @flow */

import { connect } from 'react-redux'
import AuthenticationView from '../components/AuthenticationView'
import { login } from '../actions'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginButtonClick: () => {
      dispatch(login())
    }
  }
}



const UnauthenticatedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationView)

export default UnauthenticatedPage
