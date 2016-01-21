export const TOGGLE_SIDEBAR = Symbol('toggle sidebar')

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR
  }
}
