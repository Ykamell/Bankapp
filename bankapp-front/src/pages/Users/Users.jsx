import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Layout } from '../Layout/Layout';
import { UserLoans } from './components/UserLoans';
import { UserCards } from './components/UserCards';
import { UserApplications } from './components/UserApplications';
import './Users.css';
import { getUserById } from '../../services/usersServices';
import { createApplication } from '../../services/applicationsServices';

export const Users = () => {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({});
  const [refreshApplication, setRefreshApplication] = useState(false);
  const [key, setKey] = useState('cards');
  const [applicationFormData, setApplicationFormData] = useState({
    product_type_id: '',
    desired_amount: '',
  });

  const currentUserId = localStorage.getItem('userId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicationFormData({
      ...applicationFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (currentUserId) {
      getUserById(currentUserId)
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [currentUserId]);

  const onCreateApplication = async () => {
    const { product_type_id, desired_amount } = applicationFormData;

    if (!product_type_id || !desired_amount) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const applicationData = {
        product_type_id,
        user_id: currentUserId,
        desired_amount,
      };

      await createApplication(applicationData);
      setRefreshApplication(!refreshApplication);
      setModalShow(false); 
    } catch (error) {
      console.error('Error handling application approval:', error);
    }
  };

  return (
    <Layout id={currentUserId}>
      <div className='user-welcome'>
        Hola {user.name + ' ' + user.lastname || 'Username'}!
      </div>
      <div className='user-options'>
        <div>Tus Productos</div>
        <Button variant="primary" onClick={() => setModalShow(true)}>Request New Product</Button>
      </div>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="cards" title="Cards">
          <UserCards />
        </Tab>
        <Tab eventKey="loans" title="Loans">
          <UserLoans />
        </Tab>
        <Tab eventKey="applications" title="Applications">
          <UserApplications refreshApplication={refreshApplication}/>
        </Tab>
      </Tabs>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Product Application
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="productTypeSelect">
            <Form.Label>What kind of product do you need?</Form.Label>
            <Form.Select aria-label="Default select example" name='product_type_id' onChange={handleChange}>
              <option value="1">Credit Card</option>
              <option value="2">Debit Card</option>
              <option value="3">Loan</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>Desired Amount</Form.Label>
            <Form.Control type="number" name='desired_amount' placeholder="Enter value" onChange={handleChange} />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
          <Button onClick={onCreateApplication}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};
