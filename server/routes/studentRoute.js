const express = require('express');

const studentController = require('../controllers/studentController')
const validator = require('../controllers/userController')
const router = express.Router();

router.post('/add',validator.validateToken, studentController.createStudent );
router.get ('/',  studentController.getAll)
router.put('/update',validator.validateToken, studentController.updateStudent)
router.delete('/:id',validator.validateToken, studentController.deleteStudent)
module.exports = router;