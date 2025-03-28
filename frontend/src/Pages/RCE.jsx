import React from "react";

export const RegisterPatient = ({
  inpt,
  setInpt,
  HandleRegister,
  HandleChange,
  HandleSex,
  SelectProblems,
}) => {
  return (
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
        <label className="block text-sm font-medium text-gray-800">Age</label>
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
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-800">Gender</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={HandleSex}
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm text-gray-700">Male</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={HandleSex}
              className="w-5 h-5 text-pink-500 border-gray-300 focus:ring-pink-400 cursor-pointer"
            />
            <span className="text-sm text-gray-700">Female</span>
          </label>
        </div>
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">
          Dental Problems
        </label>
        <select
          name="tooth-problems"
          id="problems"
          onChange={SelectProblems}
          className="w-full px-4 py-2 border border-gray-400 bg-gray-50 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
        >
          <option value="Select problems" hidden>
            Select problems
          </option>
          <option value="Tooth Decay">Tooth Decay</option>
          <option value="Tooth Sensitivity">Tooth Sensitivity</option>
          <option value="Gingivitis">Gingivitis</option>
          <option value="Periodontis">Periodontitis</option>
        </select>
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
  );
};

export const DeletePatient = ({ cancelState, pid, setPid, HandleDelete }) => {
  if (!cancelState) return null;

  return (
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
  );
};

export const EditPatient = ({
  enableEdit,
  cancelState,
  pid,
  setPid,
  HandleEdit,
  editForm,
  HandleUpdate,
  editId,
  setEditId,
  setEditData,
  setEditForm,
  editData,
  SelectProblems,
  HandleEditChange,
}) => {
  if (!enableEdit) return null;

  return (
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
                Dental Problems
              </label>
              <select
                name="disease"
                id="problems"
                value={editData.disease}
                onChange={HandleEditChange}
                className="w-full px-4 py-2 border border-gray-400 bg-gray-50 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150"
              >
                <option value="Select problems" hidden>
                  Select problems
                </option>
                <option value="Tooth Decay">Tooth Decay</option>
                <option value="Tooth Sensitivity">Tooth Sensitivity</option>
                <option value="Gingivitis">Gingivitis</option>
                <option value="Periodontis">Periodontitis</option>
              </select>
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
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Gender
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sex"
                    value="Male"
                    checked={editData.sex === "Male"}
                    onChange={HandleEditChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sex"
                    value="Female"
                    checked={editData.sex === "Female"}
                    onChange={HandleEditChange}
                    className="w-5 h-5 text-pink-500 border-gray-300 focus:ring-pink-400 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">Female</span>
                </label>
              </div>
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
  );
};