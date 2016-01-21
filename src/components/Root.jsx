import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import DataTable from './DataTable.jsx'
import Sidebar from './Sidebar.jsx'
import { updateFilter } from './../actions/data'
import { toggleSidebar } from './../actions/sidebar'

function mapStateToProps(state) {
  return {
    data: state.data,
    sidebar: state.sidebar
  }
}

class Root extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    sidebar: PropTypes.object.isRequired
  };

  render() {
    const {updateFilter, toggleSidebar} = this.props
    const table = {...this.props.data, updateFilter}
    const sidebar = {...this.props.sidebar, toggleSidebar}

    return (
      <div className="container">
        <Row style={{paddingTop: '10px'}}>
          <Col lg={2}>
            <Sidebar {...sidebar}/>
          </Col>
          <Col lg={10}>
            <DataTable {...table}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {updateFilter, toggleSidebar})(Root)
