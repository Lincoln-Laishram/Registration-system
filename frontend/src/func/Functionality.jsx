export const HandleRegister = async (event, inpt, setInpt) => {
    event.preventDefault();

    // Trim values to remove leading and trailing spaces
    const firstname = inpt.patientFirstName.trim();
    const lastname = inpt.patientLastName.trim();
    const age = inpt.patientAge.toString().trim();
    const disease = inpt.disease.trim();
    const phoneNumber = inpt.phoneNumber.trim();

    // Check for empty values
    if (!firstname || !lastname || !age || !disease || !phoneNumber) {
        alert("Please fill in all fields correctly.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/patients`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname,
                lastname,                
                age: Number(age),
                disease,
                phoneNumber,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        alert("Registration successful...");
        window.location.reload();
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
        const deleteResponse = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/patients/${Number(pid)}`, {
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
        const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/patients/${Number(editId)}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: editData.patientFirstName,
                lastname: editData.patientLastName,                
                age: editData.patientAge,
                phoneNumber: editData.phoneNumber,
                disease: editData.disease,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Patient updated successfully.");

        setEditId(null);
        setEditData({ patientName: "", disease: "" });
        setEditForm(false);

    } catch (error) {
        console.error("Update error:", error);
        alert("Failed to update patient.");
    }
}