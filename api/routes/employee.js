const express = require('express');
const router = express.Router();
const { Employee } = require('../models');
const validateEmployee = require('../validators/validate');

/* GET employees listing. */
router.get('/', async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

/* POST create employee. */
router.post('/', async (req, res) => {
  const validationResponse = validateEmployee(req.body);

  if (validationResponse !== true) {
    return res.status(400).json({ errors: validationResponse });
  }

  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* PUT update employee. */
router.put('/:empId', async (req, res) => {
  const validationResponse = validateEmployee(req.body);

  if (validationResponse !== true) {
    return res.status(400).json({ errors: validationResponse });
  }

  try {
    const { empId } = req.query;
    const employee = await Employee.findByPk(empId);
    if (employee) {
      await employee.update(req.body);
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* DELETE delete employee. */
router.delete('/:empId', async (req, res) => {
  try {
    const { empId } = req.body;
    const employee = await Employee.findByPk(empId);
    if (employee) {
      await employee.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;