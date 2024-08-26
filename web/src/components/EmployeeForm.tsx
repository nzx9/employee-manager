import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
} from "@mui/material";
import ListViewBtn from "./ListViewBtn";
import { validateField } from "@/utils/validator";

interface EmployeeFormProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonTxt?: string;
  isDisableSubmit?: boolean;
  alertArea?: Readonly<React.ReactNode>;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  gender,
  setGender,
  handleSubmit,
  buttonTxt = "Add",
  isDisableSubmit = false,
  alertArea = null,
}) => {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
  });

  const handleFieldChange =
    (setter: (value: string) => void, name: string) =>
    (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      const value = e.target.value as string;
      setter(value);
      const error = validateField(name, value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mt: 2 }}>
        <ListViewBtn />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 2,
          marginBottom: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 460,
          mx: "auto", 
          bgcolor: "background.paper",
        }}
      >
        <TextField
          label="First Name"
          value={firstName}
          onChange={handleFieldChange(setFirstName, "firstName")}
          fullWidth
          margin="normal"
          required
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={handleFieldChange(setLastName, "lastName")}
          fullWidth
          margin="normal"
          required
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          label="Email"
          value={email}
          onChange={handleFieldChange(setEmail, "email")}
          fullWidth
          margin="normal"
          required
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={handleFieldChange(setPhone, "phone")}
          fullWidth
          margin="normal"
          required
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <FormControl fullWidth margin="normal" error={!!errors.gender}>
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
          {errors.gender && (
            <Box color="error.main" fontSize="0.75rem" mt={1}>
              {errors.gender}
            </Box>
          )}
        </FormControl>
        {alertArea}
        <Button
          variant="outlined"
          type="submit"
          sx={{ mt: 3, width: 120 }}
          disabled={isDisableSubmit || !Object.values(errors).every(error => error === "")}
        >
          {buttonTxt}
        </Button>
      </Box>
    </Container>
  );
};

export default EmployeeForm;
