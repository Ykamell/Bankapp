const dbConfig = require('../db-config');

const getUserByEmail = (email) => {
  const result = dbConfig.query('select u.*, ur.name as role from users u inner join users_role ur on ur.id = u.users_role_id where u.email = $1 LIMIT 1', [email])
    .then((data) => ({ hasError: false, data: data.rows[0] }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const getUsers = () => {
  const result = dbConfig.query('SELECT * FROM users ORDER BY id ASC')
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const getUserById = (userId) => {
  const result = dbConfig.query('SELECT * FROM users WHERE id = $1', [userId])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const getUserByRole = (role) => {
  const result = dbConfig.query('SELECT * FROM users WHERE users_role_id = $1', [role])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const getUserByApplicationId = (applicationId) => {
  const result = dbConfig.query('SELECT users.* FROM users JOIN applications ON users.id = applications.user_id WHERE applications.id = $1', 
    [applicationId])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const createUser = ({ name, lastname, users_role_id, password, address, email, birthdate, document_number }) => {
  const result = dbConfig.query('INSERT INTO users (name, lastname, users_role_id, password, address, email, birthdate, document_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [name, lastname, users_role_id, password, address, email, birthdate, document_number])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const updateUser = ({ name, lastname, password, address, email, birthdate, document_number }, id) => {
  const result = dbConfig.query(
    'UPDATE users SET name = $1, lastname = $2, password = $3, address = $4, email = $5, birthdate = $6, document_number = $7 WHERE id = $8',
    [name, lastname, password, address, email, birthdate, document_number, id])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const deleteUser = (userId) => {
  const result = dbConfig.query(
    'DELETE FROM users WHERE id = $1',
    [userId])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

module.exports = {
  getUserByEmail,
  getUsers,
  getUserByRole,
  getUserByApplicationId,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
