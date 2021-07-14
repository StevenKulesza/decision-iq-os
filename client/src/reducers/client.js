import { SET_CURRENT_CLIENT } from '../actions/types';

const initialState = {
  name: 'DecisionIQ'
};

export default (state = initialState, action = {}) => {
  // if action case SET_CURRENT_CLIENT
  switch(action.type) {
    
    case SET_CURRENT_CLIENT:
      return {
        ...state,
        name: action.client.name
      };

    default: return state;
  }
}
