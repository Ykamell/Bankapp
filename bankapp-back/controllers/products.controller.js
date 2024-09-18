const passport = require('passport');
require('../middleware/passport')(passport);
const productsModel = require('../models/products.model');


exports.getProducts = async (req, res) => {
  const result = await productsModel.getProducts();
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.getProductById = async (req, res) => {
  const result = await productsModel.getProductById(req.params.id);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.getProductsByUser = async (req, res) => {
  const result = await productsModel.getProductsByUser(req.params.user_id);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.createProduct = async (req, res) => {
  const { application_id, user_id, product_type_id, amount, cvv, expire_year, expire_month } = req.body;
  const result = await productsModel.createProduct({ application_id, user_id, product_type_id, amount, cvv, expire_year, expire_month });
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.updateProduct = async (req, res) => {
  const { amount, expire_year, expire_month } = req.body;
  const result = await productsModel.updateProduct({ amount, expire_year, expire_month }, req.params.id);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.deleteProduct = async (req, res) => {
  const result = await productsModel.deleteProduct(req.params.id);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}
