import { exportData } from '../export/data'

export const CHANGE_EXPORT = Symbol('change export')
export const CLEAR_EXPORT = Symbol('clear export')
export const START_EXPORT = Symbol('start export')
export const COMPLETE_EXPORT = Symbol('complete export')

export function changeExport(format) {
  return {
    type: CHANGE_EXPORT,
    format
  }
}

export function clearExport() {
  return {
    type: CLEAR_EXPORT
  }
}

export function startExport(format) {
  return (dispatch, getState) => {
    dispatch({
      type: START_EXPORT,
      format
    })

    const {head, rows} = getState().data
    const result = exportData(format, head, rows)

    dispatch(completeExport(result))
  }
}

function completeExport(result) {
  return {
    type: COMPLETE_EXPORT,
    result
  }
}
