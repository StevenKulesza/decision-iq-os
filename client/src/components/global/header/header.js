// Packages
import React from 'react'
import { Row, Col } from 'reactstrap'
import Wayfinder from '../wayfinder/wayfinder'
// Components and Styles
import * as styles from '../../../styles/header/header'

class Header extends React.Component {
  render() {
    return (
      <Row className={(this.props.align === "left" ? "text-left pl-0 pr-0 " : "text-center ") + styles.header}>
        <Col>
          <h1>{this.props.h1}</h1>
          <p>{this.props.p}</p>
        </Col>
        {
          this.props.wayfinder && <Col>
          <Wayfinder/>
          </Col>
        }
      </Row>
    )
  }
}

export default Header;
