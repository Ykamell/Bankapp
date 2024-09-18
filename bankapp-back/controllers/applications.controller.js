const passport = require('passport');
require('../middleware/passport')(passport);
const applicationsModel = require('../models/applications.model');


exports.getApplications = async (req, res) => {
  const result = await applicationsModel.getApplications();
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
  const { product_type_id, user_id, admin_user_id, desired_amount } = req.body;
  const result = await applicationsModel.createApplication({ product_type_id, user_id, admin_user_id, desired_amount });
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.updateApplication = async (req, res) => {
  const { product_type_id, admin_user_id, application_status_id, desired_amount } = req.body;
  const result = await applicationsModel.updateApplication({ product_type_id, admin_user_id, application_status_id, desired_amount }, req.params.id);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}
