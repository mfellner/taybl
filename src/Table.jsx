import React, { Component, PropTypes } from 'react'
import { Table } from 'react-bootstrap'

export default class MyTable extends Component {
  static propTypes = {
    heads: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {filters: {}}
  }

  onFilterUpdate(evt) {
    const {id, value} = evt.target
    this.setState(state => {
      const {filters} = state
      filters[id] = value
      return {filters: filters}
    })
  }

  render() {
    const {heads, rows} = this.props
    const {filters} = this.state

    return (
      <Table responsive>
        <thead>
        <tr>
          {heads.map((k, i) => (
            <td key={i}>
              <div className="input-group">
                <span className="input-group-addon">{k}</span>
                <input type="text" className="form-control"
                       id={k}
                       onChange={this.onFilterUpdate.bind(this)}
                       value={filters[k]}
                       placeholder={k}/>
              </div>
            </td>
          ))}
        </tr>
        </thead>
        <tbody>
        {rows.filter(row => Object.keys(row).map(k => {
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
