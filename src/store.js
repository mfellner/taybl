import thunk from 'redux-thunk'
import createStorageEngine from 'redux-storage/engines/localStorage'
import { createMiddleware as createStorageMiddleware } from 'redux-storage'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'
import { getDataFromUrl } from './import/url'

const storageKey = 'taybl'
const engine = createStorageEngine(storageKey)

const createStoreWithMiddleware = applyMiddleware(
  thunk, createStorageMiddleware(engine)
)(createStore)

export function configure(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}

export function getInitialState() {
  const json = localStorage.getItem(storageKey)
  const state = JSON.parse(json) || undefined
  const data = getDataFromUrl()
  return data ? Object.assign({}, state, {data}) : state
}
