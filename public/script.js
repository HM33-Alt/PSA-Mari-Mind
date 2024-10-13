// Example knowledgeLocations array
const knowledgeLocations = [
    { name: 'Bangladesh - PSA Marine', coords: [23.685, 90.356] },

    // China locations, spaced out by a small amount
    { name: 'China - Deep Sea / Coastal Terminal', coords: [35.8617, 104.1954] },
    { name: 'China - PSA BDP Office', coords: [35.8627, 104.1964] },
    { name: 'China - Rail / Inland Terminal', coords: [35.8637, 104.1974] },
    { name: 'China - Inland Container Depot / Warehouse', coords: [35.8647, 104.1984] },

    // India locations, spaced slightly
    { name: 'India - Deep Sea / Coastal Terminal', coords: [20.5937, 78.9629] },
    { name: 'India - PSA BDP Office', coords: [20.5947, 78.9639] },
    { name: 'India - Rail / Inland Terminal', coords: [20.5957, 78.9649] },
    { name: 'India - Inland Container Depot / Warehouse', coords: [20.5967, 78.9659] },

    // Indonesia locations, spaced slightly
    { name: 'Indonesia - Deep Sea / Coastal Terminal', coords: [-0.7893, 113.9213] },
    { name: 'Indonesia - PSA BDP Office', coords: [-0.7883, 113.9223] },
    { name: 'Indonesia - Rail / Inland Terminal', coords: [-0.7873, 113.9233] },
    { name: 'Indonesia - Inland Container Depot / Warehouse', coords: [-0.7863, 113.9243] },

    { name: 'Japan - Deep Sea / Coastal Terminal', coords: [36.2048, 138.2529] },
    { name: 'Kazakhstan - Rail / Inland Terminal', coords: [48.0196, 66.9237] },

    // Malaysia locations
    { name: 'Malaysia - PSA BDP Office', coords: [4.2105, 101.9758] },
    { name: 'Malaysia - PSA Marine', coords: [4.2115, 101.9768] },

    // Oman locations
    { name: 'Oman - PSA BDP Office', coords: [21.4735, 55.9754] },
    { name: 'Oman - PSA Marine', coords: [21.4745, 55.9764] },

    { name: 'Philippines - PSA BDP Office', coords: [12.8797, 121.774] },
    { name: 'Qatar - PSA BDP Office', coords: [25.3548, 51.1839] },

    // Saudi Arabia locations
    { name: 'Saudi Arabia - Deep Sea / Coastal Terminal', coords: [23.8859, 45.0792] },
    { name: 'Saudi Arabia - PSA BDP Office', coords: [23.8869, 45.0802] },
    { name: 'Saudi Arabia - Rail / Inland Terminal', coords: [23.8879, 45.0812] },
    { name: 'Saudi Arabia - Inland Container Depot / Warehouse', coords: [23.8889, 45.0822] },

    // Singapore locations
    { name: 'Singapore - Deep Sea / Coastal Terminal', coords: [1.3521, 103.8198] },
    { name: 'Singapore - PSA BDP Office', coords: [1.3531, 103.8208] },
    { name: 'Singapore - Inland Container Depot / Warehouse', coords: [1.3541, 103.8218] },

    // South Korea locations
    { name: 'South Korea - Deep Sea / Coastal Terminal', coords: [35.9078, 127.7669] },
    { name: 'South Korea - PSA BDP Office', coords: [35.9088, 127.7679] },

    // Thailand locations
    { name: 'Thailand - Deep Sea / Coastal Terminal', coords: [15.8700, 100.9925] },
    { name: 'Thailand - PSA BDP Office', coords: [15.8710, 100.9935] },
    { name: 'Thailand - Rail / Inland Terminal', coords: [15.8720, 100.9945] },
    { name: 'Thailand - Inland Container Depot / Warehouse', coords: [15.8730, 100.9955] },

    { name: 'UAE - PSA BDP Office', coords: [23.4241, 53.8478] },

    // Vietnam locations
    { name: 'Vietnam - Deep Sea / Coastal Terminal', coords: [14.0583, 108.2772] },
    { name: 'Vietnam - PSA BDP Office', coords: [14.0593, 108.2782] },
    { name: 'Vietnam - Inland Container Depot / Warehouse', coords: [14.0603, 108.2792] },

    // Belgium locations
    { name: 'Belgium - Deep Sea / Coastal Terminal', coords: [50.5039, 4.4699] },
    { name: 'Belgium - PSA BDP Office', coords: [50.5049, 4.4709] },
    { name: 'Belgium - Inland Container Depot / Warehouse', coords: [50.5059, 4.4719] },

    { name: 'Czech Republic - PSA BDP Office', coords: [49.8175, 15.473] },
    { name: 'Denmark - PSA BDP Office', coords: [56.2639, 9.5018] },

    // France locations
    { name: 'France - PSA BDP Office', coords: [46.6034, 1.8883] },
    { name: 'France - Inland Container Depot / Warehouse', coords: [46.6044, 1.8893] },

    // Germany locations
    { name: 'Germany - PSA BDP Office', coords: [51.1657, 10.4515] },
    { name: 'Germany - Rail / Inland Terminal', coords: [51.1667, 10.4525] },

    { name: 'Ireland - PSA BDP Office', coords: [53.1424, -7.6921] },

    // Italy locations
    { name: 'Italy - Deep Sea / Coastal Terminal', coords: [41.8719, 12.5674] },
    { name: 'Italy - PSA BDP Office', coords: [41.8729, 12.5684] },
    { name: 'Italy - Rail / Inland Terminal', coords: [41.8739, 12.5694] },
    { name: 'Italy - Inland Container Depot / Warehouse', coords: [41.8749, 12.5704] },

    { name: 'Netherlands - PSA BDP Office', coords: [52.1326, 5.2913] },
    { name: 'Poland - PSA BDP Office', coords: [51.9194, 19.1451] },

    // Portugal locations
    { name: 'Portugal - Deep Sea / Coastal Terminal', coords: [39.3999, -8.2245] },
    { name: 'Portugal - PSA BDP Office', coords: [39.4009, -8.2255] },

    { name: 'Romania - PSA BDP Office', coords: [45.9432, 24.9668] },
    { name: 'Spain - PSA BDP Office', coords: [40.4637, -3.7492] },

    { name: 'Sweden - PSA BDP Office', coords: [60.1282, 18.6435] }
// Turkiye locations
    { name: 'Turkiye - Deep Sea / Coastal Terminal', coords: [38.9637, 35.2433] },
    { name: 'Turkiye - PSA BDP Office', coords: [38.9647, 35.2443] },
    { name: 'Turkiye - Rail / Inland Terminal', coords: [38.9657, 35.2453] },
    { name: 'Turkiye - Inland Container Depot / Warehouse', coords: [38.9667, 35.2463] },

// UK locations
    { name: 'UK - PSA BDP Office', coords: [55.3781, -3.4360] },
    { name: 'UK - PSA Marine', coords: [55.3791, -3.4370] },

// Argentina locations
    { name: 'Argentina - Deep Sea / Coastal Terminal', coords: [-38.4161, -63.6167] },
    { name: 'Argentina - PSA BDP Office', coords: [-38.4151, -63.6157] },
    { name: 'Argentina - Rail / Inland Terminal', coords: [-38.4141, -63.6147] },
    { name: 'Argentina - Inland Container Depot / Warehouse', coords: [-38.4131, -63.6137] },

// Brazil locations
    { name: 'Brazil - PSA BDP Office', coords: [-14.2350, -51.9253] },
    { name: 'Brazil - Inland Container Depot / Warehouse', coords: [-14.2340, -51.9243] },

// Canada locations
    { name: 'Canada - Deep Sea / Coastal Terminal', coords: [56.1304, -106.3468] },
    { name: 'Canada - PSA BDP Office', coords: [56.1314, -106.3478] },
    { name: 'Canada - Rail / Inland Terminal', coords: [56.1324, -106.3488] },
    { name: 'Canada - Inland Container Depot / Warehouse', coords: [56.1334, -106.3498] },

    { name: 'Chile - PSA BDP Office', coords: [-35.6751, -71.5430] },

// Colombia locations
    { name: 'Colombia - Deep Sea / Coastal Terminal', coords: [4.5709, -74.2973] },
    { name: 'Colombia - PSA BDP Office', coords: [4.5719, -74.2983] },
    { name: 'Colombia - Rail / Inland Terminal', coords: [4.5729, -74.2993] },
    { name: 'Colombia - Inland Container Depot / Warehouse', coords: [4.5739, -74.3003] },

    { name: 'Ecuador - PSA Marine', coords: [-1.8312, -78.1834] },

// Panama locations
    { name: 'Panama - Deep Sea / Coastal Terminal', coords: [8.5379, -80.7821] },
    { name: 'Panama - PSA Marine', coords: [8.5389, -80.7831] },

// Peru locations
    { name: 'Peru - PSA BDP Office', coords: [-9.1900, -75.0152] },
    { name: 'Peru - PSA Marine', coords: [-9.1890, -75.0142] },

// Uruguay locations
    { name: 'Uruguay - PSA BDP Office', coords: [-32.5228, -55.7658] },
    { name: 'Uruguay - Inland Container Depot / Warehouse', coords: [-32.5218, -55.7648] },

// USA locations
    { name: 'USA - Deep Sea / Coastal Terminal', coords: [37.0902, -95.7129] },
    { name: 'USA - PSA BDP Office', coords: [37.0912, -95.7139] },
    { name: 'USA - Inland Container Depot / Warehouse', coords: [37.0922, -95.7149] },

    { name: 'Egypt - PSA BDP Office', coords: [26.8206, 30.8025] },
    { name: 'Morocco - PSA BDP Office', coords: [31.7917, -7.0926] },

// Australia locations
    { name: 'Australia - PSA BDP Office', coords: [-25.2744, 133.7751] },
    { name: 'Australia - PSA Marine', coords: [-25.2754, 133.7761] },

    { name: 'New Zealand - PSA BDP Office', coords: [-40.9006, 174.8860] },
]


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
            const fileURL = URL.createObjectURL(file);
            knowledgeContent.innerHTML += `<li><a href="${fileURL}" download="${file.name}">${file.name}</a></li>`;
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

