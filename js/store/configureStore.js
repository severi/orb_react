/* @flow */

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'

const loggerMiddleware = createLogger()

const configureStore = function(): Function
{
  return createStore(rootReducer,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    )
  )
}

export default configureStore
