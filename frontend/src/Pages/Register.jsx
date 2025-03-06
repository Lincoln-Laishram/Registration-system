import { useState } from "react";
import { HandleRegister, HandleDelete, HandleUpdate} from "@/Components/HandleRegsiter";

export const Register = () => {
    const [inpt, setInpt] = useState({ patientName: "", patientAge: null, disease: "" });
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
        <>
            <h1>This is the register page...</h1>
            <form onSubmit={(event) => HandleRegister(event, inpt, setInpt)}>                <input type="text" name="patientName" placeholder="Patient name" onChange={HandleChange} required />
                <br />
                <input type="text" name="disease" placeholder="Disease" onChange={HandleChange} required />
                <br />
                <input type="tel" name="patientAge" placeholder="Age" onChange={HandleChange} required />
                <br />
                <button type="submit">Register</button>
            </form>
            <button onClick={HandleCancel}>Cancel Register</button> <br />
            <button onClick={() => { setEnableEdit(true); setCancelState(false); }}>Edit Registration</button>
            <br />
            {cancelState && (
                <div>
                    <br />
                    <form onSubmit={(event)=>HandleDelete(event,pid, setPid)}>
                        <input type="tel" placeholder="Enter patient ID" value={pid} onChange={(e) => setPid(e.target.value)} />
                        <button type="submit">Delete</button>
                    </form>
                </div>
            )}
            <br />
            {
                enableEdit && (
                    <div>
                        <form onSubmit={HandleEdit}>
                            <input type="tel" placeholder="Enter patient ID" value={pid} onChange={(e) => setPid(e.target.value)} />
                            <button type="submit">Edit</button>
                        </form>
                        {
                            editForm && (
                                <>
                                    <form onSubmit={(event)=>HandleUpdate(event, editId, setEditId, setEditData, setEditForm, editData)}>
                                        <input
                                            type="text"
                                            name="patientName"
                                            placeholder="Updated Name"
                                            value={editData.patientName}
                                            onChange={HandleEditChange}
                                            required
                                        />
                                        <br />
                                        <input
                                            type="text"
                                            name="disease"
                                            placeholder="Updated Disease"
                                            value={editData.disease}
                                            onChange={HandleEditChange}
                                            required
                                        />
                                        <br />
                                        <button type="submit">Update</button>
                                    </form>
                                    <button onClick={() => setEditForm(false)}>Cancel</button>
                                </>
                            )
                        }

                    </div>
                )
            }

        </>
    );
};