// Handle login
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to the backend
    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login successful!') {
                localStorage.setItem('loggedIn', 'true');
                alert('Login successful!');

                // Hide login form and show logout button
                document.getElementById('login-container').style.display = 'none';
                document.getElementById('logout-btn').style.display = 'block';

                // Show the content container
                document.getElementById('content-container').style.display = 'flex';

            } else {
                alert('Invalid username or password.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login.');
        });
});

// Handle logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    alert('Logout successful!');

    // Show login form and hide logout button
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('logout-btn').style.display = 'none';

    // Hide the content container
    document.getElementById('content-container').style.display = 'none';

});

// Check login state on page load
window.onload = function() {
    if (localStorage.getItem('loggedIn') === 'true') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'block';
        document.getElementById('content-container').style.display = 'flex';
    }
};

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

// Handle AI chatbot form submission
var chatWidget = document.getElementById("chat-widget");
var chatButton = document.getElementById("open-chatbot-btn");
var chatClose = document.getElementById("chat-close");

// When the user clicks the button, open the chat widget
chatButton.onclick = function() {
    chatWidget.style.display = "block";
    chatButton.parentElement.style.display = "none";
}

// When the user clicks on <span> (x), close the chat widget
chatClose.onclick = function() {
    chatWidget.style.display = "none";
    chatButton.parentElement.style.display = "block";
}

