const validateField = (name: string, value: string) => {
  let error = "";
  switch (name) {
    case "firstName":
      if (value.length < 6) error = "First name must be at least 6 characters.";
      else if (value.length > 10)
        error = "First name must be no more than 10 characters.";
      else if (!/^[a-zA-Z]+$/.test(value))
        error = "First name must only contain alphabetic characters.";
      break;
    case "lastName":
      if (value.length < 6) error = "Last name must be at least 6 characters.";
      else if (value.length > 10)
        error = "Last name must be no more than 10 characters.";
      else if (!/^[a-zA-Z]+$/.test(value))
        error = "Last name must only contain alphabetic characters.";
      break;
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Email must be valid.";
      break;
    case "phone":
      if (!/^\+94[0-9]{9}$/.test(value))
        error = "Phone number must be a valid Sri Lankan number starting with +94.";
      break;
    default:
      break;
  }
  return error;
};

export { validateField };
