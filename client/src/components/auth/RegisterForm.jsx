import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';
const RegisterForm = () => {
  // Local state loginForm
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Alert state
  const [alert, setAlert] = useState(null);

  // Update loginForm when typing input
  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  // Get field username, password
  const { username, password, confirmPassword } = registerForm;

  // Context -> axios post
  const { registerUser } = useContext(AuthContext);

  // router
  const history = useHistory();

  // Handle when login
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      // Validate password and confirmPassword
      if (password !== confirmPassword) {
        setAlert({
          type: 'danger',
          message: 'Password do not match.',
        });
        setTimeout(() => setAlert(null), 5000);
        return;
      }

      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        // history.push('/dashboard');
        // Set alert when login fail
        setAlert({
          type: 'danger',
          message: registerData.message,
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
            onChange={onChangeRegisterForm}
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
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="my-4" controlId="formBasicPassword">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p className="mt-4">
        Already have an acount?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
