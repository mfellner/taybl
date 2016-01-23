import React, { Component, PropTypes } from 'react'
import { Table } from 'react-bootstrap'

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

  render() {
    const {filters, head, rows} = this.props
    return (
      <Table responsive>
        <thead>
        <tr>
          {head.map((k, i) => (
            <td key={i}>
              <div className="input-group">
                <span className="input-group-addon">{k}</span>
                <input type="text" className="form-control"
                       onChange={this.onUpdateFilter.bind(this)}
                       id={k} value={filters[k]}
                       placeholder="filter…"/>
              </div>
            </td>
          ))}
        </tr>
        </thead>
        <tbody>
        {rows.filter(row => Object.keys(filters).map(k => {
            const filter = filters[k] || ''
            const regexp = new RegExp(filter, 'i')
            return row[k].match(regexp) !== null
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
