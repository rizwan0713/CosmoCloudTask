import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import toast from "react-hot-toast";

const HomePage = () => {
  const [empData, setEmpData] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);

  async function handleDeleteEmployee(empId) {
    try {

      const DeleteEmployee = await fetch(
        `https://free-ap-south-1.cosmocloud.io/development/api/employee/${empId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "environmentId": process.env.REACT_APP_ENVIRONMENTID,
            "projectId": process.env.REACT_APP_PROJECTID,
          },
          body: JSON.stringify({}),
        }
      );
      const data = await DeleteEmployee.json();
       
      toast.success("Employee Deleted Successfully")
      getAllData();
      setConfirmationModal(null);
    } catch (error) {
      toast.error("Employee Deleted Successfully")

      console.log("Error in Deleting Employee - ", error.message);
    }
  }

  const getAllData = async () => {
    try {
      const getPeople = await fetch(
        `https://free-ap-south-1.cosmocloud.io/development/api/employee?limit=20&offset=0`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "environmentId": process.env.REACT_APP_ENVIRONMENTID,
            "projectId": process.env.REACT_APP_PROJECTID,
          },
        }
      );
      const data = await getPeople.json();
      setEmpData(data?.data);
      if(data?.data.length > 0){
        toast.success("Employee List Fetched Successfully")
      }
      else{
        toast.success("Employee list is empty");
      }
    } catch (error) {
      toast.error("Error While getting Employee List")
      console.log("Error While getting Employee List", error);
    }
  };

  useEffect(() => {
    console.log("Project id : ", process.env.REACT_APP_PROJECTID)
    getAllData();
  }, []);
  console.log(empData);

  return (
    <>
      <section className="container px-4 mx-auto py-4 max-w-[1260px]">
        {/* Outer Div */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-indigo-600  dark:text-white">
              Employees
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              This is a list of all employees. You can add new employees or
              delete existing ones.
            </p>
          </div>
          <Link to={"/addemployee"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add Employee
              </button>
            </div>
          </Link>
        </div>

        {/* Inner Div Main */}
        {empData.length <= 0 ? (
          <h1 className="text-gray-300 text-center text-5xl mt-16">No Employees in the System</h1>
        ) : (
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  {/* table */}
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <span>Employee</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5  text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Id
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5  text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        ></th>

                        <th
                          scope="col"
                          className="px-4 py-3.5  text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        ></th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {empData?.map((person) => (
                        <tr key={person.name}>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white ">
                                  {person.name}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {person._id}
                            </div>
                          </td>

                          <td>
                            <button
                              className="rounded-md bg-red-400 px-3.5 py-1.5 text-sm font-semibold leading-7
                         text-white hover:bg-red-600 "
                              onClick={() =>
                                setConfirmationModal({
                                  Text1: "Delete Account",
                                  Text2: "Your account will be delete",
                                  btnText1: "Delete",
                                  btnText2: "Cancel",
                                  btnHandler1: () => {
                                    handleDeleteEmployee(person._id);
                                  },
                                  btnHandler2: () => {
                                    setConfirmationModal(null);
                                  },
                                })
                              }
                            >
                              Delete
                            </button>
                          </td>

                          <td>
                            <button
                              className="rounded-md bg-blue-400 px-3.5 py-1.5 text-sm font-semibold leading-7
                         text-white hover:bg-blue-600 "
                            >
                              <Link to={`/employee/${person._id}`}>
                                Details
                              </Link>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {confirmationModal ? (
          <ConfirmationModal modalData={confirmationModal} />
        ) : (
          <></>
        )}
      </section>
    </>
  );
};
export default HomePage;
