import React, { useState } from 'react';
import logo from './assets/logo.png';
import logoMobile from './assets/logo-mobile.png';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'; 
import { loginUser } from '../../services/loginServices';
import { useNavigate } from 'react-router-dom'; 

import './Login.css';

export const Login = () => {
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  const onSubmit = () => {
    if (!loginValues.email || !loginValues.password) {
      setErrorMessage('All fields are required.');
      return;
    }

    loginUser({
      username: loginValues.email,
      password: loginValues.password
    }).then((response) => {
      const { payload } = response.data;
      localStorage.setItem('role', payload.role); 
      localStorage.setItem('userId', payload.userId); 
      if (payload.role === 'Admin') {
        navigate('/admin');
      } else if (payload.role === 'User') {
        navigate('/users');
      }
    })
    .catch((err) => {
      setErrorMessage('Invalid credentials. Please try again.'); 
    });
  };

  return (
    <div className='body'>
      <Container className='container-login'>
        <div className='logo'>
          <img className='logo-img' src={ logo } alt="" />
          <img className='logo-mobile' src={ logoMobile } alt="" />
        </div>

        <div className='form-side'>
          <div className='form-welcome'>
            Welcome Back!
          </div>
          
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" className='submit-button' onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};
