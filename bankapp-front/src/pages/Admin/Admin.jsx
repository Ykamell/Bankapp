import React from 'react'
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Layout } from '../Layout/Layout';
import { UsersManagement } from './components/UsersManagement';
import { ApplicationsManagement } from './components/ApplicationsManagement';
import './Admin.css'

export const Admin = () => {

  const [key, setKey] = useState('users');

  return (
    <Layout role="Admin">
      <div className='admin-welcome'>
        Hola, Username! ¿Qué quieres hacer hoy?
      </div>

      <div className='search-user'>
        <Form.Control
          placeholder='Search an user by name or ID'
          type="text"
        />
        <Button>Search</Button>
      </div>
      
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      >
        <Tab eventKey="users" title="Users Management">
          <UsersManagement/>
        </Tab>
        <Tab eventKey="application" title="Products Application Management">
          <ApplicationsManagement/>
        </Tab>
      </Tabs>
    </Layout>
  )
}
