import { SET_CURRENT_USER, USER_LOGOUT } from '../actions/types';
import {
  setCurrentUser,
  setCurrentClient
} from '../actions/auth';
import { addFlashMessage } from '../actions/messages';

// Utilities
import setAuthorizationToken from '../utils/setAuthorizationToken';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  // if action case SET_CURRENT_USER user/pass isAuthenticated value true/false to redux tree
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };

    case USER_LOGOUT: 
      // remove the token and reset the current user information
      return dispatch => {

        localStorage.removeItem('jwtToken');
        localStorage.setItem('isAuthenticated', false);

        // remove the auth token
        setAuthorizationToken(false);

        // dispatch action to set user to empty object
        dispatch(setCurrentUser({}));

        // dispatch action to set client name back to Decision IQ
        dispatch(setCurrentClient({
          name: 'DecisionIQ'
        }));

        dispatch(addFlashMessage({
          type: 'info',
          text: 'You have been logged out.'
        }))
      }

    default: return state;
  }
}
