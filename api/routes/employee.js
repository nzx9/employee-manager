const express = require("express");
const router = express.Router();
const validateEmployee = require("../validators/validate");
const { Employee } = require("../libs/db");

/* GET employees listing. */
router.get("/", async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

/* GET employee */
router.get("/:empId", async (req, res) => {
  const { empId } = req.params;
  const employees = await Employee.findById(empId);
  if (employees) res.json(employees);
  else res.status(404).json({ error: "Employee not found" });
});

/* POST create employee. */
router.post("/", async (req, res) => {
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
router.put("/:empId", async (req, res) => {
  const validationResponse = validateEmployee(req.body);

  if (validationResponse !== true) {
    return res.status(400).json({ errors: validationResponse });
  }

  try {
    const { empId } = req.params;
    const employee = await Employee.findById(empId);
    if (employee) {
      const employee_new = await Employee.update(req.body, employee.empid);
      res.json(employee_new);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* DELETE delete employee. */
router.delete("/:empId", async (req, res) => {
  try {
    const { empId } = req.params;
    const employee = await Employee.findById(empId);
    if (employee) {
      await Employee.deleteById(employee.empid);
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
