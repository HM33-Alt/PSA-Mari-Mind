const express = require('express');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Configure CORS
const allowedOrigins = ['http://192.168.1.8:8080'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow requests from allowed origins
        } else {
            callback(new Error('Not allowed by CORS')); // Block other origins
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Apply CORS options

// Configure session
app.use(session({
    secret: 'your_secret_key', // Secret key for session encryption
    resave: false, // Do not save session if unmodified
    saveUninitialized: true, // Save uninitialized sessions
    cookie: { secure: false } // Set to true if using HTTPS
}));

// AI chatbot functionality
async function getChatCompletion(prompt) {
    try {
        const response = await axios.post(
            // Citation for GODEL model:
            // Peng, B., Galley, M., He, P., Brockett, C., Liden, L., Nouri, E., Yu, Z., Dolan, B., & Gao, J. (2022).
            // GODEL: Large-scale pre-training for goal-directed dialog. arXiv.
            // https://www.microsoft.com/en-us/research/publication/godel-large-scale-pre-training-for-goal-directed-dialog/

            // Citation for Hugging Face Model:
            // Hugging Face. (2022). GODEL-v1_1-large-seq2seq.
            // https://huggingface.co/microsoft/GODEL-v1_1-large-seq2seq

            'https://api-inference.huggingface.co/models/microsoft/GODEL-v1_1-large-seq2seq',
            { inputs: prompt },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(response.data); // Log the response to check its structure
        return response.data[0].generated_text; // Return the response
    } catch (error) {
        console.error('Error fetching completion:', error);
        throw error;
    }
}

// AI endpoint
app.post('/api/ai', async (req, res) => {
    const { prompt } = req.body; // Extract prompt from request body

    try {
        const completion = await getChatCompletion(prompt); // Get AI completion
        res.json({ response: completion }); // Send response back to client
    } catch (error) {
        console.error('Error with Hugging Face API:', error.message, error.response ? error.response.data : '');
        res.status(500).json({ message: 'Error with Hugging Face API', error: error.message }); // Send error response
    }
});

// To check if data.json exists
const checkFileExists = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ users: [], knowledgeArticles: {}, uploadedFiles: {} }));
    }
};

// To load data from JSON file
const loadData = () => {
    const data = fs.readFileSync('backend/data.json'); // Read data from file
    return JSON.parse(data); // Parse and return JSON data
};

// To save data to JSON file
const saveData = (data) => {
    fs.writeFileSync('backend/data.json', JSON.stringify(data, null, 2)); // Write data to file with pretty-print
};

// To ensure data.json exists (DB)
checkFileExists('backend/data.json'); // Check and create data.json if it doesn't exist

// To define the root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // Send welcome message
});

// To define the /api/test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is connected!' });
});

// To define the /api/files endpoint
app.get('/api/files', (req, res) => {
    const data = loadData(); // Load data from file
    res.json(data.uploadedFiles); // Send uploaded files data
});

app.post('/api/files', (req, res) => {
    const { location, file } = req.body; // Extract location and file from request body

    // Check for missing parameters
    if (!location || !file) {
        return res.status(400).json({ message: 'Location and file are required.' }); // Send error if parameters are missing
    }

    const data = loadData(); // Load data from file
    data.uploadedFiles[location] = data.uploadedFiles[location] || []; // Initialize array if not present
    data.uploadedFiles[location].push(file); // Add file to location
    saveData(data); // Save updated data
    res.status(201).json({ message: 'File uploaded successfully' }); // Send success message
});

// To define the /api/knowledge endpoint
app.get('/api/knowledge', (req, res) => {
    const data = loadData(); // Load data from file
    res.json(data.knowledgeArticles); // Send knowledge articles data
});

app.post('/api/knowledge', (req, res) => {
    const data = loadData(); // Load data from file
    const { location, article } = req.body; // Extract location and article from request body
    data.knowledgeArticles[location] = data.knowledgeArticles[location] || []; // Initialize array if not present
    data.knowledgeArticles[location].push(article); // Add article to location
    saveData(data); // Save updated data
    res.status(201).json({ message: 'Knowledge article added successfully' }); // Send success message
});

// To define the /api/login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body; // Extract username and password from request body
    const data = loadData(); // Load data from file
    const user = data.users.find(u => u.username === username && u.password === password); // Find user

    if (user) {
        req.session.user = user; // Save user in session
        res.json({ message: 'Login successful!' }); // Send success message
    } else {
        res.status(401).json({ message: 'Invalid username or password.' }); // Send error message
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});