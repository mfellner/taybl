import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { Row, Col, Panel, Button, Nav, NavItem } from 'react-bootstrap'

import FileLoader from './FileLoader.jsx'
import FileExporter from './FileExporter.jsx'

export default class Sidebar extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    activeNav: PropTypes.string.isRequired,
    selectNav: PropTypes.func.isRequired,
    changeFile: PropTypes.func.isRequired,
    clearFile: PropTypes.func.isRequired
  };

  static defaultProps = {
    activeNav: 'open'
  };

  onToggleSidebar() {
    this.props.toggleSidebar()
    ReactDOM.findDOMNode(this.refs.toggleBtn).blur()
  }

  render() {
    const {file, expanded, activeNav, selectNav, changeFile, clearFile} = this.props
    const fileLoader = {currentFile: file, changeFile, clearFile}
    const header = (
      <Row>
        <Col xs={8} sm={8} lg={7}>
          gbase
        </Col>
        <Col xs={2} sm={1} lg={5} className="pull-right text-right">
          <Button bsSize="xsmall" ref="toggleBtn" onClick={this.onToggleSidebar.bind(this)}>
            <span className="glyphicon glyphicon-menu-hamburger"/>
          </Button>
        </Col>
      </Row>
    )
    return (
      <Panel className="sidebar" collapsible header={header} expanded={expanded}>
        <Nav bsStyle="tabs" activeKey={activeNav} onSelect={selectNav}>
          <NavItem eventKey="open">
            <span className="glyphicon glyphicon-open-file"/>
          </NavItem>
          <NavItem eventKey="save">
            <span className="glyphicon glyphicon-save-file"/>
          </NavItem>
        </Nav>
        <Row style={{paddingTop: '10px'}}>
          <Col lg={12}>
            {(() => (
              activeNav === 'open'
                ? (<FileLoader {...fileLoader}/>)
                : (<FileExporter/>)
            ))()}
          </Col>
        </Row>
      </Panel>
    )
  }
}
