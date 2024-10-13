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
                "welcome": "PSA Port-Stop",
                "login": "Login",
                "logout": "Logout",
                "add_knowledge": "Add Knowledge",
                "title": "Title:",
                "description": "Description:",
                "location": "Location:",
                "submit_knowledge": "Submit Knowledge",
                "upload_files": "Upload Files",
                "upload_file": "Upload File",
                "knowledge_hub": "Knowledge Hub",
                "select_marker": "Select a marker on the map to see knowledge articles."
            }
        },
        zh: {
            translation: {
                "welcome": "PSA Port-Stop",
                "login": "登录",
                "logout": "登出",
                "add_knowledge": "添加知识",
                "title": "标题:",
                "description": "描述:",
                "location": "位置:",
                "submit_knowledge": "提交知识",
                "upload_files": "上传文件",
                "upload_file": "上传文件",
                "knowledge_hub": "知识中心",
                "select_marker": "选择地图上的标记以查看知识文章。"
            }
        },
        ms: {
            translation: {
                "welcome": "PSA Port Stop",
                "login": "Log masuk",
                "logout": "Log keluar",
                "add_knowledge": "Tambah Pengetahuan",
                "title": "Tajuk:",
                "description": "Penerangan:",
                "location": "Lokasi:",
                "submit_knowledge": "Hantar Pengetahuan",
                "upload_files": "Muat Naik Fail",
                "upload_file": "Muat Naik Fail",
                "knowledge_hub": "Pusat Pengetahuan",
                "select_marker": "Pilih penanda di peta untuk melihat artikel pengetahuan."
            }
        },
        ta: {
            translation: {
                "welcome": "PSA Port-Stop",
                "login": "உள்நுழைய",
                "logout": "வெளியேறு",
                "add_knowledge": "அறிவைச் சேர்க்கவும்",
                "title": "தலைப்பு:",
                "description": "விளக்கம்:",
                "location": "இடம்:",
                "submit_knowledge": "அறிவைச் சமர்ப்பிக்கவும்",
                "upload_files": "கோப்புகளைப் பதிவேற்றவும்",
                "upload_file": "கோப்பைப் பதிவேற்றவும்",
                "knowledge_hub": "அறிவு மையம்",
                "select_marker": "அறிவுக் கட்டுரைகளைப் பார்க்க வரைபடத்தில் ஒரு குறியைத் தேர்ந்தெடுக்கவும்."
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