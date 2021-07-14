// Packages
import React, { Component } from 'react';
import { Navbar, Container } from 'reactstrap';
import { css } from 'emotion'

// Styles
import * as styles from '../../../styles/nav/navbar'

export default class HorizontalNavbar extends Component {
  render() {
    return (
      <Navbar className={css`${styles.navbar} ${styles.navbarFixedTop} ${styles.navbarDark}`} expand="md">
        <Container>
          {this.props.children}
        </Container>
      </Navbar>
    )
  }
}
