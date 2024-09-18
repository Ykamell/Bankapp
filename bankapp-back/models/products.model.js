const dbConfig = require('../db-config');

const getProducts = () => {
  const result = dbConfig.query('SELECT * FROM products ORDER BY id ASC')
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const getProductById = (productId) => {
  const result = dbConfig.query('SELECT * FROM products WHERE id = $1', [productId])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const getProductsByUser = (userId) => {
  const result = dbConfig.query('SELECT * FROM products WHERE user_id = $1', [userId])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const createProduct = ({ application_id, user_id, product_type_id, amount, cvv, expire_year, expire_month }) => {
  const result = dbConfig.query('INSERT INTO products (application_id, user_id, product_type_id, amount, cvv, expire_year, expire_month) VALUES ($1, $2, $3, $4, $5, $6, $7)', [application_id, user_id, product_type_id, amount, cvv, expire_year, expire_month])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const updateProduct = ({ amount, expire_year, expire_month }, id) => {
  const result = dbConfig.query(
    'UPDATE products SET amount = $1, expire_year = $2, expire_month = $3 WHERE id = $4',
    [amount, expire_year, expire_month, id])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

const deleteProduct = (productId) => {
  const result = dbConfig.query(
    'DELETE FROM products WHERE id = $1',
    [productId])
    .then((data) => ({ hasError: false, data: data.rows }))
    .catch((error) => ({ hasError: true, error }));
    return result;
}

module.exports = {
  getProducts,
  getProductById,
  getProductsByUser,
  createProduct,
  updateProduct,
  deleteProduct
}
