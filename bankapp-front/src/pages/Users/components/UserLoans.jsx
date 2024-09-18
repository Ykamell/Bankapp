import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { getProductsByUser } from '../../../services/productsServices';

export const UserLoans = () => {
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loans, setLoans] = useState([]);

  const currentUserId = localStorage.getItem('userId');
  
  useEffect(() => {
    getProductsByUser(currentUserId)
    .then((response) => {
      setProducts(response); 
    })
    .catch(error => {
      console.error("Error fetching user data:", error);
    });    
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filteredLoans = products.filter(product => 
        product.product_type_id === 3 );
        
      setLoans(filteredLoans);
    }
  }, [products]);

  const totalRows = loans.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = loans.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Table responsive="sm">
      <thead>
          <tr>
            <th>Amount</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((loan, index) => (
            <tr key={loan.id}>
              <td>{loan.amount}</td>
              <td>{loan.number}</td>
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
