const passport = require('passport');
require('../middleware/passport')(passport);
const applicationsModel = require('../models/applications.model');


exports.getApplications = async (req, res) => {
  const result = await applicationsModel.getProducts();
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.getApplicationById = async (req, res) => {
  const result = await applicationsModel.getApplicationById(req.params.id);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.getApplicationsByUser = async (req, res) => {
  const result = await applicationsModel.getApplicationsByUser(req.params.user_id);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.createApplication = async (req, res) => {
  const { application_id, user_id, product_type_id, amount, cvv, expire_year, expire_month } = req.body;
  const result = await applicationsModel.createApplication({ application_id, user_id, product_type_id, amount, cvv, expire_year, expire_month });
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.updateApplication = async (req, res) => {
  const { amount, expire_year, expire_month } = req.body;
  const result = await applicationsModel.updateApplication({ amount, expire_year, expire_month });
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}
