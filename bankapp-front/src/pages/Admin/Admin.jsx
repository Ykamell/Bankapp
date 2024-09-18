import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Layout } from '../Layout/Layout';
import { UsersManagement } from './components/UsersManagement';
import { ApplicationsManagement } from './components/ApplicationsManagement';
import './Admin.css';
import { getUserById } from '../../services/usersServices';

export const Admin = () => {
  const [user, setUser] = useState({});
  const [key, setKey] = useState('users');

  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    if (currentUserId) {
      getUserById(currentUserId)
        .then((response) => {
          setUser(response); 
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <Layout role="Admin" id={currentUserId}>
      <div className='admin-welcome'>
        Hi, {user.name + ' ' + user.lastname|| 'Username'}! What would you like to do today?
      </div>

      <div className='search-user'>
        <Form.Control
          placeholder='Search a user by name or ID'
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
  );
};
