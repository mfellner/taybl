import React, { Component, PropTypes } from 'react'
import { Input } from 'react-bootstrap'

export default class FileLoader extends Component {
  static propTypes = {
    changeFile: PropTypes.func.isRequired
  };

  onChangeFile(e) {
    e.preventDefault()
    this.props.changeFile(e.target.files[0])
  }

  render() {
    return (
      <form>
        <Input type="file" accept=".csv,.json" label="Import CSV or JSON"
               onChange={this.onChangeFile.bind(this)}/>
      </form>
    )
  }
}
