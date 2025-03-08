import mongoose, { mongo } from "mongoose";
const patientDB = mongoose.createConnection("mongodb://localhost:27017/PatientsDatas",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
patientDB.on("connected",()=>{
    console.log("Patient database connected successfully");
})

patientDB.on("error", (err) => {
    console.error("Error connecting to PatientsDatas:", err);
});


const adminDB = mongoose.createConnection("mongodb://localhost:27017/Admin",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

adminDB.on("connected",()=>{
    console.log("Admin database connected successfully");
})
adminDB.on("error",()=>{
    console.error("Error connecting to Admin:", err);
})

export {patientDB, adminDB}