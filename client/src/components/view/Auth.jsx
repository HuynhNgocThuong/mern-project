import React from 'react';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
function Auth({ authRoute }) {
  let body;
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  } else if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else {
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
    );
  }
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learn MERN</h1>
          <h4>Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
}

export default Auth;
