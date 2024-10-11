// Initialize the map
const map = L.map('map').setView([20.0, 0.0], 2); // Center map globally

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// PSA Locations (example data)
const psaLocations = [
    { name: "Port of Singapore", coords: [1.2833, 103.8333] },
    { name: "Port of Antwerp", coords: [51.2510, 4.4215] },
    // Add more locations as needed
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
