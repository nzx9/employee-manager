import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Employee } from "@/types/employee";
import Link from "next/link";


type EmployeeTableProps = {
  employees: Employee[];
  handleDelete: (employee: Employee) => void;
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, handleDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table aria-label="employee table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <strong>Image</strong>
            </TableCell>
            <TableCell align="center">
              <strong>First Name</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Last Name</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Email</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Phone</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Gender</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee: Employee, index: number) => (
            <TableRow key={index}>
              <TableCell align="center">
                <Box
                  sx={{ display: "flex", justifyContent: "center"}}
                >
                  <Avatar
                    alt={employee.first_name}
                    src={employee.photo}
                    variant="square"
                  />
                </Box>
              </TableCell>
              <TableCell align="center">{employee.first_name}</TableCell>
              <TableCell align="center">{employee.last_name}</TableCell>
              <TableCell align="center">{employee.email}</TableCell>
              <TableCell align="center">{employee.phone}</TableCell>
              <TableCell align="center">{employee.gender === "M" ? "Male": "Female"}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  sx={{ marginRight: 1 }}
                  LinkComponent={Link}
                  href={`/employee/edit/${employee.empid}`} 
                >
                  Edit
                </Button>
                <IconButton aria-label="delete" color="error" onClick={() => handleDelete(employee)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
