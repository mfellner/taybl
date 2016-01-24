function exportUrl(head, rows) {
  return 'not yet implemented'
}

export function exportData(format, head, rows) {
  switch (format) {
    case 'url':
      return exportUrl(head, rows)
    case 'json':
      console.error('json not yet implemented')
      break
    case 'csv':
      console.error('csv not yet implemented')
      break
    default:
      console.error('unsupported data format')
      break
  }
}
