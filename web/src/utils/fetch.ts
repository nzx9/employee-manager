import { NewEmployee, NewEmployee as UpdateEmployee } from "@/types/employee";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/employee`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const addEmployee = async (url: string,{ arg }: { arg: NewEmployee }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  return response.json(); 
};

const updateEmployee = async (url: string,{ arg }: { arg:  UpdateEmployee }) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  return response.json();
};

const deleteEmployee = async (empid: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/${empid}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      return true; 
    } else if (response.status === 400) {
      throw new Error(`Failed to delete employee with ID ${empid}.`);
    } else if (response.status === 404) {
      throw new Error(`Employee not found  with ID ${empid}.`);
    }
  } catch (error: unknown) {
    throw new Error('An error occurred while deleting the employee:' +  String(error));
  }
};

export { URL, fetcher, addEmployee, updateEmployee, deleteEmployee };