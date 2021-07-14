import React, { Component } from 'react'
import { FormGroup, Input } from 'reactstrap'

export default class Search extends Component {
  render() {
    return (
        <FormGroup>
            <Input type="search" name="search" placeholder="search" onChange={this.props.onchange} />
        </FormGroup>
    )
  }
}
