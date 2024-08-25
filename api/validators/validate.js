const Validator = require('fastest-validator');

const v = new Validator();

const employeeSchema = {
  firstName: {
    type: "string",
    min: 6,
    max: 10,
    pattern: "^[a-zA-Z]+$",
    messages: {
      stringMin: "First name must be at least 6 characters.",
      stringMax: "First name must be no more than 10 characters.",
      stringPattern: "First name must only contain alphabetic characters.",
    },
  },
  lastName: {
    type: "string",
    min: 6,
    max: 10,
    pattern: "^[a-zA-Z]+$",
    messages: {
      stringMin: "Last name must be at least 6 characters.",
      stringMax: "Last name must be no more than 10 characters.",
      stringPattern: "Last name must only contain alphabetic characters.",
    },
  },
  email: {
    type: "email",
    messages: {
      email: "Email must be valid.",
    },
  },
  phoneNumber: {
    type: "string",
    pattern: "^\\+94[0-9]{9}$",
    messages: {
      stringPattern: "Phone number must be a valid Sri Lankan phone number.",
    },
  },
  gender: {
    type: "enum",
    values: ["M", "F"],
    messages: {
      enumValue: "Gender must be either 'M' or 'F'.",
    },
  },
};

const validateEmployee = v.compile(employeeSchema);

module.exports = validateEmployee;
