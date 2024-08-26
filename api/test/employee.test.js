const request = require("supertest");
const express = require("express");
const router = require("../routes/employee");
const { Employee } = require("../libs/db");

const app = express();
app.use(express.json());
app.use("/employees", router);

jest.mock("../libs/db", () => ({
  Employee: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deleteById: jest.fn(),
  },
}));

const sampleEmployee = {
  first_name: "Navindu",
  last_name: "Dananga",
  email: "navindu@gmail.com",
  phone: "+94714170928",
  gender: "M",
};

describe("Employee API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /employees should return all employees", async () => {
    const mockEmployees = [
      { id: 1, ...sampleEmployee },
      { id: 2, ...sampleEmployee },
    ];
    Employee.findAll.mockResolvedValue(mockEmployees);

    const response = await request(app).get("/employees");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockEmployees);
  });

  test("GET /employees/:empId should return a specific employee", async () => {
    const mockEmployee = { id: 1, ...sampleEmployee };
    Employee.findById.mockResolvedValue(mockEmployee);

    const response = await request(app).get("/employees/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockEmployee);
  });

  test("GET /employees/:empId should return 404 if employee not found", async () => {
    Employee.findById.mockResolvedValue(null);

    const response = await request(app).get("/employees/1");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "Employee not found" });
  });

  test("POST /employees should create a new employee", async () => {
    const createdEmployee = { id: 1, ...sampleEmployee };
    Employee.create.mockResolvedValue(createdEmployee);

    const response = await request(app).post("/employees").send(sampleEmployee);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(createdEmployee);
  });

  test("POST /employees should return 400 if validation fails", async () => {
    const newEmployee = sampleEmployee;
    sampleEmployee.first_name = "";

    const validationErrors = [
      {
        actual: 0,
        expected: 6,
        field: "first_name",
        message: "First name must be at least 6 characters.",
        type: "stringMin",
      },
      {
        actual: "",
        expected: "/^[a-zA-Z]+$/",
        field: "first_name",
        message: "First name must only contain alphabetic characters.",
        type: "stringPattern",
      },
    ];

    jest.mock("../validators/validate", () => jest.fn(() => validationErrors));

    const response = await request(app).post("/employees").send(newEmployee);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ errors: validationErrors });
  });

  test("PUT /employees/:empId should update an existing employee", async () => {
    const updatedEmployee = sampleEmployee;
    updatedEmployee.first_name = "Updated";

    Employee.findById.mockResolvedValue({ id: 1, ...updatedEmployee });
    Employee.update.mockResolvedValue(updatedEmployee);

    const response = await request(app)
      .put("/employees/1")
      .send(updatedEmployee);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedEmployee);
  });

  test("PUT /employees/:empId should return 404 if employee not found", async () => {
    const updatedEmployee = sampleEmployee;

    Employee.findById.mockResolvedValue(null);

    const response = await request(app)
      .put("/employees/999")
      .send(updatedEmployee);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "Employee not found" });
  });

  test("DELETE /employees/:empId should delete an employee", async () => {
    Employee.findById.mockResolvedValue({ id: 1, name: "John Doe" });
    Employee.deleteById.mockResolvedValue(true);

    const response = await request(app).delete("/employees/1");

    expect(response.statusCode).toBe(204);
  });

  test("DELETE /employees/:empId should return 404 if employee not found", async () => {
    Employee.findById.mockResolvedValue(null);

    const response = await request(app).delete("/employees/1");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "Employee not found" });
  });
});
