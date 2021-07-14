import React from 'react';
import LoginForm from '../components/login/loginForm';

// route history
import history from '../history'

class Login extends React.Component {
  onLogin(){
    history.push('/')
  }
  render() {
    return (
      <LoginForm onSuccess={this.onLogin} />
    );
  }
}

export default Login;
