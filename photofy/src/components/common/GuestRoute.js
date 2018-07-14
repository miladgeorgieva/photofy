import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const GuestRoute = ({ component: Component, ...rest }) => {
  const isGuest = !sessionStorage.getItem('authtoken') ? true : false;

  return (
    <Route
      {...rest}
      render={props =>
        isGuest ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default GuestRoute;