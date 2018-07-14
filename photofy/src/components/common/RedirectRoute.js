import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const RedirectRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = sessionStorage.getItem('authtoken') ? true : false;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default RedirectRoute