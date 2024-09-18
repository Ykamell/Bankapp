import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from './assets/logo-no-text.png';
import './Header.css'
import { VerticalModal } from '../Modal/Modal';


const Header = ({role, id}) => {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const [userModalShow, setUserModalShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const currentUserId = localStorage.getItem('userId');


  const [formValues, setFormValues] = useState({
    name: currentUser.name,
    lastname: currentUser.lastname,
    email: currentUser.email,
    address: currentUser.address,
    birthdate: currentUser.birthdate,
    password: currentUser.password,
    document: currentUser.document
  });

  const user = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
    </svg>
  );

  const handleLogOff = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  
    setTimeout(() => {
      navigate('/');
    }, 1000); 
  };

    return (
    <Navbar className="header-layout">
      <Container className='container-header'>
        <Navbar.Brand href="#home" className='brand-header'>
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{' '}
          <div className='bank-name'> YK BANK {role && <span className="role-label">- {role} </span>} </div>
        </Navbar.Brand>
        <NavDropdown title={user} id="basic-nav-dropdown" className='user-dropdown'>
          <NavDropdown.Item href="#action/3.1"><Button onClick={() => setUserModalShow(true)}>Edit</Button></NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
          <Button onClick={handleLogOff}>Log Off</Button>
          </NavDropdown.Item>
        </NavDropdown>
      </Container>

      <VerticalModal 
        show={userModalShow}
        onHide={() => setUserModalShow(false)} 
        request="Edit My Profile"
        id={id}
      >
        <>
          
        </>
      </VerticalModal>
    </Navbar>
  )
}

export default Header;