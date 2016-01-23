import { CHANGE_FILE, CLEAR_FILE, LOAD_ERROR } from '../actions/file'

export default function file(state = {name: null, type: null, error: false}, action) {
  switch (action.type) {
    case CHANGE_FILE:
      return Object.assign({}, state, {
        name: action.file.name,
        type: action.file.type,
        error: false
      })
    case CLEAR_FILE:
      return Object.assign({}, state, {
        name: null,
        type: null,
        error: false
      })
    case LOAD_ERROR:
      return Object.assign({}, state, {
        name: null,
        type: null,
        error: true
      })
    default:
      return state
  }
}
