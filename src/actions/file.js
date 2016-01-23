export const CHANGE_FILE = Symbol('change file')
export const CLEAR_FILE = Symbol('clear file')
export const LOAD_FILE = Symbol('load file')
export const LOAD_ERROR = Symbol('load error')

function loadFile(file, data) {
  return {
    type: LOAD_FILE,
    file: {
      name: file.name,
      type: file.type,
      data
    }
  }
}

function loadError(e) {
  return {
    type: LOAD_ERROR,
    e
  }
}

export function clearFile() {
  return {
    type: CLEAR_FILE
  }
}

export function changeFile(file) {
  return dispatch => {
    dispatch({
      type: CHANGE_FILE,
      file: {
        name: file.name,
        type: file.type
      }
    })

    const reader = new FileReader()
    reader.onload = e => (
      dispatch(loadFile(file, e.target.result))
    )
    reader.onerror = e => (
      dispatch(loadError(e))
    )
    reader.readAsText(file)
  }
}
