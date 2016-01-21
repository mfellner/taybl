import React, { Component, PropTypes } from 'react'
import { Row, Col, Panel, Button } from 'react-bootstrap'

import Auth from './Auth.jsx'

export default class Sidebar extends Component {
  static propTypes = {
    expanded: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
  };

  render() {
    const header = (
      <Row>
        <Col xs={8} sm={8} lg={7}>
          gbase
        </Col>
        <Col xs={2} sm={1} lg={5} className="pull-right text-right">
          <Button bsSize="xsmall" style={{margin:0}} onClick={this.props.toggleSidebar}>
            <span className="glyphicon glyphicon-menu-hamburger"/>
          </Button>
        </Col>
      </Row>
    )
    return (
      <Panel collapsible header={header} expanded={this.props.expanded}>
        <Auth/>
      </Panel>
    )
  }
}
