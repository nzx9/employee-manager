const Validator = require("fastest-validator");

const v = new Validator();

const employeeSchema = {
  first_name: {
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
  last_name: {
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
  phone: {
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
  photo: {
    type: "string",
    optional: true,
    pattern:
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    messages: {
      stringPattern: "Must be a valid url",
    },
  },
};

const validateEmployee = v.compile(employeeSchema);

module.exports = validateEmployee;
