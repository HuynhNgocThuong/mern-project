import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import NavbarMenu from '../components/layout/NavbarMenu';

ProtectedRoute.propTypes = {};

function ProtectedRoute({ component: Component, ...rest }) {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  // authLoading = true -> load spinner
  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  }
  return (
    // If login -> load user success -> render dashboard page
    // else rediret to login page
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <NavbarMenu></NavbarMenu>
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }></Route>
  );
}

export default ProtectedRoute;
