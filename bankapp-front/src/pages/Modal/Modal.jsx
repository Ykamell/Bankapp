import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { getUserById, updateUser } from '../../services/usersServices';

export const VerticalModal = (props) => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: user.name,
    lastname: user.lastname,
    users_role_id: user.role,
    email: user.email,
    address: user.address,
    birthdate: user.birthdate,
    password: user.password,
    document: parseInt(user.document)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateUser = () => {
    if (!formData.name || !formData.lastname || !formData.email || !formData.address || !formData.birthdate || !formData.password ) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const userData = {
      name: formData.name,
      lastname: formData.lastname,
      address: formData.address,
      birthdate: formData.birthdate,
      document_number: formData.document,
      email: formData.email,
      password: formData.password,
    };
  
    updateUser(user.id, userData)
      .then(() => {
        alert('User updated successfully');
      })
      .catch((e) => {
        console.log('Error updating user: ', e);
        alert('Failed to update user');
      });
  };

  useEffect(() => {
    setFormData({
      name: user.name,
      lastname: user.lastname,
      users_role_id: user.role,
      email: user.email,
      address: user.address,
      birthdate: user.birthdate,
      password: user.password,
      document: parseInt(user.document)
    });
  }, [user]);

  useEffect(() => {
    if (props.id) {
      getUserById(props.id)
        .then((response) => {
          setUser(response); 
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

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
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name='name'
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
            name='lastname'
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
            name='users_role_id'
            as="select"
            value={formData.users_role_id}
            onChange={handleChange}
            required
            disabled
          >
            <option value="1">User</option>
            <option value="2">Admin</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='password'
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
            name='address'
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
            name='email'
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
            name='birthdate'
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="document_number">
          <Form.Label>Document Number</Form.Label>
          <Form.Control
            disabled
            name='document'
            type="number"
            placeholder="Enter document number"
            value={formData.document}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={handleUpdateUser}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};