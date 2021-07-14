import { 
  ADD_FLIGHT_NAME,
  
  ADD_AUDIENCE,
  ADD_FLIGHT_START_DATE,
  ADD_FLIGHT_END_DATE,
  DELETE_AUDIENCE,
  SELECT_AUDIENCE,

  FETCH_SAVED_FLIGHTS_BEGIN,
  FETCH_SAVED_FLIGHTS_SUCCESS,
  
  DELETE_SAVED_FLIGHT
}
from '../actions/types';

const initialState = {
  name:'',
  audiences: [],
  savedFlights: [],
  selectedAudience: 'all_audiences',
  startDate: new Date(),
  endDate: new Date()
};

export default (state = initialState, action = {}) => {
  let newState;

  switch(action.type) {
    case ADD_FLIGHT_NAME:
      return {
        ...state,
        name: action.flightName
      };
    case ADD_FLIGHT_START_DATE:
    return {
      ...state,
      startDate: action.date
    };
    case ADD_FLIGHT_END_DATE:
    return {
      ...state,
      endDate: action.date
    };

    case ADD_AUDIENCE:
      return {
        ...state,
        audiences: [...state.audiences, 
          {
            name: action.audience
          }
        ]
      };

    case DELETE_AUDIENCE:
      return {
        ...state,
        audiences: state.audiences.filter(item => item.name !== action.audience)
      };

    case SELECT_AUDIENCE:
      return {
        ...state,
        selectedAudience: action.audience
      };


    case FETCH_SAVED_FLIGHTS_BEGIN:
      // Mark the state as "loading" & reset errors.
      newState = {
        ...state,
        loading: true,
        error: null,
        savedFlights: []
      }

      return newState;

    case FETCH_SAVED_FLIGHTS_SUCCESS:
      // All done: set loading "false".
      // Also, update saved flights from server
      newState = {
        ...state,
        loading: false,
        savedFlights: action.payload.flights
      }
      
      return newState;

      case DELETE_SAVED_FLIGHT:
      console.log('delete', action.flight)
        return {
          ...state,
          savedFlights: state.savedFlights.filter(item => item.name !== action.flight)
        };

    default: return state;
  }
}
