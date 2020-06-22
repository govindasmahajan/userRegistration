const express = require('express');
const router = express.Router();
const empController = require('../controller/employees');

router.post('/add', empController.addEmployee);
router.get('/all', empController.getAllEmployees);
router.get('/:empId', empController.getById);
router.put('/:empId', empController.updateById);
router.delete('/:empId', empController.deleteById);

module.exports = router;