// Initialize the map
const map = L.map('map').setView([20.0, 0.0], 2); // Center map globally

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// PSA Locations (example data)
const psaLocations = [
    { name: "Bangladesh", coords: [23.685 , 90.3563] },
    { name: "China", coords: [35.8617, 104.1954] },
    { name: "India", coords: [20.5937, 78.9629] },
    { name: "Indonesia", coords: [-0.7893, 113.9213] },
    { name: "Japan", coords: [36.2048, 138.2529] },
    { name: "Kazakhstan", coords: [48.0196, 66.9237] },
    { name: "Malaysia", coords: [4.2105, 101.9758] },
    { name: "Oman", coords: [21.5129, 55.9233] },
    { name: "Qatar", coords: [25.276987, 51.520008] },
    { name: "Saudi Arabia", coords: [23.8859, 45.0792] },
    { name: "Singapore", coords: [1.3521, 103.8198] },
    { name: "South Korea", coords: [35.9078, 127.7669] },
    { name: "Thailand", coords: [15.8700, 100.9925] },
    { name: "UAE", coords: [23.4241, 53.8478] },
    { name: "Vietnam", coords: [14.0583, 108.2772] },
    { name: "Belgium", coords: [50.8503, 4.3517] },
    { name: "Czech Republic", coords: [49.8175, 15.4730] },
    { name: "Denmark", coords: [56.2639, 9.5018] },
    { name: "France", coords: [46.6034, 1.8883] },
    { name: "Germany", coords: [51.1657, 10.4515] },
    { name: "Ireland", coords: [53.4129, -8.2439] },
    { name: "Italy", coords: [41.8719, 12.5674] },
    { name: "Netherlands", coords: [52.3792, 4.8994] },
    { name: "Poland", coords: [51.9194, 19.1451] },
    { name: "Portugal", coords: [39.3999, -8.2245] },
    { name: "Romania", coords: [45.9432, 24.9668] },
    { name: "Spain", coords: [40.4637, -3.7492] },
    { name: "Sweden", coords: [60.1282, 18.6435] },
    { name: "Türkiye", coords: [38.9637, 35.2433] },
    { name: "United Kingdom", coords: [55.3781, -3.4360] },
    { name: "Argentina", coords: [-38.4161, -63.6167] },
    { name: "Brazil", coords: [-14.2350, -51.9253] },
    { name: "Canada", coords: [56.1304, -106.3468] },
    { name: "Chile", coords: [-35.6751, -71.5430] },
    { name: "Colombia", coords: [4.5709, -74.2973] },
    { name: "Ecuador", coords: [-1.8312, -78.1834] },
    { name: "Panama", coords: [8.9824, -79.5199] },
    { name: "Peru", coords: [-9.1900, -75.0152] },
    { name: "Uruguay", coords: [-32.5228, -55.7658] },
    { name: "USA", coords: [37.0902, -95.7129] },
    { name: "Egypt", coords: [26.8206, 30.8025] },
    { name: "Morocco", coords: [31.7917, -7.0926] },
    { name: "Australia", coords: [-25.2744, 133.7751] },
    { name: "New Zealand", coords: [-40.9006, 174.886] },
];

// Example of dummy news articles
const dummyNews = [
    {
        title: "Singapore Port Operations Update",
        description: "Singapore’s port has experienced some minor delays due to weather conditions.",
        fullText: "Singapore’s port has experienced some minor delays due to weather conditions. Port officials have stated that the delays are expected to last for a few hours, but operations should resume as normal later in the day."
    },
    {
        title: "New Expansion Plans for Singapore Port",
        description: "Singapore’s port authority has announced plans for a new expansion to accommodate more cargo.",
        fullText: "Singapore’s port authority has announced plans for a new expansion to accommodate more cargo and improve port efficiency. The expansion is expected to be completed within the next three years and will increase capacity by 20%."
    }
];

// Example of dummy alerts
const dummyAlerts = {
    "Singapore": [
        "Severe weather warning issued for the Singapore area.",
        "Increased security checks at the port.",
        "Operational delays expected due to high traffic."
    ],
    "Rotterdam": [
        "Maintenance work will cause temporary delays in cargo handling.",
        "Security alert issued for the shipping lanes."
    ],
    // Add alerts for other locations as needed
};


// Function to display mock news and alerts
async function showNews(portName) {
    let newsContent = `<h2>Latest News for ${portName}</h2>`;
    
    // Iterate through the dummy news articles and display each one
    for (let article of dummyNews) {
        newsContent += `
            <p><strong>${article.title}</strong></p>
            <p>${article.description}</p>
            <p>${article.fullText}</p>
        `;
    }

    // Display news in popup
    L.popup()
        .setLatLng(psaLocations.find(loc => loc.name === portName).coords)
        .setContent(newsContent)
        .openOn(map);

    // Update the alerts list
    updateAlerts(portName);
}

// Function to update alerts list
function updateAlerts(portName) {
    const alertsList = document.getElementById("alertsList");
    alertsList.innerHTML = ""; // Clear existing alerts

    // Fetch alerts for the selected port
    const alerts = dummyAlerts[portName];

    // Check if there are any alerts
    if (alerts && alerts.length > 0) {
        alerts.forEach(alert => {
            const listItem = document.createElement("li");
            listItem.textContent = alert;
            alertsList.appendChild(listItem);
        });
    } else {
        // Display a message if no alerts
        const listItem = document.createElement("li");
        listItem.textContent = "No alerts available.";
        alertsList.appendChild(listItem);
    }
}

// Add markers to the map
psaLocations.forEach(location => {
    const marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(`<b>${location.name}</b><br><button onclick="showNews('${location.name}')">Show News</button>`);
});

// Add click event listeners to each marker for alert display
psaLocations.forEach(location => {
    const marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(`<b>${location.name}</b><br><button onclick="showNews('${location.name}')">Show News</button>`);
    marker.on('click', () => displayAlerts(location.name)); // Attach click event
});

let isAuthenticated = false;

// Sample user data
const userData = {
    username: 'admin',
    password: 'password' // Change this in a production environment
};

// Handle login
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple authentication check
    if (username === userData.username && password === userData.password) {
        isAuthenticated = true;
        alert('Login successful!');
        document.getElementById('login-container').style.display = 'none'; // Hide login form
        document.getElementById('logout-btn').style.display = 'block'; // Show logout button
        document.getElementById('alertsContainer').style.display = 'block'; // Show alerts container
    } else {
        alert('Invalid username or password.');
    }
});

// Handle logout
document.getElementById('logout-btn').addEventListener('click', () => {
    isAuthenticated = false;
    document.getElementById('login-container').style.display = 'flex'; // Show login form
    document.getElementById('logout-btn').style.display = 'none'; // Hide logout button
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('alertsContainer').style.display = 'none'; // Hide alerts container
});

// Initialize alerts container to be hidden
document.getElementById('alertsContainer').style.display = 'none';

// Add alert functionality
document.getElementById('add-alert-btn').addEventListener('click', () => {
    if (!isAuthenticated) {
        alert('You must be logged in to add alerts.');
        return;
    }
    
    const alertInput = document.getElementById('alert-input');
    const alertText = alertInput.value.trim();
    
    if (alertText) {
        const listItem = document.createElement("li");
        listItem.textContent = alertText;
        document.getElementById("alertsList").appendChild(listItem);
        alertInput.value = ''; // Clear input field
    } else {
        alert('Please enter an alert.');
    }
});

