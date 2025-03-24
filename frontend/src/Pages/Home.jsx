import { useState } from "react";
import {
  HandleRegister,
  HandleDelete,
  HandleUpdate,
} from "@/func/Functionality";
import {RegisterPatient, DeletePatient, EditPatient } from "./RCE";

export const Register = () => {
  const [inpt, setInpt] = useState({
    patientFirstName: "",
    patientLastName: "",
    patientAge: "",
    sex: "",
    disease: "",
    phoneNumber: "",
  });
  const [cancelState, setCancelState] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [pid, setPid] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({
    patientFirstName: "",
    patientLastName: "",
    disease: "",
    patientAge: "",
    phoneNumber: "",
  });

  const HandleChange = (event) => {
    setInpt((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const HandleSex = (event) => {
    setInpt((prev) => ({
      ...prev,
      sex: event.target.value,
    }));
  };
  const SelectProblems = (event) => {
    setInpt((prev) => ({
     ...prev,
      disease: event.target.value,
    }));
  }
  const HandleCancel = () => {
    setCancelState(true);
    setEnableEdit(false);
  };

  const HandleEdit = async (event) => {
    event.preventDefault();
    if (!pid.trim()) {
      alert("Please enter a valid patient ID.");
      return;
    }
    try {
      const response = await fetch("http://localhost:2005/patients", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const patient = data.find(
        (patient) => patient.patient_id === Number(pid)
      );
      if (patient) {
        setEditId(patient.patient_id);
        setEditData({
          patientFirstName: patient.firstname,
          patientLastName: patient.lastname,
          disease: patient.disease,
          patientAge: patient.age,
          phoneNumber: patient.phoneNumber,
        });
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-lg bg-white shadow-2xl border border-gray-200 p-8">
        {/* Header */}
        <div className="border-b border-gray-300 pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-blue-900 tracking-wide text-center">
            🏥 Clinic Patient Management System
          </h2>
          <p className="text-sm text-gray-600 text-center mt-1">
            Securely manage patient records 📋
          </p>
        </div>
        <RegisterPatient inpt={inpt} setInpt={setInpt} HandleRegister={HandleRegister} HandleChange={HandleChange} HandleSex={HandleSex} SelectProblems={SelectProblems}/>
        {/* Action Buttons */}
        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={HandleCancel}
            className="w-full bg-gray-700 text-white py-2 font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition duration-200 cursor-pointer"
          >
            Cancel Registration 🚫
          </button>
          <button
            onClick={() => {
              setEnableEdit(true);
              setCancelState(false);
            }}
            className="w-full bg-blue-700 text-white py-2 font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-200 cursor-pointer"
          >
            Edit Patient Record ✏️
          </button>
        </div>
        <DeletePatient cancelState={cancelState} pid={pid} setPid={setPid} HandleDelete={HandleDelete}/>
        <EditPatient enableEdit={enableEdit} cancelState={cancelState} pid={pid} setPid={setPid} HandleEdit={HandleEdit} editForm={editForm} HandleUpdate={HandleUpdate} editId={editId} setEditId={setEditId} setEditData={setEditData} setEditForm={setEditForm} editData={editData} HandleEditChange={HandleEditChange}/>
      </div>
    </div>
  );
};
