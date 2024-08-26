const validEmpId = (empId) => {
  const _empId = Number(empId);
  if (isNaN(_empId)) throw new Error("Invalid empId. empId shoud be a number");
  else return _empId;
};

module.exports = { validEmpId };
