const passport = require('passport');
const { generateToken } = require('../middleware/auth');
require('../middleware/passport')(passport);
const userModel = require('../models/users.model');

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: 'An error occurred while logging in'
      });
    }

    if (!user) {
      return res.status(401).json({
        message: 'Invalid login credentials'
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: 'An error occurred while logging in'
        });
      }

      const { id, name, role } = user;
      const payload = { userId: id, name, role };
      const token = generateToken(payload);
      res.cookie('token', token, { httpOnly: true });
      return res.status(200).json({ message: 'Login successful', payload });
    });
  })(req, res, next);
};

exports.getUsers = async (req, res) => {
  const result = await userModel.getUsers();
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.getUserById = async (req, res) => {
  const result = await userModel.getUserById(req.params.id);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.getUserByRole = async (req, res) => {
  const result = await userModel.getUserByRole(req.params.id);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.getUserByApplicationId = async (req, res) => {
  const applicationId = parseInt(req.params.application_id)
  const result = await userModel.getUserByApplicationId(applicationId);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.createUser = async (req, res) => {
  const { name, lastname, users_role_id, password, address, email, birthdate, document_number } = req.body;
  const result = await userModel.createUser({ name, lastname, users_role_id, password, address, email, birthdate, document_number });
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.updateUser = async (req, res) => {
  const { name, lastname, password, address, email, birthdate, document_number } = req.body;
  const result = await userModel.updateUser({ name, lastname, password, address, email, birthdate, document_number }, req.params.id);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}

exports.deleteUser = async (req, res) => {
  const result = await userModel.deleteUser(req.params.id);
  if (result.hasError) {
    return res.status(400).json({ message: 'error', result: result.error });
  }
  return res.status(200).json(result.data);
}
