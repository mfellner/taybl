import { combineReducers } from 'redux'
import data from './data'
import sidebar from './sidebar'

const rootReducer = combineReducers({
  data, sidebar
})

export default rootReducer
