# HarmonySync

HarmonySync is an innovative application designed to synchronize your favorite Spotify playlists across various devices. The application is currently operational in a local environment and is being prepared for deployment.

## Getting Started

This app currently only works locally, working ony deployment

### Prerequisites

Before setting up HarmonySync, ensure you have the following:

- Node.js: Download and install from [Node.js website](https://nodejs.org/).
- npm: Included with Node.js installation. Alternatively, visit [npm website](https://www.npmjs.com/).

Additionally, you'll need to create a Spotify Developer account and access your client ID and client secret from the Spotify Developer Dashboard.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/SHIN0003/HarmonySync
   cd HarmonySync
   ```

2. **Server Setup**

   - Navigate to the server directory and create a `.env` file with the following structure:

     ```plaintext
     SPOTIFY_CLIENT_ID=your_spotify_client_id
     SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
     SPOTIFY_REDIRECT_URI=http://localhost:3001/callback
     SESSION_SECRET=your_session_secret
     FRONT_URL=http://localhost:3000
     ```

   - Install server dependencies:

     ```bash
     cd server
     npm install
     ```

   - Start the server:

    ```bash
     npm start
    ```

3. **Client Setup**

   - Inside the client directory, create a `.env` file with the following content:

    ```plaintext
     REACT_APP_BACK=http://localhost:3001
    ```

   - Install client dependencies:

     ```bash
     cd client
     npm install
     ```

   - Start the React app:

     ```bash
     npm start
     ```

   The client will run on `http://localhost:3000`.

### Spotify Developer Dashboard

Set up your application in the Spotify Developer Dashboard and ensure the Redirect URI is set to `http://localhost:3001/callback`.

## Usage

After starting both server and client, access HarmonySync at `http://localhost:3000` in your web browser.

## Contributing

To contribute to HarmonySync:

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit changes to your branch.
4. Push your changes and open a pull request.

## Contact

For questions or comments, please use the GitHub Issues section of the repository.
