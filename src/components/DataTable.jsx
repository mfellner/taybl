import React, { Component, PropTypes } from 'react'
import { Table, Input, Tooltip, OverlayTrigger } from 'react-bootstrap'

export default class DataTable extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    head: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    updateFilter: PropTypes.func.isRequired
  };

  static defaultProps = {
    filters: {},
    head: [],
    rows: []
  };

  onUpdateFilter(e) {
    e.preventDefault()
    const {id, value} = e.target
    this.props.updateFilter(id, value)
  }

  tooltip(text) {
    return (
      <Tooltip id={text}>{text}</Tooltip>
    )
  }

  render() {
    const {filters, head, rows} = this.props
    return (
      <Table className="data-table" responsive hover>
        <thead>
        <tr>
          {head.map((k, i) => (
            <th key={i}>
              <OverlayTrigger placement="top" overlay={this.tooltip(k)}>
                <Input type="text" bsSize="small"
                       onChange={this.onUpdateFilter.bind(this)}
                       id={k} value={filters[k]}
                       placeholder={k}/>
              </OverlayTrigger>
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {rows.filter(row => Object.keys(filters).map(k => {
            const filter = filters[k] || ''
            const regexp = new RegExp(filter, 'i')
            return typeof row[k] === 'string'
              && row[k].match(regexp) !== null
          }).reduce((previous, current) => (
            previous ? current : false
          ), true)
        ).map((row, i) => (
          <tr key={i}>
            {Object.keys(row).map((k, i) => (
              <td key={i}>{row[k]}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </Table>
    )
  }
}
