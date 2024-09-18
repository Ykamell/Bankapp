import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { VerticalModal } from '../../Modal/Modal';
import { UserInfoModal } from './UserInfoModal';
import './UserManagement.css'
import { deleteUser, getUserById, getUsers } from '../../../services/usersServices';

export const UsersManagement = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [addUserModalShow, setAddUserModalShow] = React.useState(false);
  const [userInfoModalShow, setUserInfoModalShow] = React.useState(false);
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState({})

  const deleteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
    </svg>
  );
 
  const totalRows = users.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = users.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const refreshUsers = () => {
    getUsers()
      .then((response) => {
        setUsers(response);
      })
      .catch((e) => console.log('Error: ', e));
  };

  useEffect(() => {
    refreshUsers();
  }, []); 

  const onSeeMore = (id) => {
    getUserById(id) 
    .then((response) => {
      setSelectedUser(response);
      setUserInfoModalShow(true);
    })
    .catch((e) => console.log('Hubo un problema: ', e));
  } 

  const deleteUserById = (id) => {
    deleteUser(id)
    .then(() => {
      refreshUsers(); 
    })
    .catch((e) => {
      console.error('Error deleting user: ', e);
    });
  }

  return (
    <>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Role</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Document Number</th>
            <th>Birthdate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((user, index) => (
            <tr key={user.id}>
              <td>{user.role === 1 ? 'User' : 'Admin'}</td>
              <td>{user.name} {user.lastname}</td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.document}</td>
              <td>{(user.birthdate).split('T')[0]}</td>
              <td className='d-flex flex-row '><Button className="see-more-btn me-2" onClick={() => onSeeMore(user.id)}>See more</Button> <Button onClick={() => deleteUserById(user.id)}> { deleteIcon } </Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex  flex-md-row justify-content-between  align-items-center mt-3">

        <Button className="add-user-btn" onClick={() => setAddUserModalShow(true)}>Add User</Button>
        <VerticalModal
          show={addUserModalShow}
          onHide={() => setAddUserModalShow(false)} 
          onUserAdded= {refreshUsers}
          request="Create User"
        />

        {userInfoModalShow && selectedUser && (
          <UserInfoModal 
            show={userInfoModalShow}
            onHide={() => setUserInfoModalShow(false)} 
            onUserDeleted= {deleteUserById}
            onUserUpdated= {refreshUsers}
            request={selectedUser} 
          />
        )}

        <Form.Group controlId="rowsPerPageSelect" className="mb-3 mb-md-0 rows-number">
          <Form.Label>Rows per page:</Form.Label>
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
}
