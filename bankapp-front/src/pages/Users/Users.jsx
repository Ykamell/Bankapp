import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import { Layout } from '../Layout/Layout';
import { VerticalModal } from '../Modal/Modal';
import { UserLoans } from './components/UserLoans';
import { UserCards } from './components/UserCards';
import { UserApplications } from './components/UserApplications';
import './Users.css'

export const Users = () => {
  const [productType, setProductType] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [key, setKey] = useState('home');

  const handleProductChange = (e) => {
    setProductType(e.target.value);
  };

  return (
    <Layout>
      <div className='user-welcome'>
        Hola Username!
      </div>
      <div className='user-options'>
        <div>Tus Productos</div> 
        <Button variant="primary" onClick={() => setModalShow(true)}> Request New Product </Button>
      </div>
      
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      >
        <Tab eventKey="home" title="Cards">
          <UserCards/>
        </Tab>
        <Tab eventKey="profile" title="Loans">
          <UserLoans/>
        </Tab>
        <Tab eventKey="contact" title="Applications">
          <UserApplications/>
        </Tab>
      </Tabs>

      <VerticalModal 
        show={modalShow}
        onHide={() => setModalShow(false)} 
        request="Request New Product"
      >
        <Form.Group controlId="productTypeSelect">
          <Form.Label>What kind of product do you need?</Form.Label>
          <Form.Select aria-label="Default select example" onChange={handleProductChange}>
            <option>Select kind of product</option>
            <option value="cr">Credit Card</option>
            <option value="deb">Debit Card</option>
            <option value="loan">Loan</option>
          </Form.Select>
        </Form.Group>

        {productType === "cr" && (
          <>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="valor">
              <Form.Label>Valor</Form.Label>
              <Form.Control type="number" placeholder="Enter value" />
            </Form.Group>
            <Form.Group controlId="direccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" placeholder="Enter address" />
            </Form.Group>
          </>
        )}

        {productType === "deb" && (
          <>
            <Form.Group controlId="edad">
              <Form.Label>Edad</Form.Label>
              <Form.Control type="number" placeholder="Enter age" />
            </Form.Group>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
          </>
        )}

        {productType === "loan" && (
          <>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="valor">
              <Form.Label>Valor</Form.Label>
              <Form.Control type="number" placeholder="Enter value" />
            </Form.Group>
            <Form.Group controlId="fecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </>
        )}

      </VerticalModal>
    </Layout>
  )
}
