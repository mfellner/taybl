import { CHANGE_EXPORT, CLEAR_EXPORT, COMPLETE_EXPORT } from '../actions/export'

export default function file(state = {format: 'csv', result: null}, action) {
  switch (action.type) {
    case CHANGE_EXPORT:
      return Object.assign({}, state, {
        format: action.format,
        result: null
      })
    case CLEAR_EXPORT:
      return Object.assign({}, state, {
        result: null
      })
    case COMPLETE_EXPORT:
      return Object.assign({}, state, {
        result: action.result
      })
    default:
      return state
  }
}
