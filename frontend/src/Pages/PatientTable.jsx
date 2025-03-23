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

export const PatientTable = () => {
  // const [datas, setDatas] = useState([]);
  const [searchName, setSearchName] = useState("");

  let patients = [
    {
      sl: 1,
      pid: "P1001",
      firstName: "John",
      lastName: "Doe",
      age: 35,
      disease: "Flu",
      registrationDate: "2024-03-10",
      phoneNumber: "9876543210",
      status: "Admitted",
    },
    {
      sl: 11,
      pid: "P1002",
      firstName: "Jane",
      lastName: "Smith",
      age: 28,
      disease: "Migraine",
      registrationDate: "2024-03-12",
      phoneNumber: "8765432109",
      status: "Discharged",
    },
    {
      sl: 3,
      pid: "P1003",
      firstName: "Michael",
      lastName: "Brown",
      age: 42,
      disease: "Diabetes",
      registrationDate: "2024-03-15",
      phoneNumber: "7654321098",
      status: "Under Treatment",
    },
    {
      sl: 4,
      pid: "P1004",
      firstName: "Emily",
      lastName: "Johnson",
      age: 30,
      disease: "Hypertension",
      registrationDate: "2024-03-18",
      phoneNumber: "6543210987",
      status: "Admitted",
    },
    {
      sl: 5,
      pid: "P1005",
      firstName: "David",
      lastName: "Williams",
      age: 50,
      disease: "Arthritis",
      registrationDate: "2024-03-20",
      phoneNumber: "5432109876",
      status: "Discharged",
    },
    {
      sl: 6,
      pid: "P1006",
      firstName: "Sophia",
      lastName: "Miller",
      age: 25,
      disease: "Cold",
      registrationDate: "2024-03-22",
      phoneNumber: "4321098765",
      status: "Under Treatment",
    },
    {
      sl: 7,
      pid: "P1007",
      firstName: "Liam",
      lastName: "Anderson",
      age: 40,
      disease: "Asthma",
      registrationDate: "2024-03-24",
      phoneNumber: "3210987654",
      status: "Admitted",
    },
    {
      sl: 8,
      pid: "P1008",
      firstName: "Olivia",
      lastName: "Martinez",
      age: 29,
      disease: "Pneumonia",
      registrationDate: "2024-03-26",
      phoneNumber: "2109876543",
      status: "Discharged",
    },
    {
      sl: 9,
      pid: "P1009",
      firstName: "Ethan",
      lastName: "Harris",
      age: 55,
      disease: "Heart Disease",
      registrationDate: "2024-03-28",
      phoneNumber: "1098765432",
      status: "Under Treatment",
    },
    {
      sl: 10,
      pid: "P1010",
      firstName: "Ava",
      lastName: "Clark",
      age: 33,
      disease: "Allergy",
      registrationDate: "2024-03-30",
      phoneNumber: "0987654321",
      status: "Admitted",
    },
  ];
  const [filteredPatients, setFilteredPatients] = useState(patients);

  const [toggleRows, setToggleRows] = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:${import.meta.env.VITE_PORT}/patients`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setDatas(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleToggle = (id) => {
    setToggleRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // const HandleDelete = async (id) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:${import.meta.env.VITE_PORT}/patients/${id}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     setDatas((prev) => prev.filter((patient) => patient.patient_id !== id));
  //   } catch (error) {
  //     console.error("Delete error:", error);
  //   }
  // };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchName(query);
    setFilteredPatients(
      patients.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(query) ||
          patient.sl.toString().includes(query)
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
        <button
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150"
          onClick={handleSearch}
        >
          Search
        </button>
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
            {filteredPatients.map((patient) => (
              <TableRow
                key={patient.pid}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-100"
              >
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.sl}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700 font-mono">
                  {patient.pid}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.firstName}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.lastName}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.age}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.disease}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.registrationDate}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-700">
                  {patient.phoneNumber}
                </TableCell>
                <TableCell className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      onChange={() => handleToggle(patient.pid)}
                    />
                    {toggleRows[patient.pid] && (
                      <FaRegTrashCan
                        className="text-lg text-red-500 hover:text-red-600 cursor-pointer transition-colors duration-100"
                        onClick={() => HandleDelete(patient.pid)}
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
