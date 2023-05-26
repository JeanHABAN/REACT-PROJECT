const express = require('express');

const trainerController = require('../controllers/trainerController')
const validator = require('../controllers/userController')
const router = express.Router();

router.post('/add', validator.validateToken, trainerController.createTrainer );
router.get ('/',  trainerController.getAll)
router.put('/update',validator.validateToken, trainerController.updateTrainer)
router.delete('/:id',validator.validateToken, trainerController.deleteTeacher)
module.exports = router;