export const HandleRegister = async (event, inpt, setInpt) => {
    event.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/patient", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: inpt.patientName,
                age: inpt.patientAge,
                disease: inpt.disease,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        alert("Registration successful...");
        setInpt({ patientName: "", patientAge: null, disease: "" });
        console.log("Patient added:", data);
    } catch (error) {
        console.error("Error adding patient:", error);
    }
};

export const HandleDelete = async (event, pid, setPid) => {
    event.preventDefault();

    if (!pid.trim()) {
        alert("Please enter a valid patient ID.");
        return;
    }
    const isConfirmed = window.confirm(`Are you sure you want to delete patient with ID ${pid}? The patient details will be deleted in the database`);
    if (!isConfirmed) {
        return;
    }
    try {
        const deleteResponse = await fetch(`http://localhost:5000/patient/${Number(pid)}`, {
            method: "DELETE",
        });

        if (!deleteResponse.ok) {
            throw new Error(`HTTP error! Status: ${deleteResponse.status}`);
        }

        alert(`Patient with ID ${pid} deleted successfully.`);
        setPid("");

    } catch (error) {
        alert("ID not found...");
        return;
    }
};

export const HandleUpdate = async (event, editId, setEditId, setEditData, setEditForm, editData) => {
    event.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to update ? Previous datas will be lost and updatd');
    if (!isConfirmed) {
        return;
    }
    try {
        const response = await fetch(`http://localhost:5000/patient/${Number(editId)}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: editData.patientName,
                disease: editData.disease,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Patient updated successfully.");

        // Reset states after update
        setEditId(null);
        setEditData({ patientName: "", disease: "" });
        setEditForm(false);

    } catch (error) {
        console.error("Update error:", error);
        alert("Failed to update patient.");
    }
}