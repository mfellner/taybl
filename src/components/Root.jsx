import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import DataTable from './DataTable.jsx'
import Sidebar from './Sidebar.jsx'
import { changeFile, clearFile } from './../actions/file'
import { changeExport, clearExport, startExport } from './../actions/export'
import { updateFilter } from './../actions/data'
import { toggleSidebar, selectNav } from './../actions/sidebar'

function mapStateToProps(state) {
  return {
    data: state.data,
    file: state.file,
    export: state.export,
    sidebar: state.sidebar
  }
}

class Root extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
    sidebar: PropTypes.object.isRequired
  };

  render() {
    const {updateFilter} = this.props
    const {toggleSidebar, selectNav} = this.props
    const {changeFile, clearFile} = this.props
    const {changeExport, clearExport, startExport} = this.props
    const dataIsLoaded = this.props.data.rows.length > 0

    const table = {
      ...this.props.data, updateFilter
    }

    const sidebar = {
      ...this.props.sidebar,
      toggleSidebar, selectNav, dataIsLoaded,
      file: this.props.file,
      changeFile, clearFile,
      export: this.props.export,
      changeExport, clearExport, startExport
    }

    return (
      <div className="container">
        <Row style={{paddingTop: '10px'}}>
          <Col lg={3}>
            <Sidebar {...sidebar}/>
          </Col>
          <Col lg={9}>
            <DataTable {...table}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  updateFilter, toggleSidebar, selectNav,
  changeFile, clearFile,
  changeExport, clearExport, startExport
})(Root)
