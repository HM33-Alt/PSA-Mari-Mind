# PSA Mari-Mind

# Project Name

## Overview
This project is a web application that includes functionalities such as user login/logout, file uploads, knowledge addition, and a map-based knowledge hub. It also features a language switcher and an AI chatbot for user interaction.

## Features
- **User Authentication**: Login and logout functionality.
- **File Upload**: Users can upload files in PDF, DOCX, and XLSX formats.
- **Knowledge Addition**: Users can add knowledge articles with a title, description, and location.
- **Knowledge Hub**: Displays knowledge articles based on map markers.
- **Language Switcher**: Supports multiple languages (English, 中文, Bahasa Melayu, தமிழ்).
- **AI Chatbot**: Users can interact with an AI chatbot.

## Technologies Used
- HTML
- CSS
- JavaScript
- Leaflet.js (for map functionalities)
- i18next (for internationalization)
- npm (for package management)


### AI ChatBot Model
- It is powered by using the endpoint API of *Microsoft-GODEL-v1_1-large-seq2seq*

## Citation for GODEL model:
Peng, B., Galley, M., He, P., Brockett, C., Liden, L., Nouri, E., Yu, Z., Dolan, B., & Gao, J. (2022).  
*GODEL: Large-scale pre-training for goal-directed dialog*. arXiv.  
[https://www.microsoft.com/en-us/research/publication/godel-large-scale-pre-training-for-goal-directed-dialog/](https://www.microsoft.com/en-us/research/publication/godel-large-scale-pre-training-for-goal-directed-dialog/)

## Citation for Hugging Face Model:
Hugging Face. (2022).  
*GODEL-v1_1-large-seq2seq*.  
[https://huggingface.co/microsoft/GODEL-v1_1-large-seq2seq](https://huggingface.co/microsoft/GODEL-v1_1-large-seq2seq)


## File Structure
- `index.html`: Main HTML file containing the structure of the web application.
- `script.js`: JavaScript file containing the logic for various functionalities.
- `styles.css`: CSS file for styling the web application.

## Setup Instructions
1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Get your Hugging Face API key**:
   - Go to the [Hugging Face website](https://huggingface.co/).
   - Sign up for an account if you don't have one.
   - Navigate to your account settings and find the API keys section.
   - Generate a new API key and copy it.

3. **Create `.env` file at the root directory**:
    ```plaintext
    HUGGINGFACE_API_KEY=***Your Hugging Face API key***
    ```

4. **Install dependencies**:
    ```sh
    npm install
    ```

5. **Run the application**:
   Open `index.html` in a web browser.

## Usage
- **Login/Logout**: Use the login button to authenticate and the logout button to end the session.
- **File Upload**: Navigate to the file upload section, choose a file, and click the upload button.
- **Add Knowledge**: Fill in the title, description, and location fields in the knowledge addition form and submit.
- **Knowledge Hub**: Select a marker on the map to view related knowledge articles.
- **Language Switcher**: Use the buttons to switch between supported languages.
- **AI Chatbot**: Open the chat widget, type a prompt, and submit to interact with the AI.

## Scripts
- **Leaflet.js**: For map functionalities.
- **i18next.js**: For internationalization.
- **script.js**: Custom JavaScript for handling user interactions and functionalities.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact
For any inquiries or issues, please contact [your-email@example.com].