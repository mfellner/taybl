import Papa from 'papaparse'
import { expandToData } from '../export/data'

/**
 * Parse JSON data.
 *
 * @param {string} data
 * @returns {{head: Array.<string>, rows: Array.<object>}}
 */
function parseJSON(data) {
  let head, rows, obj = JSON.parse(data)

  if (Array.isArray(obj)) {
    // Assume an array of such structure
    // [{ id: 'ID', key: 'value' }]
    rows = obj
  } else {
    // Assume an object of such structure
    // {ID: { key: 'value' }}
    // and flatten it into such rows
    // [{ id: 'ID', key: 'value' }]
    rows = Object.keys(obj).map(k => ({
      id: k, ...obj[k]
    }))
  }

  // Accumulate all row-keys into a list of column names.
  head = Array.from(rows.reduce((set, row) => (
    Object.keys(row).reduce((set, k) => set.add(k), set)
  ), new Set()))

  return {head, rows}
}

/**
 * Parse CSV data.
 *
 * @param {string} csv
 * @returns {{head: Array.<string>, rows: Array.<object>}}
 */
function parseCSV(csv) {
  const {data, errors} = Papa.parse(csv)

  if (errors.length > 0) {
    console.error(errors)
    // TODO: when not called directly in the reducer, return null instead.
    return {head: [], rows: []}
  }
  return expandToData(data)
}

/**
 * Parse a JSON or CSV file and return a table head and rows.
 *
 * @param {{type: string, data: string}} file
 * @returns {{head: Array.<string>, rows: Array.<Object>}}
 */
export function parseFile(file) {
  switch (file.type) {
    case 'application/json':
      return parseJSON(file.data)
    case 'text/csv':
      return parseCSV(file.data)
      break
    default:
      console.error('unsupported file type %s', file.type)
      return {head: [], rows: []}
      break
  }
}
