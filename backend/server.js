
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { patientDB, adminDB } from "./connection.js";
import { body, validationResult } from 'express-validator';
dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

const PORT = process.env.PORT;

const userSchema = new mongoose.Schema(
    {
        patient_id: Number,
        firstname: String,
        lastname: String,
        sex:String,
        age: Number,
        disease: String,
        date: { type: Date, default: Date.now },
        phoneNumber: String
    },
    { collection: "patients" }
);

const adminSchema = new mongoose.Schema(
    {
        admin_id: String,
        admin_password: String,
    },
    { collection: "adminUsers" }
);

// Define Models
const patientModel = patientDB.model("patients", userSchema);
const adminModel = adminDB.model("adminUsers", adminSchema);

// Routes
app.get('/patients', async (req, res) => {
    try {
        const patientData = await patientModel.find();
        res.json(patientData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

app.get('/admin', async (req, res) => {
    try {
        const adminData = await adminModel.find();
        res.json(adminData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

app.post('/patients',
    [
        body('firstname').notEmpty().withMessage('First Name is required').isString(),
        body('lastname').notEmpty().withMessage('Last Name is required').isString(),
        body('age').notEmpty().withMessage('Age is required').isInt(),
        body('sex').notEmpty().withMessage('Sex is required').isString(),
        body('disease').notEmpty().withMessage('Disease name is required').isString(),
        body('phoneNumber').notEmpty().withMessage('Valid phone number is required').isString(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { firstname, lastname, sex, disease, age, phoneNumber } = req.body;

            // Auto-increment patient_id
            const lastPatient = await patientModel.findOne().sort({ patient_id: -1 });
            const newPatientId = lastPatient ? lastPatient.patient_id + 1 : 100;

            const newPatient = await patientModel.create({
                patient_id: newPatientId,
                firstname,
                lastname,
                sex,
                age,
                disease,
                phoneNumber
            });

            res.status(201).json(newPatient);
        } catch (error) {
            console.error("Error adding patient:", error);
            res.status(500).json({ error: "Internal server error", message: error.message });
        }
    });

app.patch('/patients/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { firstname, lastname, age,sex, disease, phoneNumber } = req.body;

        const updatedPatient = await patientModel.findOneAndUpdate(
            { patient_id: id },
            { firstname, lastname,sex, age, disease, phoneNumber },
            { new: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

app.delete('/patients/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedPatient = await patientModel.findOneAndDelete({ patient_id: id });

        if (!deletedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
/* More changes to come */