import express from 'express';
import mongoose from 'mongoose';
import {body,validationResult} from 'express-validator';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/PatientsDatas").then(()=>{
    console.log("Database connection established");
})
.catch(err=>console.log(err));
const userSchema = mongoose.Schema(
    {
        patient_id:Number,
        name:String,
        age:Number,
        disease:String,
        date:{ type: Date, default: Date.now }
    }
);

const userModal = mongoose.model("patients",userSchema);

app.get('/users',async(req,res)=>{
    const userData = await userModal.find();
    res.json(userData);
})


const validatePatient =[
    body('name').isString().notEmpty().escape().withMessage('Name is required'),
    body('disease').isString().notEmpty().escape().withMessage('Disease is required'),
]
app.get('/patient',validatePatient, async (req, res) => {
    try{
        const patient = await userModal.find();
        res.status(200).json(patient);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/patient', validatePatient, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, age, disease } = req.body;

        const lastPatient = await userModal.findOne().sort({ patient_id: -1 }); 
        const newPatientId = lastPatient ? lastPatient.patient_id + 1 : 100; // If no patients, start from 1

        const newPatient = await userModal.create({ patient_id: newPatientId, name, age, disease });

        res.status(201).json(newPatient);
    } catch (error) {
        console.error("Error adding patient:", error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

app.patch('/patient/:id', validatePatient, async (req, res) => {
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
