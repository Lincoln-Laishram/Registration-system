import { useState, useEffect } from "react";

export const PatientDatas = () => {
    const [datas, setDatas] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({ name: "", age:"", disease: "" });

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const response = await fetch('http://localhost:5000/patient');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setDatas(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchDatas();
    }, []);

    const HandleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/patient/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setDatas(datas.filter((patient) => patient.patient_id !== id));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const HandleEdit = (patient) => {
        setEditId(patient.id);
        setEditData({ name: patient.name, disease: patient.disease });
    };

    const HandleChange = (event) => {
        setEditData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const HandleUpdate = async (event) => {
        event.preventDefault();
        if (!editId) return;

        try {
            const response = await fetch(`http://localhost:5000/patient/${editId}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setDatas(datas.map((patient) =>
                patient.id === editId ? { ...patient, ...editData } : patient
            ));
            setEditId(null);
            setEditData({ name: "", disease: "" });

        } catch (error) {
            console.error('Update error:', error);
        }
    };

    return (
        <>
            <h2>Patients List:</h2>
            <ul>
                {datas.map((patient) => (
                    <li key={patient.id}>
                        <div>
                            Name: {patient.name} <br />
                            Age: {patient.age} <br />
                            Disease: {patient.disease} <br />
                            <button onClick={() => HandleDelete(patient.patient_id)}>Delete</button>
                            <button onClick={() => HandleEdit(patient)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>

            {editId && (
                <div>
                    <h3>Edit Patient</h3>
                    <form onSubmit={HandleUpdate}>
                        <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={HandleChange}
                            placeholder="Updated Name"
                            required
                        />
                        <br />
                        <input
                            type="text"
                            name="disease"
                            value={editData.disease}
                            onChange={HandleChange}
                            placeholder="Updated Disease"
                            required
                        />
                        <br />
                        <button type="submit">Update</button>
                        <button onClick={() => setEditId(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </>
    );
};
