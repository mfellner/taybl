export const TOGGLE_SIDEBAR = Symbol('toggle sidebar')
export const SELECT_NAV = Symbol('select nav')

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR
  }
}

export function selectNav(activeNav) {
  return {
    type: SELECT_NAV,
    activeNav
  }
}
