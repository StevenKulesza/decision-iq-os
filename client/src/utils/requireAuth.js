// Packages
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

// Router History
import history from '../history'

// Actions
import { addFlashMessage } from '../actions/messages';
import { setCurrentUser } from '../actions/auth';

// Utilities
import setAuthorizationToken from './setAuthorizationToken';

import LoginModal from '../components/global/modals/login'


// redirect to public/private route on authentication
export default function(ComposedComponent) {
  // higher order component
  class Authenticate extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        showLoginModal: false
      };

      this.openLoginModal = this.openLoginModal.bind(this);
      this.checkTokenExpiration = this.checkTokenExpiration.bind(this);
    }

    coroutineCheckExpiration = null

    checkTokenExpiration(){
      const token = localStorage.getItem('jwtToken');

      if (token === false || token === null || jwtDecode(token).exp < Date.now()/1000){
        this.openLoginModal();
      }
    }

    componentWillMount() {
      const token = localStorage.getItem('jwtToken');
      // even if someone sets a random token value
      // they will not be able to access the apis
      // just a frontend shell
      if (token) {
        setAuthorizationToken(token);
        this.props.setCurrentUser(jwtDecode(token));
        this.checkTokenExpiration();
      }

      if (token === false || token === null) {
        // push message if not logged in and trying to access page
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });

        // redirect to login page
        //history.push('/login');
        this.openLoginModal();
      }
    }

    componentDidMount(){
      this.coroutineCheckExpiration = setInterval(this.checkTokenExpiration, 2000);
    }
    componentWillUnmount(){
      clearInterval(this.coroutineCheckExpiration);
    }

    // check before component updates
    componentWillUpdate(nextProps) {
      const token = localStorage.getItem('jwtToken');

      if (token) {
        this.props.setCurrentUser(jwtDecode(token));
      }

      if (!nextProps.isAuthenticated) {
        // redirect to login page if not authenticated
        history.push('/login');
        
      }
    }

    openLoginModal = () => {
      this.setState({
        showLoginModal: true
      });
    }

    onLoginSuccess(){
      window.location.reload();
    }
  
    onLoginFailure(){
      history.push('/login')   
    }

    render() {
      return (
        <React.Fragment>
          <ComposedComponent {...this.props} />
          <LoginModal isOpen={this.state.showLoginModal} onSuccess={this.onLoginSuccess} onFailure={this.onLoginFailure} title="You're session has expired"/>
        </React.Fragment>
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      name: 'DCO'
    };
  }

  return connect(mapStateToProps, { addFlashMessage, setCurrentUser })(Authenticate);
}
