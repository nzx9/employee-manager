import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardMedia,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Employee } from "@/types/employee";
import Link from "next/link";

type EmployeeCardProps = {
  employee: Employee,
  handleDelete: () => void,

};

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee, handleDelete
}) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 2, borderRadius: 3 }}>
      <CardMedia
        sx={{ height: 180 }}
        image={employee.photo}
        title={employee.first_name}
      />
      <CardContent>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
        {`${employee.first_name} ${employee.last_name}`}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ textAlign: "center" }}
        >
          <Link href={`mailto:employee.email`}>{employee.email}</Link>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ textAlign: "center" }}
        >
          {employee.phone}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ textAlign: "center" }}
        >
          {employee.gender === "M" ? "Male": "Female"}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon sx={{ color: "red" }} />
        </IconButton>
        <IconButton aria-label="edit" LinkComponent={Link}  href={`/employee/edit/${employee.empid}`} >
          <EditIcon sx={{ color: "green" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EmployeeCard;
