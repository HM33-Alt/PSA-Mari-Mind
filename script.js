// Initialize the map
const map = L.map('map').setView([20.0, 0.0], 2); // Center globally

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Knowledge Locations (example data)
const knowledgeLocations = [
    { name: "Bangladesh", coords: [23.685, 90.3563] },
    { name: "China", coords: [35.8617, 104.1954] },
    { name: "India", coords: [20.5937, 78.9629] },
    { name: "Japan", coords: [36.2048, 138.2529] },
    { name: "France", coords: [46.6034, 1.8883] },
    { name: "USA", coords: [37.0902, -95.7129] },
    { name: "Brazil", coords: [-14.2350, -51.9253] },
    { name: "Australia", coords: [-25.2744, 133.7751] },
];

// Example knowledge articles
const knowledgeArticles = {
    "Bangladesh": [{ title: "Article 1", description: "Description 1", fullText: "Full Text 1" }],
    "China": [{ title: "Article 2", description: "Description 2", fullText: "Full Text 2" }],
    "India": [{ title: "Article 3", description: "Description 3", fullText: "Full Text 3" }],
    "Japan": [{ title: "Article 4", description: "Description 4", fullText: "Full Text 4" }],
    "France": [{ title: "Article 5", description: "Description 5", fullText: "Full Text 5" }],
    "USA": [{ title: "Article 6", description: "Description 6", fullText: "Full Text 6" }],
    "Brazil": [{ title: "Article 7", description: "Description 7", fullText: "Full Text 7" }],
    "Australia": [{ title: "Article 8", description: "Description 8", fullText: "Full Text 8" }]
};

// Function to display knowledge articles below the map
function displayKnowledge(locationName) {
    const knowledgeContent = document.getElementById('knowledgeDisplay');
    knowledgeContent.innerHTML = `<h2>Knowledge Hub: ${locationName}</h2>`;

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
}

// Add markers to the map with ability to contribute knowledge
knowledgeLocations.forEach(location => {
    const marker = L.marker(location.coords).addTo(map);
    
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

        // Show the add knowledge section
        document.getElementById('add-knowledge-container').style.display = 'block'; // Show add knowledge form
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
    document.getElementById('add-knowledge-container').style.display = 'none'; // Hide add knowledge form
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
