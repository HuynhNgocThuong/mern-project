import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';
const LoginForm = () => {
  // Local state loginForm
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  // Alert state
  const [alert, setAlert] = useState(null);

  // Update loginForm when typing input
  const onChangeLoginForm = (event) =>
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });

  // Get field username, password
  const { username, password } = loginForm;

  // Context -> axios post
  const { loginUser } = useContext(AuthContext);

  // router
  const history = useHistory();

  // Handle when login
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        // history.push('/dashboard');
      } else {
        // Set alert when login fail
        setAlert({
          type: 'danger',
          message: loginData.message,
        });
        // Set timeout to remove alert
        setTimeout(() => setAlert(null), 5000);
        console.log(alert);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <AlertMessage info={alert} />
        <Form.Group className="my-4" controlId="formBasicEmail">
          {/* <Form.Label>User name</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="my-4" controlId="formBasicPassword">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p className="mt-4">
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
