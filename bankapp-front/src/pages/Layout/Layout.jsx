import React from 'react'
import Header from './Header'
import Container from 'react-bootstrap/Container';

import './Layout.css'


export const Layout = ({ children, role, id }) => {
  return (
    <div className='layout-container'>
      <Header role={role} id={id}></Header>
      <Container className='layout-body'> 
        { children }
      </Container>
    </div>
  )
}
