// Example knowledgeLocations array
const knowledgeLocations = [
    { name: 'Location 1', coords: [51.505, -0.09] },
    { name: 'Location 2', coords: [51.515, -0.1] },
    // Add more locations as needed
];

// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

// Add a base tile layer (e.g., OpenStreetMap)
const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Create a layer group for the markers
const markerLayer = L.layerGroup().addTo(map);

// Object to store knowledge articles
const knowledgeArticles = {};

// Object to store uploaded files
const uploadedFiles = {};

// Function to display knowledge articles
function displayKnowledge(locationName) {
    const knowledgeContent = document.getElementById('knowledgeDisplay');
    knowledgeContent.innerHTML = `<h2>Knowledge Hub</h2><p>Select a marker on the map to see knowledge articles.</p>`;

    // Display all articles for the selected location
    const articles = knowledgeArticles[locationName];
    if (articles && articles.length > 0) {
        articles.forEach(article => {
            knowledgeContent.innerHTML += `
                <div>
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <p>${article.fullText}</p>
                </div>
            `;
        });
    } else {
        knowledgeContent.innerHTML += "<p>No articles available for this location.</p>";
    }

    // Display uploaded files for the selected location
    const files = uploadedFiles[locationName];
    if (files && files.length > 0) {
        knowledgeContent.innerHTML += "<h3>Uploaded Files:</h3><ul>";
        files.forEach(file => {
            knowledgeContent.innerHTML += `<li>${file.name}</li>`;
        });
        knowledgeContent.innerHTML += "</ul>";
    } else {
        knowledgeContent.innerHTML += "<p>No files uploaded for this location.</p>";
    }
}

// Add markers to the marker layer group
knowledgeLocations.forEach(location => {
    const marker = L.marker(location.coords).addTo(markerLayer);

    // Update knowledge display section on marker click
    marker.on('click', () => {
        displayKnowledge(location.name); // Display articles below the map
        document.getElementById('knowledgeLocation').value = location.name; // Set the selected location in the form
    });
});

// Authentication system for contribution to the knowledge hub
let isAuthenticated = false;

// Sample user data
const userData = {
    username: 'admin',
    password: 'password' // Change in production
};

// Handle login
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple authentication check
    if (username === userData.username && password === userData.password) {
        isAuthenticated = true;
        alert('Login successful!');

        // Hide login form and show logout button
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'block'; // Show logout button

        // Show the content container
        document.getElementById('content-container').style.display = 'flex';
    } else {
        alert('Invalid username or password.');
    }
});

// Handle logout
document.getElementById('logout-btn').addEventListener('click', () => {
    isAuthenticated = false;

    // Show login form and hide logout button
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('logout-btn').style.display = 'none'; // Hide logout button

    // Hide the content container
    document.getElementById('content-container').style.display = 'none';
});

// Handle form submission for the "Add Knowledge" section
document.getElementById('knowledgeForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const title = document.getElementById('knowledgeTitle').value.trim();
    const description = document.getElementById('knowledgeDescription').value.trim();
    const location = document.getElementById('knowledgeLocation').value;

    // Check for empty fields
    if (!title || !description || !location) {
        alert("Please fill in all fields.");
        return;
    }

    // Handle knowledge contribution logic
    const newArticle = {
        title: title,
        description: description,
        fullText: `Description: ${description}`, // Customize as needed
    };

    // Add to the knowledge articles object
    knowledgeArticles[location] = knowledgeArticles[location] || [];
    knowledgeArticles[location].push(newArticle);

    alert(`Knowledge added successfully to ${location}!`);

    // Reset the form
    this.reset();

    // Update the displayed articles for the current location (regardless of login status)
    displayKnowledge(location);
});

document.getElementById('fileUploadForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const location = document.getElementById('knowledgeLocation').value;

    if (file && location) {
        // Store the uploaded file
        uploadedFiles[location] = uploadedFiles[location] || [];
        uploadedFiles[location].push(file);

        alert(`File ${file.name} uploaded successfully to ${location}!`);
    } else {
        alert("Please select a file and a location to upload.");
    }

    // Reset the form
    this.reset();

    // Update the displayed articles and files for the current location
    displayKnowledge(location);
});