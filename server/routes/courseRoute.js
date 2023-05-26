const express = require('express');
const userController = require('../controllers/userController')
const courseController = require('../controllers/courseController')
const validate = require('../controllers/userController')
const router = express.Router();

router.post('/add',validate.validateToken, courseController.createCourse );
router.get ('/',  courseController.getAll)
router.put('/update',  validate.validateToken, courseController.updateCourse)
router.delete('/:id',  validate.validateToken, courseController.deleteCourse)
module.exports = router;