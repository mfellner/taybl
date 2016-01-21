import { TOGGLE_SIDEBAR } from '../actions/sidebar'

export default function sidebar(state = {expanded: true}, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        expanded: !state.expanded
      })
    default:
      return state
  }
}
