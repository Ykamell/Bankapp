import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { getApplicationsByUser } from '../../../services/applicationsServices';

export const UserApplications = (refreshApplication) => {
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [applications, setApplications] = useState([]);

  const currentUserId = localStorage.getItem('userId');
  
  const refreshApplications = () => {
    getApplicationsByUser(currentUserId)
    .then((response) => {
      setApplications(response); 
    })
    .catch((e) => console.log('Error: ', e));
  };

  useEffect(() => {
    getApplicationsByUser(currentUserId)
    .then((response) => {
      setApplications(response); 
    })
    .catch(error => {
      console.error("Error fetching user data:", error);
    });    
  }, []);

  useEffect(() => {
    refreshApplications()
  }, [refreshApplication])

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

  const getStatusText = (statusId) => {
    switch (statusId) {
      case 2:
        return 'Approved';
      case 3:
        return 'Rejected';
      default:
        return 'Pending';    }
  };

  return (
    <>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Product Type</th>
            <th>Desired Amount</th>
            <th>Application Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((application, index) => (
            <tr key={application.id}>
              <td>{productTypeText(application.product_type_id)}</td>
              <td>{application.desired_amount}</td>
              <td>{getStatusText(application.application_status_id)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex  flex-md-row justify-content-between mt-3">
        <Form.Group controlId="rowsPerPageSelect" className="mb-3 mb-md-0">
          <Form.Label>Rows per page:</Form.Label>
          <Form.Control
            as="select"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            style={{ width: '100px' }}
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