// Packages
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { css } from 'emotion'

// Components and Styles
import * as styles from '../../../styles/footer/footer'

const Footer = () => (
  <div className={css`${styles.footer}` + ' text-center'}>
    <Container>
      <Row>
        <Col sm={{ size: 12 }} >
          <small>Copyright 2019. Moxie Marketing Services, LLC. All Rights Reserved. Proprietary and Confidential.</small>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Footer;
