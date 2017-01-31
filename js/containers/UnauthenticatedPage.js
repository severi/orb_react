/* @flow */

import { connect } from 'react-redux'
import AuthenticationView from '../components/AuthenticationView'
import { login } from '../actions'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(login(username, password))
    }
  }
}



const UnauthenticatedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationView)

export default UnauthenticatedPage
