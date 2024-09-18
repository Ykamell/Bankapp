import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { getProductsByUser } from '../../../services/productsServices';

export const UserCards = () => {
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [cards, setCards] = useState([]);

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
      const filteredCards = products.filter(product => 
        product.product_type_id === 1 || product.product_type_id === 2
      );
        
      setCards(filteredCards);
    }
  }, [products]);


  const totalRows = cards.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = cards.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const cardTypeText = (productTypeId) => {
    switch (productTypeId) {
      case 1:
        return 'Credit Card';
      case 2:
        return 'Debit Card';
      default:
        return 'Debit Card';
    }
  };

  return (
    <>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Number</th>
            <th>CVV</th>
            <th>Expiration Year</th>
            <th>Expiration Month</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((card, index) => (
            <tr key={card.id}>
              <td>{cardTypeText(card.product_type_id)}</td>
              <td>{card.amount}</td>
              <td>{card.number}</td>
              <td>{card.cvv}</td>
              <td>{card.expire_year}</td>
              <td>{card.expire_month}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex  flex-md-row justify-content-between mt-3">
        <Form.Group controlId="rowsPerPageSelect" className="mb-3 mb-md-0">
          <Form.Label>Filas por página:</Form.Label>
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