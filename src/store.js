import { createStore } from 'redux'

import rootReducer from './reducers'

export function configure(initialState) {
  return createStore(rootReducer, initialState)
}
