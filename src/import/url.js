import { decode } from '../export/data'

/**
 * Parse the current query string into an object of parameters.
 *
 * @returns {object}
 */
function parseQueryString() {
  const query = window.location.search
  if (!query) return {}

  return query.substring(1).split('&')
    .map(s => s.split('='))
    .map(x => ({
      [x[0]]: x[1]
    }))
    .reduce((o, kv) => Object.assign(o, kv))
}

/**
 * Decode the data from the current query string, if present.
 *
 * @returns {{head: Array.<string>, rows: Array.<Object>}|null}
 */
export function getDataFromUrl() {
  const {b64} = parseQueryString()
  return b64 ? decode(b64) : null
}
