const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applications.controller');

router.get('/applications', applicationsController.getApplications)
router.get('/applications/:id', applicationsController.getApplicationById)
router.get('/applications/users/:user_id', applicationsController.getApplicationsByUser)
router.post('/applications', applicationsController.createApplication)
router.put('/applications/:id', applicationsController.updateApplication)

module.exports = router;
