import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import './UserInfoModal.css';

import { useState, useEffect } from 'react';
import { createProduct, deleteProduct, getProductsByUser, updateProduct } from '../../../services/productsServices';
import { getApplicationsByUser, updateApplication } from '../../../services/applicationsServices';
import { updateUser  } from '../../../services/usersServices'; 

export const UserInfoModal = (props) => {
  const [edit, setEdit] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [editApplication, setEditApplication] = useState(false);
  const [key, setKey] = useState('products');
  const [productsByUser, setProductsByUser] = useState([]);
  const [applicationsByUser, setApplicationsByUser] = useState([]);
  const selectedUser = props.request;
  const today = new Date(); 
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const [formValues, setFormValues] = useState({
    name: selectedUser.name,
    lastname: selectedUser.lastname,
    email: selectedUser.email,
    address: selectedUser.address,
    birthdate: selectedUser.birthdate,
    password: selectedUser.password,
    document: selectedUser.document
  });

  const editIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
    </svg>
  );

  const deleteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
    </svg>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
  
    const updatedProducts = [...productsByUser];
  
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: value,
    };
  
    setProductsByUser(updatedProducts);
  };

  const handleUpdateProduct = (index) => {
    if (!productsByUser[index].amount || !productsByUser[index].expire_month || !productsByUser[index].expire_year ) {
      alert('Please fill in all required fields.');
      return;
    }

    const productData = {
      amount: productsByUser[index].amount,
      expire_month: (productsByUser[index].expire_month).toString(),
      expire_year: (productsByUser[index].expire_year).toString(),
    };
    updateProduct(productsByUser[index].id, productData)
      .then(() => {
        alert('Product updated successfully');
        setEditProduct(false);
        props.onUserUpdated();
      })
      .catch((e) => {
        console.log('Error updating product: ', e);
        alert('Failed to update product');
      });
  };

  const handleApplicationChange = (index, e) => {
    const { name, value } = e.target;
  
    const updatedApplications = [...applicationsByUser];
  
    updatedApplications[index] = {
      ...updatedApplications[index],
      [name]: value,
    };
  
    setApplicationsByUser(updatedApplications);
  };

  const handleUpdateApplication = (index) => {
    if (!applicationsByUser[index].desired_amount || !applicationsByUser[index].product_type_id || !applicationsByUser[index].application_status_id ) {
      alert('Please fill in all required fields.');
      return;
    }

    const applicationData = {
      id: applicationsByUser[index].id,
      desired_amount: applicationsByUser[index].desired_amount,
      product_type_id: applicationsByUser[index].product_type_id,
      application_status_id: applicationsByUser[index].application_status_id,
      admin_user_id: 9
    };

    updateApplication(applicationsByUser[index].id, applicationData)
      .then(() => {
        alert('Product updated successfully');
        if (applicationsByUser[index].application_status_id === 2) {
          handleApproveApplication(applicationData);
        } else if (applicationsByUser[index].application_status_id === 3) {
          handleRejectApplication(applicationData);
        }
        setEditApplication(false);
        props.onUserUpdated();
      })
      .catch((e) => {
        console.log('Error updating product: ', e);
        alert('Failed to update product');
      });
  };

  const handleUpdateUser = () => {
    if (!formValues.name || !formValues.lastname || !formValues.email || !formValues.address || !formValues.birthdate || !formValues.password || !formValues.document) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const userData = {
      name: formValues.name,
      lastname: formValues.lastname,
      address: formValues.address,
      birthdate: formValues.birthdate,
      document_number: formValues.document,
      email: formValues.email,
      password: formValues.password,
    };
  
    updateUser(selectedUser.id, userData)
      .then(() => {
        alert('User updated successfully');
        setEdit(false);
        props.onUserUpdated();
        props.onHide();
      })
      .catch((e) => {
        console.log('Error updating user: ', e);
        alert('Failed to update user');
      });
  };

  const setDeleteProduct = (id) => {
      deleteProduct(id)
      .then(() => {
        alert('Product deleted successfully');
        props.onUserUpdated(); 
        props.onHide();
      })
      .catch((e) => {
        console.error('Error deleting product: ', e);
      });
  }

  const handleRejectApplication = async (application) => {
    try {
      await updateApplication(application.id, application);
      props.onUserUpdated();
    } catch (error) {
      console.error('Error handling application rejection:', error);
    }
    
  }

  const handleApproveApplication =  async (application) => {
    try {
      const cvv = Math.floor(Math.random() * 900) + 100;
      
      const productData = {
        application_id: application.id,
        user_id: selectedUser.id,
        product_type_id: application.product_type_id,
        amount: application.desired_amount,
        cvv: cvv,
        expire_year: currentYear + 10,
        expire_month: currentMonth
      };
        await createProduct(productData);
      props.onUserUpdated();
    } catch (error) {
      console.error('Error handling application approval:', error);
    }
  };

  useEffect(() => {
    getProductsByUser(selectedUser.id)
    .then((response) => {
      setProductsByUser(response);
    })
    .catch((e) => console.log('Hubo un problema: ', e));

    getApplicationsByUser(selectedUser.id)
    .then((response) => {
      setApplicationsByUser(response);
    })
    .catch((e) => console.log('Hubo un problema: ', e));
  }, [selectedUser.id]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          { selectedUser.name } { selectedUser.lastname }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='user-info'>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" value={formValues.name} disabled={!edit} onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Lastname</Form.Label>
            <Form.Control name="lastname" type="text" value={formValues.lastname} disabled={!edit} onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control name="address" type="text" value={formValues.address} disabled={!edit} onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="birthdate">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control name="birthdate" type="date" value={formValues.birthdate} disabled={!edit} onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="document">
            <Form.Label>Document Number</Form.Label>
            <Form.Control name="document" type="number" value={formValues.document} disabled={!edit} onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" value={formValues.email} disabled={!edit} onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" value={formValues.password} disabled={!edit} onChange={handleChange}/>
          </Form.Group>

          <div className='user-actions'>
            <Button onClick={() => setEdit(true)}>{editIcon}</Button>
            <Button onClick={() => props.onUserDeleted(selectedUser.id)}>{deleteIcon}</Button>

            { edit && (
              <>
                <Button onClick={handleUpdateUser}>Save Changes</Button>
                <Button onClick={() => setEdit(false)}>Cancel</Button>
              </>
            )}
          </div>

          { selectedUser.role === 1 && (
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="products" title="Products">
                <Accordion>
                  {productsByUser.map((product, index) => (
                    <Accordion.Item eventKey={index} key={product.id}>
                      <Accordion.Header>Product {product.product_type_id === 1 ? 'Credit Card' : product.product_type_id === 2 ? 'Debit Card' : 'Loan'}</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group controlId="product_type">
                          <Form.Label>Product Type</Form.Label>
                          <Form.Control name="product_type" type="text" value={product.product_type_id === 1 ? 'Credit Card' : product.product_type_id === 2 ? 'Debit Card' : 'Loan'} disabled/>
                        </Form.Group>
                        <Form.Group controlId="number">
                          <Form.Label>Number</Form.Label>
                          <Form.Control name="number" type="number" value={product.number} disabled/>
                        </Form.Group>
                        { product.cvv !== null && (
                          <Form.Group controlId="cvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control name="cvv" type="number" value={product.cvv} disabled/>
                          </Form.Group>
                        )}
                        <Form.Group controlId="amount">
                          <Form.Label>Amount</Form.Label>
                          <Form.Control name="amount" type="number" value={product.amount} disabled={!editProduct} onChange={(e)=>handleProductChange(index, e)}/>
                        </Form.Group>
                        { product.expire_year !== null && (
                          <Form.Group controlId="expire_year">
                            <Form.Label>Expiration Year</Form.Label>
                            <Form.Control name="expire_year" type="number" min="2024" max="2030" value={product.expire_year} disabled={!editProduct} onChange={(e)=>handleProductChange(index, e)}/>
                          </Form.Group>
                        )}
                        { product.expire_month !== null && (
                          <Form.Group controlId="expire_month">
                            <Form.Label>Expiration Month</Form.Label>
                            <Form.Control name="expire_month" type="number" min="1" max="12" value={product.expire_month} disabled={!editProduct} onChange={(e)=>handleProductChange(index, e)}/>
                          </Form.Group>
                        )}
                        <div className='product-actions'>
                          <Button onClick={() => setEditProduct(true)}>{editIcon}</Button>
                          <Button onClick={() => setDeleteProduct(product.id)}>{deleteIcon}</Button>
                        </div>
                        { editProduct && (
                          <Button onClick={() => handleUpdateProduct(index)}>Save Changes</Button>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Tab>
              <Tab eventKey="applications" title="Applications">
                <Accordion>
                  {applicationsByUser.map((application, index) => (
                    <Accordion.Item eventKey={index} key={application.id}>
                      <Accordion.Header>Application for {application.product_type_id === 1 ? 'Credit Card' : application.product_type_id === 2 ? 'Debit Card' : 'Loan'}</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group controlId="product_type">
                          <Form.Label>Product Type</Form.Label>
                          <Form.Select name="product_type_id" value={application.product_type_id} disabled={!editApplication} onChange={(e)=>handleApplicationChange(index, e)}>
                            <option value="1">Credit Card</option>
                            <option value="2">Debit Card</option>
                            <option value="3">Loan</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="user">
                          <Form.Label>User</Form.Label>
                          <Form.Control name="user" type="text" value={selectedUser.name + ' ' + selectedUser.lastname} disabled/>
                        </Form.Group>
                        <Form.Group controlId="admin">
                          <Form.Label>Managed by</Form.Label>
                          <Form.Control name="admin" type="text" value={application.admin_user_id} disabled/>
                        </Form.Group>
                        <Form.Group controlId="status">
                          <Form.Label>Status</Form.Label>
                          <Form.Select name="application_status_id" value={application.application_status_id} disabled={!editApplication} onChange={(e)=>handleApplicationChange(index, e)}>
                            <option value="1">Pending</option>
                            <option value="2">Approved</option>
                            <option value="3">Rejected</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="desired_amount">
                          <Form.Label>Desired Amount</Form.Label>
                          <Form.Control name="desired_amount" type="number" value={application.desired_amount} disabled={!editApplication} onChange={(e)=>handleApplicationChange(index, e)}/>
                        </Form.Group>
                        <div className='application-actions'>
                        { application.application_status_id === 1 && (                        
                          <Button onClick={() => setEditApplication(true)}>{editIcon}</Button>
                        )}
                        </div>
                        { editApplication && (
                          <Button onClick={() => handleUpdateApplication(index)}>Save Changes</Button>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Tab>
            </Tabs>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onHide}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};
