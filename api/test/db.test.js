const { Employee } = require("../libs/db");
const { Client } = require("pg"); 

jest.mock("pg", () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

const _mockEmployee = {
  first_name: "Navindu",
  last_name: "Dananga",
  email: "navindumd@gmail.com",
  gender: "M",
  phone: "+94714170928",
  photo: null,
};

describe("Employee Model", () => {
  let mockClient;

  beforeEach(() => {
    mockClient = new Client(); 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should insert a new employee and return the employee object", async () => {
      const mockEmployee = _mockEmployee;
      const mockResponse = {
        rowCount: 1,
        rows: [{ ...mockEmployee, empId: 1 }],
      };

      mockClient.query.mockResolvedValue(mockResponse); // Mock the query result

      const result = await Employee.create(mockEmployee);

      expect(mockClient.connect).toHaveBeenCalled();
      expect(mockClient.query).toHaveBeenCalledWith(
        "INSERT INTO employees (first_name, last_name, email, gender, phone, photo) VALUES( $1, $2, $3, $4, $5, $6) RETURNING *",
        [
          mockEmployee.first_name,
          mockEmployee.last_name,
          mockEmployee.email,
          mockEmployee.gender,
          mockEmployee.phone,
          mockEmployee.photo,
        ]
      );
      expect(mockClient.end).toHaveBeenCalled();
      expect(result).toEqual(mockResponse.rows[0]);
    });

    it("should return an empty result if the insert fails", async () => {
      const mockEmployee = _mockEmployee;
      const mockResponse = { rowCount: 0, rows: [] };

      mockClient.query.mockResolvedValue(mockResponse);

      const result = await Employee.create(mockEmployee);

      expect(mockClient.query).toHaveBeenCalledWith(
        "INSERT INTO employees (first_name, last_name, email, gender, phone, photo) VALUES( $1, $2, $3, $4, $5, $6) RETURNING *",
        [
          mockEmployee.first_name,
          mockEmployee.last_name,
          mockEmployee.email,
          mockEmployee.gender,
          mockEmployee.phone,
          mockEmployee.photo,
        ]
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("update", () => {
    it("should update an existing employee and return the updated employee", async () => {
      const { photo, ...mockEmployee } = _mockEmployee;

      const empId = 1;

      const mockResponse = {
        rowCount: 1,
        rows: [{ ...mockEmployee, empId }],
      };

      mockClient.query.mockResolvedValue(mockResponse);

      const result = await Employee.update(mockEmployee, empId);

      expect(mockClient.query).toHaveBeenCalledWith(
        "UPDATE employees SET first_name = $1, last_name = $2, email = $3, gender = $4, phone = $5 WHERE empId = $6 RETURNING *",
        [
          mockEmployee.first_name,
          mockEmployee.last_name,
          mockEmployee.email,
          mockEmployee.gender,
          mockEmployee.phone,
          empId,
        ]
      );
      expect(result).toEqual(mockResponse.rows[0]);
    });

    it("should return null if the update fails", async () => {
      const { photo, ...mockEmployee } = _mockEmployee;

      const empId = 1;

      const mockResponse = { rowCount: 0, rows: [] };

      mockClient.query.mockResolvedValue(mockResponse);

      const result = await Employee.update(mockEmployee, empId);

      expect(result).toBeNull();
    });
  });

  describe("findById", () => {
    it("should return an employee if found", async () => {
      const empId = 1;
      const { photo, ...mockEmployee } = _mockEmployee;

      const mockResponse = {
        rowCount: 1,
        rows: [mockEmployee],
      };

      mockClient.query.mockResolvedValue(mockResponse);

      const result = await Employee.findById(empId);

      expect(mockClient.query).toHaveBeenCalledWith(
        "SELECT * FROM employees WHERE empId = $1",
        [empId]
      );
      expect(result).toEqual(mockEmployee);
    });

    it("should return null if the employee is not found", async () => {
      const empId = 1;
      const mockResponse = { rowCount: 0, rows: [] };

      mockClient.query.mockResolvedValue(mockResponse);

      const result = await Employee.findById(empId);

      expect(result).toBeNull();
    });
  });

  describe("findAll", () => {
    it("should return all employees", async () => {
      const mockEmployees = [
        {
          empId: 1,
          first_name: "Navindu",
          last_name: "Dananaga",
          email: "dananga.navidu@gmail.com",
          gender: "M",
          phone: "+94714170928",
        },
        {
          empId: 2,
          first_name: "Dananga",
          last_name: "Navindu",
          email: "navindu.dananga@egmail.com",
          gender: "M",
          phone: "+94714170929",
        },
      ];

      const mockResponse = {
        rows: mockEmployees,
      };

      mockClient.query.mockResolvedValue(mockResponse);

      const result = await Employee.findAll();

      expect(mockClient.query).toHaveBeenCalledWith(
        "SELECT * FROM employees ORDER BY empId",
        undefined
      );
      expect(result).toEqual(mockEmployees);
    });
  });

  describe("deleteById", () => {
    it("should delete an employee by id", async () => {
      const empId = 1;
      const mockResponse = { rowCount: 1 };

      mockClient.query.mockResolvedValue(mockResponse);

      const result = await Employee.deleteById(empId);

      expect(mockClient.query).toHaveBeenCalledWith(
        "DELETE FROM employees WHERE empId = $1",
        [empId]
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
