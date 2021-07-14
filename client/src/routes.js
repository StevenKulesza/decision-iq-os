// Packages
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

// Redux Store
import configureStore from './store'

// Router History
import history from './history'

// Route Types
import { RouteLogin, RouteFull } from './route-types'

// Containers
import Login from './containers/login'
import FlightInformation from './containers/flight-information'
import Create from './containers/create'
import Assets from './containers/assets'
import Saved from './containers/saved'
import Personalization from './containers/personalization'
import Review from './containers/review'

// auth higher order component
import requireAuth from './utils/requireAuth';

export default (
  <Provider store={configureStore()}>
    <Router history={history}>
      <div>
        <RouteLogin path="/login" component={Login} />
        <RouteFull exact path="/flight-information" component={requireAuth(FlightInformation)} />
        <RouteFull exact path="/" component={requireAuth(Create)} />
        <RouteFull exact path="/saved" component={requireAuth(Saved)} />
        <RouteFull exact path="/assets" component={requireAuth(Assets)} />
        <RouteFull exact path="/personalization" component={requireAuth(Personalization)} />
        <RouteFull exact path="/review" component={requireAuth(Review)} />
      </div>
    </Router>
  </Provider>
);
