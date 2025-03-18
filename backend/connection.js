import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
const patientDB = mongoose.createConnection(process.env.URL_DB)
patientDB.on("connected",()=>{
    console.log("Patient database connected successfully");
})

patientDB.on("error", (err) => {
    console.error("Error connecting to PatientsDatas:", err);
});


const adminDB = mongoose.createConnection(process.env.URL_ADMIN)

adminDB.on("connected",()=>{
    console.log("Admin database connected successfully");
})
adminDB.on("error",(err)=>{
    console.error("Error connecting to Admin:", err);
})

export {patientDB, adminDB}