import pako from 'pako'
import Papa from 'papaparse'

const separatorA = '\u0000'
const separatorB = '\u0001'

/**
 * Flatten data into an array of value rows.
 *
 * @param {Array<string>} head Column names
 * @param {Array<object>} rows Table rows
 * @returns {Array.<Array<string|null>>}
 */
function flattenData(head, rows) {
  return [head].concat(rows.map(r => head.map(key => r[key] || null)))
}

/**
 * Expand a data array into table head and rows.
 *
 * @param {Array.<Array<string|null>>} xs Flattened data array
 * @returns {{head: Array<string>, rows: Array<object>}}
 */
export function expandToData(xs) {
  const head = xs.shift()
  const rows = xs.map(row => head.map((key, i) => ({
    [key]: row[i]
  })).reduce((o, kv) => Object.assign(o, kv)))
  return {head, rows}
}

/**
 * Concatenate the values of a data array into a string.
 *
 * @param {Array.<Array<string|null>>} xs Flattened data array
 * @returns {string}
 */
function flattenArray(xs) {
  return xs.map(ys => ys.join(separatorA)).join(separatorB)
}

/**
 * Split a string into a flattened data array.
 *
 * @param {string} s Concatenated string
 * @returns {Array.<Array<string|null>>}
 */
function expandToArray(s) {
  return s.split(separatorB).map(s => s.split(separatorA))
}

/**
 * @param {string} s
 * @returns {string} binary string
 */
function deflate(s) {
  return pako.deflate(s, {to: 'string'})
}

/**
 * @param {string} s binary string
 * @returns {string}
 */
function inflate(s) {
  return pako.inflate(s, {to: 'string'})
}

/**
 * @param {string} s
 * @returns {string}
 */
function base64UrlEncode(s) {
  return new Buffer(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
}

/**
 * @param {string} s
 * @returns {string}
 */
function base64UrlDecode(s) {
  return new Buffer(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
}

/**
 * Encode data into a compressed Base64 string.
 *
 * @param {Array<string>} head
 * @param {Array<object>} rows
 * @returns {string}
 */
function encode(head, rows) {
  return base64UrlEncode(deflate(flattenArray(flattenData(head, rows))))
}

/**
 * Decode a compressed and encoded string into table head and rows.
 *
 * @param {string} s Base64 encoded, deflated string
 * @returns {{head: Array.<string>, rows: Array.<Object>}}
 */
export function decode(s) {
  return expandToData(expandToArray(inflate(base64UrlDecode(s))))
}

/**
 * Create a shareable URL for the given data and current domain.
 *
 * @param {Array<string>} head Column names
 * @param {Array<object>} rows Table rows
 * @returns {string}
 */
function exportUrl(head, rows) {
  const s = encode(head, rows)
  return `${window.location.href.slice(0, -1)}?b64=${s}`
}

/**
 * @param rows {Array<object>} rows Table rows
 * @returns {string}
 */
export function exportCSV(rows) {
  return Papa.unparse(rows, {quotes: true})
}

/**
 * @param {string} format Export format
 * @param {Array<string>} head Column names
 * @param {Array<object>} rows Table rows
 * @returns {*}
 */
export function exportData(format, head, rows) {
  switch (format) {
    case 'url':
      return exportUrl(head, rows)
    case 'json':
      console.error('json not yet implemented')
      break
    case 'csv':
      return exportCSV(rows)
      break
    default:
      console.error('unsupported data format')
      break
  }
}
