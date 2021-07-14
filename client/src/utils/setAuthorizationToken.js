// Packages
import axios from 'axios';

export default function setAuthorizationToken(token) {

  // console.log('setAuthorizationToken ', token)

  // set headers to have token if it exists
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
