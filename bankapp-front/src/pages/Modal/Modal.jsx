import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { createUser } from '../../services/usersServices';

export const VerticalModal = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    users_role_id: '1',
    password: '',
    address: '',
    email: '',
    birthdate: '',
    document_number: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(
      { ...formData, 
        [id]: value 
      });
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.lastname ||
      !formData.password ||
      !formData.address ||
      !formData.email ||
      !formData.birthdate ||
      !formData.document_number
    ) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setError('');
    
    const data = {
      name: formData.name,
      lastname: formData.lastname,
      users_role_id: parseInt(formData.users_role_id),
      password: formData.password,
      address: formData.address,
      email: formData.email,
      birthdate: formData.birthdate,
      document_number: formData.document_number,
    };

    createUser(data).then(() => {
      props.onUserAdded();
      props.onHide(); 
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.request}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="lastname">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="users_role_id">
          <Form.Label>User Role</Form.Label>
          <Form.Control
            as="select"
            value={formData.users_role_id}
            onChange={handleChange}
            required
          >
            <option value="1">User</option>
            <option value="2">Admin</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="birthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="document_number">
          <Form.Label>Document Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter document number"
            value={formData.document_number}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};