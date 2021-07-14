// Actions
import {
  FETCH_BLOBS_BEGIN,
  FETCH_BLOBS_SUCCESS,
  FETCH_BLOBS_FAILURE, 
  ADD_BLOB,
  DELETE_BLOB

} from '../actions/types';

// initial state
const initialState = {
  loading: false,
  blobs: [],
  error: null
};

export default function blobsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_BLOBS_BEGIN:
      // Mark the state as "loading" & reset errors.
      return {
        ...state,
        loading: true,
        blobs: [],
        error: null
      };

    case FETCH_BLOBS_SUCCESS:
      // All done: set loading "false".
      // Also, update blobs from server
      return {
        ...state,
        loading: false,
        blobs: action.payload.blobs
      };

    case FETCH_BLOBS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      return {
        ...state,
        loading: false,
        blobs: [],
        error: action.payload.error
      };
    
    case ADD_BLOB:
      return {
        ...state,
        blobs: [...state.blobs, action.blob]
      }

    case DELETE_BLOB:
      return {
        ...state,
        blobs: state.blobs.filter(item => item.name !== action.blob)
      }

    default:
      return state;
  }
}
