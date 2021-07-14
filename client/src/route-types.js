// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Components
import LayoutLogin from './theme/layout-login'
import LayoutMain from './theme/layout-main'
import LayoutFluid from './theme/layout-fluid'
import LayoutFull from './theme/layout-full'

//  Login route type
export const RouteLogin = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props) => (
      <LayoutLogin><Component {...props} /></LayoutLogin>
    )} />
  )
};

//  Main route type
export const RouteMain = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props) => (
      <LayoutMain><Component {...props} /></LayoutMain>
    )} />
  )
};

//  Fluid route type
export const RouteFluid = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props) => (
      <LayoutFluid><Component {...props} /></LayoutFluid>
    )} />
  )
};

//  Full route type
export const RouteFull = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props) => (
      <LayoutFull><Component {...props} /></LayoutFull>
    )} />
  )
};
