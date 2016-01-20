import { UPDATE_FILTER } from '../actions/data'

function filters(state = {}, action) {
  switch (action.type) {
    default:
      return Object.assign({}, state, {
        [action.key]: action.value
      })
  }
}

export default function data(state = {filters: {}, heads: [], rows: []}, action) {
  switch (action.type) {
    case UPDATE_FILTER:
      return Object.assign({}, state, {
        filters: filters(state.filters, action)
      })
    default:
      return state
  }
}
