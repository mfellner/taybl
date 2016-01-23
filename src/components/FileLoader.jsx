import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { Input, Button } from 'react-bootstrap'

export default class FileLoader extends Component {
  static propTypes = {
    currentFile: PropTypes.object.isRequired,
    changeFile: PropTypes.func.isRequired,
    clearFile: PropTypes.func.isRequired
  };

  onChangeFile(e) {
    e.preventDefault()
    this.props.changeFile(e.target.files[0])
  }

  onClearFile() {
    this.props.clearFile()
    ReactDOM.findDOMNode(this.refs.clearBtn).blur()
  }

  render() {
    const {name} = this.props.currentFile
    const label = name || 'Choose a file'
    const btnState = name ? 'success' : 'default'
    return (
      <form className="form-inline">
        <input id="file" type="file" accept=".csv,.json" max="1"
               className="file-loader" onChange={this.onChangeFile.bind(this)}/>
        <label className={`btn btn-${btnState}`} htmlFor="file">
          {label}&nbsp;
          <span className="glyphicon glyphicon-file"/>
        </label>
        <span className="pull-right">
          <Button ref="clearBtn" bsStyle="danger" onClick={this.onClearFile.bind(this)}>
            <span className="glyphicon glyphicon-trash"/>
          </Button>
        </span>
      </form>
    )
  }
}
