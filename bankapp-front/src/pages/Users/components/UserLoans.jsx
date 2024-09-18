import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';

export const UserLoans = () => {
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const data = [
    { id: 1, name: 'Table cell 1' },
    { id: 2, name: 'Table cell 2' },
    { id: 3, name: 'Table cell 3' },
    { id: 4, name: 'Table cell 4' },
    { id: 5, name: 'Table cell 5' },
    { id: 6, name: 'Table cell 6' },
    { id: 7, name: 'Table cell 7' },
    { id: 8, name: 'Table cell 8' },
    { id: 9, name: 'Table cell 9' },
    { id: 10, name: 'Table cell 10' },
  ];

  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

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
            <th>#</th>
            <th>Row Name</th>
            <th>Edad</th>
            <th>Otro</th>
            <th>Saldo</th>
            <th>Si</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>23</td>
              <td>Otro</td>
              <td>0</td>
              <td>No</td>
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
