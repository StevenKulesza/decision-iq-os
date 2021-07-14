// Packages
import axios from 'axios'

// Actions
import {
  ADD_FLIGHT_NAME,
  ADD_FLIGHT_START_DATE,
  ADD_FLIGHT_END_DATE,

  ADD_AUDIENCE,
  DELETE_AUDIENCE,
  SELECT_AUDIENCE,

  FETCH_SAVED_FLIGHTS_BEGIN,
  FETCH_SAVED_FLIGHTS_SUCCESS,
  FETCH_SAVED_FLIGHTS_FAILURE,
  DELETE_SAVED_FLIGHT

} from './types'


export const fetchSavedFlightsBegin = flights => ({
  type: FETCH_SAVED_FLIGHTS_BEGIN
});

export const fetchSavedFlightsSuccess = flights => ({
  type: FETCH_SAVED_FLIGHTS_SUCCESS,
  payload: { flights }
});

export const fetchSavedFlightsError = error => ({
  type: FETCH_SAVED_FLIGHTS_FAILURE,
  payload: { error }
});

// export const deleteSavedFlight = flight => ({
//     type: DELETE_SAVED_FLIGHT,
//     flight
// })

export function deleteSavedFlight(flight) {
  return dispatch => {
    const token = localStorage.getItem('jwtToken');
    fetch('/flights/delete', {
        method: 'DELETE',
        headers: {
          "Authorization": "Bearer " + token,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": flight
        })
      })
      .catch(error => console.log("error " + error));
  }
}

export const deleteSavedFlightSuccess = flight => ({
    type: DELETE_SAVED_FLIGHT,
    flight
})

// inital flights fetch
export function fetchFlights() {
  return dispatch => {
    let token = localStorage.getItem('jwtToken');

    dispatch(fetchSavedFlightsBegin());
    
    return axios({
      method:'get',
      url:'/flights/list',
      headers: {'Authorization': 'Bearer ' +  token}
    })
    .then(res => {
      dispatch(fetchSavedFlightsSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchSavedFlightsError(error))
    });
  }
}

// add flight name
export function addFlightName(flightName) {
  return {
    type: ADD_FLIGHT_NAME,
    flightName
  }
}

// add flight start date
export function addFlightStartDate(date) {
  return {
    type: ADD_FLIGHT_START_DATE,
    date
  }
}

// add flight end date
export function addFlightEndDate(date) {
  return {
    type: ADD_FLIGHT_END_DATE,
    date
  }
}

// add audience
export function addAudience(audience) {
  return {
    type: ADD_AUDIENCE,
    audience
  }
}

// delete audience
export function deleteAudience(audience) {
  return {
    type: DELETE_AUDIENCE,
    audience
  }
}

// select audience
export function selectAudience(audience) {
  return {
    type: SELECT_AUDIENCE,
    audience
  }
}