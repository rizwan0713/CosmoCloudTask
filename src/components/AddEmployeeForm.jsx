import React, { useState } from "react";
import toast from "react-hot-toast";

const AddEmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: "",
    address: {
      line1: "",
      city: "",
      country: "",
      zipCode: "",
    },
    contactMethods: {
      contactMethod: "email",
      value: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      address: {
        ...prevEmployee.address,
        [name]: value,
      },
    }));
  };

  const handleContactMethodChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      contactMethods: {
        ...prevEmployee.contactMethods,
        [name]: value,
      },
    }));
  };

  const sendingData = async () => {
    try {
      console.log("employee data: ", employee);
      const response = await fetch(
        "https://free-ap-south-1.cosmocloud.io/development/api/employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "environmentId": process.env.REACT_APP_ENVIRONMENTID,
            "projectId": process.env.REACT_APP_PROJECTID,
          },
          body: JSON.stringify(employee),
        }
      );
      const data = await response.json();

      if (data?.id) {
        toast.success("Employee Added Successfully");
      }

      setEmployee({
        name: "",
        address: {
          line1: "",
          city: "",
          country: "",
          zipCode: "",
        },
        contactMethods: {
          contactMethod: "email",
          value: "",
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add employee");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendingData();
    console.log(employee);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Employee Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            placeholder="Enter Employee Name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="line1"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 1:
          </label>
          <input
            type="text"
            id="line1"
            name="line1"
            value={employee.address.line1}
            onChange={handleAddressChange}
            className="border border-gray-300 p-2 w-full"
            placeholder="Enter Address Line 1"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={employee.address.city}
            onChange={handleAddressChange}
            className="border border-gray-300 p-2 w-full"
            placeholder="Enter City"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={employee.address.country}
            onChange={handleAddressChange}
            className="border border-gray-300 p-2 w-full"
            placeholder="Enter Country"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700"
          >
            Zip Code:
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={employee.address.zipCode}
            onChange={handleAddressChange}
            className="border border-gray-300 p-2 w-full"
            placeholder="Enter Zip Code"
          />
        </div>
        <div className="mb-4">
          <div className="mb-2">
            <label
              htmlFor="contactMethod"
              className="block text-sm font-medium text-gray-700"
            >
              Choose contact method:
            </label>
            <select
              name="contactMethod"
              id=""
              value={employee.contactMethods.contactMethod}
              onChange={handleContactMethodChange}
            >
              <option value="email">Email</option>
              <option value="phone">Phone number</option>
            </select>
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {employee.contactMethods.contactMethod === "email"
                ? "Enter Email"
                : "Enter Phone Number"}
            </label>
            <input
              type={
                employee.contactMethods.contactMethod === "email"
                  ? "email"
                  : "text"
              }
              id="email"
              name="value"
              value={employee.contactMethods.value}
              onChange={handleContactMethodChange}
              className="border border-gray-300 p-2 w-full"
              placeholder={
                employee.contactMethods.contactMethod === "email"
                  ? "Enter Email"
                  : "Enter Phone Number"
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className=" bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
