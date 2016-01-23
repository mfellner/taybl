import thunk from 'redux-thunk'
import createStorageEngine from 'redux-storage/engines/localStorage'
import { createMiddleware as createStorageMiddleware } from 'redux-storage'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'

const storageKey = 'gistbase'
const engine = createStorageEngine(storageKey)

const createStoreWithMiddleware = applyMiddleware(
  thunk, createStorageMiddleware(engine)
)(createStore)

export function configure(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}

export function getInitialState() {
  return JSON.parse(localStorage.getItem(storageKey))
}
