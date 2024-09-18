const dbConfig = require('../db-config');

const getApplications = () => {
  const result = dbConfig.query('SELECT * FROM applications ORDER BY id ASC')
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const getApplicationById = (applicationId) => {
  const result = dbConfig.query('SELECT * FROM applications WHERE id = $1', [applicationId])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const getApplicationsByUser = (userId) => {
  const result = dbConfig.query('SELECT * FROM applications WHERE user_id = $1', [userId])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const createApplication = ({ product_type_id, user_id, admin_user_id, desired_amount }) => {
  const result = dbConfig.query('INSERT INTO applications (product_type_id, user_id, admin_user_id, desired_amount) VALUES ($1, $2, $3, $4)', [product_type_id, user_id, admin_user_id, desired_amount])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const updateApplication = ({ product_type_id, admin_user_id, application_status_id, desired_amount }) => {
  const updated_at = new Date();
  const result = dbConfig.query(
    'UPDATE applications SET product_type_id = $1, admin_user_id = $2, application_status_id = $3, desired_amount = $4, updated_at = $5 WHERE id = $6',
    [product_type_id, admin_user_id, application_status_id, desired_amount, updated_at, id])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

module.exports = {
  getApplications,
  getApplicationById,
  getApplicationsByUser,
  createApplication,
  updateApplication
}
