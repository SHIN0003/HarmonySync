# HarmonySync
***CURRENTLY WORKING ON DEPLOYING/ working local branch is in tryTwo atm
HarmonySync is an application that allows users to synchronize their favorite Spotify playlists across different devices. Currently, the app is functional locally and is in the process of being deployed.

## Local Setup

To run HarmonySync locally, you need to set up environment variables for both the client and server. You also need to obtain certain information from your Spotify Developer Dashboard.

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/SHIN0003/HarmonySync
```

Navigate to the cloned directory:

bash
Copy code
cd HarmonySync
Server Setup
Inside the server directory, create a .env file with the following variables (replace values with your actual data from Spotify Developer Dashboard):
plaintext
Copy code
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3001/callback
SESSION_SECRET=your_session_secret
FRONT_URL=http://localhost:3000
Install server dependencies:
bash
Copy code
cd server
npm install
Start the server:
bash
Copy code
npm start
Client Setup
Inside the client directory, create a .env file with the following variable:
plaintext
Copy code
REACT_APP_BACK=http://localhost:3001
Install client dependencies:
bash
Copy code
cd client
npm install
Start the React app:
bash
Copy code
npm start
The client will start on http://localhost:3000.

Spotify Developer Dashboard
To use HarmonySync, you will need to create an application in the Spotify Developer Dashboard and set the Redirect URI to http://localhost:3001/callback.

Usage
Once both the server and client are running, navigate to http://localhost:3000 in your web browser to use the app.

Contributing
If you would like to contribute to the development of HarmonySync, please follow the standard GitHub workflow:

Fork the repository
Create a new branch for your feature
Commit changes to your branch
Push your changes and open a pull request

Contact
For any additional questions or comments, please reach out through GitHub Issues.