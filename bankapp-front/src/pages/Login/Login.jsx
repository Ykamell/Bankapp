import React, { useState } from 'react';
import logo from './assets/logo.png';
import logoMobile from './assets/logo-mobile.png';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'
import { loginUser } from '../../services/loginServices';
import Cookies from 'js-cookie';


export const Login = () => {
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  const onSubmit = () => {
    console.log(loginValues);
    loginUser({
      username: loginValues.email,
      password: loginValues.password
    }).then((response) => {
      console.log(response.payload);
      const token = Cookies.get('token');
      console.log(token, response, 'hi');

    })
    .catch((err) => {

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
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" className='submit-button' onClick={ onSubmit }> 
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  )
}
