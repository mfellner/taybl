import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

import MyTable from './Table.jsx'

export default class Root extends Component {
  render() {
    const props = {
      heads: ['A', 'B'],
      rows: [
        {A: 'hello', B: 'world'},
        {A: 'good night', B: 'good luck'}
      ]
    }
    return (
      <div className="container">
        <Row>
          <Col md={12}>
            <MyTable {...props}/>
          </Col>
        </Row>
      </div>
    )
  }
}