// When the user clicks anywhere outside of the chat widget, close it
window.onclick = function(event) {
    if (event.target == chatWidget) {
        chatWidget.style.display = "none";
        chatButton.parentElement.style.display = "block";
    }
}

// Handle form submission for the AI chatbot
document.getElementById('aiChatForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const prompt = document.getElementById('aiPrompt').value;

    try {
        const response = await fetch('http://localhost:5000/api/ai', { // Ensure the URL is correct
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        document.getElementById('aiResponse').innerText = data.response;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('aiResponse').innerText = 'Error fetching response';
    }
});

// Initialize i18next with translations
i18next.init({
    lng: 'en', // default language
    resources: {
        en: {
            translation: {
                "welcome": "PSA Mari-Mind",
                "chat_with_ai": "Chat with AI",
                "login": "Login",
                "logout": "Logout",
                "add_knowledge": "Add Knowledge",
                "title": "Title:",
                "description": "Description:",
                "location": "Selected Location:",
                "submit_knowledge": "Submit Knowledge",
                "upload_files": "Upload Files",
                "upload_file": "Upload File",
                "knowledge_hub": "Knowledge Hub",
                "select_marker": "Select a marker on the map to see knowledge articles."
            }
        },
        zh: {
            translation: {
                "welcome": "PSA Mari-Mind",
                "chat_with_ai": "与人工智能对话 (仅限英文）",
                "login": "登录",
                "logout": "注销",
                "add_knowledge": "添加知识",
                "title": "标题：",
                "description": "描述：",
                "location": "选择的位置：",
                "submit_knowledge": "提交知识",
                "upload_files": "上传文件",
                "upload_file": "上传文件",
                "knowledge_hub": "知识中心",
                "select_marker": "选择地图上的标记即可查看知识文章。"
            }
        },
        ms: {
            translation: {
                "welcome": "PSA Mari-Mind",
                "chat_with_ai": "Untuk Bercakap Dengan AI (Bahasa Inggeris Sahaja)",
                "login": "Log masuk",
                "logout": "Logout",
                "add_knowledge": "Tambah Pengetahuan",
                "title": "Tajuk:",
                "description": "Penerangan:",
                "location": "Lokasi yang Dipilih:",
                "submit_knowledge": "Serahkan Pengetahuan",
                "upload_files": "Muat naik Fail",
                "upload_file": "Muat naik Fail",
                "knowledge_hub": "Hab Pengetahuan",
                "select_marker": "Pilih penanda pada peta untuk melihat artikel pengetahuan."
            }
        },
        ta: {
            translation: {
                "welcome": "PSA Mari-Mind",
                "chat_with_ai": "AI உடன் பேச (ஆங்கிலம் மட்டுமே)",
                "login": "உள்நுழை",
                "logout": "வெளியேறு",
                "add_knowledge": "தகவல் பதிவேற்றம்",
                "title": "தலைப்பு:",
                "description": "விளக்கம்:",
                "location": "இடம்:",
                "submit_knowledge": "தகவல் பதிவேற்றம்",
                "upload_files": "ஆவணம் பதிவேற்று",
                "upload_file": "ஆவணம் பதிவேற்று",
                "knowledge_hub": "தகவல் மையம்",
                "select_marker": "தகவல் கட்டுரைகளைப் பார்க்க வரைபடத்தில் ஒரு சுட்டி தேர்ந்தெடுக்கவும்."
            }
        }
    }
}, function(err, t) {
    document.querySelectorAll('[data-i18n]').forEach(function(element) {
        element.textContent = t(element.getAttribute('data-i18n'));
    });
});

// Function to change the language
function changeLanguage(lng) {
    i18next.changeLanguage(lng, function(err, t) {
        if (err) return console.error(err);
        document.querySelectorAll('[data-i18n]').forEach(function(element) {
            element.textContent = t(element.getAttribute('data-i18n'));
        });
    });
}

// public/script.js
fetch('http://localhost:5000/api/test')
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Should log "Backend is connected!"
        document.getElementById('test-message').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));

fetch('http://localhost:5000/api/files', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        location: 'Location 1',
        file: 'file-name.pdf'
    }),
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });