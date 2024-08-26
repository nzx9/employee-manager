"use client";

import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  Grid,
  Box,
  Fab,
  Button,
} from "@mui/material";
import EmployeeCard from "@/components/EmployeeCard";
import EmployeeTable from "@/components/EmployeeTable"; 
import {
  Add as AddIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Employee } from "@/types/employee";
import Progress from "@/components/Progress";
import ConfirmDialog from "@/components/ConfirmDialog";
import { URL, fetcher, deleteEmployee } from "@/utils/fetch";

const EmployeeList = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const router = useRouter();

  // Use SWR to fetch employee data
  const { data: employees, error } = useSWR(URL, fetcher);

  if (error) return <div>Failed to load employees</div>;
  if (!employees) return <Progress/>;

  const toggleView = () => {
    if (viewMode === "grid") {
      setViewMode("table");
    } else {
      setViewMode("grid");
    }
  };

  const handleAddEmployee = () => {
    router.push("/employee/add");
  };

  const handleOpen = (employee: Employee) => {
    setOpen(true);
    setSelectedEmployee(employee);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (selectedEmployee) {
      const success = await deleteEmployee(selectedEmployee.empid);
      if (success) {
        await mutate(URL);
      }
      handleClose();
    }
  };

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 10, marginRight: 2 }}
            onClick={handleAddEmployee}
          >
            ADD EMPLOYEE
          </Button>
          <Fab
            color="primary"
            aria-label="toggle view"
            onClick={toggleView}
            size="small"
          >
            {viewMode === "grid" ? <ViewListIcon /> : <ViewModuleIcon />}
          </Fab>
        </Box>
        {viewMode === "table" ? (
          <EmployeeTable employees={employees} handleDelete={handleOpen}/>
        ) : (
          <Grid container spacing={2}>
            {employees.map((employee: Employee, index: number) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <EmployeeCard employee={employee} handleDelete={() => handleOpen(employee)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <ConfirmDialog
        open={open}
        title="Delete Employee?"
        description={`Are you sure you want to delete ${selectedEmployee?.first_name} ${selectedEmployee?.last_name}?`}
        onConfirm={handleDelete}
        onCancel={handleClose}
      />
    </>
  );
};

export default EmployeeList;
