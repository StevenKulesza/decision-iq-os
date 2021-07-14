// Packages
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Collapse, NavbarToggler, Nav, NavItem, Button } from 'reactstrap';
import { css } from 'emotion'

// redux
import { logout } from '../../../actions/auth'

// Constants
import * as constants from '../../../constants/constants'

// Styles
import * as styles from '../../../styles/nav/navbar'

// Components
import HorizontalNavbar from './navbar-horizontal';

class MainNav extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    };

    this.onLogout = this.onLogout.bind(this);
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logout()
  }

  render() {
    return (
      <div>
        <HorizontalNavbar fluid>
          <NavLink to={{ pathname: '/' }}  className={css`${styles.navbarBrand}` + " navbar-brand"}>
            <img src={constants.client.logo} className={css`${styles.navbarLogo}`} alt="logo" /> {this.props.client}
          </NavLink>

          <NavbarToggler onClick={this.toggle} />

          <Collapse isOpen={this.state.isOpen} navbar>
            { this.props.layout === 'empty'  ? (
              <Nav className="ml-auto" navbar>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button onClick={this.onLogout} color='link'>Logout</Button>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </HorizontalNavbar>
      </div>
    );
  }
}

MainNav.propTypes = {
  onClick: PropTypes.func
}

function mapStateToProps(state) {
  return {
    client: state.client.name
  };
}

export default connect(mapStateToProps, { logout })(MainNav)
