import { useState } from "react";
import { HandleRegister, HandleDelete, HandleUpdate } from "@/Components/HandleRegsiter";

export const Register = () => {
    const [inpt, setInpt] = useState({ patientFirstName: "", patientLastName:"", patientAge: "", disease: "", phoneNumber:""});
    const [cancelState, setCancelState] = useState(false);
    const [enableEdit, setEnableEdit] = useState(false);
    const [pid, setPid] = useState("");
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState(false);
    const [editData, setEditData] = useState({ patientName: "", disease: "" });

    const HandleChange = (event) => {
        setInpt((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
    const HandleCancel = () => {
        setCancelState(true);
        setEnableEdit(false)
    };

    const HandleEdit = async (event) => {
        event.preventDefault();

        if (!pid.trim()) {
            alert("Please enter a valid patient ID.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/patient", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            const patient = data.find((patient) => patient.patient_id === Number(pid));

            if (patient) {
                setEditId(patient.patient_id);
                setEditData({ patientName: patient.name, disease: patient.disease });
                setEditForm(true);
            } else {
                alert("ID not found...");
                setEditForm(false);
            }
            setPid("");

        } catch (error) {
            console.error("Fetch error:", error);
            alert("An error occurred while fetching data.");
        }
    };


    const HandleEditChange = (event) => {
        setEditData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-gray-600 shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Patient Registration</h2>
                <form onSubmit={(event) => HandleRegister(event, inpt, setInpt)} className="flex flex-col">
                    <input type="text" value={inpt.patientFirstName} name="patientFirstName" placeholder="Enter First Name..." onChange={HandleChange} required className="input-field" />
                    <input type="text" value={inpt.patientLastName} name="patientLastName" placeholder="Enter Last Name..." onChange={HandleChange} required className="input-field" />
                    <input type="text" value={inpt.disease} name="disease" placeholder="Enter Disease..." onChange={HandleChange} required className="input-field" />
                    <input type="number" value={inpt.patientAge} name="patientAge" placeholder="Enter Age..." onChange={HandleChange} required className="input-field" />
                    <input type="tel" value={inpt.phoneNumber} name="phoneNumber" placeholder="Enter Phone Number..." onChange={HandleChange} required className="input-field" />
                    <button type="submit" className="btn-primary">Register</button>
                </form>
    
                <div className="flex items-center justify-between mt-4">
                    <button onClick={HandleCancel} className="btn-secondary">Cancel Register</button>
                    <button onClick={() => { setEnableEdit(true); setCancelState(false); }} className="btn-secondary">Edit Registration</button>
                </div>
    
                {cancelState && (
                    <div className="mt-4">
                        <form onSubmit={(event) => HandleDelete(event, pid, setPid)} className="flex flex-col">
                            <input type="tel" placeholder="Enter patient ID" value={pid} onChange={(e) => setPid(e.target.value)} className="input-field" />
                            <button type="submit" className="btn-danger">Delete</button>
                        </form>
                    </div>
                )}
    
                {enableEdit && (
                    <div className="mt-4">
                        <form onSubmit={HandleEdit} className="flex flex-col">
                            <input type="tel" placeholder="Enter patient ID" value={pid} onChange={(e) => setPid(e.target.value)} className="input-field" />
                            <button type="submit" className="btn-">Edit</button>
                        </form>
    
                        {editForm && (
                            <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow">
                                <h3 className="text-lg font-medium text-gray-700">Update Patient</h3>
                                <form onSubmit={(event) => HandleUpdate(event, editId, setEditId, setEditData, setEditForm, editData)} className="flex flex-col">
                                    <input type="text" name="patientName" placeholder="Updated Name" value={editData.patientName} onChange={HandleEditChange} required className="input-field" />
                                    <input type="text" name="disease" placeholder="Updated Disease" value={editData.disease} onChange={HandleEditChange} required className="input-field" />
                                    <button type="submit" className="btn-primary">Update</button>
                                </form>
                                <button onClick={() => setEditForm(false)} className="btn-secondary mt-2">Cancel</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
    
};
