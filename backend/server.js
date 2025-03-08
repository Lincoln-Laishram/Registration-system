import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const patientDB = mongoose.createConnection("mongodb://localhost:27017/PatientsDatas")
patientDB.on("connected",()=>{
    console.log("Patient database connected successfully");
})

patientDB.on("error", (err) => {
    console.error("Error connecting to PatientsDatas:", err);
});


const adminDB = mongoose.createConnection("mongodb://localhost:27017/admin")

adminDB.on("connected",()=>{
    console.log("Admin database connected successfully");
})
adminDB.on("error",()=>{
    console.error("Error connecting to Admin:", err);
})

const userSchema = mongoose.Schema(
    {
        patient_id:Number,
        firstname:String,
        lastname:String,
        age:String,
        disease:String,
        date:{ type: Date, default: Date.now },
        phoneNumber:String
    },
    {collection:"patients"}
);
const adminSchema = mongoose.Schema(
    {
        admin_id:String,
        admin_password:String,
    },
    { collection: "adminUsers" }
)
const userModal = patientDB.model("patients",userSchema);
const adminModal = adminDB.model("adminUsers",adminSchema);
console.log(adminModal);

app.get('/users',async(req,res)=>{
    const userData = await userModal.find();
    res.json(userData);
})
app.get('/admin', async (req, res) => {
        const adminData = await adminModal.find();
        res.json(adminData);
});



app.get('/patient', async (req, res) => {
    try{
        const patient = await userModal.find();
        res.status(200).json(patient);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/patient',  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { firstname, lastname, disease, age, phoneNumber  } = req.body;

        const lastPatient = await userModal.findOne().sort({ patient_id: -1 }); 
        const newPatientId = lastPatient ? lastPatient.patient_id + 1 : 100; // If no patients, start from 1

        const newPatient = await userModal.create({ patient_id: newPatientId, firstname, lastname, age, disease, phoneNumber });

        res.status(201).json(newPatient);
    } catch (error) {
        console.error("Error adding patient:", error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

app.patch('/patient/:id', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = parseInt(req.params.id); // Assuming patient_id is unique
        const { name, age, disease } = req.body;

        const updatedPatient = await userModal.findOneAndUpdate(
            { patient_id: id }, 
            { name, age, disease }, 
            { new: true } 
        );

        if (!updatedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/patient/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedPatient = await userModal.findOneAndDelete({ patient_id: id });

        if (!deletedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.status(204).send(); // 204 means "No Content"
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
