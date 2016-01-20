export const UPDATE_FILTER = Symbol('update filter')

export function updateFilter(key, value) {
  return {
    type: UPDATE_FILTER,
    key,
    value
  }
}
