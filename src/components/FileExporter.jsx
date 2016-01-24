import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Row, Col, Input, Button } from 'react-bootstrap'

export default class FileExporter extends Component {
  static propTypes = {
    format: PropTypes.string.isRequired,
    result: PropTypes.string,
    changeExport: PropTypes.func.isRequired,
    clearExport: PropTypes.func.isRequired,
    startExport: PropTypes.func.isRequired
  };

  onFormChange(e) {
    this.props.changeExport(e.target.value)
  }

  onStartExport() {
    this.props.startExport(this.props.format)
    findDOMNode(this.refs.exportBtn).blur()
  }

  onClearExport() {
    this.props.clearExport()
    findDOMNode(this.refs.clearUrlBtn).blur()
  }

  renderRadioBtn(format, label) {
    return (<Input type="radio" name="export"
                   label={label || ` .${format}`} value={format}
                   checked={this.props.format === format} readOnly/>)
  }

  render() {
    const {format, result} = this.props
    const hSpacer = (<span className="hidden-xs" style={{padding: '0 5px'}}/>)
    const vSpacer = (<div className="hidden-sm hidden-md" style={{padding: '5px 0'}}/>)

    const clearUrlBtn =
      (<Button ref="clearUrlBtn" disabled={!result}
               onClick={this.onClearExport.bind(this)}>
        <span className="glyphicon glyphicon-remove"/>
      </Button>)

    return (
      <Row>
        <Col xs={3} sm={3} lg={12}>
          <form className="form-inline" onChange={this.onFormChange.bind(this)}>
            {this.renderRadioBtn('csv')}
            {hSpacer}
            {this.renderRadioBtn('json')}
            {hSpacer}
            {this.renderRadioBtn('url', ' url')}
          </form>
        </Col>
        <Col xs={9} sm={9} lg={12}>
          <Row>
            <Col xs={12} sm={3} lg={12}>
              {vSpacer}
              <Button ref="exportBtn" className="btn-block"
                      disabled={!!result}
                      onClick={this.onStartExport.bind(this)}>
                {`export to ${format}`}
              </Button>
              {vSpacer}
            </Col>
            <Col xs={12} sm={9} lg={12}>
              {(() => (
                format === 'url'
                  ? (<Input type="text" standalone readOnly
                            disabled={!result} value={result}
                            buttonBefore={clearUrlBtn}/>)
                  : ('not yet implemented')
              ))()}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
