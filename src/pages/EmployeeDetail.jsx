import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaBackward } from "react-icons/fa";

const EmployeeDetail = () => {
  const navigate = useNavigate();
  const { empId } = useParams();

  const [employee, setEmployee] = useState(null);

  const getEmployeeData = async () => {
    try {
      const response = await fetch(
        `https://free-ap-south-1.cosmocloud.io/development/api/employee/${empId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
           "environmentId": process.env.REACT_APP_ENVIRONMENTID,
            "projectId": process.env.REACT_APP_PROJECTID,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (result._id) {
        setEmployee(result);
        toast.success("Employee Data fetch successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch employee");
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  return (
    <section className="text-white w-full min-h-screen flex justify-center items-center flex-col gap-8">
      <h2 className="text-6xl font-semibold text-indigo-600">
        Details of {employee?.name}
      </h2>
      <div className=" bg-[#121721] text-[1.2rem] border border-blue-400 w-[90%] max-w-[30rem] py-3 px-5 rounded-lg flex flex-col gap-3">
        <div className="flex items-center">
          <span className="text-[1.4rem] flex-1">Name : </span>
          <span className="flex-1">{employee?.name}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[1.4rem] bg-gray-500  px-2 w-fit rounded-md">
            Address :{" "}
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <span className="flex-1">Line 1 : </span>
              <span className="flex-1">{employee?.address?.line1}</span>
            </div>
            <div className="flex items-center">
              <span className="flex-1">City : </span>
              <span className="flex-1">{employee?.address?.city}</span>
            </div>
            <div className="flex items-center">
              <span className="flex-1">Country : </span>
              <span className="flex-1">{employee?.address?.country}</span>
            </div>
            <div className="flex items-center">
              <span className="flex-1">ZipCode : </span>
              <span className="flex-1">{employee?.address?.zipCode}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-[1.4rem] flex-1">Contact : </span>
          <span className="flex-1">{employee?.contactMethods?.value}</span>
        </div>

        <button
          className="mt-4 font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700 flex items-center gap-3"
          onClick={() => {
            navigate(-1);
          }}
        >
          <FaBackward />
          Back to all Employee List
        </button>
      </div>
    </section>
  );
};

export default EmployeeDetail;
