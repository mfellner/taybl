import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

export function configure(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
