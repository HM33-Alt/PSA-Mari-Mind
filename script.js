// Initialize the map
const map = L.map('map').setView([20.0, 0.0], 2); // Center map globally

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// PSA Locations (example data)
const psaLocations = [
    { name: "Bangladesh", coords: [23.685, 90.3563] },
    { name: "Singapore", coords: [1.3521, 103.8198] },
    // Add other locations...
];

// Function to fetch news articles from an RSS feed
async function fetchRSSFeed(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const items = xml.querySelectorAll("item");
    return Array.from(items).map(item => ({
        title: item.querySelector("title").textContent,
        link: item.querySelector("link").textContent,
        description: item.querySelector("description").textContent
    }));
}

// Show news in a popup with dummy news for testing purposes
async function showNews(portName) {
    const dummyArticles = [
        {
            title: `Breaking: Major Development in ${portName}`,
            link: `https://example.com/article1`,
            description: `A major development has occurred in ${portName}, shaking the local community.`
        },
        {
            title: `${portName} Port Expansion Announced`,
            link: `https://example.com/article2`,
            description: `The government has announced a major expansion project for the ${portName} port.`
        },
        {
            title: `Economic Impact of ${portName} Trade Routes`,
            link: `https://example.com/article3`,
            description: `Experts discuss the economic significance of the ${portName} trade routes.`
        }
    ];

    let newsContent = `<h2>Latest News for ${portName}</h2>`;
    dummyArticles.forEach(article => {
        newsContent += `<p><a href="${article.link}" target="_blank">${article.title}</a></p>`;
    });

    // Popup with dummy news content
    L.popup()
        .setLatLng(psaLocations.find(loc => loc.name === portName).coords)
        .setContent(newsContent)
        .openOn(map);
}


// Add markers to the map
psaLocations.forEach(location => {
    const marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(`<b>${location.name}</b><br><button onclick="showNews('${location.name}')">Show News</button>`);
});

// Example alerts (not modified)
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

// Add click event listeners to each marker for alert display
psaLocations.forEach(location => {
    const marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(`<b>${location.name}</b><br><button onclick="showNews('${location.name}')">Show News</button>`);
    marker.on('click', () => displayAlerts(location.name)); // Attach click event
});
