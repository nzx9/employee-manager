const validateEmployee = require("../validators/validate");

describe("validateEmployee", () => {
  test("should pass validation with valid data", () => {
    const validData = {
      first_name: "Navindu",
      last_name: "Dananga",
      email: "navindu@gmail.com",
      phone: "+94714170928",
      gender: "M",
      photo: "https://example.com/photo.jpg",
    };

    const result = validateEmployee(validData);

    expect(result).toBe(true);
  });

  test("should fail validation if first_name is too short", () => {
    const invalidData = {
      first_name: "Nav",
      last_name: "Dananga",
      email: "navindu@gmail.com",
      phone: "+94714170928",
      gender: "M",
    };

    const result = validateEmployee(invalidData);

    expect(result).toEqual([
      {
        actual: 3,
        expected: 6,
        field: "first_name",
        message: "First name must be at least 6 characters.",
        type: "stringMin",
      },
    ]);
  });

  test("should fail validation if first_name contains non-alphabetic characters", () => {
    const invalidData = {
      first_name: "Navindu1",
      last_name: "Dananga",
      email: "navindu@gmail.com",
      phone: "+94714170928",
      gender: "M",
    };

    const result = validateEmployee(invalidData);

    expect(result).toEqual([
      {
        actual: "Navindu1",
        expected: "/^[a-zA-Z]+$/",
        field: "first_name",
        message: "First name must only contain alphabetic characters.",
        type: "stringPattern",
      },
    ]);
  });

  test("should fail validation if email is invalid", () => {
    const invalidData = {
      first_name: "Navindu",
      last_name: "Dananga",
      email: "navindu@invalid",
      phone: "+94714170928",
      gender: "M",
    };

    const result = validateEmployee(invalidData);

    expect(result).toEqual([
      {
        actual: "navindu@invalid",
        field: "email",
        message: "Email must be valid.",
        type: "email",
      },
    ]);
  });

  test("should fail validation if phone number is invalid", () => {
    const invalidData = {
      first_name: "Navindu",
      last_name: "Dananga",
      email: "navindu@gmail.com",
      phone: "0714170928", // Invalid phone number, should be +94XXXXXXXXX
      gender: "M",
    };

    const result = validateEmployee(invalidData);

    expect(result).toEqual([
      {
        actual: "0714170928",
        expected: "/^+94[0-9]{9}$/",
        field: "phone",
        message: "Phone number must be a valid Sri Lankan phone number.",
        type: "stringPattern",
      },
    ]);
  });

  test("should fail validation if gender is not M or F", () => {
    const invalidData = {
      first_name: "Navindu",
      last_name: "Dananga",
      email: "navindu@gmail.com",
      phone: "+94714170928",
      gender: "X", // Invalid gender
    };

    const result = validateEmployee(invalidData);

    expect(result).toEqual([
      {
        actual: "X",
        expected: "M, F",
        field: "gender",
        message: "Gender must be either 'M' or 'F'.",
        type: "enumValue",
      },
    ]);
  });

  test("should fail validation if photo URL is invalid", () => {
    const invalidData = {
      first_name: "Navindu",
      last_name: "Dananga",
      email: "navindu@gmail.com",
      phone: "+94714170928",
      gender: "M",
      photo: "htp://example.com/photo.jpg", // Invalid URL
    };

    const result = validateEmployee(invalidData);

    expect(result).toEqual([
      {
        actual: "htp://example.com/photo.jpg",
        expected:
          "/^(https?://)?((([a-zd]([a-zd-]*[a-zd])*).)+[a-z]{2,}|((d{1,3}.){3}d{1,3}))(:d+)?(/[-a-zd%_.~+]*)*(?[;&a-zd%_.~+=-]*)?(#[-a-zd_]*)?$/",
        field: "photo",
        message: "Must be a valid url",
        type: "stringPattern",
      },
    ]);
  });
});
