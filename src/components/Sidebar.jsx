import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { Row, Col, Collapse, Button, Nav, NavItem } from 'react-bootstrap'

import FileLoader from './FileLoader.jsx'
import FileExporter from './FileExporter.jsx'

export default class Sidebar extends Component {
  static propTypes = {
    expanded: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    dataIsLoaded: PropTypes.bool.isRequired,
    activeNav: PropTypes.string.isRequired,
    selectNav: PropTypes.func.isRequired,
    file: PropTypes.object.isRequired,
    changeFile: PropTypes.func.isRequired,
    clearFile: PropTypes.func.isRequired,
    export: PropTypes.object.isRequired,
    changeExport: PropTypes.func.isRequired,
    clearExport: PropTypes.func.isRequired,
    startExport: PropTypes.func.isRequired
  };

  static defaultProps = {
    activeNav: 'open'
  };

  onToggleSidebar() {
    this.props.toggleSidebar()
    ReactDOM.findDOMNode(this.refs.toggleBtn).blur()
  }

  render() {
    const {expanded, activeNav, selectNav, dataIsLoaded} = this.props
    const {file, changeFile, clearFile} = this.props
    const {changeExport, clearExport, startExport} = this.props

    const fileLoader = {currentFile: file, changeFile, clearFile}
    const fileExporter = {...this.props.export, changeExport, clearExport, startExport}
    return (
      <div className="sidebar panel panel-default">
        <div className="panel-heading">
          <Row>
            <Col xs={8} sm={8} lg={7}>
              <strong>taybl</strong>
            </Col>
            <Col xs={2} sm={1} lg={5} className="pull-right text-right">
              <Button bsSize="xsmall" ref="toggleBtn" onClick={this.onToggleSidebar.bind(this)}>
                <span className="glyphicon glyphicon-menu-hamburger"/>
              </Button>
            </Col>
          </Row>
        </div>

        <Collapse in={expanded}>
          <div>
            <div className="panel-body">
              <Nav bsStyle="tabs" activeKey={activeNav} onSelect={selectNav}>
                <NavItem eventKey="open">
                  <span className="glyphicon glyphicon-open-file"/>
                </NavItem>
                <NavItem eventKey="save" disabled={!dataIsLoaded}>
                  <span className="glyphicon glyphicon-save-file"/>
                </NavItem>
              </Nav>
              <Row style={{paddingTop: '10px'}}>
                <Col lg={12}>
                  {(() => (
                    activeNav === 'open'
                      ? (<FileLoader {...fileLoader}/>)
                      : (<FileExporter {...fileExporter}/>)
                  ))()}
                </Col>
              </Row>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
