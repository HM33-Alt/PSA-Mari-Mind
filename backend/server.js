const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/learningModules', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
const learningModuleRoutes = require('./routes/learningModuleRoutes');
app.use('/api/learning-modules', learningModuleRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Learning Modules API');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
