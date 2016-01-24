import { combineReducers } from 'redux'
import { reducer as storage } from 'redux-storage'

import data from './data'
import file from './file'
import fileExport from './export'
import sidebar from './sidebar'

const rootReducer = combineReducers({
  data, file, export: fileExport, sidebar, storage
})

export default rootReducer
