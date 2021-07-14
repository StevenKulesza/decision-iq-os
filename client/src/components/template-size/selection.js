import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { css } from 'emotion';

// Components and Styles
import * as styles from '../../styles/selection/selection';
import * as button from '../../styles/button/button';

import Switch from './switch.js';

class Selection extends React.Component {
  render() {
    return (
      <Row className='mb-3'>
        <Col xs={8} className='p-0' style={{borderBottom:'1px solid #e8e7e7'}}>
          <Row>
            <Col>
              <p className={css`${styles.templateName}`}>{this.props.size}</p>
            </Col>
            <Col>
            <Button
              color='link'
              onClick={() => this.props.preview(this.props.size, this.props.index)}
              className = {css`${button.btn}`}
            >Preview</Button>
            </Col>
          </Row>
        </Col>
        <Col xs={3}>
          <Switch value={this.props.size} />
        </Col>
      </Row>
    )
  }
}

export default Selection;
