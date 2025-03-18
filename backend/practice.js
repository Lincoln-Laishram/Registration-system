import express from 'express';
import { body, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

const users = [
    { id: 1, name: 'Lincoln', email: 'lincoln@gmail.com' },
    { id: 2, name: 'John', email: 'john@gmail.com' },
    { id: 3, name: 'Karen', email: 'karen@gmail.com' }
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    res.json(users);
});

// ✅ Adding validation middleware
app.post('/users', 
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required')
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email } = req.body;
        const newUser = { id: users.length + 1, name, email };
        users.push(newUser);

        res.status(201).json(newUser);
    }
);

app.listen(3000, () => console.log('Server running on port 3000'));
