import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getApplications, getUserByApplicationId, updateApplication } from '../../../services/applicationsServices';
import { getUserById, deleteUser, getUsers } from '../../../services/usersServices';
import { UserInfoModal } from './UserInfoModal';


import './ApplicationsManagement.css';
import { createProduct } from '../../../services/productsServices';

const approvedIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
  </svg>
);

const rejectedIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
    <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
  </svg>
);

export const ApplicationsManagement = () => {
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState({}); 
  const [selectedUser, setSelectedUser] = useState({});
  const [userInfoModalShow, setUserInfoModalShow] = React.useState(false);
  const today = new Date(); 
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const totalRows = applications.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = applications.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRejectApplication = async (application) => {
    try {
      const updateData = {
        product_type_id: application.product_type_id,
        desired_amount: application.desired_amount,
        application_status_id: 3,
      };

      await updateApplication(application.id, updateData);
      refreshApplications();
    } catch (error) {
      console.error('Error handling application rejection:', error);
    }
    
  }

  const handleApproveApplication =  async (application) => {
    try {
      const cvv = Math.floor(Math.random() * 900) + 100;
      const updateData = {
        product_type_id: application.product_type_id,
        desired_amount: application.desired_amount,
        application_status_id: 2,
      };

      const productData = {
        application_id: application.id,
        user_id: application.user,
        product_type_id: application.product_type_id,
        amount: application.desired_amount,
        cvv: cvv,
        expire_year: currentYear + 10,
        expire_month: currentMonth
      };
  
      await updateApplication(application.id, updateData);
      await createProduct(productData);
      refreshApplications();
    } catch (error) {
      console.error('Error handling application approval:', error);
    }
  };

  const refreshApplications = () => {
    getApplications()
    .then((response) => {
      setApplications(response);
    })
    .catch((e) => console.log('Error: ', e));
  };

  useEffect(() => {
    refreshApplications();
  }, []); 

  useEffect(() => {
    if (applications.length > 0) {
      const usersPromises = applications.map((application) => 
        getUserByApplicationId(application.id)
      );

      Promise.all(usersPromises)
        .then((usersResults) => {
          setUsers(usersResults.flat());
        })
        .catch((error) => console.error('Error fetching users:', error));
    }
  }, [applications]);

  const getStatusText = (statusId) => {
    switch (statusId) {
      case 2:
        return 'Approved';
      case 3:
        return 'Rejected';
      default:
        return 'Pending';    }
  };

  const productTypeText = (productTypeId) => {
    switch (productTypeId) {
      case 1:
        return 'Credit Card';
      case 2:
        return 'Debit Card';
      case 3:
        return 'Loan';
      default:
        return 'Debit Card';
    }
  };

  const refreshUsers = () => {
    getUsers()
      .then((response) => {
        setUsers(response);
      })
      .catch((e) => console.log('Error: ', e));
  };


  const deleteUserById = (id) => {
    deleteUser(id)
    .then(() => {
      refreshUsers(); 
    })
    .catch((e) => {
      console.error('Error deleting user: ', e);
    });
  }

  const onSeeUser = (id) => {
    getUserById(id) 
    .then((response) => {
      setSelectedUser(response);
      setUserInfoModalShow(true);
    })
    .catch((e) => console.log('Hubo un problema: ', e));
  } 

  return (
    <>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Product Type</th>
            <th>Application Status</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Desired Amount</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((application, index) => (
            <tr key={application.id}>
              <td>{productTypeText(application.product_type_id)}</td>
              <td>{getStatusText(application.application_status_id)}</td>
              <td>{application.user}</td>
              <td>{(users[index]?.name) + ' ' + (users[index]?.lastname)}</td> 
              <td>{application.desired_amount}</td>
              <td>{(application.created_at).split('T')[0]}</td>
              <td>{(application.updated_at).split('T')[0]}</td>
              <td className='d-flex flex-row '>
                <Button className="see-user-btn me-2" onClick={() => onSeeUser(application.user)}>See User</Button>
                {application.application_status_id === 1 && (
                  <>
                    <Button className="approved-btn me-2" onClick={() => handleApproveApplication(application)}>{approvedIcon}</Button>
                    <Button className="reject-btn me-2" onClick={() => handleRejectApplication(application)}>{rejectedIcon}</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {userInfoModalShow && selectedUser && (
          <UserInfoModal 
            show={userInfoModalShow}
            onHide={() => setUserInfoModalShow(false)} 
            onUserDeleted= {deleteUserById}
            request={selectedUser} 
          />
        )}

      <div className="d-flex flex-md-row justify-content-between align-items-center mt-3">
        <Form.Group controlId="rowsPerPageSelect" className="mb-3 mb-md-0 rows-number">
          <Form.Label>Filas por página:</Form.Label>
          <Form.Control
            as="select"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            style={{ width: '50px' }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </Form.Control>
        </Form.Group>
        <div className='d-flex flex-row align-items-center '>
          <div className="mb-md-0 me-3">
            {currentPage} / {totalPages}
          </div>

          <Pagination className="mb-0">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};
