import { TOGGLE_SIDEBAR, SELECT_NAV } from '../actions/sidebar'

export default function sidebar(state = {expanded: true}, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        expanded: !state.expanded
      })
    case SELECT_NAV:
      return Object.assign({}, state, {
        activeNav: action.activeNav
      })
    default:
      return state
  }
}
