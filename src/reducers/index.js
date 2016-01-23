import { combineReducers } from 'redux'
import { reducer as storage } from 'redux-storage'

import data from './data'
import file from './file'
import sidebar from './sidebar'

const rootReducer = combineReducers({
  data, file, sidebar, storage
})

export default rootReducer
