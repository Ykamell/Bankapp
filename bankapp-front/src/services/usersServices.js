
import { request } from '../utils/https-client';

const getUsers = () => {
  const url = 'users';
  return request(url, 'get').then((response) => {
    const users = response.data;
    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        role: user.users_role_id,
        password: user.password,
        address: user.address,
        email: user.email,
        birthdate: user.birthdate,
        document: user.document_number
      }
    })
  })
  .catch((error) => {
    console.error('Error getUsers: ', error);
    throw error; 
  });
};

const getUserById = (userId) => {
  const url = `users/${userId}`;
  return request(url, 'get').then((response) => {
    const user = response.data[0];
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      role: user.users_role_id,
      password: user.password,
      address: user.address,
      email: user.email,
      birthdate: user.birthdate,
      document: user.document_number
    }
  })
  .catch((error) => {
    console.error('Error getUserById: ', error);
    throw error; 
  });
};

const getUsersByRole = (role_id) => {
  const url = `users/role/${role_id}`;
  return request(url, 'get').then((response) => {
    const users = response.data[0];
    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        role: user.users_role_id,
        password: user.password,
        address: user.address,
        email: user.email,
        birthdate: user.birthdate,
        document: user.document_number
      }
    })
  })
  .catch((error) => {
    console.error('Error getUserByRole: ', error);
    throw error; 
  });
};

const createUser = (data) => {
  const url = 'users';
  return request(url, 'post', data).then((response) => {
    console.log('User created: ', response.data);
    return response.data;
  })
  .catch((error) => {
    console.error('Error createUser: ', error);
    throw error;
  });
};

const updateUser = (userId, updateData) => {
  const url = `users/${userId}`;
  return request(url, 'put', updateData)
    .then((response) => {
      console.log(`User ${userId} updated.`);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error updateUser ${userId}: `, error);
      throw error;
    });
};

const deleteUser = (userId) => {
  const url = `users/${userId}`;
  return request(url, 'delete')
    .then((response) => {
      console.log(`User ${userId} deleted.`);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error deleteUser ${userId}:`, error);
      throw error;
    });
};

export {
  getUsers,
  getUsersByRole,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
