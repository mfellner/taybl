import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import DataTable from './DataTable.jsx'
import { updateFilter } from './../actions/data'

function mapStateToProps(state) {
  return {
    data: state.data
  }
}

class Root extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const {data, updateFilter} = this.props
    const props = {...data, updateFilter}

    return (
      <div className="container">
        <Row>
          <Col md={12}>
            <DataTable {...props}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {updateFilter})(Root)
