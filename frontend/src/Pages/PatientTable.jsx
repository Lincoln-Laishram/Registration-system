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
    const [datas, setDatas] = useState([]);
    const [toggleRows, setToggleRows] = useState({}); // Track state per row

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/patients`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setDatas(data);
                console.log(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, []);

    // Function to toggle delete icon visibility for a specific row
    const handleToggle = (id) => {
        setToggleRows((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the specific row's state
        }));
    };

    const HandleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/patients/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setDatas((prev) => prev.filter((patient) => patient.patient_id !== id));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <>
            <h1 className="font-extrabold text-xl underline mb-3 text-center">
                Patient Details:
            </h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Sl</TableHead>
                        <TableHead>Pid</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Disease</TableHead>
                        <TableHead>Registration date</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {datas.map((data, index) => (
                        <TableRow key={data.patient_id}> 
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{data.patient_id}</TableCell>
                            <TableCell>{data.firstname}</TableCell>
                            <TableCell>{data.lastname}</TableCell>
                            <TableCell>{data.age}</TableCell>
                            <TableCell>{data.disease}</TableCell>
                            <TableCell>
                                {new Date(data.date).toLocaleDateString("en-GB")}
                            </TableCell>
                            <TableCell>{data.phoneNumber}</TableCell>
                            <TableCell>
                                <div className="dark:bg-black/10 flex items-center justify-center gap-3">
                                    <p className="text-lg">Registered</p>
                                    <label className="text-white">
                                        <input
                                            className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-8 h-8"
                                            type="checkbox"
                                            onChange={() => handleToggle(data.patient_id)}
                                        />
                                    </label>
                                    {toggleRows[data.patient_id] && (
                                        <FaRegTrashCan className="text-2xl cursor-pointer text-red-700"
                                            onClick={() => HandleDelete(data.patient_id)}
                                        />
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
