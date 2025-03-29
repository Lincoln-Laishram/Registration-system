import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegTrashCan } from "react-icons/fa6";
import { data } from "react-router-dom";

export const PatientTable = () => {
  const [datas, setDatas] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [toggleRows, setToggleRows] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:${import.meta.env.VITE_PORT}/patients`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setDatas(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleToggle = (id) => {
    setToggleRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const HandleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:${import.meta.env.VITE_PORT}/patients/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setFilteredPatients((prev) => prev.filter((patient) => patient.patient_id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchName(query);
    setFilteredPatients(
      datas.filter(
        (patient) =>
          patient.firstname.toLowerCase().includes(query) ||
          patient.patient_id.toString().includes(query)
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <header className="mb-8 ml-16">
        <h1 className="text-3xl font-medium text-gray-900 tracking-tight">
          Patient Records
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and review patient information
        </p>
      </header>

      <div className="flex items-center gap-3 mb-6 ml-16">
        <input
          type="text"
          className="flex-1 max-w-md px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-150"
          placeholder="Search by name or SL"
          value={searchName}
          onChange={handleSearch}
        />
      </div>

      <section>
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              {[
                "SL",
                "PID",
                "First Name",
                "Last Name",
                "Age",
                "Disease",
                "Reg. Date",
                "Phone",
                "Status",
              ].map((header) => (
                <TableHead
                  key={header}
                  className="py-3 px-4 text-xs font-semibold text-gray-100 uppercase tracking-wider text-center"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient, index) => (
              <TableRow
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-100"
              >
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {index + 1}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700 font-mono">
                  {patient.patient_id}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.firstname}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.lastname}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.age}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.disease}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.date}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.phoneNumber}
                </TableCell>
                <TableCell className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      onChange={() => handleToggle(patient.patient_id)}
                    />
                    {toggleRows[patient.patient_id] && (
                      <FaRegTrashCan
                        className="text-lg text-red-500 hover:text-red-600 cursor-pointer transition-colors duration-100"
                        onClick={() => HandleDelete(patient.patient_id)}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
