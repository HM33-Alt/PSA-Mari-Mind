// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Configure CORS
const corsOptions = {
    origin: 'http://192.168.1.8:8080',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Define the /api/test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is connected!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/learningModules', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
const learningModuleRoutes = require('./routes/learningModuleRoutes');
app.use('/api/learning-modules', learningModuleRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Learning Modules API');
});