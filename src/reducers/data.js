import { UPDATE_FILTER } from '../actions/data'
import { LOAD_FILE, CLEAR_FILE } from '../actions/file'

function filters(state = {}, action) {
  switch (action.type) {
    default:
      return Object.assign({}, state, {
        [action.key]: action.value
      })
  }
}

function parseFile(file) {
  function transform(obj) {
    const objs = Object.keys(obj).map(k => ({
      id: k, ...obj[k]
    }))
    const head = Object.keys(objs[0])
    const rows = objs
    return {head, rows}
    //return [head].concat(rows)
  }

  return transform(JSON.parse(file.data))
}

export default function data(state = {filters: {}, head: [], rows: []}, action) {
  switch (action.type) {
    case UPDATE_FILTER:
      return Object.assign({}, state, {
        filters: filters(state.filters, action)
      })
    case LOAD_FILE:
      const {head, rows} = parseFile(action.file)
      return Object.assign({}, state, {
        head,
        rows
      })
    case CLEAR_FILE:
      return Object.assign({}, state, {
        head: [],
        rows: []
      })
    default:
      return state
  }
}
