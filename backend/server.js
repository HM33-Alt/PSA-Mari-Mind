const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs');
const axios = require('axios'); // Import axios
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Configure CORS
const corsOptions = {
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Configure session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

async function getChatCompletion(prompt) {
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/microsoft/GODEL-v1_1-large-seq2seq',
            { inputs: prompt },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data[0].generated_text; // Return the response
    } catch (error) {
        console.error('Error fetching completion:', error);
        throw error;
    }
}

// Check if data.json exists
const checkFileExists = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ users: [], knowledgeArticles: {}, uploadedFiles: {} }));
    }
};

// Load data from JSON file
const loadData = () => {
    const data = fs.readFileSync('backend/data.json');
    return JSON.parse(data);
};

// Save data to JSON file
const saveData = (data) => {
    fs.writeFileSync('backend/data.json', JSON.stringify(data, null, 2));
};

// Ensure data.json exists
checkFileExists('backend/data.json');

// Define the root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Define the /api/test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is connected!' });
});

// Define the /api/files endpoint
app.get('/api/files', (req, res) => {
    const data = loadData();
    res.json(data.uploadedFiles);
});

app.post('/api/files', (req, res) => {
    const { location, file } = req.body;

    // Check for missing parameters
    if (!location || !file) {
        return res.status(400).json({ message: 'Location and file are required.' });
    }

    const data = loadData();
    data.uploadedFiles[location] = data.uploadedFiles[location] || [];
    data.uploadedFiles[location].push(file);
    saveData(data);
    res.status(201).json({ message: 'File uploaded successfully' });
});

// Define the /api/knowledge endpoint
app.get('/api/knowledge', (req, res) => {
    const data = loadData();
    res.json(data.knowledgeArticles);
});

app.post('/api/knowledge', (req, res) => {
    const data = loadData();
    const { location, article } = req.body;
    data.knowledgeArticles[location] = data.knowledgeArticles[location] || [];
    data.knowledgeArticles[location].push(article);
    saveData(data);
    res.status(201).json({ message: 'Knowledge article added successfully' });
});

// AI endpoint
app.post('/api/ai', async (req, res) => {
    const { prompt } = req.body;

    try {
        const completion = await getChatCompletion(prompt); // Use the function to get the AI completion
        res.json({ response: completion });
    } catch (error) {
        console.error('Error with Hugging Face API:', error.message, error.response ? error.response.data : '');
        res.status(500).json({ message: 'Error with Hugging Face API', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});