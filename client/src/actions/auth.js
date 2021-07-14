// Packages
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Actions
import {
  SET_CURRENT_USER,
  SET_CURRENT_CLIENT,
  USER_LOGOUT
} from './types';


// Utilities
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setCurrentUser(user) {
  // set current user action type
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setCurrentClient(client) {
  // set current client action type
  return {
    type: SET_CURRENT_CLIENT,
    client
  };
}

export function logout() {
  return {
    type: USER_LOGOUT
  }
}

export function login(data) {
  // pass (data) username / password from login form
  // {
  //   username: '',
  //   password: ''
  // }
  console.log(data)
  return dispatch => {
    return axios.post('/users/login', data).then(res => {

      // grab token from response if user exists
      const token = res.data.token;

      // grab response jwt token and place in localstorage to validate against
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('isAuthenticated', true);

      // set auth token in headers with Bearer {token} schema
      setAuthorizationToken(token);

      // grab client object from response
      dispatch(setCurrentClient(res.data.client));

      // decode the token to see user info
      dispatch(setCurrentUser(jwtDecode(token)));
    })
    .catch(err => {
      console.log(err)
    });
  }
}
