"use client";

import React, { useEffect } from "react";
import EmployeeForm from "@/components/EmployeeForm";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import AlertBox from "@/components/AlertBox";
import Progress from "@/components/Progress";
import { URL, fetcher, updateEmployee } from "@/utils/fetch";

export default function EditEmployee(ctx: { params: { empId: number } }) {
  const { empId }= ctx.params;

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [gender, setGender] = React.useState("");

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState<"success" | "error">(
    "success"
    );
    
  const { data: employee, error } = useSWR(`${URL}/${empId}`, fetcher);

  useEffect(() => {
    if (employee) {
      setFirstName(employee.first_name);
      setLastName(employee.last_name);
      setEmail(employee.email);
      setPhone(employee.phone);
      setGender(employee.gender);
    }
  }, [employee]);

  const { trigger: updateTrigger, isMutating: isUpdating } = useSWRMutation(
    `${URL}/${empId}`,
    updateEmployee
  );

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const updatedEmployee = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      gender,
      photo: employee.photo
    };

    try {
      await updateTrigger(updatedEmployee);
      setAlertSeverity("success");
      setAlertMessage("Employee updated successfully!");
      setAlertOpen(true);
      console.log("Employee updated successfully");
    } catch (err) {
      setAlertSeverity("error");
      setAlertMessage("Error adding employee: " + String(err));
      setAlertOpen(true);
      console.error("Error updating employee:", err);
    }
  };

  if (error) return <div>Failed to load employee data</div>;
  if (!employee) return <Progress/>;

  return (
    <EmployeeForm
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      phone={phone}
      setPhone={setPhone}
      gender={gender}
      setGender={setGender}
      handleSubmit={handleSubmit}
      buttonTxt="Save"
      isDisableSubmit={isUpdating}
      alertArea={
        <AlertBox
          alertOpen={alertOpen}
          alertMessage={alertMessage}
          alertSeverity={alertSeverity}
          onClose={() => setAlertOpen(false)}
        />
      }
    />
  );
}
