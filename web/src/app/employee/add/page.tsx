"use client";

import React from "react";
import EmployeeForm from "@/components/EmployeeForm";
import useSWRMutation from "swr/mutation";
import { URL, addEmployee } from "@/utils/fetch";
import { NewEmployee } from "@/types/employee";
import AlertBox from "@/components/AlertBox";

export default function AddEmployee() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [gender, setGender] = React.useState("M");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState<"success" | "error">(
    "success"
  );

  const {
    trigger,
    isMutating: isAdding,
    error,
  } = useSWRMutation(
    URL,
    addEmployee
  );

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const newEmployee: NewEmployee = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      gender,
    };

    try {
      await trigger(newEmployee);

      setAlertSeverity("success");
      setAlertMessage("Employee added successfully!");
      setAlertOpen(true);

      console.log("Employee added successfully");

      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setGender("");
    } catch (err) {
      setAlertSeverity("error");
      setAlertMessage("Error adding employee: " + String(err));
      setAlertOpen(true);
      console.error("Error adding employee:", err);
    }
  };

  return (
    <>
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
        isDisableSubmit={isAdding}
        alertArea={
          <AlertBox
            alertOpen={alertOpen}
            alertMessage={alertMessage}
            alertSeverity={alertSeverity}
            onClose={() => setAlertOpen(false)}
          />
        }
      />
    </>
  );
}
