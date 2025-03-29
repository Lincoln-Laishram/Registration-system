import { useState, useEffect } from "react";
import { PatientTable } from "./PatientTable";

export const AdminLogin = () => {
  const [admins, setAdmins] = useState([]);
  const [state, setState] = useState(false);
  const [inpt, setInpt] = useState({ admin_id: "", admin_password: "" });
  const [loginMessage, setLoginMessage] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:${import.meta.env.VITE_PORT}/admin`
  //       );
  //       console.log(response);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setAdmins(data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const HandleChange = (e) => {
    setInpt((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const adminMatch = admins.find(
      (admin) =>
        admin.admin_id === inpt.admin_id &&
        admin.admin_password === inpt.admin_password
    );

    if (adminMatch) {
      setLoginMessage("User admin welcome...");
      setState(true);
      console.log("User admin welcome...");
    } else {
      setLoginMessage("Please check your inputs...");
      console.log("Please check your inputs...");
    }
  };

  return (
    <>
      {/* {!state ? */}
      {/* <>
                    <div className="flex items-center justify-center h-screen w-screen">
                        <form onSubmit={HandleSubmit} className="flex flex-col bg-white p-6 rounded-lg shadow-gray-600 shadow-md max-w-lg w-full">
                            <input type="text" name="admin_id" placeholder="Enter ID" onChange={HandleChange} required className="input-field" />
                            <input type="password" name="admin_password" placeholder="Enter Password" onChange={HandleChange} required className="input-field" />
                            <button type="submit" className="btn-primary">Login</button>
                            <p className="text-center text-red-500 mt-2">{loginMessage}</p>
                        </form>
                    </div>
                </> 
                : */}
      <PatientTable />

      {/* } */}
    </>
  );
};
