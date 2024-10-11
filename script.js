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


// Add markers to the map with news fetching functionality
psaLocations.forEach(location => {
    const marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(`<b>${location.name}</b><br><button onclick="showNews('${location.name}')">Show News</button>`);
});

// Fetch news for a specific port
const apiKey = 'YOUR_API_KEY'; 

async function fetchNews(portName) {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(portName)}&apiKey=${apiKey}`);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
        let newsContent = `<h2>Latest News for ${portName}</h2>`;
        data.articles.forEach(article => {
            newsContent += `<p><a href="${article.url}" target="_blank">${article.title}</a></p>`;
        });
        return newsContent;
    } else {
        return `<p>No news found for ${portName}.</p>`;
    }
}

// Show news in a popup
async function showNews(portName) {
    const newsContent = await fetchNews(portName);
    L.popup()
        .setLatLng(psaLocations.find(loc => loc.name === portName).coords)
        .setContent(newsContent)
        .openOn(map);
}

// Alerts with severity levels and suggested solutions
const alerts = [
    {
        port: "Port of Singapore",
        message: "High congestion reported. Possible delays in loading/unloading.",
        severity: "Warning",
        solutions: [
            "Consider rerouting to Port of Tanjung Pelepas.",
            "Increase loading/unloading manpower."
        ]
    },
    {
        port: "Port of Antwerp",
        message: "Storm warning in effect. Expect rough seas.",
        severity: "Alert",
        solutions: [
            "Delay departures until weather improves.",
            "Implement safety protocols for docked vessels."
        ]
    },
    // Add more alerts as needed
];

// Function to display alerts for the selected port
function displayAlerts(portName) {
    const alertList = document.getElementById('alert-list');
    alertList.innerHTML = ''; // Clear previous alerts

    const alert = alerts.find(a => a.port === portName);
    if (alert) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${alert.severity}:</strong> ${alert.message}`;
        
        // Add suggested solutions
        const solutions = document.createElement('ul');
        alert.solutions.forEach(solution => {
            const solutionItem = document.createElement('li');
            solutionItem.textContent = solution;
            solutions.appendChild(solutionItem);
        });
        listItem.appendChild(solutions);
        alertList.appendChild(listItem);
    } else {
        alertList.innerHTML = `<li>No current alerts for ${portName}.</li>`;
    }
}

// Chatbot Functionality
const chatbot = document.getElementById('chatbot');
const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// Function to toggle chatbot visibility
function toggleChatbot() {
    chatbot.style.display = chatbot.style.display === 'none' ? 'block' : 'none';
}

// Event listener for send button
sendButton.addEventListener('click', () => {
    const userMessage = userInput.value;
    if (userMessage) {
        displayUserMessage(userMessage);
        provideResponse(userMessage);
        userInput.value = ''; // Clear input field
    }
});

// Function to display user message in the chat
function displayUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `You: ${message}`;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
}

// Function to provide a response based on user input
function provideResponse(message) {
    let response;
    const portNames = psaLocations.map(location => location.name);
    const foundPort = portNames.find(port => message.toLowerCase().includes(port.toLowerCase()));

    if (foundPort) {
        const alert = alerts.find(alert => alert.port === foundPort);
        response = alert ? `Alert for ${foundPort}: ${alert.message} (${alert.severity}). Suggested actions: ${alert.solutions.join(', ')}` : `No current alerts for ${foundPort}.`;
    } else {
        response = "I'm sorry, I can only provide information about ports.";
    }

    const responseElement = document.createElement('div');
    responseElement.textContent = `Bot: ${response}`;
    chatbotMessages.appendChild(responseElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
}

// Optional: Show chatbot on load or based on some event
document.addEventListener('DOMContentLoaded', () => {
    toggleChatbot(); // Show the chatbot on page load
});
