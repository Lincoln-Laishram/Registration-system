"use client";

import { useState } from "react";
import {
  HandleRegister,
  HandleDelete,
  HandleUpdate,
} from "@/func/Functionality";
    // Check for empty values

export const Register = () => {
  const [inpt, setInpt] = useState({
    patientFirstName: "",
    patientLastName: "",
    patientAge: "",
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

        {/* Registration Form */}
        <form
          onSubmit={(event) => HandleRegister(event, inpt, setInpt)}
          className="space-y-6"
        >
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-800">
              First Name
            </label>
            <input
              type="text"
              value={inpt.patientFirstName}
              name="patientFirstName"
              placeholder="Enter first name 👤"
              onChange={HandleChange}
              required
              className="w-full px-4 py-2 border border-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-800">
              Last Name
            </label>
            <input
              type="text"
              value={inpt.patientLastName}
              name="patientLastName"
              placeholder="Enter last name 👤"
              onChange={HandleChange}
              required
              className="w-full px-4 py-2 border border-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-800">
              Diagnosis
            </label>
            <input
              type="text"
              value={inpt.disease}
              name="disease"
              placeholder="Enter diagnosis 🩺"
              onChange={HandleChange}
              required
              className="w-full px-4 py-2 border border-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-800">
              Age
            </label> 
            <input
              type="number"
              value={inpt.patientAge}
              name="patientAge"
              placeholder="Enter age 🎂"
              onChange={HandleChange}
              required
              className="w-full px-4 py-2 border border-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
            />
          </div>
          <div>
            <input type="radio" name="gender" value="Male" onClick={(e)=>{console.log(e.target.value)}}/> Male <input type="radio" name="gender" value="Female" onClick={(e)=>{console.log(e.target.value)}}/> Female
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-800">
              Phone Number
            </label>
            <input
              type="tel"
              value={inpt.phoneNumber}
              name="phoneNumber"
              placeholder="Enter phone number 📞"
              onChange={HandleChange}
              required
              className="w-full px-4 py-2 border border-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 font-medium hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition duration-200 cursor-pointer"
          >
            Register Patient ➕
          </button>
        </form>

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

        {/* Delete Section */}
        {cancelState && (
          <div className="mt-6 p-6 bg-red-50 border border-red-300">
            <h3 className="text-sm font-semibold text-red-900 mb-4">
              Delete Patient Record 🗑️
            </h3>
            <form
              onSubmit={(event) => HandleDelete(event, pid, setPid)}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-800">
                  Patient ID
                </label>
                <input
                  type="tel"
                  placeholder="Enter patient ID 🔍"
                  value={pid}
                  onChange={(e) => setPid(e.target.value)}
                  className="w-full px-4 py-2 border border-red-400 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent transition duration-150"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-800 text-white py-3 font-medium hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 transition duration-200"
              >
                Delete Patient ❌
              </button>
            </form>
          </div>
        )}

        {/* Edit Section */}
        {enableEdit && (
          <div className="mt-6 p-6 bg-blue-50 border border-blue-300">
            <h3 className="text-sm font-semibold text-blue-900 mb-4">
              Edit Patient Record ✏️
            </h3>
            <form onSubmit={HandleEdit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-800">
                  Patient ID
                </label>
                <input
                  type="tel"
                  placeholder="Enter patient ID 🔍"
                  value={pid}
                  onChange={(e) => setPid(e.target.value)}
                  className="w-full px-4 py-2 border border-blue-400 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-3 font-medium hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition duration-200"
              >
                Retrieve Patient 👥
              </button>
            </form>

            {editForm && (
              <div className="mt-6 p-6 bg-white border border-gray-200">
                <h3 className="text-sm font-semibold text-blue-900 mb-4">
                  Update Patient Details 📝
                </h3>
                <form
                  onSubmit={(event) =>
                    HandleUpdate(
                      event,
                      editId,
                      setEditId,
                      setEditData,
                      setEditForm,
                      editData
                    )
                  }
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-800">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="patientFirstName"
                      placeholder="Enter first name 👤"
                      value={editData.patientFirstName}
                      onChange={HandleEditChange}
                      required
                      className="w-full px-4 py-2 border border-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-800">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="patientLastName"
                      placeholder="Enter last name 👤"
                      value={editData.patientLastName}
                      onChange={HandleEditChange}
                      required
                      className="w-full px-4 py-2 border border-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-800">
                      Diagnosis
                    </label>
                    <input
                      type="text"
                      name="disease"
                      placeholder="Enter diagnosis 🩺"
                      value={editData.disease}
                      onChange={HandleEditChange}
                      required
                      className="w-full px-4 py-2 border border-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-800">
                      Age
                    </label>
                    <input
                      type="number"
                      name="patientAge"
                      placeholder="Enter age 🎂"
                      value={editData.patientAge}
                      onChange={HandleEditChange}
                      required
                      className="w-full px-4 py-2 border border-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-800">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter phone number 📞"
                      value={editData.phoneNumber}
                      onChange={HandleEditChange}
                      required
                      className="w-full px-4 py-2 border border-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-800 text-white py-3 font-medium hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition duration-200"
                  >
                    Save Updates ✅
                  </button>
                </form>
                <button
                  onClick={() => setEditForm(false)}
                  className="w-full mt-4 bg-gray-700 text-white py-2 font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition duration-200"
                >
                  Cancel Update 🚫
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
