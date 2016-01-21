import React, { Component, PropTypes } from 'react'
import { Input } from 'react-bootstrap'

export default class Auth extends Component {
  render() {
    const bsStyle = null
    const style = {
      margin: '0px !important'
    }
    return (
      <form>
        <Input type="text" bsStyle={bsStyle} label="username" hasFeedback/>
        <Input type="text" bsStyle={bsStyle} label="token" hasFeedback/>
      </form>
    )
  }
}
